---
tags: 
author:
  - jacgit18
Status: 
Started: 
EditDate: 
Relates:
---
```javascript
// Create a promise with resolve and reject functions
var porm = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Uncomment either resolve() or reject() to test
        // resolve();
        reject();
    }, 2000);
});

// Function to be executed on success
function succ() {
    console.log('Success!');
}

// Function to be executed on error
function err() {
    console.log('Error!');
}

// Handle promise using .then() for success and .catch() for error
porm.then(succ).catch(err);

// Using async function with await to handle promise
async function handlePromise() {
    try {
        await porm;
        succ();
    } catch (error) {
        err();
    }
}

// Uncomment the line below to test async/await
// handlePromise();
```

In this example, a promise (`porm`) is created with `resolve` and `reject` functions. Depending on whether `resolve` or `reject` is called, the promise will either be fulfilled (success) or rejected (error). The `.then()` method is used to handle success, and the `.catch()` method is used to handle errors. Additionally, the code includes an async function (`handlePromise`) using `async/await` to demonstrate an alternative way of handling promises with error handling.