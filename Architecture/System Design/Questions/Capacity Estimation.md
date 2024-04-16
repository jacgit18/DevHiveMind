---
tags: 
author:
  - jacgit18
  - chatgpt
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: Refinement
Started: 2024-04-14
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish: true
---
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios and metadata.

Assume we have a Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

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

After developing schema you can define general feature like below following a rough [[Structuring URL#URI Path Design Guidelines for REST APIs |endpoints naming convention]].
##### Writes
> POST, PUT, DELETE

As a users we want to:
- Post Comment
- Post Like
- Not in scope for storage estimation
	- Post unlike(if you reClick like button) would still be a post
	- Update Comment 
	- Delete Comment

Lets Assume were dealing with English comments there are about 500K words in the English language.

A comment might contain 20 to 40 words and each word might have a length of 5 characters thus each comment will range about 100 to 200 characters. Assuming each character is approximately 1 byte, the average size of a YouTube comment in English would be around 100 to 200 bytes.

**Lets say we have 2:1 ratio of Likes to Comments**
AVG likes per user in month = 100 posts 
AVG comments per user in month = 50 posts 

AVG likes size = 90 byte(adjusted for meta data)
AVG comments size = 40 * 5 * 1 = 200 byte(adjusted for meta data)
AVG post total size = round to 300 bytes 

AU Number of likes per month = AVG likes * AVG likes  size * Active User = 1,800,000,000,000 bytes = 1.8TB

AU Number of comments per month = AVG comments * AVG comments size * Active User = 2,000,000,000,000 bytes = 2TB

Monthly Total storage size needed = AU Number of likes per month + AU Number of comments per month = 3,800,000,000,000 bytes = 3.8TB

Total Monthly Post = 100 monthly likes + 50 monthly comments = 150

Total writes per day = 200,000,000 AU * 150 Total Monthly Post / 30 = 1,000,000,000 bytes

Total writes per day in bytes
3,800,000,000,000 bytes > 3,000,000,000,000 bytes / 30 = 100,000,000 bytes rough approximation or 95.37 MB or 90MB

write per sec = 5/ 4000 * 20(secs in day est) = 5/ 80K = 5 /100k = 0.005 writes a sec

Data replication which is typically done 3 to 5 times  

Data replication =  3.8 TB * 3 = 11.4TB


Year Storage =  1 * 400(Rounded year day) * 3.8 TB = 400 * 3.8 TB = 1520 TB

5 Year Storage = Year Storage * 5 = 7600TB

>When calculating storage for multiple years, it's essential to consider potential growth in data volume over time. A linear projection may not accurately reflect real-world growth patterns.
#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads
> GET

As a users we want to:
- Get Video views
- Get Video likes
- Get Comment likes

read per day = *50* * 3,800,000,000,000 bytes write per day = 190,000,000,000 bytes = 172.5TB

read per sec = *50* * 0.005 write per sec = 0.25

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Overall Traffic = (200,000,000 * 0.25) + (200,000,000 * 0.005)

Overall Traffic = (50,000,000) + (100,000) = 50,100,000 bytes = 47.79MB = 50MBps

#### Memory Cache

caching is a way to serve read request faster use 80-20 rule for caching
##### Cache 
Caching Memory = read per day * AVG post total size * 20%

Caching Memory = 172.5TB * 300 bytes  * 0.2 = 172.5TB * 300 bytes = 2,070TB  might be less since you have duplicate request being made to do the same thing 

Total memory: (Caching Memory * 3 for replication) = 



#### [[Bandwidth Estimation |Bandwidth]] 
InComing Data per sec(Write) = 2,000(write per sec) * 10KB(arbitrary storage action size) = 20MB per sec

OutGoing Data per sec(Read) = 100k(read per sec) * 10KB(arbitrary storage action size) = 10MB per sec

### App Server Estimations
Might be asked how many app service do you need

500(read per sec)/ number of request per second a single server can handle

You should consider if the request is CPU bound, memory bound or I/O bound

this relates to [[Request Resource Bound]]

if CPU bound number of request per second a single server can handle would = number of physical cores / time to process request

8 cores / 0.5 or half a sec = 16 request per sec for single server

500(read per sec) / 16 request per sec for single server = 30 to 50 servers 


This this is dependent on service hardware also the number of time it takes to process a single request.

### Side Note

**Media approximation**
HD image 3MB  intstagram or facebook post
Size of image = height x width x bit depth
1280 x 720 x 24bits or 3 Bytes
1k * 1K * 3 = 3,000,000 = 3MB

Profile image(300x300) 300KB  
1 Min HD Video = 50MB

Video size is calculated by
FrameSize x FrameRate(FPS) x Compression Ratio x Video Duration(# Sec)

3MB * 30FPS * 1/100 * 60(sec) = 90MB * 1/100 * 60 = 90MB *  60 /100 = 5,400MB/ 100 = 54MB = 50MB

  
For something like YouTube you would probably use other resolutions like: 480p, 360P, 240P, 144P

