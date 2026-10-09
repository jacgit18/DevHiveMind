# Finance Dashboard: priority read
_Last reviewed 2026-10-09. 35 files. Ranked from each doc's opening lines._

## Read first
1. [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/spec|spec]]: the build spec every drift check diffs against.
2. [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/architecture/scope/finance-dashboard|scope]]: what v1 is and is not.
3. [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/backlog|backlog]]: stories S1 onward with acceptance criteria.
4. [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/phase9-spec|phase 9 spec]]: the next build (Plaid sandbox); build has not started. Lives here, the repo copy is frozen.
5. [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/deploy|deploy]]: how the app is reached (Cloudflare tunnel, own machine).

## Read when you touch...
- **A technology choice:** ADRs `0002` to `0023` in `architecture/decisions/`; [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/architecture/stack-walkthrough|stack walkthrough]] has the reasoning. Start with 0005 (money representation) and 0010 (auth).
- **CI/CD or release:** [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/phase8-spec|phase 8 spec]], ADRs 0016, 0019 to 0023.
- **Tests:** [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/testing/running-tests|running tests]], then [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/testing/finance-dashboard|test plan]].
- **The dashboard view:** [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/phase7-spec|phase 7 spec]] and [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/phase7-verification|verification record]].
- **Adding a paid service:** [[EndToEnd-App-with-AI-Using-skills/finance-dashboard/docs/paid-options|paid options]] (prices unverified).

## Reference and history
- `architecture/decisions/_archived/0001-stack-and-money-representation.md`: superseded.
- Phase 7 and 8 specs once shipped.

## Where truth lives
ADRs win over the walkthrough; the spec wins over the backlog on scope. The vault copy of these docs is live; the project repo copy is frozen.
