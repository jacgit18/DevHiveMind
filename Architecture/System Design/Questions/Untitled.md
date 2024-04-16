##### Writes
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

Total writes per day = 150 Total Monthly Post / 30 = 5 writes

Total writes per day in bytes
3,800,000,000,000 bytes > 3,000,000,000,000 bytes / 30 = 100,000,000 bytes rough approximation or 95.37 MB or 90MB

write per sec = 5/ 4000 * 20(secs in day est) = 5/ 80K = 5 /100k = 0.005 writes a sec

Data replication which is typically done 3 to 5 times  

Data replication =  3.8 TB * 3 = 11.4TB


Year Storage =  1 * 400(Rounded year day) * 3.8 TB = 400 * 3.8 TB = 1520 TB

5 Year Storage = Year Storage * 5 = 7600TB

#### Network Traffic
Read:Write *50*:1 read heavy ratio

##### Reads
read per day = *50* * 3,800,000,000,000 bytes write per day = 190,000,000,000 bytes = 172.5TB

read per sec = *50* * 0.005 write per sec = 0.25

Overall Traffic: (Daily active users * read per sec) * (Daily active users * writes per sec)

Overall Traffic = (200,000,000 * 0.25) + (200,000,000 * 0.005)

Overall Traffic = (50,000,000) + (100,000) = 50,100,000 bytes = 47.79MB = 50MBps

#### Memory Cache

caching is a way to serve read request faster use 80-20 rule for caching

Caching Memory = read per day * AVG post total size * 20%

Caching Memory = 172.5TB * 300 bytes  * 0.2 = 172.5TB * 300 bytes = 2,070TB  might be less since you have duplicate request being made to do the same thing 

Total memory: (Caching Memory * 3 for replication) = 6,210 TB
