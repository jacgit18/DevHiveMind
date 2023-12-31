---
tags: 
author: 
Status: Distilling
Started: 
EditDate: 
Relates:
---

## Communication Protocols

Communications protocols link the frontend to the backend. Understanding how protocols work is a good skill to have for an engineer especially if they want to build a resilient backend application.

Almost all the protocols we use and love on the backend are either built on top of TCP or UDP. That is why understanding the differences between this two help the engineer make the right choice. For instance, TCP is a stream-based connection-oriented protocol while UDP is a message based and connectionless. TCP provides reliable delivery at a cost of connection setup and retransmission. While UDP starts faster but doesn’t have guaranteed delivery. Anything you build on top of these two protocols must adhere to their fundamental properties. TCP is not better than UDP, and UDP is not better than TCP. It all depends on what you are building.

Moving up the stack, the HTTP protocol was originally built on top of TCP because we wanted to send requests and responses reliably. As the web evolved and resources become richer, one connection was not sufficient to concurrently send multiple requests. So browsers started to establish more and more connections, the cost of connection setup for each request became so high.

HTTP/2 introduced application level streams so multiple requests can be sent on the same connection. Later HTTP/2 evolved and had to be rewritten on top of UDP with HTTP/3 to solve the TCP head of line problem. There are reasons for everything, the fundemental feature of TCP was the culprit of this move. It doesn’t mean TCP is bad the web has evolved in a way that TCP is no longer suitable. If we didn’t know how TCP works we would not have improved the HTTP protocol.

