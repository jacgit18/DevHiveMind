import json
from urllib.parse import quote
enc=lambda s: quote(s, safe='-._~')
L=json.load(open("coverage-ledger.json"))
EXC=[
 {"block":"MEMORY-SAFETY-AND-BINARY.md#Core discipline","reason":"No native/unsafe code (TypeScript only)."},
 {"block":"AI-AND-LLM.md#Core discipline","reason":"No model/agent/MCP surface in the product."},
 {"block":"PROTOCOLS-RPC-AND-MESSAGING.md#Core discipline","reason":"Plain JSON over HTTP; no custom protocol or broker."},
 {"block":"DESKTOP-MOBILE-AND-LOCAL-IPC.md#Core discipline","reason":"Web PWA only; no native shell or IPC."}]
def cb(f,cls): return [f"{f}#Core discipline"]+[f"{f}#{c}" for c in cls]+[f"{f}#Universal moves",f"{f}#Validation rules"]
W2=[
("h9","src/lib/export.ts#buildCsv and workbook builders (CSV/Excel export)","user-controlled names/notes to a file opened in Excel/Sheets","src/lib/export","Injection","DATA-ISOLATION-AND-LIFECYCLE.md",["Export and backup scope expansion"],"Export and backup scope expansion",["src/lib/export.ts","src/components/settings/ExportUpload.tsx","src/lib/excelImport.ts"]),
("h9","src/sync/apiDb.ts and outbox.ts (client sync engine)","persisted outbox/mirror vs server session identity and data epoch","src/sync","Business logic","DATA-ISOLATION-AND-LIFECYCLE.md",["Stale authorization and derived copy use"],"Stale authorization and derived copy use",["src/sync/apiDb.ts","src/sync/outbox.ts","src/sync/pull.ts","src/sync/plan.ts","src/sync/merge.ts","src/sync/documents.ts","src/sync/legacy.ts","src/sync/mirrorStore.ts","src/sync/transport.ts"]),
("h10","server/app.ts#authenticated write endpoints per-user quota","per-user storage and row growth vs jsonb size and rate limits","server/commands","Business logic","RESOURCE-EXHAUSTION-AND-AVAILABILITY.md",["Quota-accounting scope and reset gaps"],"Quota-accounting scope and reset gaps",["server/app.ts","server/commands/logSession.ts","server/commands/documents.ts","server/commands/importLegacy.ts","server/commands/support.ts","server/rateLimit.ts","db/migrations/20261007000001_core_tables.sql","db/migrations/20261007000005_programs_config.sql","db/migrations/20261007000006_library_items.sql","db/migrations/20261007000007_list_items.sql"]),
]
ALLF=["WEB-PROTOCOL-AND-AUTH.md","CLIENT-SIDE.md","DATA-ISOLATION-AND-LIFECYCLE.md","SUPPLY-CHAIN-AND-RELEASE.md","CLOUD-AND-DEPLOYMENT.md","RESOURCE-EXHAUSTION-AND-AVAILABILITY.md"]
for h,s,b,sub,o,f,cls,ac,paths in W2:
    sel=cb(f,cls)
    exc=EXC+[{"block":f"{x}#Core discipline","reason":"Not the source-visible boundary for this unit; covered by another unit."} for x in ALLF if x!=f]
    a=f"{f}#{ac}"
    cid="::".join(enc(x) for x in (s,b,sub,a))
    L.append({"coverage_id":cid,"canonical_refs":{"surface":s,"boundary":b,"subsystem":sub,"attack_class":a},"surface":s,"boundary":b,"subsystem":sub,"attack_class":ac,"starting_paths":paths,"ordinary_attack_class_block":"ATTACK-CLASSES.md#"+o,"selected_companion_blocks":sel,"excluded_blocks":exc,"prior_status":"none","attempts":[],"wave":3,"status":"planned","agent_id":None,"reviewed_paths":[],"local_checks":[],"result_fingerprints":[],"unresolved":[],"hunter_group":h})
L.sort(key=lambda u:u["coverage_id"])
# assign wave2 owners
n={"h9":"hunt-client3-w3","h10":"hunt-quota-w3"}
for u in L:
    if u["wave"]==3: u["status"]="in_progress"; u["agent_id"]=n[u["hunter_group"]]
json.dump(L,open("coverage-ledger.json","w"),indent=1)
print(len(L))
