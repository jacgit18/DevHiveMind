---
AFRS_one: 300
AFRS_two: 500
AUS: 20000
DAU: 45
CPU Cores: 8
Replication: 3
WriteFeatOne: Comment
WriteFeatTwo: Like
---

```dataviewjs
// Average Feature Request Size by Bytes
const AFRS_one = dv.current().AFRS_one;
const FeatOneName = dv.current().WriteFeatOne
const AFRS_two = dv.current().AFRS_two;
const FeatTwoName = dv.current().WriteFeatTwo
	  
// Active Userbase Size
let AUS = dv.current().AUS;
// Daily Active Users 
const DAU = dv.current().DAU;

// AUS = 234 // able to reasign 

const Replication = dv.current().Replication;

// Average Feature Total Request Size Per User
const AFTRS = AFRS_one + AFRS_two;

// Monthly Estimation
const monthlyEstimation = 30 * AFTRS * AUS;

// Daily Estimates
const writesPerDay =  monthlyEstimation / AUS ;
const writesPerSec = 86400 / writesPerDay ;
const writesPerUser =  AUS / AFTRS;

// Long Term Estimates
const dataReplication = monthlyEstimation * Replication;
const yearStorage = 1 * 400 * dataReplication;
const fiveYearStorage = yearStorage * 5;

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


dv.paragraph(`#### Storage`);
dv.paragraph(`Lets say are total active user are **${AUS.toLocaleString()}**`);
dv.paragraph("<br>");  
dv.paragraph(`##### Writes`);
dv.paragraph(`As a users we want a feature to:`);
dv.paragraph(`- Post **${FeatOneName}** feature with a average size of **${AFRS_one}** bytes`);
dv.paragraph(`- Post **${FeatTwoName}** feature with a average size of **${AFRS_two}** bytes`);

dv.paragraph(`The total write request size including and accounting for meta data is **${AFTRS}** bytes`);


dv.paragraph("<br>");  

dv.paragraph(`Writes per month **${monthlyEstimation.toLocaleString()}** bytes`);
dv.paragraph(`Writes per day **${writesPerDay.toLocaleString()}** bytes`);
dv.paragraph(`Writes per second **${writesPerSec}**`);
dv.paragraph(`Writes per user **${writesPerUser}**`);
dv.paragraph("<br>");  

dv.paragraph(`Total storage needed after Data replication **${dataReplication.toLocaleString()}** bytes`);
dv.paragraph(`Total Storage for a year **${yearStorage.toLocaleString()}** bytes`);
dv.paragraph(`Total storage for 5 Years **${fiveYearStorage.toLocaleString()}** bytes`);
dv.paragraph("<br>");  

dv.paragraph(`### Network Traffic`);
dv.paragraph(`Read:Write ratio = 50:1 read-heavy ratio`);
dv.paragraph("<br>");  
dv.paragraph(`#### Reads`);
dv.paragraph(`Reads per day = ${readWriteRatio} * Writes per day = ${readsPerDay.toLocaleString()}`);
dv.paragraph(`Reads per second = ${readWriteRatio} * Writes per second = ${readsPerSec.toFixed(6)}`);
dv.paragraph(`Overall Traffic = (DAU * Reads per second) * (DAU * Writes per second) = ${overallTraffic.toLocaleString()}`);
dv.paragraph("<br>");  

dv.paragraph(`### Memory Cache`);
dv.paragraph(`Cache Memory = Reads per day * AFTRS * 20% = ${cacheMemory.toLocaleString()} bytes`);
dv.paragraph(`Total Memory = Cache Memory * ${Replication} = ${totalMemory.toLocaleString()} bytes`);
dv.paragraph("<br>");  

dv.paragraph(`### Bandwidth`);
dv.paragraph(`Incoming Data per second (Write) = Writes per second * AFTRS = ${incomingDataPerSec.toLocaleString()} bytes/sec`);
dv.paragraph(`Outgoing Data per second (Read) = Reads per second * AFTRS = ${outgoingDataPerSec.toLocaleString()} bytes/sec`);
dv.paragraph("<br>");  

dv.paragraph(`### App Server Estimations`);
dv.paragraph(`CPU physical cores = ...`);
dv.paragraph(`Request Per Second for a single server is = # CPU physical cores / 0.5 or half a sec = ...`);
dv.paragraph(`Number of Servers = (reads per second) / (RPS a single server can handle) = ... servers`);
```



```dataviewjs
// readOnly need to store in vairiable
dv.current().AUS = 10;
dv.paragraph(`AUS is read only thats why no change **${dv.current().AUS}**`);
```
