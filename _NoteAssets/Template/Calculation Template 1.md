---
AFRS_one: 300
AFRS_two: 500
AFRS_three: 0
AUS: 20000
DAU: 1000
CPU_Cores: 8
Reads: 50
Replication: 3
ReadFeatOne: stuff
Writes: 1
WriteFeatOne: Comment
WriteFeatTwo: Like
---


```dataviewjs
// Helper function to convert bytes to a human-readable format
function formatBytes(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}

// Average Feature Request Size by Bytes
const { AFRS_one, WriteFeatOne: FeatOneName, AFRS_two, WriteFeatTwo: FeatTwoName, AFRS_three, ReadFeatOne: FeatThreeName, Reads: ReadRatio, Writes: WriteRatio, CPU_Cores, AUS, DAU, Replication } = dv.current();
const requestPerServer = CPU_Cores / 0.5;

// Average Feature Total Request Size Per User
const AFTRS = AFRS_one + AFRS_two;

// Monthly Estimation
const monthlyEstimation = 30 * AFTRS * AUS;

// Daily Estimates
const writesPerDay = monthlyEstimation / AUS;
const writesPerSec = 86400 / writesPerDay;
const writesPerUser = AUS / AFTRS;

// Long Term Estimates
const dataReplication = monthlyEstimation * Replication;
const yearStorage = 1 * 400 * dataReplication;
const fiveYearStorage = yearStorage * 5;

// Network Traffic
const readsPerMonth = ReadRatio * monthlyEstimation;
const readsPerDay = ReadRatio * writesPerDay;
const readsPerSec = ReadRatio * writesPerSec;
const overallMonthlyTraffic = DAU * readsPerSec * DAU * writesPerSec * 30;
const overallTraffic = DAU * readsPerSec * DAU * writesPerSec;

// Memory Cache
const cacheMemory = readsPerDay * AFTRS * 0.2;
const totalMemory = cacheMemory * Replication;

// Convert bytes to higher units for readability
const monthlyEstimationReadable = formatBytes(monthlyEstimation);
const writesPerDayReadable = formatBytes(writesPerDay);
const dataReplicationReadable = formatBytes(dataReplication);
const yearStorageReadable = formatBytes(yearStorage);
const fiveYearStorageReadable = formatBytes(fiveYearStorage);
const readsPerMonthReadable = formatBytes(readsPerMonth);
const readsPerDayReadable = formatBytes(readsPerDay);
const overallMonthlyTrafficReadable = formatBytes(overallMonthlyTraffic);
const overallTrafficReadable = formatBytes(overallTraffic);
const cacheMemoryReadable = formatBytes(cacheMemory);
const totalMemoryReadable = formatBytes(totalMemory);
const incomingDataPerSecReadable = formatBytes(writesPerSec * AFTRS);
const outgoingDataPerSecReadable = formatBytes(readsPerSec * AFTRS);

dv.paragraph(`#### Storage`);
dv.paragraph(`Let's say our total active users are **${AUS.toLocaleString()}**`);
dv.paragraph("<br>");
dv.paragraph(`***As a user, we want a feature to:***`);
dv.paragraph(`- Post **${FeatOneName}** feature with an average size of **${formatBytes(AFRS_one)}**`);
dv.paragraph(`- Post **${FeatTwoName}** feature with an average size of **${formatBytes(AFRS_two)}**`);
dv.paragraph(`- Get **${FeatThreeName}** feature with an average size of **${formatBytes(AFRS_three)}**`);
dv.paragraph("<br>");
dv.paragraph(`##### Writes`);
dv.paragraph(`The total write request size, including metadata, is **${formatBytes(AFTRS)}**`);
dv.paragraph("<br>");
dv.paragraph(`Writes per month: **${monthlyEstimationReadable}**`);
dv.paragraph(`Writes per day: **${writesPerDayReadable}**`);
dv.paragraph(`Writes per second: **${writesPerSec.toFixed(6)}**`);
dv.paragraph(`Writes per user: **${writesPerUser.toFixed(6)}**`);
dv.paragraph("<br>");
dv.paragraph(`Total storage needed after data replication: **${dataReplicationReadable}**`);
dv.paragraph(`Total storage for a year: **${yearStorageReadable}**`);
dv.paragraph(`Total storage for 5 years: **${fiveYearStorageReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`### Network Traffic`);
dv.paragraph(`*Read*:Write ratio = *${ReadRatio}*:${WriteRatio} (read-heavy system)`);
dv.paragraph("<br>");
dv.paragraph(`##### Reads`);
dv.paragraph(`Reads per month: **${readsPerMonthReadable}**`);
dv.paragraph(`Reads per day: **${readsPerDayReadable}**`);
dv.paragraph(`Reads per second: **${readsPerSec.toFixed(6)}**`);
dv.paragraph("<br>");
dv.paragraph(`Overall traffic per month: **${overallMonthlyTrafficReadable}**`);
dv.paragraph(`Overall traffic per day: **${overallTrafficReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`### Memory Cache`);
dv.paragraph(`Cache memory needed: **${cacheMemoryReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`Total memory including replication: **${totalMemoryReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`### Bandwidth`);
dv.paragraph(`Incoming data writes per second: **${incomingDataPerSecReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`Outgoing data reads per second: **${outgoingDataPerSecReadable}**`);
dv.paragraph("<br>");
dv.paragraph(`### App Server Estimations`);
dv.paragraph(`**${CPU_Cores}** physical CPU cores`);
dv.paragraph(`**${requestPerServer.toFixed(2)}** requests per second for a single server`);
const numServer = Math.ceil(readsPerSec / requestPerServer);
dv.paragraph(`**${numServer}** servers needed`);
```

