"""Translate the Chinese site content to English.

Run by .github/workflows/translate.yml after every push that changes Chinese content.
Only edit Chinese; this script writes the English files.

How it avoids rewriting good English:
- data/en/translation-cache.json remembers the English for every Chinese line and string.
- A file whose Chinese has not changed since the last run is skipped.
- In a changed file, unchanged lines reuse their cached English; only new or edited lines are
  sent to a machine translator (Google first, MyMemory as the free fallback).

Usage:
  python scripts/translate.py          translate changed files
  python scripts/translate.py --seed   store the current zh/en pairs in the cache (no translation)
"""
import glob
import hashlib
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_PATH = os.path.join(ROOT, 'data', 'en', 'translation-cache.json')
JSON_FILES = ['work.json', 'projects.json', 'about.json', 'experience.json']   # data/<f> -> data/en/<f>
POSTS = os.path.join(ROOT, 'posts', 'posts.json')                             # title/summary -> title_en/summary_en
CJK = re.compile(r'[㐀-鿿＀-￯]')

# Values that are codes, paths, or dates: copied as they are.
KEEP_KEYS = {'slug', 'parent', 'sdlc', 'layers', 'status', 'url', 'file', 'id', 'icon', 'lane', 'key', 'period'}

# Fixed wording, used before any machine translation.
GLOSSARY = {
    '結果': 'Results', '為什麼要做': 'Why this project', '我的角色': 'My role', '我怎麼做': 'What I did',
    '下一步': 'Next steps', '我學到的事': 'What I learned', '子專案': 'Sub-projects',
    '主責': 'Lead', '協作': 'Contributor', '現職': 'Current', '在學': 'Enrolled',
    '量化策略': 'Quant strategy', '學術研究': 'Research', '投資實務': 'Investment practice', '教學': 'Teaching',
    '待補充': 'To be added', '待量測': 'To be measured',
}
NUM = {'一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10}
PHASE = re.compile(r'^第([一二三四五六七八九十、]+)階段[：:]\s*')
INLINE = re.compile(r'(\*\*.+?\*\*|!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|`[^`]*`)')


def sha(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def load_cache():
    try:
        with open(CACHE_PATH, encoding='utf-8') as f:
            c = json.load(f)
    except FileNotFoundError:
        c = {}
    for k in ('lines', 'strings', 'files'):
        c.setdefault(k, {})
    return c


def save_cache(c):
    with open(CACHE_PATH, 'w', encoding='utf-8') as f:
        json.dump(c, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write('\n')


# ── machine translation ──

def google(text):
    from deep_translator import GoogleTranslator   # free, no key; often blocked from cloud IPs
    return GoogleTranslator(source='zh-TW', target='en').translate(text)


def mymemory(text):
    """Free MyMemory API, no key (about 5,000 characters a day; 50,000 with MYMEMORY_EMAIL)."""
    out = []
    for part in chunks(text, 450):
        q = {'q': part, 'langpair': 'zh-TW|en'}
        if os.environ.get('MYMEMORY_EMAIL'):
            q['de'] = os.environ['MYMEMORY_EMAIL']
        url = 'https://api.mymemory.translated.net/get?' + urllib.parse.urlencode(q)
        with urllib.request.urlopen(url, timeout=30) as r:
            d = json.load(r)
        if str(d.get('responseStatus')) != '200' or d.get('quotaFinished'):
            raise RuntimeError(f"MyMemory: {d.get('responseDetails')}")
        out.append(d['responseData']['translatedText'])
        time.sleep(1)
    return ' '.join(out)


def chunks(text, size):
    """Split at sentence ends so no request is longer than `size` characters."""
    parts, cur = [], ''
    for s in re.split(r'(?<=[。！？；])', text):
        if len(cur) + len(s) > size and cur:
            parts.append(cur)
            cur = ''
        cur += s
    if cur:
        parts.append(cur)
    return parts


ENGINE = {'name': None}


def machine(text):
    for name, fn in (('google', google), ('mymemory', mymemory)):
        if ENGINE['name'] and ENGINE['name'] != name and name == 'google':
            continue                                   # Google already failed in this run
        try:
            out = fn(text).strip()
            ENGINE['name'] = name
            return out
        except Exception as e:                          # try the next engine
            print(f'  {name} failed: {e}', file=sys.stderr)
            if name == 'google':
                ENGINE['name'] = 'mymemory'
    raise RuntimeError('No translator is available. English stays unchanged.')


# ── text units ──

class Translator:
    def __init__(self, cache):
        self.c = cache
        self.used = 0

    def text(self, s):
        """Plain text (no Markdown)."""
        if not s or not CJK.search(s):
            return s
        lead, core, trail = re.match(r'^(\s*)(.*?)(\s*)$', s, re.S).groups()
        if core in GLOSSARY:
            return lead + GLOSSARY[core] + trail
        if core in self.c['strings']:
            return lead + self.c['strings'][core] + trail
        m = PHASE.match(core)
        if m:
            nums = [NUM[n] for n in m.group(1).split('、') if n in NUM]
            label = f'Phase {nums[0]}: ' if len(nums) == 1 else 'Phases ' + ' and '.join(map(str, nums)) + ': '
            rest = core[m.end():]
            en = label + (self.text(rest) if rest else '').lstrip()
        else:
            en = machine(core)
            self.used += len(core)
        self.c['strings'][core] = en
        return lead + en + trail

    def inline(self, s):
        """Text with **bold**, [links](url), ![images](path), and `code`: translate the words only."""
        out = []
        for part in INLINE.split(s):
            if not part:
                continue
            if part.startswith('**') and part.endswith('**'):
                out.append('**' + self.inline(part[2:-2]).strip() + '**')
            elif part.startswith('!['):
                m = re.match(r'!\[([^\]]*)\]\(([^)]*)\)', part)
                out.append(f'![{self.text(m.group(1))}]({m.group(2)})')
            elif part.startswith('['):
                m = re.match(r'\[([^\]]+)\]\(([^)]*)\)', part)
                out.append(f'[{self.text(m.group(1))}]({m.group(2)})')
            elif part.startswith('`'):
                out.append(part)
            else:
                out.append(self.text(part))
        joined = ''
        for p in out:                                   # keep a space between English words
            if joined and not joined.endswith((' ', '(')) and not p.startswith((' ', ',', '.', ':', ';', ')', '!', '?')):
                joined += ' '
            joined += p
        return re.sub(r'\s+([,.;:!?])', r'\1', joined)

    def md_line(self, line):
        if line in self.c['lines']:
            return self.c['lines'][line]
        if not CJK.search(line):
            return line
        m = re.match(r'^(\s*(?:#{1,6} |[-*] |> |\d+\. )?)(.*)$', line)
        en = m.group(1) + self.inline(m.group(2))
        self.c['lines'][line] = en
        return en

    def markdown(self, md):
        out, front = [], False
        for i, line in enumerate(md.split('\n')):
            if i == 0 and line == '---':
                front = True
                out.append(line)
                continue
            if front:                                   # front matter (slug) stays as it is
                out.append(line)
                front = line != '---'
                continue
            out.append(self.md_line(line))
        return '\n'.join(out)

    def value(self, v, key=None):
        if isinstance(v, dict):
            return {k: self.value(x, k) for k, x in v.items()}
        if isinstance(v, list):
            return [self.value(x, key) for x in v]
        if isinstance(v, str):
            if key in KEEP_KEYS:
                return GLOSSARY.get(v, v)
            return self.text(v)
        return v


# ── seeding: pair the current Chinese and English so existing English is kept ──

def seed_pairs(zh, en, cache, key=None):
    if isinstance(zh, dict) and isinstance(en, dict):
        for k in zh:
            if k in en:
                seed_pairs(zh[k], en[k], cache, k)
    elif isinstance(zh, list) and isinstance(en, list) and len(zh) == len(en):
        for a, b in zip(zh, en):
            seed_pairs(a, b, cache, key)
    elif isinstance(zh, str) and isinstance(en, str) and CJK.search(zh) and key not in KEEP_KEYS:
        cache['strings'].setdefault(zh.strip(), en.strip())


def seed(cache):
    for f in JSON_FILES:
        zp, ep = os.path.join(ROOT, 'data', f), os.path.join(ROOT, 'data', 'en', f)
        if os.path.exists(ep):
            seed_pairs(json.load(open(zp, encoding='utf-8')), json.load(open(ep, encoding='utf-8')), cache)
        cache['files']['data/' + f] = sha(open(zp, encoding='utf-8').read())
    for zp in sorted(glob.glob(os.path.join(ROOT, 'data', 'stories', '*.md'))):
        name = os.path.basename(zp)
        ep = os.path.join(ROOT, 'data', 'en', 'stories', name)
        zh = open(zp, encoding='utf-8').read()
        if os.path.exists(ep):
            zl = zh.split('\n')
            el = open(ep, encoding='utf-8').read().split('\n')
            if len(zl) == len(el):                      # same layout: pair line by line
                for a, b in zip(zl, el):
                    if CJK.search(a):
                        cache['lines'].setdefault(a, b)
                        # also pair the **bold** parts, so an edited line keeps its unchanged bold heading
                        za, eb = re.findall(r'\*\*(.+?)\*\*', a), re.findall(r'\*\*(.+?)\*\*', b)
                        if len(za) == len(eb):
                            for x, y in zip(za, eb):
                                cache['strings'].setdefault(x.strip(), y.strip())
        cache['files']['data/stories/' + name] = sha(zh)
    posts = json.load(open(POSTS, encoding='utf-8'))
    for p in posts:
        for k in ('title', 'summary'):
            if p.get(k + '_en'):
                cache['strings'].setdefault(p[k].strip(), p[k + '_en'].strip())
    cache['files']['posts/posts.json'] = sha(open(POSTS, encoding='utf-8').read())


# ── main ──

def main():
    cache = load_cache()
    if '--seed' in sys.argv:
        seed(cache)
        save_cache(cache)
        print('Seeded', len(cache['lines']), 'lines and', len(cache['strings']), 'strings.')
        return
    t = Translator(cache)
    changed = []
    try:
        for f in JSON_FILES:
            zp, ep = os.path.join(ROOT, 'data', f), os.path.join(ROOT, 'data', 'en', f)
            raw = open(zp, encoding='utf-8').read()
            if cache['files'].get('data/' + f) == sha(raw) and os.path.exists(ep):
                continue
            en = t.value(json.loads(raw))
            with open(ep, 'w', encoding='utf-8') as out:
                json.dump(en, out, ensure_ascii=False, indent=2)
                out.write('\n')
            cache['files']['data/' + f] = sha(raw)
            changed.append('data/en/' + f)
        zh_names = set()
        for zp in sorted(glob.glob(os.path.join(ROOT, 'data', 'stories', '*.md'))):
            name = os.path.basename(zp)
            zh_names.add(name)
            ep = os.path.join(ROOT, 'data', 'en', 'stories', name)
            raw = open(zp, encoding='utf-8').read()
            if cache['files'].get('data/stories/' + name) == sha(raw) and os.path.exists(ep):
                continue
            with open(ep, 'w', encoding='utf-8') as out:
                out.write(t.markdown(raw))
            cache['files']['data/stories/' + name] = sha(raw)
            changed.append('data/en/stories/' + name)
        for ep in glob.glob(os.path.join(ROOT, 'data', 'en', 'stories', '*.md')):   # story deleted in Chinese
            if os.path.basename(ep) not in zh_names:
                os.remove(ep)
                changed.append('removed ' + os.path.relpath(ep, ROOT))
        raw = open(POSTS, encoding='utf-8').read()
        if cache['files'].get('posts/posts.json') != sha(raw):
            posts = json.loads(raw)
            for p in posts:
                p['title_en'] = t.text(p['title'])
                p['summary_en'] = t.text(p['summary'])
            raw = json.dumps(posts, ensure_ascii=False, indent=2) + '\n'
            open(POSTS, 'w', encoding='utf-8').write(raw)
            cache['files']['posts/posts.json'] = sha(raw)
            changed.append('posts/posts.json')
    finally:
        save_cache(cache)                               # keep what was translated, even after an error
    print(f'Machine-translated {t.used} characters with {ENGINE["name"] or "no engine (cache only)"}.')
    print('Updated:', ', '.join(changed) if changed else 'nothing')


if __name__ == '__main__':
    main()
