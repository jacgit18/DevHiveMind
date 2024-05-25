---
AFRS_one: 300
AFRS_two: 500
AUS: 20000
DAU: 45
CPU Cores: 8
Replication: 3
WriteFeatOne: Comment
WriteFeatTwo:
---

```dataviewjs
// Average Feature Request Size by Bytes
const AFRS_one = dv.current().AFRS_one;
const AFRS_two = dv.current().AFRS_two;
// Active Userbase Size
let AUS = dv.current().AUS;
// Daily Active Users 
const DAU = dv.current().DAU;

// AUS = 234 // able to reasign 



// Average Feature Total Request Size Per User
const AFTRS = AFRS_one + AFRS_two;

// Monthly Estimation
const monthlyEstimation = 30 * AFTRS * AUS;

// Daily Estimates
const writesPerDay = AUS / monthlyEstimation;
const writesPerSec = writesPerDay / 80000;
const writesPerUser = AFTRS / AUS;



// Network Traffic
const readWriteRatio = 50;
const readsPerDay = readWriteRatio * writesPerDay;
const readsPerSec = readWriteRatio * writesPerSec;
const overallTraffic = (DAU * readsPerSec) * (DAU * writesPerSec);

// Memory Cache
const cacheMemory = readsPerDay * AFTRS * 0.2;
const totalMemory = cacheMemory * Replication;

// Bandwidth
const incomingDataPerSec = writesPerSec * AFTRS;
const outgoingDataPerSec = readsPerSec * AFTRS;



dv.paragraph(`### Storage`);
dv.paragraph(`AUS = **${AUS}**`);
dv.paragraph("<br>");  
dv.paragraph(`#### Writes`);
dv.paragraph(`Post ... = ...`);

dv.paragraph("<br>");  

dv.paragraph(`#### Data Size`);
dv.paragraph(`AFRS One is about ${AFRS_one} bytes (adjusted for metadata)`);
dv.paragraph(`AFRS Two is about ${AFRS_two} bytes (adjusted for metadata)`);
dv.paragraph(`AFTRS = AFRS One + AFRS Two = ${AFTRS} bytes`);

dv.paragraph("<br>");  
dv.paragraph(`Monthly Estimation = 30 * AFTRS * AUS = ${monthlyEstimation.toLocaleString()} bytes`);
dv.paragraph("<br>");  

dv.paragraph(`#### Daily estimates`);
dv.paragraph(`Writes per day = AUS / Monthly Estimation = ${writesPerDay.toFixed(2)}`);
dv.paragraph(`Writes per second = Writes per day / 80,000 = ${writesPerSec.toFixed(6)}`);
dv.paragraph(`Writes per user = AFTRS / AUS = ${writesPerUser.toFixed(2)}`);
dv.paragraph("<br>");  

const Replication = dv.current().Replication;

const dataReplication = monthlyEstimation * Replication;
const yearStorage = 1 * 400 * dataReplication;
const fiveYearStorage = yearStorage * 5;
dv.paragraph(`#### Long term estimates`);
dv.paragraph(`Data replication = Monthly Estimation * ${Replication} = ${dataReplication.toLocaleString()} bytes`);
dv.paragraph(`Year Storage = 1 * 400 * Data Replication = ${yearStorage.toLocaleString()} bytes`);
dv.paragraph(`5 Year Storage = Year Storage * 5 = ${fiveYearStorage.toLocaleString()} bytes`);
dv.paragraph("<br>");  

dv.paragraph(`### Network Traffic`);
dv.paragraph(`Read:Write ratio = 50:1 read-heavy ratio`);
dv.paragraph("<br>");  
dv.paragraph(`#### Reads`);
dv.paragraph(`Reads per day = ${readWriteRatio} * Writes per day = ${readsPerDay.toLocaleString()}`);
dv.paragraph(`Reads per second = ${readWriteRatio} * Writes per second = ${readsPerSec.toFixed(6)}`);
dv.paragraph(`Overall Traffic = (DAU * Reads per second) * (DAU * Writes per second) = ${overallTraffic.toLocaleString()}`);
dv.paragraph("<br>");  

```


