---
excalidraw-plugin: parsed
tags: 
author: []
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 2024-04-13T00:00:00.000Z
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---

# Question
## Requirements Gathering
Functional Requirements core functionality.

Non Requirements Functional how the system should perform or behave under various conditions things like performance, scalability, security, reliability, and usability should be discussed.


### Userbase

Geography USA no inappropriate content , China Region lock only certain content


#### Schema

##### Table 1

| Field     | Description                                | Type    |
| --------- | ------------------------------------------ | ------- |
| Latitude  | **\*** Lat of given location               | Double  |
| Longitude | **\*** Long of given location              | Double  |
| Radius    | **O** Default is 500 meters(about 3 miles) | Int     |
| tes       | ..                                         | VarChar |
| ..        | ..                                         | Char    |
| ..        | ..                                         | Boolean |


##### Table User

|     | User                | Type      |
| --- | ------------------- | --------- |
| PK  | UserID              | Integer   |
|     | email               | VarChar   |
|     | password            | VarChar   |
|     | date started        | TimeStamp |
|     | channel name        | VarChar   |
|     | monetization status | Boolean   |


##### Table Region

|     | Region   |
| --- | -------- |
| PK  | RegionID |
| FK  | UserID   |
| FK  | ...      |
|     | ...      |
|     | ...      |
|     | ...      |
|     | ...      |

  

### Capacity Estimation
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios and metadata.

Assume we have a Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

##### Writes
> POST, PUT, DELETE

As a users we want to:
- Post Comment
- Post Like
- Not in scope for storage estimation
	- Post unlike(if you reClick like button) would still be a post
	- Update Comment 
	- Delete Comment

*String Data*
Lets Assume were dealing with English comments there are about 500K words in the English language.

A comment might contain 20 to 40 words and each word might have a length of 5 characters thus each comment will range about 100 to 200 characters. Assuming each character is approximately 1 byte, the average size of a YouTube comment in English would be around 100 to 200 bytes.


**Lets say we have 2:1 ratio of Likes to Comments**
Active Userbase size = 200,000,000
AVG likes per user in month = 100 posts  
AVG comments per user in month = 50 posts 
Post per user in month = 150

###### Data Size 
AVG likes size = 90 byte(adjusted for meta data)

AVG comments size = 
40(words) * 5(char) * 1byte = 
200 byte(adjusted for meta data)

Total post size per user = round to 300 bytes 

Total Monthly Post size = 150 Post per user in month * 300 bytes Total post size per user = 45,000 bytes = 43.95KB = 44KB

Monthly Post Storage Requirement = AU size 200M * Total post size 300 bytes * 150 monthly post = 9,000,000,000,000 bytes = 8.18TB = 8TB

###### Daily estimates

Total writes per day = 200,000,000 AU * 45,000 bytes Total Monthly Post size / 30 = 300,000,000,000 bytes = 286.1MB = 300MB


Total write per sec = 300,000,000,000 bytes/ 4000 * 20(secs in day est) = 300,000,000,000 bytes/ 80K = 300,000,000,000 bytes /100k = 3,000,000,000,000 bytes = 3TBps

###### Long term estimates

Data replication = 8TB Monthly Post Storage Requirement * 3 = 24TB

Year Storage =  1 * 400(Rounded year day) * 24TB = 400 * 24TB = 9600TB

5 Year Storage = Year Storage * 5 = 48,000TB = 48PB


#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads
> GET

As a users we want to:
- Get Video views(not included in calculation)
- Get Video likes
- Get Comment likes

something off with math

read per day = *50* * 300,000,000,000 bytes write per day = 15,000,000,000,000 bytes = 15,000TB = 15PB

read per sec = *50* * 3,000,000,000,000 bytes write per sec = 150,000,000,000,000 bytes = 150TB

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Overall Traffic = 200,000,000 AU * (15,000,000,000,000 bytes + 150,000,000,000,000 bytes)

Overall Traffic = 200,000,000 AU * 165,000,000,000,000 bytes = 33,000,000,000,000,000,000,000,000 bytes


#### Memory Cache
caching is a way to serve read request faster use 80-20 rule for caching

Caching Memory = read per day * AVG post total size * 20%

Caching Memory = 172.5TB * 300 bytes  * 0.2 = 172.5TB * 300 bytes = 2,070TB  might be less since you have duplicate request being made to do the same thing 

Total memory: (Caching Memory * 3 for replication) = 6,210 TB


#### Bandwidth
InComing Data per sec(Write) = 0.005(write per sec) * 300 bytes(arbitrary storage action size) = 1.5 bytes per sec

OutGoing Data per sec(Read) = 0.25(read per sec) * 300 bytes(arbitrary storage action size) = 75 bytes per sec


Slow devices with low bandwidth maybe served lower resolution videos or content  
  
  
Versus fast devices with more bandwidth would be served high quality content like 4K, 1080p, etc

### App Server Estimations
Might be asked how many app service do you need

request per sec for single server = # cpu physical cores / 0.5 or half a sec = 16 

request per sec for single server = 8 physical cores / 0.5 or half a sec = 16 

Number of Servers = 500(read per sec)/ number of request per second a single server can handle

Number of Servers = 500(read per sec) / 16 request per sec for single server = 30 to 50 servers 



| Unit       | Equivalent in Bytes                           | Place                  |       |
| ---------- | --------------------------------------------- | ---------------------- | ----- |
| 1 Byte     | 1                                             | Hund over 2 digits     | 10^2  |
| 1 Kilobyte | 1,024 Bytes                                   | Thous over 3 digits    | 10^3  |
| 1 Megabyte | 1,024 Kilobytes = 1,048,576 Bytes             | Milli over 6 digits    | 10^6  |
| 1 Gigabyte | 1,024 Megabytes = 1,073,741,824 Bytes         | Billi over 9 digits    | 10^9  |
| 1 Terabyte | 1,024 Gigabytes = 1,099,511,627,776 Bytes     | Trilli over 12 digits  | 10^12 |
| 1 Petabyte | 1,024 Terabytes = 1,125,899,906,842,624 Bytes | Quadril over 15 digits | 10^15 |


| Calculation              | Result                                    |         |
| ------------------------ | ----------------------------------------- | ------- |
| 60 seconds * 60 minutes  | 3,600 seconds per hour use 4,000          | Monthly |
| 3,600 seconds * 24 hours | 86,400 seconds per day use 80,000         | Daily   |
| 86,400 seconds * 30 days | 2,592,000 seconds per month use 2,400,000 | Seconds |
## Architecture
Typically Microservices 

Talk optimizations throughout and traffic management.

## Backing Services
Scalability strategies 
### Cloud Infrastructure
Don't need to use strictly cloud services

#### Data Storage
can talk governance and retention within cache, database, and application state also optimizations.
##### Database 

##### Storage 
file systems static files etc..

##### Caching

##### Networking

###### CDN
###### Traffic Management

###### Protocols

###### Security 

#### Processes

##### Compute

##### Data processing & analytics

##### Logging 

##### Monitoring

#### DevOPS
doesn't need to be cloud solution like AWS 


## Wrap Up


==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Excalidraw Data
## Text Elements
User Table ^zmns1Vak

## Element Links
cqasGqqJ: [[_System Design Template#Table 1]]
Mf9OBUwN: [[Architecture/System Design/Questions/Designing YouTube Upload.md#Table User]]
gPBXehTo: [[Architecture/System Design/Questions/Designing YouTube Upload.md#Table Region]]

%%
## Drawing
```compressed-json
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
```
%%