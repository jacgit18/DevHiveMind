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
##### Writes per Day
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

Active User Number of comments per month = 30 

posts Number of likes per month = 30 posts


Monthly total storage size needed  = 200 Bytes average size of comments(including metadata) + 100 Bytes average size of likes(including metadata) * 30 =  


Monthly total storage size needed = (200 bytes * number of comments per month) + (100 bytes * number of likes per month)

We're given that there are 30 posts per month per user, consisting of comments and likes. Assuming each post includes a comment and a like:

Number of comments per month = 30 posts Number of likes per month = 30 posts

Substituting these values into the equation:

Monthly total storage size needed = (200 bytes * 30) + (100 bytes * 30)

= (6000 bytes) + (3000 bytes) = 9000 bytes




Average user Post about 20 comments and 10 likes = 30 Post 

Write per Month = Active Userbase of 200M * 30 avg user post = 6,000,000,000B 

Write per day = Write per Month/ 30 = 200,000,000M 

write per sec = 200M/ 4000 * 20(secs in day est) = 200M/ 80K = 200M /100k = 2,000 writes a sec


Daily storage for writes = Monthly total storage size needed * Write per day 
10KB * 200M = 10(10^3) * 200(10^6) = 200,000,000M = 2TB

Retention Period = 5 years  
  
5 Year Storage =  5 * 400(Rounded year day) * 2TB(new data per day) = 2K(10^3) * 2,000,000,000 GB(10^9) = 20(10^12) = 4PB
  
Data replication which is typically done 3 to 5 times  

Data replication = 4PB * 3 = 12TB

Yearly storage:(12TB* 400 days) = 4800 TB = 4.8 PB 

#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads per day
> GET

As a users we want to:
- Get Video views
- Get Video likes
- Get Comment likes

read per day = *50* * 200,000,000M  write per day = 10,000,000,000B

read per sec = *50* * 2,000  write per sec = 100k

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Traffic = (200,000,000 * 100,000) + (200,000,000 * 2,000)

Now calculate:

Traffic = (20,000,000,000,000) + (400,000,000,000)

#### Memory Cache
caching is a way to serve read request faster use 80-20 rule for caching
##### cache per day
Caching Memory = read per day * arbitrary storage action size * 20%

Caching Memory = 10,000,000,000B * 10KB  * 0.2 = 10,000,000,000B(^9) * 2KB(^3) =  18.651 TB might be less since you have duplicate request being made to do the same thing 

Total memory: (Caching Memory * 3 for replication) = 

seems excessive might be issues

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

