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
("h6","src/sync/useGoogleSignIn.ts#window.location.assign(out.url)","src/sync/account.ts#startGoogleSignIn response parsing","src/sync","Injection","CLIENT-SIDE.md",["Client-side navigation confusion"],"Client-side navigation confusion",["src/sync/useGoogleSignIn.ts","src/sync/account.ts","src/sync/devUser.ts","server/auth/betterAuth.ts"]),
("h7","server/auth/betterAuth.ts#/api/auth/sign-in/social limiter and auth.verification","better-auth rateLimit and verification storage vs server/rateLimit.ts","server/auth","Business logic","RESOURCE-EXHAUSTION-AND-AVAILABILITY.md",["Pre-authentication work imbalance"],"Pre-authentication work imbalance",["server/auth/betterAuth.ts","server/app.ts","server/rateLimit.ts","db/migrations/20261008000001_auth_schema.sql"]),
("h6","src/sync/rows.ts#fromServerRow and applyRows","server row to mirror to store to DOM","src/sync","Injection","CLIENT-SIDE.md",["DOM-based XSS"],"DOM-based XSS",["src/sync/rows.ts","src/sync/mirrorStore.ts","src/sync/apiDb.ts","src/sync/documents.ts","src/sync/merge.ts","src/sync/pull.ts","src/sync/plan.ts","src/sync/legacy.ts","src/sync/outbox.ts","src/sync/transport.ts","src/shared/stretchWeek.ts","src/shared/listItems.ts"]),
("h6","vite.config.js#VitePWA workbox and service worker update","service-worker cache vs signed-in identity and /api","pwa","Feature abuse and data leakage","CLIENT-SIDE.md",["Service-worker cache and identity confusion"],"Service-worker cache and identity confusion",["vite.config.js","src/main.jsx","src/App.jsx","public/privacy.html","public/terms.html","server/securityHeaders.ts","server/app.ts"]),
("h8","scripts/backup-cloud-run.sh#backup job and bucket","backup job identity, bucket IAM and owner DB URL secret","deploy/backup","Feature abuse and data leakage","DATA-ISOLATION-AND-LIFECYCLE.md",["Export and backup scope expansion","Backup and replication boundary drift"],"Export and backup scope expansion",["scripts/backup-cloud-run.sh","backup/run.sh","backup/Dockerfile","scripts/restore-check.sh","scripts/alerts-cloud-run.sh","scripts/ci-deploy-setup.sh"]),
("h7","db/migrations/20261007000001_core_tables.sql#record_row_history","SECURITY DEFINER trigger vs RLS and erase/delete","db/migrations","Feature abuse and data leakage","DATA-ISOLATION-AND-LIFECYCLE.md",["Stale authorization and derived copy use"],"Stale authorization and derived copy use",["db/migrations/20261007000001_core_tables.sql","db/migrations/20261008000002_row_level_security.sql","db/migrations/20261008000003_erase_and_delete_account.sql","server/commands/account.ts","server/commands/support.ts"]),
("h7","server/clientVersion.ts#clientVersionGate","426 gate ordering and deploy env drift","server/app","Business logic","CLOUD-AND-DEPLOYMENT.md",["Security-control precedence drift"],"Security-control precedence drift",["server/clientVersion.ts","server/app.ts","scripts/deploy-cloud-run.sh","src/sync/transport.ts","vite.config.js"]),
]
ALLF=["WEB-PROTOCOL-AND-AUTH.md","CLIENT-SIDE.md","DATA-ISOLATION-AND-LIFECYCLE.md","SUPPLY-CHAIN-AND-RELEASE.md","CLOUD-AND-DEPLOYMENT.md","RESOURCE-EXHAUSTION-AND-AVAILABILITY.md"]
for h,s,b,sub,o,f,cls,ac,paths in W2:
    sel=cb(f,cls)
    exc=EXC+[{"block":f"{x}#Core discipline","reason":"Not the source-visible boundary for this unit; covered by another unit."} for x in ALLF if x!=f]
    a=f"{f}#{ac}"
    cid="::".join(enc(x) for x in (s,b,sub,a))
    L.append({"coverage_id":cid,"canonical_refs":{"surface":s,"boundary":b,"subsystem":sub,"attack_class":a},"surface":s,"boundary":b,"subsystem":sub,"attack_class":ac,"starting_paths":paths,"ordinary_attack_class_block":"ATTACK-CLASSES.md#"+o,"selected_companion_blocks":sel,"excluded_blocks":exc,"prior_status":"none","attempts":[],"wave":2,"status":"planned","agent_id":None,"reviewed_paths":[],"local_checks":[],"result_fingerprints":[],"unresolved":[],"hunter_group":h})
L.sort(key=lambda u:u["coverage_id"])
# assign wave2 owners
n={"h6":"hunt-client2-w2","h7":"hunt-server2-w2","h8":"hunt-backup-w2"}
for u in L:
    if u["wave"]==2: u["status"]="in_progress"; u["agent_id"]=n[u["hunter_group"]]
json.dump(L,open("coverage-ledger.json","w"),indent=1)
print(len(L))
