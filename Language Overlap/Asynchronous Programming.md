---
tags:
  - asynchronous
  - concurrency
  - codeExecution
author:
  - jacgit18
  - chatgpt
Comments: This documentation discusses Asynchronous programming.
Status: Done
Started: 
EditDate: 2024-03-04
Relates:
---
Asynchronous programming, on the other hand, allows tasks to be executed independently and concurrently. It doesn't block the execution of the program, enabling multiple operations to be performed simultaneously. This approach is particularly useful when dealing with I/O operations or time-consuming tasks.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class AsynchronousExample {

    public static void main(String[] args) {
        System.out.println("Start");

        // Task 1
        CompletableFuture<Void> task1Future = CompletableFuture.runAsync(AsynchronousExample::task1);

        // Task 2
        CompletableFuture<Void> task2Future = CompletableFuture.runAsync(AsynchronousExample::task2);

        // Wait for both tasks to complete
        CompletableFuture.allOf(task1Future, task2Future)
                .thenRun(() -> {
                    System.out.println("End");
                })
                .join();
    }

    private static void task1() {
        System.out.println("Executing Task 1");
        // Simulate time-consuming operation
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Task 1 completed");
    }

    private static void task2() {
        System.out.println("Executing Task 2");
        // Simulate time-consuming operation
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Task 2 completed");
    }
}

```



```javascript 
console.log("Start");

// Task 1
const task1Promise = new Promise((resolve, reject) => {
    console.log("Executing Task 1");
    // Perform some time-consuming operation
    setTimeout(() => {
        console.log("Task 1 completed");
        resolve();
    }, 2000);
});

// Task 2
const task2Promise = new Promise((resolve, reject) => {
    console.log("Executing Task 2");
    // Perform some time-consuming operation
    setTimeout(() => {
        console.log("Task 2 completed");
        resolve();
    }, 1000);
});

// Wait for both promises to resolve
Promise.all([task1Promise, task2Promise]).then(() => {
    console.log("End");
});

```

## Output 
>  Start
Executing Task 1
Executing Task 2
Task 2 completed
Task 1 completed
End




**Memory Management in JavaScript: Stacks, Heaps, and Event Loop**

**Stacks and Heaps:**

In JavaScript, a stack handles primitive values like numbers, strings, booleans, nulls, undefined, and symbols. It operates swiftly but has limited space. On the other hand, a heap, while slower, accommodates all object types—object literals, arrays, functions, dates, and others—and provides ample space.

When creating a primitive type like a string, its value is stored in a stack. For objects, a pointer is created, leading to the stack with the reference of the object variable name.

If you have two variables with the same primitive type, they are distinct values in the stack. However, with objects, they share the same pointer on the heap. Therefore, updating the first variable affects the second, as they reference the same object.

**Call Stack:**

The call stack, maintained in memory for each task and thread, is a stack of function calls executed in order. Each function call forms a frame on the stack, containing function arguments and local variables. The stack operates on a last-in, first-out basis. JavaScript, being single-threaded, has one call stack, making it non-blocking but single-threaded.

**Heap:**

Objects in JavaScript reside in the heap—a large, unstructured memory region. Every created object needs space in the heap. If transitioning from C++, the heap is analogous to where things go when constructed using `new` in C++.

**Web APIs and Events:**

Web APIs, low-level functions in the JavaScript runtime, interact with the OS and are implemented by the browser/host. They include functions like `setTimeout()`. Web APIs, when called, generate messages that are sent to the callback queue, enabling asynchronous behavior. Callbacks, attached to these messages, are processed by the Event Loop.

**Callback Queue:**

The callback queue contains tasks that have finished processing, with callback functions for each message. The Event Loop facilitates the transfer of callbacks from the queue to the call stack once it is empty.

**Event Loop:**

The Event Loop continuously checks if the call stack is empty. When empty, it retrieves the first element from the callback queue and transfers the callback to the call stack. The Run-to-Completion principle ensures that a message runs to completion before new messages are added to the call stack, maintaining order in execution.