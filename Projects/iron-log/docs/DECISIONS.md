# Iron Log: decisions
_Last reviewed 2026-10-10. Index of the decision records. Agents: read the ADR before changing anything it covers; do not re-open a decision without the user asking. New decision → new ADR in `architecture/decisions/` and a row here._

| ADR | Decision | Choice |
|---|---|---|
| [[001-backend-shape\|001]] | Backend shape | Own API in Docker |
| [[002-datastore-neon-postgres\|002]] | Datastore | Neon Postgres |
| [[003-sync-versioned-rows\|003]] | Sync | Versioned rows, tombstones, command per action |
| [[004-auth-better-auth\|004]] | Auth | Better Auth, Google first, RLS backstop |
| [[005-language-typescript-node\|005]] | Language | TypeScript strict on Node |
| [[006-weight-unit-canonical-lb\|006]] | Weight unit | Canonical pounds |
| [[007-web-framework-express\|007]] | Web framework | Express 5, thin routes |
| [[008-api-style-commands-json-http\|008]] | API style | Command endpoints, JSON over HTTP |
| [[009-data-access-kysely\|009]] | Data access | Kysely |
| [[010-hosting-cloud-run\|010]] | Hosting | Google Cloud Run, one origin |
| [[011-date-and-week-policy\|011]] | Dates and weeks | Local dates, Sunday start |
| [[012-migrations-dbmate\|012]] | Migrations | dbmate, plain SQL |
| [[013-error-reporting-cloud-logging\|013]] | Error reporting | Cloud Logging + client-error endpoint |
| [[014-backend-test-tooling\|014]] | Backend tests | Vitest + real Postgres container |
| [[015-shared-code-layout\|015]] | Code layout | One package, `src/shared/` + `server/` |
| [[016-new-account-starting-state\|016]] | New accounts | Start blank, no owner defaults |
| [[017-release-and-deployment-strategy\|017]] | Releases | Staging, no-traffic candidate, smoke, promote, approval |
| [[018-auto-apply-updates-when-idle\|018]] | App updates | Apply a waiting update by itself when idle; banner as fallback |
| [[019-grocery-list-device-only\|019]] | Grocery list | Admin-only, device-only first; month derived from the catalogue |

Not ADRs: TypeScript-only for new code ([[typescript-migration|migration notes]]); GitHub Pages deploy retired 2026-10-09 (no users).
All 16 backend decisions with alternatives: [[Projects/iron-log/docs/architecture/stack-walkthrough|stack walkthrough]].
