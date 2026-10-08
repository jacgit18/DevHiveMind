# Exercise catalog: private custom exercises plus a global catalog (idea, not decided)

Status: idea saved 2026-10-08 to revisit. No ADR yet. Not started.

Back to [[iron-log/docs/backlog|backlog]]. Related: [[004-auth-better-auth]], [[backend-data-rules]], [[feature-map]], [[010-hosting-cloud-run]].

## Question

Today custom exercises, Experiments and saved program versions are private to the user (rows carry `user_id`, row-level security `own_rows`, migrations 006 and 007). Built-in exercises ship in code (`EX` in `data.ts`). There is no shared catalog and no exercise API. The owner wants (a) a large catalog without paying for an API, and (b) users to keep adding their own exercises with a video link, especially modified or unnamed ones, possibly visible app-wide.

## Recommendation

Two layers. Do not let a user's addition go straight into everyone's library.

1. **Private custom exercises** (exists). Name, equipment, video link, notes in the user's own data. Covers modified exercises and needs no moderation.
2. **Global catalog table**, read-only to normal users, seeded from a free dataset and imported into our own table (no runtime API, so $0, no outage risk, works offline).
   - Candidates: free-exercise-db (open license, about 800 exercises), wger open API. **Licenses and limits not checked yet; confirm before choosing.**
3. **"Suggest for the catalog"** later: a user shares a private exercise into a pending queue, the owner approves it on the admin path from ADR 004, and approval copies it into the global table. The user's private copy stays theirs.
4. **Reference by id**: a program card points at a catalog id or a private id. A promoted private exercise maps to its global id so history does not break.

## Why not straight to global

- Spam and abuse with open signup. Video links are the worst part, since a stranger picks where every user's tap goes.
- Duplicates ("DB RDL", "Dumbbell Romanian Deadlift", "RDL (DB)").
- Moderation falls on one person.
- A global addition cannot be fully taken back once other users' programs and logs reference it.

## Dependencies and open points

- **Stable exercise ids first.** Ids are slugs of the name ([[feature-map]] conflict register), so a rename duplicates. A catalog needs stable ids (UUIDs). Biggest dependency.
- **Videos:** store only the link, label the platform (already done, #40). Do not host or embed unreviewed content.
- **Offline:** the catalog is cached on the phone and synced as read-only data, separate from per-user sync.
- **Row-level security:** the catalog is the first table without `user_id`. Needs its own policy (all read, only admin write) and a test, following the rule at the top of `20261008000002_row_level_security.sql`.
- Interacts with [[004-auth-better-auth]] (admin path, planned sharing grants) and [[backend-data-rules]].

## Suggested order

1. Stable exercise ids.
2. Import a free dataset as a read-only catalog.
3. Search and pick from the catalog next to private custom exercises.
4. Suggest-and-approve, only if users ask for it.

Steps 1 to 3 give most of the value with no moderation burden.

## Next step when revisiting

Write an ADR (run `design-scoping` or `database-architecture`), after checking the dataset licenses and listing what the id change touches.
