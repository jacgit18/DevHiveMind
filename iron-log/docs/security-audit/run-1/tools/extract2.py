import json,sys
src,dst=sys.argv[1],sys.argv[2]
txt=None
for l in open(src):
    d=json.loads(l); m=d.get("message",d); c=m.get("content")
    if m.get("role")=="assistant" and isinstance(c,list):
        for b in c:
            if b.get("type")=="tool_use" and b.get("name")=="SubagentHandback":
                inp=b["input"]; txt=inp if isinstance(inp,str) else max((v for v in inp.values() if isinstance(v,str)),key=len)
if txt is None: print("NOTFOUND"); sys.exit(1)
o=json.loads(txt[txt.index("{"):txt.rindex("}")+1])
json.dump(o,open(dst,"w"),indent=1)
print(dst,o.get("decision"),o["record"]["fingerprint"],o["record"].get("severity",{}).get("overall_severity"))
