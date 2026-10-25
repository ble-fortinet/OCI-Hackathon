# Builds OpenPath's index.html.
# Usage (from the repository root):  python tools/build.py
# Reads:  tools/catalog.py, data/official-occupations.json, data/researched-profiles.json, tools/template.html
# Writes: index.html
import sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from catalog import INTERESTS, STYLES, FAMILIES, CAREERS

data = json.load(open(os.path.join(ROOT, "data", "official-occupations.json"), encoding="utf-8"))
research = json.load(open(os.path.join(ROOT, "data", "researched-profiles.json"), encoding="utf-8"))
C = data["careers"]; idx = {c["c"]: i for i, c in enumerate(C)}
alts = {}
for t, i in data["titles"]:
    alts.setdefault(i, []).append(t)

def occ_record(code):
    c = C[idx[code]]; i = idx[code]
    def brief(j):
        if j is None: return None
        o = C[j]
        return {"t": o["t"], "c": o["c"], "m": o["w"]["p"][2] if o["w"] and o["w"]["p"][2] else None}
    return {"t": c["t"], "d": c["d"], "k": c["k"], "sh": c["sh"], "ss": c["ss"], "tech": c["tech"], "ed": c["ed"], "z": c["z"],
            "w": c["w"], "st": c["st"], "mj": c["mj"], "hs": c["hs"], "ce": c["ce"], "as": c["as"], "so": c["so"], "es": c["es"],
            "br": [brief(j) for j in c["br"]], "alts": alts.get(i, [])[:30], "na": len(alts.get(i, []))}

occ, cards = {}, []
for title, fam, code, desc, tags in CAREERS:
    r = research.get(title)
    if code and code not in idx:
        sys.exit(f"Unknown O*NET code {code} for {title}. Run tools/validate.py.")
    card = {"t": title, "f": fam, "c": code or None, "tags": tags.split(), "d": desc or (r["description"] if r else ""), "rs": bool(r)}
    if r:
        card["aka"] = r.get("also_called", ""); card["x"] = r["profile"]
        if r.get("requirements_source"): card["src2"] = r["requirements_source"]
        if r.get("related_occupations"):
            card["related"] = r["related_occupations"]
            for rc in card["related"]: occ.setdefault(rc, occ_record(rc))
    if code: occ.setdefault(code, occ_record(code))
    cards.append(card)

def quiz(groups):
    return [{"id": i, "label": l, "hint": h, "kinds": [{"id": k, "label": kl, "sc": [{"id": s, "label": sl} for s, sl in ss]} for k, kl, ss in ks]} for i, l, h, ks in groups]

payload = {"interests": quiz(INTERESTS), "styles": quiz(STYLES), "families": FAMILIES, "careers": cards, "occ": occ, "jz": data["meta"]["jz"],
           "meta": {"cards": len(cards), "families": len(FAMILIES), "researched": sum(c["rs"] for c in cards), "linked": len(occ)}}
js = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
html = open(os.path.join(HERE, "template.html"), encoding="utf-8").read().replace("__OPENPATH_DATA__", js)
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(html)
print(f"Built index.html: {len(cards)} careers, {payload['meta']['researched']} with role-specific research, {len(occ)} official occupations linked.")
