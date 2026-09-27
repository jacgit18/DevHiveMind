---
tags:
  - distributedSystem
author:
  - jacgit18
Comments: Placeholder comment - anything else you want to note about this design.
Purpose: System design interview walkthrough template with a corrected capacity-estimation calculator. Whiteboard lives in a separate linked file — see bottom of this note.
Status: Draft
Started:
EditDate:
Relates:
dg-publish:
AU: "200,000,000"
ReadWriteRatio: 50
Replication: 3
CachePercent: 20
CPUCores: 8
SecPerRequest: 0.5
Features: "Comment create:POST:200:50, Like create:POST:90:100, Profile update:PUT:500:2"
Version: "3.1"
---
Design statement placeholder — one sentence on what the system does and for whom.

## Requirements Gathering (5–10 min)

### Userbase
-

#### Functional Requirements
##### Required
-

##### Optional
-

#### Non-Functional Requirements
- Architecture, performance, traffic, logging, monitoring, etc.
- Brief identification here; go deeper later in the interview.

---

### Logical Data Model (10–15 min)

Think fact and dimension tables — star schema for small/simple, snowflake for large/complex.

##### Entity Definition Table 1

|     | User     | Type         |
| --- | -------- | ------------ |
| PK  | UserID   | INT          |
|     | UserName | Varchar(255) |
|     | PhoneNum | Varchar(255) |

##### Entity Definition Table 2

|     | Region     | Type         |
| --- | ---------- | ------------ |
| PK  | RegionID   | INT          |
| FK  | UserID     | INT          |
|     | RegionName | Varchar(255) |

##### Rough Schema Record Table
**Sandbox for validating the schema with real inserts/selects before committing to it.**

```sql
BEGIN;

-- Insert into the User table and get the generated UserID
INSERT INTO User (UserName, PhoneNum)
VALUES ('John Doe', '123-456-7890')
RETURNING UserID INTO @UserID;

-- Insert into the Region table using the generated UserID
INSERT INTO Region (UserID, RegionName)
VALUES (@UserID, 'North America');

-- Retrieve the inserted data using a join
SELECT Region.RegionID, Region.RegionName, User.UserName, User.PhoneNum
FROM Region
JOIN User ON Region.UserID = User.UserID;

COMMIT;

EXCEPTION
	WHEN OTHERS THEN
		ROLLBACK;
		RAISE;
END;
```

| RegionID | RegionName    | UserName | PhoneNum     |
| -------- | ------------- | -------- | ------------ |
| 1        | North America | John Doe | 123-456-7890 |
|          |               |          |              |

---

### Capacity Estimation (5–10 min)

**Quick mental-math reference (rough, for use live in an interview):**

| Interval | Seconds     | Rounded (for fast mental math) |
| -------- | ----------- | ------------------------------- |
| Hourly   | 3,600       | ~4,000                          |
| Daily    | 86,400      | ~80,000                         |
| Monthly  | 2,592,000   | ~2,400,000                      |

> These roundings are approximations only — good for a whiteboard sanity check, not for the numbers below. The calculator block uses exact seconds (86,400/day, 30-day month) and base-1024 byte units throughout, so it won't drift the way hand-rounded math does at TB/PB scale.

> Edit the frontmatter fields above (`AU`, `ReadWriteRatio`, `Replication`, `CachePercent`, `CPUCores`, `SecPerRequest`, `Features`) — the block below recalculates from them. `Features` format: `name:type:bytes:freq_per_user_per_month`, comma-separated.

**Diagnostic** — if this doesn't show a file path, Dataview isn't resolving this file at all (excluded folder, stale index, or Dataview not enabled), and the calculator below can't work until that's fixed first.

```dataviewjs
dv.paragraph(dv.current() ? "✅ resolved: " + dv.current().file.path : "❌ still null — dv.current() is not resolving this file");
```

