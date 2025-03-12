Idempotence meaning calling or invoking it multiple times doesn’t change the result.


SQS does **not guarantee exactly-once delivery**



 POST requests are not idempotent, making them suitable for unique operations like password resets.

The Web infrastructure relies on the idempotent and safe nature of GET, allowing clients to repeat requests without altering data (Read-Only) and enabling caches to serve cached representations without contacting the origin server.