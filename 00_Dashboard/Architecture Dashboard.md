---
cssclasses:
  - dashboard
banner: "![[Archetecture.jpg]]"
banner_y: 0.494
banner_x: 0.5
dg-publish: true
---
<div class="title" style="color:yellow">Architecture Dashboard</div>

← [[Home Dashboard]]

Cross-cutting view of architecture decisions and coverage. Per-folder views live in each section hub.

**Hubs:** [[02. System Design Hub|02 System Design]] · [[03. Application Structure Hub|03 Application Structure]] · [[04. Backing Service Options Hub|04 Backing Services]] · [[06. Networking & Delivery Hub|06 Networking]] · [[07. Operability & Production Hub|07 Operability]]

## Decisions
Notes in `02. System Design/Decisions`, newest edit first.

```dataviewjs
const d = dv.pages('"02. System Design/Decisions"').sort((p) => p.file.mtime, "desc");
dv.table(["Decision", "Edited"], d.map((p) => [p.file.link, p.file.mtime.toFormat("yyyy-MM-dd")]));
```

## Tagged decisions
Add `#CodebaseDecision` (a big structural choice) or `#MicroCodebaseDecision` (a small local one) to a note and it appears here.

```dataviewjs
const tagged = dv.pages("#CodebaseDecision or #MicroCodebaseDecision").sort((p) => p.file.mtime, "desc");
dv.table(["Note", "Kind", "Folder"], tagged.map((p) => [
  p.file.link,
  p.file.tags.includes("#MicroCodebaseDecision") ? "Micro" : "Codebase",
  p.file.folder,
]));
if (!tagged.length) dv.paragraph("No tagged decisions yet.");
```

## Architecture coverage
```dataviewjs
const sections = ["02. System Design", "03. Application Structure", "04. Backing Service Options", "06. Networking & Delivery", "07. Operability & Production"];
dv.table(["Section", "Notes", "Last edited"], sections.map((s) => {
  const pages = dv.pages(`"${s}"`).sort((p) => p.file.mtime, "desc");
  return [s, pages.length, pages.length ? pages[0].file.mtime.toFormat("yyyy-MM-dd") : "-"];
}));
```

## Gaps
Decision and architecture notes that nothing links to.

```dataviewjs
const pool = dv.pages('"02. System Design" or "03. Application Structure"')
  .where((p) => !p.file.name.endsWith("Hub") && p.file.inlinks.length === 0);
dv.paragraph(`**${pool.length}** unlinked notes in 02 and 03.`);
dv.list(pool.sort((p) => p.file.name, "asc").limit(15).file.link);
```
