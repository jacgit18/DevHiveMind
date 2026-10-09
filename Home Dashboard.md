---
cssclasses:
  - dashboard
banner: "![[Hive Banner.gif]]"
banner_y: 0.494
banner_x: 0.5
dg-home: true
dg-publish: true
---
<div class="title" style="color:#FFC300; text-shadow: 0 0 10px rgba(255, 195, 0, 0.8);">Hive Mind Dashboard</div>

> [!quote] Remember
> **Even if we only did what we were capable of, we'd astound ourselves.** Start with small, incremental steps, build a consistent rhythm, sustain it, then adapt your tempo to the task at hand.

## Jump To
[[Architecture Dashboard|🏛️ Architecture]] · [[Goal Dashboard|🎯 Goals]] · [[_Tech Clipboard|📋 Tech Clipboard]] · [[README|📖 README]]

⌨️ `Ctrl+O` switcher (recent files first) · `Ctrl+Shift+F` search · `Ctrl+G` graph

## Start Here
```dataviewjs
const favs = dv.pages("#favorite").sort((p) => p.file.name, "asc").limit(10);
if (favs.length) dv.list(favs.file.link);
else dv.paragraph("Nothing pinned yet. Add `#favorite` to a note and it shows up here.");
```

## Knowledge Map
```dataviewjs
const skip = (k) => !k || k.startsWith("_") || k.startsWith("00") || k.startsWith(".");
const latest = (rows) =>
  dv.luxon.DateTime.fromMillis(Math.max(...rows.map((p) => p.file.mtime.toMillis()))).toFormat("yyyy-MM-dd");

const pages = dv.pages().where((p) => !p.file.name.endsWith(" Hub"));
const groups = pages
  .groupBy((p) => p.file.folder.split("/")[0])
  .filter((g) => !skip(g.key))
  .sort((g) => g.key, "asc");

dv.table(
  ["Section (opens hub)", "Notes", "Last Edited"],
  groups.map((g) => [
    dv.fileLink(`${g.key}/${g.key} Hub.md`, false, g.key),
    g.rows.length,
    latest(g.rows),
  ])
);
```

> [!note]- Subfolders
> ```dataviewjs
> const pages = dv.pages().where((p) => !p.file.name.endsWith(" Hub"));
> const sections = pages
>   .groupBy((p) => p.file.folder.split("/")[0])
>   .filter((g) => g.key && !/^(_|00|\.)/.test(g.key))
>   .sort((g) => g.key, "asc");
> const rows = [];
> for (const s of sections) {
>   const subs = s.rows
>     .groupBy((p) => p.file.folder.split("/")[1] ?? "(top level)")
>     .filter((g) => !g.key.startsWith("_"))
>     .sort((g) => g.key, "asc");
>   subs.forEach((g, i) => {
>     const newest = Math.max(...g.rows.map((p) => p.file.mtime.toMillis()));
>     rows.push([
>       i === 0 ? `**${s.key}**` : "",
>       g.key,
>       g.rows.length,
>       dv.luxon.DateTime.fromMillis(newest).toFormat("yyyy-MM-dd"),
>     ]);
>   });
> }
> dv.table(["Section", "Subfolder", "Notes", "Last Edited"], rows);
> ```

## Browse by Tag
```dataviewjs
const hex = /^#[0-9a-f]{6,8}$/i;
const counts = new Map();
for (const t of dv.pages().file.etags) {
  if (!hex.test(t)) counts.set(t, (counts.get(t) ?? 0) + 1);
}
const top = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 15);
dv.table(["Tag", "Notes"], top);
```

> [!note]- High-priority todos
> ```dataview
> TASK
> FROM ""
> WHERE !completed AND contains(text, "#todo/High") AND file.path != this.file.path
> LIMIT 10
> ```

> [!note]- Recent Activity
> **Recently updated**
> ```dataview
> TABLE WITHOUT ID file.link AS Note, file.folder AS Section, dateformat(file.mtime, "yyyy-MM-dd") AS Edited
> FROM ""
> WHERE file.name != this.file.name AND !contains(file.folder, "AI Generated Content") AND !endswith(file.name, " Hub")
> SORT file.mtime DESC
> LIMIT 10
> ```
>
> **Recently created**
> ```dataview
> TABLE WITHOUT ID file.link AS Note, file.folder AS Section, dateformat(file.ctime, "yyyy-MM-dd") AS Created
> FROM ""
> WHERE file.name != this.file.name AND !contains(file.folder, "AI Generated Content") AND !endswith(file.name, " Hub")
> SORT file.ctime DESC
> LIMIT 10
> ```

> [!note]- Vault Health
> **Stale (untouched 6+ months)**
> ```dataview
> TABLE WITHOUT ID file.link AS Note, file.folder AS Section, dateformat(file.mtime, "yyyy-MM-dd") AS Edited
> FROM ""
> WHERE file.mtime < date(today) - dur(180 days)
>   AND !startswith(file.path, "00") AND !startswith(file.path, "_") AND !contains(file.path, "/_")
>   AND !contains(file.folder, "AI Generated Content") AND !contains(file.folder, "Archive")
> SORT file.mtime ASC
> LIMIT 10
> ```
>
> **Stubs (under 200 bytes)**
> ```dataview
> LIST
> FROM ""
> WHERE file.size < 200
>   AND !startswith(file.path, "00") AND !startswith(file.path, "_") AND !contains(file.path, "/_")
>   AND !contains(file.folder, "AI Generated Content") AND !contains(file.folder, "Archive")
> SORT file.size ASC
> LIMIT 10
> ```
>
> **Unlinked notes** are listed at the bottom of each section hub.

## Dev TODO
- [ ] Make hub notes link out to related sections #todo/Low/Dev
- [ ] Add dashboards for `iron-log` and `software-carpentier` #todo/Low/Dev

> [!note]- Vault Info
> - 〽️ Notes: `$=dv.pages().length`
> - 🗂️ Sections: `$=new Set(dv.pages().file.folder.map(f => f.split("/")[0])).size`

---
[Join the Hive](https://docs.google.com/forms/d/e/1FAIpQLSc-NvwAUS2e3dndizHwgbqrldnfTFBD74E_zAIPJtd7fZyQjg/viewform) to access the full vault.
