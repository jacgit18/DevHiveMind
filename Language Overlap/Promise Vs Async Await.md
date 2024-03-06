---
tags:
  - asynchronous
  - promises
  - FunctionTypes
  - codeExecution
author:
  - jacgit18
Comments: This documentation discusses promises and async functions.
Status: Refinement
Started: 
EditDate: 
Relates: "[[promise]]"
Peer Reviewed: "0"
---
A Promise in NodeJS mirrors the concept of a promise in real life, providing an assurance that a specific task will be completed. It serves to track the execution status of asynchronous events and dictates the course of action post-event completion. A promise object encompasses three states:

- **PENDING:** The initial state before the event has occurred.
- **RESOLVED:** The state after a successful operation.
- **REJECTED:** The state when an error occurs during execution, causing the promise to fail.

Async functions return promises, allowing the use of chaining methods like `.then()` and `.catch()` for error handling.

When handling promises, `.then()` is used for successfully resolved promises, `.catch()` for rejected promises, and `.finally()` for code execution regardless of the promise's state.

```javascript
const promise = new Promise(function (resolve, reject) {
  const string1 = "geeksforgeeks";
  const string2 = "geeksforgeeks";
  if (string1 === string2) resolve();
  else reject();
});

promise
  .then(function () {
    console.log("Promise resolved successfully");
  })
  .catch(function () {
    console.log("Promise is rejected");
  });
```

The Promise API facilitates promise chaining for handling multiple asynchronous functions in sequence. `Promise.all()` is used when all promises need to be fulfilled, and `Promise.any()` is employed when any one of a set of promises should be fulfilled.

```javascript
// Example using Promise.all()
Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(responses => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  });

// Example using Promise.any()
Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(response => {
    console.log(`${response.url}: ${response.status}`);
  })
  .catch(error => {
    console.error(`Failed to fetch: ${error}`);
  });
```

For more detailed information on promises, async/await, and fetch in modern JavaScript, refer to the following resources:

- [Promises, Async/Await, and Fetch: Network Requests in Modern JavaScript](https://medium.com/swlh/promises-async-await-and-fetch-network-requests-in-modern-javascript-fd0b2b384f3e)
- [MDN Web Docs: Async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [MDN Web Docs: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)