```dataviewjs
function formatBytes(bytes) {
    if (!isFinite(bytes) || bytes === 0) return '0 B';
    const units = ['B','KB','MB','GB','TB','PB','EB'];
    let i = 0, b = Math.abs(bytes);
    while (b >= 1024 && i < units.length - 1) { b /= 1024; i++; }
    return (bytes < 0 ? '-' : '') + b.toFixed(2) + ' ' + units[i];
}
function formatNum(n) {
    if (!isFinite(n)) return '—';
    return Math.round(n).toLocaleString();
}
function parseNum(str) {
    const n = parseFloat(String(str).replace(/,/g, ''));
    return isFinite(n) ? n : 0;
}

const page = dv.current();

if (!page) {
    dv.paragraph("⚠️ **No frontmatter found for this file.** Dataview returned no page object — check that this file isn't inside a Dataview-excluded folder (Settings → Dataview → Excluded folders), then reload the note or run **Dataview: Force refresh all views**.");
} else {

const {
    AU: AUStr, ReadWriteRatio, Replication, CachePercent,
    CPUCores, SecPerRequest, Features: FeaturesStr
} = page;

const AU = parseNum(AUStr);
const ratio = ReadWriteRatio;
const replFactor = Replication;
const cacheFrac = CachePercent / 100;
const cpuCores = CPUCores;
const secPerReq = SecPerRequest;

const DAY_SEC = 86400;
const MONTH_DAYS = 30;

// Parse Features: "name:type:bytes:freq, name:type:bytes:freq, ..."
const features = FeaturesStr.split(',').map(f => {
    const [name, type, size, freq] = f.trim().split(':');
    return { name, type, size: parseNum(size), freq: parseNum(freq) };
});

// --- Storage ---
const bytesPerUserPerMonth = features.reduce((sum, f) => sum + (f.size * f.freq), 0);
const reqPerUserPerMonth   = features.reduce((sum, f) => sum + f.freq, 0);

const storageMonth = bytesPerUserPerMonth * AU;
const storageDay   = storageMonth / MONTH_DAYS;
const storageSec    = storageDay / DAY_SEC;

const writeReqPerSec = (reqPerUserPerMonth * AU) / MONTH_DAYS / DAY_SEC;

const yearStorage = storageMonth * 12;
const fiveYear     = yearStorage * 5;
const fiveYearRepl = fiveYear * replFactor;

// --- Network Traffic ---
const readReqPerSec   = writeReqPerSec * ratio;
const readBytesPerSec = storageSec * ratio;
const readBytesPerDay = readBytesPerSec * DAY_SEC;
const overallBytesPerSec = readBytesPerSec + storageSec; // sum, not product

// --- Cache ---
const cacheWorkingSet     = readBytesPerDay * cacheFrac;
const cacheWorkingSetRepl = cacheWorkingSet * replFactor;

// --- Bandwidth ---
const bwIn  = storageSec;
const bwOut = readBytesPerSec;

// --- App Servers ---
const reqPerServer  = cpuCores / secPerReq;
const totalReqPerSec = readReqPerSec + writeReqPerSec;
const serversNeeded  = Math.ceil(totalReqPerSec / reqPerServer);

dv.paragraph(`***As a user, we want to:***`);
features.forEach(f => {
    dv.paragraph(`- **${f.type}** *${f.name}* — ${formatBytes(f.size)}/request, ${f.freq} times/user/month`);
});
dv.paragraph("<br>");

dv.paragraph(`#### 1. Storage`);
dv.paragraph(`Total write payload: **${formatBytes(bytesPerUserPerMonth)}** per user / month`);
dv.paragraph(`Writes/month: **${formatBytes(storageMonth)}** &nbsp;·&nbsp; Writes/day: **${formatBytes(storageDay)}** &nbsp;·&nbsp; Writes/sec: **${formatBytes(storageSec)}/s**`);
dv.paragraph(`Write requests/sec: **${formatNum(writeReqPerSec)} req/s**`);
dv.paragraph("<br>");
dv.paragraph(`1 year (raw): **${formatBytes(yearStorage)}**`);
dv.paragraph(`5 years (raw): **${formatBytes(fiveYear)}**`);
dv.paragraph(`5 years × replication (${replFactor}x): **${formatBytes(fiveYearRepl)}**`);
dv.paragraph("<br>");

dv.paragraph(`#### 2. Network Traffic`);
dv.paragraph(`Read:Write ratio = **${ratio}:1** (read-heavy)`);
dv.paragraph(`Reads/sec: **${formatNum(readReqPerSec)} req/s** (**${formatBytes(readBytesPerSec)}/s**)`);
dv.paragraph(`Reads/day: **${formatBytes(readBytesPerDay)}**`);
dv.paragraph(`Overall traffic/sec (reads + writes): **${formatBytes(overallBytesPerSec)}/s**`);
dv.paragraph("<br>");

dv.paragraph(`#### 3. Memory Cache`);
dv.paragraph(`Working set (${CachePercent}% of daily reads): **${formatBytes(cacheWorkingSet)}**`);
dv.paragraph(`Working set × replication: **${formatBytes(cacheWorkingSetRepl)}**`);
dv.paragraph("<br>");

dv.paragraph(`#### 4. Bandwidth`);
dv.paragraph(`Inbound (writes)/sec: **${formatBytes(bwIn)}/s**`);
dv.paragraph(`Outbound (reads)/sec: **${formatBytes(bwOut)}/s**`);
dv.paragraph("<br>");

dv.paragraph(`#### 5. App Servers`);
dv.paragraph(`**${cpuCores}** cores/server, **${secPerReq}s**/request → **${formatNum(reqPerServer)}** req/s per server`);
dv.paragraph(`Servers needed (reads + writes ÷ per-server capacity): **${formatNum(serversNeeded)}**`);

}
```

---

## Design Deep Dive (15–25 min)


## Wrap Up (3–5 min)


---

## Whiteboard

Draw the architecture in the linked file below (opens as its own Excalidraw canvas — kept separate from this note so Dataview and Excalidraw don't contend over the same frontmatter).

![[System_Design_Whiteboard.excalidraw]]

> If the embed above doesn't render inline in your theme, use the plain link instead: [[System_Design_Whiteboard.excalidraw]]