It is also important to know that using any protocol comes with a cost especially while building APIs. Understanding that cost will help you make better informed decisions. For example, using HTTP/2 might give you more HTTP request throughput, but the work the application needs to do to assemble the streams taxes the CPU, something [Lucidchart](https://www.lucidchart.com/techblog/2019/04/10/why-turning-on-http2-was-a-mistake/) learned the hard way.

Sometimes the backend architecture requires real-time Bidirectional communication protocols to build chatting, gaming apps or just communicating between two services. Protocols such as WebSockets, gRPC or just raw TCP/UDP can be used. If you know how a protocol works and what is the strength and weaknesses you will know when to use it.

Ultimately, learning communication protocols is important for a backend engineer, and it is possible to go as deep as desired in any protocol. Maybe one day you will write an RFC proposing a new protocol.


## Proxies

Proxies are becoming increasingly popular in the engineering world, especially with the introduction of micro-services. The main purpose of a proxy is it receives requests from a client and forward the requests to backend servers. The proxy hides the network layer identity of the original client from the destination server.

There are two levels of proxying: layer 4 and layer 7 proxying. Layer 4 proxying works at the transport layer, while layer 7 proxying works at the application level. Each layer provides different capabilities and can be used for different purposes. Layer 7 proxying require the proxy to understand the application protocol while layer 4 proxying works with any application protocol because it works at the transport layer (TCP or UDP).

You might have heard the forward proxy and reverse proxy used interchangeably. Both the forward proxy and the reverse proxy, receive requests from clients and forward the request to a backend. In the forward proxy, the client explicitly asks for a particular backend server and the proxy fulfills this request. Forward proxies must be configured in the client network proxy section for them to work. In the reverse proxy the client doesn’t know the final backend server, to the client the final destination is the reverse proxy. The client doesn’t know there are more servers on the backend.

A common uses cases of proxies are caching, API gateways, authentication, load balancing and much more. For example a content delivery network (CDN) is a reverse proxy that sends request to the origin backends. Fiddler or MITM are proxies configured on the client side and all requests\* get sent to them first. Service meshes are essentially a proxy and a reverse proxy. Learn more about proxies [here](https://youtu.be/SqqrOspasag).

> \*I say all requests but in fact only requests that the proxy are configured to support. Mostly here we refer to HTTP proxy, so all HTTP requests get forwarded.

Example of proxies are [NGINX](https://medium.com/@hnasr/the-architecture-of-nginx-2b32fc0b7877), HAProxy and Envoy. Proxies are one of the most interesting topics in backend engineering and one can specialize in learning and improving them. Cloudflare [recently](https://youtu.be/QbOAHkaFU6w) moved away from NGINX, their primary reverse proxy, and built their own proxy because of certain limitations in NGINX. I discussed that in details in an episode of the [backend engineering show.](https://youtu.be/QbOAHkaFU6w)


## Message Formats

Message formats go hand in hand with communication protocols; They describe in-wire format of the message being sent. They usually broken down into two types human readable and non-human readable. Examples are XML, JSON and [protocol buffers](https://youtu.be/46O73On0gyI).

When a client sends a message to a backend, it needs to serialize the message from the language data structure to the on-wire message format. When the backend receives the message it needs to then deserialize the message from this format to the language data structure.

That is why it is absoluity fine to have a Javascript client communicates with a C# backend using JSON as a message format. The native JSON object of javascript will be converted to a JSON byte string in the wire, the C# backend then deserializes the byte string to a C# structure representing a dictionary. It is important to understand the cost associated with serializing and deserializing message format.

XML was one of the original message formats designed to be human-readable. However, computers had difficulty dealing with XMLs, so protocol buffers format was created to make the message format smaller and more friendly. Protocol buffers became very popular and were designed to solve the problem of high bandwidth messages. Protocol buffers minimize the payload so fewer bytes can be sent. It also speeds up the serialization and deserialization process.

Becoming specialized in message formats is also an option. You may invent the next message format that may become the standard to serve us for the next 50 years.

## Security

Security is an important topic in the field of software engineering. There are many different aspects to security. You can secure communications with encryption or TLS. You can prevent network intrusion with firewall rules and proper network configuration. You can study common software vulnerabilities and protect against denial of service attacks. As a software engineer, it is important to be familiar with the different types of security risks and how to mitigate them.

One type of security risk is a man-in-the-middle attack. This is where an attacker intercepts communication between two parties and tries to eavesdrop or modify the data being exchanged. To prevent this type of attack, it is important to encrypt and authenticate the communicated parties using Transport Layer Security (TLS).

Another type of security risk is a denial of service attack. This is where an attacker tries to prevent legitimate users from accessing a service by flooding it with requests or through finding a way to crash the backend by sending a special payload. To prevent this type of attack, it is important to have a firewall or a layer 7 DDOS protection layer in place to block illegitimate requests. Cloudflare has great services to detect DDOS traffic. This is of course made possible through layer 7 inspection.

Of course its hard to summarize all possible security attacks. There is a client side security attacks such as XSS (cross side scripting), there are server side security attacks such as SQL injection.

Security is an important topic in the field of software engineering. There are many aspects to security. As a software engineer, it is important to be familiar with the different types of security risks and how to mitigate them.

Another skill that a backend developer **needs to have is ensuring the security of their backend code and data**. Security is the process of protecting the backend code and data from unauthorized access, modification or disclosure. It is essential for backend development because it ensures the confidentiality, integrity and availability of the backend code and data.

Security involves various aspects such as:

- Authentication: Authentication is the process of verifying the identity of a user or a component that tries to access the backend code or data. It usually involves providing credentials such as username and password, tokens, certificates, etc.
- Authorization: Authorization is the process of granting or denying access rights to the backend code or data based on the identity and role of a user or a component. It usually involves defining policies and rules that specify what actions can be performed by whom on what resources.
- Encryption: Encryption is the process of transforming the backend code or data into an unreadable form using an algorithm and a key. It usually involves encrypting data at rest (in storage) or in transit (in communication) to prevent unauthorized access or modification.
- Hashing: Hashing is the process of generating a fixed-length string from the backend code or data using an algorithm. It usually involves hashing passwords or other sensitive data to prevent storing them in plain text or comparing them without revealing them.
- Logging: Logging is the process of recording the events and activities that occur in the backend code or data. It usually involves creating log files or records that contain information such as date, time, source, destination, action, outcome, etc.
- Auditing: Auditing is the process of reviewing and analyzing the logs and records that are created by the logging process. It usually involves checking for anomalies, errors, violations or breaches in the backend code or data.

A backend developer needs to use various security tools and techniques to implement these aspects in their backend code and data. Some examples of security tools and techniques are:

- JSON Web Tokens (JWT): JWT are an open standard for creating and verifying tokens that contain claims or information about a user or a component. They can be used for authentication and authorization purposes in RESTful APIs.
- SSL/TLS: SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are protocols that provide encryption and authentication for data in transit. They can be used to secure the communication between the backend and the frontend or other components using HTTPS (Hypertext Transfer Protocol Secure).
- bcrypt: bcrypt is a hashing algorithm that is designed to be slow and resistant to brute-force attacks. It can be used to hash passwords or other sensitive data before storing them in a database or comparing them for verification.
- Log4j: Log4j is a logging framework that provides features and functionalities to create and manage log files or records. It can be used to log the events and activities that occur in the backend code or data.
- ELK Stack: ELK Stack is a combination of three open source tools: Elasticsearch, Logstash and Kibana. Elasticsearch is a search and analytics engine that stores and indexes log data. Logstash is a data processing pipeline that collects, parses and transforms log data. Kibana is a visualization and dashboard tool that displays and analyzes log data. ELK Stack can be used to audit the logs and records that are created by the logging process.

