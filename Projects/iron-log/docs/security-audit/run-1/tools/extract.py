import json,sys,re
src,dst=sys.argv[1],sys.argv[2]
last=None
for line in open(src):
    try: d=json.loads(line)
    except: continue
    m=d.get("message") or d
    if m.get("role")=="assistant":
        c=m.get("content")
        txt=""
        if isinstance(c,str): txt=c
        elif isinstance(c,list):
            txt="".join(b.get("text","") for b in c if isinstance(b,dict) and b.get("type")=="text")
        if "{" in txt: last=txt
if last is None:
    # SubagentHandback tool use fallback
    for line in open(src):
        if "SubagentHandback" in line or "handback" in line.lower():
            pass
    print("NOTFOUND"); sys.exit(1)
i=last.index("{"); j=last.rindex("}")
obj=json.loads(last[i:j+1])
json.dump(obj,open(dst,"w"),indent=1)
print("saved",dst,obj.get("decision"),obj.get("record",{}).get("fingerprint"))
