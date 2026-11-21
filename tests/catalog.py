from pathlib import Path
import json
root=Path(__file__).resolve().parent.parent
home=json.loads((root/'shop-lane/catalog/egypt-home.json').read_text())
tech=json.loads((root/'shop-lane/catalog/egypt-tech.json').read_text())
assert len(home)==543
assert len(tech)==21
assert len({p['id'] for p in home+tech})==564
assert all(p['name'] and p['image'] and p['source'] for p in home+tech)
assert sum(p['origin']=='fresh' for p in home+tech)==556
print('564 distinct sourced catalog records, 556 Fresh models and 8 global technology examples.')
