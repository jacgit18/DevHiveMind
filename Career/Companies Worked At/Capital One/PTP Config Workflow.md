## Dev tip 

Mention Just a nit pick in pr

mention TBD  in code for debug giving brief description

Documenting can cause or help with identifying flaws in logic


If you're working on something like how you were with the step functions always look for opportunities where there are people who are working on something similar or that may start out similar to copy off of their work instead of doing the effort



This isnt a logic question its a decision question 

Long story short 

Sorry im trying to formulate my thought
  

"Then" in gurken are treated as assertion



**Only push placeholder code if it's actively helping you solve a problem or you're stuck and need to share context with teammates.**  
Avoid pushing placeholders that serve no functional purpose or are just there to "fill in space." These can clutter the codebase, cause confusion during reviews, and make the commit history harder to follow. If something is incomplete but you're working through a problem or need feedback on your approach, a clearly labeled placeholder with a meaningful comment is acceptable. Otherwise, it's better to keep local stubs or notes to yourself until the implementation is ready or necessary.


When you think you are done with implementing whatever feature Etc then raise the pr avoid raising it when you are experimenting and you have like placeholders and 100% sure on the requirements if so ask for help ask questions to get clarification then when you think it's actually what it needs to be then raise PR instead of using it for people to read your code and you to correct it accordingly without thinking

## June

7ps capital one testing platform will be doing behavior driven test


Make file that creates aws resources in local stack




## May Notes

Working under customer resiliency specifically credit card



No response from ptp  
  
Should be synchrous after payment then ptp call regardless out failure  
  
Ama(Relates to Auditing) is done doing cloudwatch  
  
  
Maybe delet payments from payment scheduler Rt which is a second call but also fulfillment can check  
  
Ptp send a response for bff weather payment is successful




Data lambda pass thru update  
  
  
Bff call payments and payments invoke ptp  
  
  
Ptp is legacy track agent metric  
  
Short term use case  
  
Will eventually phased out but agents need it  
  
  
Ptp called after payments  
  
Originally doing manual payments which ptp is apart of





### **PTP Configuration Workflow Notes**


**OA (Over Achievers) Team Discussion with Rhea**

- Pending topic — consider using this time to clarify the PTP (Promise to Pay) configuration workflow or any blockers.


Ask what triggers the step function

#### **1. Data Lambda: Understanding and Access**

- Goal: Walk through how to access data from the data lambda.
- Scope: Includes codebase navigation and using the dev console.
- Objective: Understand how to pull contract data.


#### **2. Data Flow Logic**

- Pull **contract** from data lambda.
- **Check:** `contract.status === "enrolled"`
- If enrolled:

This process can be a lambda or something else ask bobby what he is doing around his data after getting it from data lambda from contracts into his step function
    
- Extract `draftScheduledPayments` from the contract:
	
	- This will be a list of scheduled contract payments.
		
	- Key fields: `paymentDate`, `paymentAmount`
            
- Use this list to build input for the **RT Payment Scheduler Lambda**.
    


#### **3. Integration with RT Payment Scheduler**
Create new list with this data that has to include the stuff below and what ever else stuff 
- **Input Needed:**  
    this a list of ptp this is not the exact full input:
    
    ```json
    { 
      paymentDate: string, 
      paymentAmount: number 
    }
    ```

ending output could maybe include these two fields since things aren't finalized


- **Step Function Responsibilities:**
    
    - Send the input to the RT Payment Scheduler lambda.
    - Handle errors per payment request.
    - Await response with status fields.



#### **4. Response Handling**

there will be a list of multiple scheduled payments meaning more then one ptp

- Expected fields in response from payment RT for every PTP in the list sent an API call is made in RT Payment that can fail or pass those results are routed to created and failed promise:
- top 4 will be included in step function output    
    ```json
    {
      result: "SUCCESS" | "ERROR" | "PARTIAL_SUCCESS",
      hasPromiseToPayError: boolean,
      createdPromiseToPays: [{ date, amount }],
      failedPromiseToPays: [{ date, amount }],

	// other stuff in the body not required
      autoPayConfirmationCode: string, // autoPaySeriesId
      oneTimePaymentConfirmationCode: string, // NOT paymentId
      hasOneTimePaymentError: boolean,
      hasAutoPayError: boolean
    }
    ```
    



#### **5. Design Questions / Unknowns**

- **Clarify with RT Team:**
    
    - Is the **RT Payment Scheduler** fully developed or still in progress?
    - What should the **input format** look like?




