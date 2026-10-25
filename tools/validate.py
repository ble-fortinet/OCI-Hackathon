# Checks the OpenPath catalog. Usage (from the repository root): python tools/validate.py
import sys, os, json, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from catalog import INTERESTS, STYLES, FAMILIES, CAREERS

official = {c["c"] for c in json.load(open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "official-occupations.json")))["careers"]}
scen, kinds = {}, {}
for grp in (INTERESTS, STYLES):
    for iid, _, _, ks in grp:
        for kid, _, ss in ks:
            assert kid not in kinds, "duplicate kind " + kid
            kinds[kid] = iid
            for sid, _ in ss:
                assert sid not in scen, "duplicate scenario " + sid
                scen[sid] = kid

problems = []
titles = collections.Counter(c[0] for c in CAREERS)
problems += [f"duplicate title: {t}" for t, n in titles.items() if n > 1]
for t, fam, code, desc, tags in CAREERS:
    if fam not in FAMILIES: problems.append(f"{t}: unknown family {fam}")
    if official is not None and code and code not in official: problems.append(f"{t}: unknown O*NET code {code}")
    for tag in tags.split():
        if tag not in scen: problems.append(f"{t}: unknown tag {tag}")
    if len(tags.split()) < 2: problems.append(f"{t}: fewer than 2 tags")
use = collections.Counter(tag for c in CAREERS for tag in c[4].split())
problems += [f"scenario {s} leads to only {use[s]} career(s)" for s in scen if use[s] < 2]

print(f"{len(CAREERS)} careers, {len(FAMILIES)} families, {len(kinds)} kinds of work, {len(scen)} scenarios")
print("\n".join(problems) if problems else "No problems found.")
sys.exit(1 if problems else 0)
