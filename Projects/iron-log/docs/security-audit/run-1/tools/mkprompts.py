import json,re,os
SK="/home/jac/.claude/skills/security-audit/"
OUT="/home/jac/security-audit-skill/iron-log/run-1/"
units=json.load(open(OUT+"coverage-ledger.json"))
arch=open(OUT+"architecture.md").read()
hunt=open(SK+"HUNTING.md").read()
def fence_after(text,marker):
    i=text.index(marker); j=text.index("```text",i)+7; k=text.index("```",j); return text[j:k].strip()
method=fence_after(hunt,"#### Core hunting method")
promo=fence_after(hunt,"#### Promotion procedure")
rules=fence_after(hunt,"#### Core validation rules")
contract=hunt[hunt.index("## Structured hunter result"):hunt.index("## Parent consolidation")]
schema=open(SK+"report-schema.json").read()
ac=open(SK+"ATTACK-CLASSES.md").read()
def ordinary(name):
    m=re.search(r"^\*\*"+re.escape(name)+r"\*\*.*?(?=^\*\*[A-Z]|\Z)",ac,re.S|re.M); return m.group(0).strip()
def section(f,head):
    t=open(SK+f).read()
    m=re.search(r"^#{2,4} "+re.escape(head)+r"[^\n]*\n.*?(?=^#{2,4} |\Z)",t,re.S|re.M)
    if m: return m.group(0).strip()
    m=re.search(r"^\*\*"+re.escape(head)+r"\*\*.*?(?=^\*\*|^#{2,4} |\Z)",t,re.S|re.M)
    return m.group(0).strip()
names={"h20":"hunt-pull8-w8"}
for h,aid in names.items():
    us=[u for u in units if u["hunter_group"]==h and u["wave"]==8]
    for u in us: pass
    p=[]
    p.append(f"""# Hunter assignment ({aid})
Your goal is to find source-grounded security invariant failures in your assigned coverage units. You must return exactly one JSON object (no surrounding prose) matching the structured-result contract at the end of this file.

Your agent id is `{aid}`. Target (read-only): /home/jac/Videos/iron-log. Your scratch dir: /home/jac/security-audit-skill/iron-log/run-1/agents/{aid}/scratch/ (create it if absent; write ONLY here). Never write to artifacts/, the target, or any shared run file.
To run any target code you MUST use the sandbox wrapper, never plain Bash execution of target code:
  /home/jac/security-audit-skill/iron-log/run-1/tools/sbx.sh {aid} /usr/bin/node <args>   (cwd=/work is a scratch copy of git-tracked source; node_modules read-only; no network; empty env; writes only to /work and /out; 180s limit)
e.g. `sbx.sh {aid} /work/node_modules/.bin/vitest run server/originGuard.test.ts`. Tests needing Docker/Postgres cannot run; do not try. Never read or use /home/jac/Videos/iron-log/.env or any credential. Do not run npm install/ci, git push, gh, docker, gcloud.
Local-check artifacts: write result files only to /out/check-1.txt .. /out/check-8.txt inside the sandbox (== scratch/out/check-N.txt). That is the predeclared promotion allowlist (1 MiB each, 4 MiB total). The parent will promote them; in your JSON, set artifact to `agents/{aid}/artifacts/out/check-N.txt` for method=local checks, `null` for source checks.

""")
    p.append("## architecture.md (verbatim)\n"+arch+"\n")
    p.append("## Assigned coverage units\n")
    for u in us:
        p.append("```json\n"+json.dumps({k:u[k] for k in ("coverage_id","surface","boundary","subsystem","attack_class","starting_paths","ordinary_attack_class_block","selected_companion_blocks","excluded_blocks")},indent=1)+"\n```\n")
    p.append("## Selected blocks (verbatim)\n")
    seen=set()
    for u in us:
        o=u["ordinary_attack_class_block"].split("#")[1]
        if o not in seen:
            seen.add(o); p.append(ordinary(o)+"\n")
        for b in u["selected_companion_blocks"]:
            if b in seen: continue
            seen.add(b); f,hd=b.split("#")
            p.append(f"[{b}]\n"+section(f,hd)+"\n")
    p.append("## Excluded blocks\nSee each unit's excluded_blocks above (with reasons). Out-of-boundary discoveries go under `uncovered`.\n")
    p.append("## Core hunting method\n```text\n"+method+"\n```\n")
    p.append("## Promotion procedure\n```text\n"+promo+"\n```\n")
    p.append("## Core validation rules\n```text\n"+rules+"\n```\n")
    p.append("## Carried prior confirmations / peer-owned units\nNo prior runs; no carried exclusions. Peer-owned units (do not duplicate): "+", ".join(x["coverage_id"] for x in units if x["hunter_group"]!=h)+"\n")
    p.append("## Structured-result contract\n"+contract+"\n\n## report-schema.json (copy the confirmed and needs_validation branches; candidates use proposed_verdict in place of verdict)\n```json\n"+schema+"\n```\n")
    p.append("""
## Additional rules from the parent
- Every assigned coverage_id must appear exactly once in `units`.
- A `covered` unit needs real reviewed_paths and checks (what invariant you checked and the result), not a generic statement.
- Be honest: a clean unit is a fine result. Do not pad candidates. Severity only on confirmed; a confirmed needs a bounded local observed result from the sandbox. If local execution is impossible (e.g. needs Postgres), use needs_validation with the exact blocker.
- Use per-unit `unit.checks[].agent_id` = `""" + aid + """`.
- Keep your final message to the single JSON object.
""")
    open(OUT+f"agents/{aid}-prompt.md","w").write("\n".join(p))
    os.makedirs(OUT+f"agents/{aid}/scratch/out",exist_ok=True); os.makedirs(OUT+f"agents/{aid}/artifacts",exist_ok=True)
    print(aid,len(us),os.path.getsize(OUT+f"agents/{aid}-prompt.md"))
