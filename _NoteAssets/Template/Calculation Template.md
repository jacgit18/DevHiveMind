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
// Average Feature Request Size by Bytes
const AFRS_one = dv.current().AFRS_one;
const FeatOneName = dv.current().WriteFeatOne
const AFRS_two = dv.current().AFRS_two;
const FeatTwoName = dv.current().WriteFeatTwo;
const AFRS_three = dv.current().AFRS_three;
const FeatThreeName = dv.current().ReadFeatOne;
const ReadRatio = dv.current().Reads;  
const WriteRatio = dv.current().Writes;  
const requestPerServer = dv.current().CPU_Cores / 0.5 

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
const readsPerMonth = ReadRatio * monthlyEstimation

const readsPerDay = ReadRatio * writesPerDay;
const readsPerSec = ReadRatio * writesPerSec;
const overallMonthlyTraffic = (DAU * readsPerSec) * (DAU * writesPerSec) * 30;
const overallTraffic = (DAU * readsPerSec) * (DAU * writesPerSec);

// Memory Cache
const cacheMemory = readsPerDay * AFTRS * 0.2;
const totalMemory = cacheMemory * Replication;

// Convert bytes to GB for cacheMemory and totalMemory 
const cacheMemoryGB = cacheMemory / (1024 ** 3); 
const totalMemoryGB = totalMemory / (1024 ** 3);

// Bandwidth
const incomingDataPerSec = writesPerSec * AFTRS;
const outgoingDataPerSec = readsPerSec * AFTRS;


dv.paragraph(`#### Storage`);
dv.paragraph(`Lets say are total active user are **${AUS.toLocaleString()}**`);
dv.paragraph("<br>");  
dv.paragraph(`***As a users we want a feature to:***`);

dv.paragraph(`- Post **${FeatOneName}** feature with a average size of **${AFRS_one}** bytes`);
dv.paragraph(`- Post **${FeatTwoName}** feature with a average size of **${AFRS_two}** bytes`);
dv.paragraph(`- Get **${FeatThreeName}** feature with a average size of **${AFRS_three}** bytes`);


dv.paragraph("<br>");  
dv.paragraph(`##### Writes`);
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
dv.paragraph(`*Read*:Write ratio = *${ReadRatio}*:${WriteRatio} read-heavy system`);
dv.paragraph("<br>");  
dv.paragraph(`##### Reads`);
dv.paragraph(`Reads per month **${readsPerMonth.toLocaleString()}** bytes`);
dv.paragraph(`Reads per day **${readsPerDay.toLocaleString()}** bytes`);
dv.paragraph(`Reads per second **${readsPerSec.toFixed(6)}**`);
dv.paragraph("<br>");  
dv.paragraph(`Overall Traffic is **${overallMonthlyTraffic.toLocaleString()}** bytes in a month`);
dv.paragraph(`Overall Traffic is **${overallTraffic.toLocaleString()}** bytes in a day`);
dv.paragraph("<br>");  

dv.paragraph(`### Memory Cache`); dv.paragraph(`Cache memory needed **${cacheMemory.toLocaleString()}** bytes (**${cacheMemoryGB.toFixed(2)}** GB)`); dv.paragraph("<br>"); dv.paragraph(`Total memory including replication **${totalMemory.toLocaleString()}** bytes (**${totalMemoryGB.toFixed(2)}** GB)`); dv.paragraph("<br>");

dv.paragraph(`### Bandwidth`);
dv.paragraph(`Incoming Data writes per second **${incomingDataPerSec.toLocaleString()}** bytes`);
dv.paragraph("<br>");  
dv.paragraph(`Outgoing Data reads per second **${outgoingDataPerSec.toLocaleString()}** bytes`);
dv.paragraph("<br>");  

dv.paragraph(`### App Server Estimations`);
dv.paragraph(`**${dv.current().CPU_Cores}** physical CPU cores`);
dv.paragraph(`**${requestPerServer}** Request Per Second for a single server `);
const numServer = readsPerSec / requestPerServer
dv.paragraph(` **${numServer}** servers needed`);
```



