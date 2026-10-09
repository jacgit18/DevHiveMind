import json
from urllib.parse import quote
enc=lambda s: quote(s, safe='-._~')
EXC=[
 {"block":"MEMORY-SAFETY-AND-BINARY.md#Core discipline","reason":"No native/unsafe code or binary parsers in repo (TypeScript only)."},
 {"block":"AI-AND-LLM.md#Core discipline","reason":"No model, agent, or MCP server in the product; window.claude host handles are a trusted host surface."},
 {"block":"PROTOCOLS-RPC-AND-MESSAGING.md#Core discipline","reason":"Transport is plain JSON over HTTP; no custom protocol, broker, or webhook."},
 {"block":"DESKTOP-MOBILE-AND-LOCAL-IPC.md#Core discipline","reason":"No native shell, deep links, or local IPC; web PWA only."},
]
def comp(f, cls):
    return [f"{f}#Core discipline", f"{f}#{cls}", f"{f}#Universal moves", f"{f}#Validation rules"]
W,C,D,S,CL,R="WEB-PROTOCOL-AND-AUTH.md","CLIENT-SIDE.md","DATA-ISOLATION-AND-LIFECYCLE.md","SUPPLY-CHAIN-AND-RELEASE.md","CLOUD-AND-DEPLOYMENT.md","RESOURCE-EXHAUSTION-AND-AVAILABILITY.md"
ALL=[W,C,D,S,CL,R]
# (hunter, surface, boundary, subsystem, ordinary, companion file, class, paths)
U=[
("h1","server/app.ts#/api/auth/*","server/auth/betterAuth.ts#createAuth","server/auth","Access control",W,"OAuth/OIDC request and callback binding",["server/auth/betterAuth.ts","server/app.ts","src/sync/useGoogleSignIn.ts","src/sync/account.ts"]),
("h1","server/app.ts#POST /api/*","server/originGuard.ts#originGuard","server/originGuard","Access control",W,"Ordinary CSRF",["server/originGuard.ts","server/app.ts","server/clientVersion.ts"]),
("h1","server/app.ts#sessionAuth","server/auth.ts#sessionAuth","server/auth","Access control",W,"Session fixation and invalidation",["server/auth.ts","server/index.ts","server/dev/authCheckPage.ts","src/sync/devUser.ts"]),
("h1","server/app.ts#static and SPA fallback","server/securityHeaders.ts#securityHeaders","server/static","Resource and file handling",W,"Host and forwarded-header trust",["server/securityHeaders.ts","server/app.ts","server/index.ts"]),
("h2","server/db/connection.ts#inUserTransaction","db/migrations/20261008000002_row_level_security.sql#own_rows","server/db","Access control",D,"Policy and query disagreement",["server/db/role.ts","server/db/connection.ts","db/migrations","server/auth.ts"]),
("h2","server/app.ts#POST /api/commands/*","src/shared/validate.ts#validators","server/commands","Injection",D,"Missing tenant or owner enforcement",["server/commands","src/shared","server/app.ts"]),
("h2","server/commands/importLegacy.ts#import-legacy","server/commands/sync.ts#sync","server/commands","Business logic",D,"Import and restore authority expansion",["server/commands/importLegacy.ts","server/commands/sync.ts","server/commands/support.ts"]),
("h2","server/commands/account.ts#erase-data and delete","db/migrations/20261008000003_erase_and_delete_account.sql#delete_my_account","server/commands","Feature abuse and data leakage",D,"Soft-delete and tombstone bypass",["server/commands/account.ts","db/migrations","server/commands/support.ts"]),
("h3","server/app.ts#unauthenticated endpoints","server/rateLimit.ts#rateLimit","server/rateLimit","Business logic",R,"Pre-authentication work imbalance",["server/rateLimit.ts","server/clientErrors.ts","server/app.ts"]),
("h3","scripts/deploy-cloud-run.sh#deploy","server/db/role.ts#checkDbRole","deploy","Cryptography and secrets",CL,"Security-control precedence drift",["scripts/deploy-cloud-run.sh","server/index.ts","server/db/role.ts","Dockerfile",".env.example"]),
("h3","scripts/ci-deploy-setup.sh#workload identity","cloudbuild.yaml#build","deploy","Access control",CL,"Workload identity overreach",["scripts/ci-deploy-setup.sh","scripts/ci-deploy.sh","cloudbuild.yaml","backup/run.sh"]),
("h4","src/store/settingsSlice.ts#readImportFile","src/lib/export.ts#parseDataFile","src/lib","Resource and file handling",C,"Prototype pollution and gadget chain",["src/store/settingsSlice.ts","src/lib/excelImport.ts","src/lib/export.ts","src/shared/config.ts"]),
("h4","src/components/board/Card.tsx#ex.url href","src/shared/stretchWeek.ts#goodUrl","src/components","Injection",C,"DOM-based XSS",["src/components","src/shared/stretchWeek.ts","src/shared/listItems.ts","src/store/useAppStore.ts"]),
("h4","src/lib/storage.ts#localStorage and github token","src/lib/github.ts#github","src/lib","Cryptography and secrets",C,"Browser-storage disclosure and stale authorization",["src/lib/storage.ts","src/lib/github.ts","src/store/useAppStore.ts","src/sync","vite.config.js"]),
("h5",".github/workflows/screenshots.yml#pull_request","github-actions#workflow-permissions","ci","Access control",S,"Untrusted code in a privileged workflow",[".github/workflows"]),
("h5","package.json#dependencies and Dockerfile","package-lock.json#integrity","build","Cryptography and secrets",S,"Mutable and unbound build inputs",["package.json","package-lock.json","Dockerfile",".dockerignore","scripts/build-server.mjs"]),
]
units=[]
for h,s,b,sub,ordn,cf,cls,paths in U:
    sel=comp(cf,cls)
    exc=[e for e in EXC]+[{"block":f"{o}#Core discipline","reason":"Not the source-visible boundary for this unit; covered by another unit."} for o in ALL if o!=cf]
    cid="::".join(enc(x) for x in (s,b,sub,"ATTACK-CLASSES.md#"+ordn+"|"+cf+"#"+cls))
    # attack_class single ref: use companion class block
    ac=f"{cf}#{cls}"
    cid="::".join(enc(x) for x in (s,b,sub,ac))
    units.append({"coverage_id":cid,"canonical_refs":{"surface":s,"boundary":b,"subsystem":sub,"attack_class":ac},
     "surface":s,"boundary":b,"subsystem":sub,"attack_class":cls,"starting_paths":paths,
     "ordinary_attack_class_block":"ATTACK-CLASSES.md#"+ordn,"selected_companion_blocks":sel,"excluded_blocks":exc,
     "prior_status":"none","attempts":[],"wave":1,"status":"planned","agent_id":None,"reviewed_paths":[],"local_checks":[],
     "result_fingerprints":[],"unresolved":[],"hunter_group":h})
units.sort(key=lambda u:u["coverage_id"])
json.dump(units,open("coverage-ledger.json","w"),indent=1)
print(len(units))
