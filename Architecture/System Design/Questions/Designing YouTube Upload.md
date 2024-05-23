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