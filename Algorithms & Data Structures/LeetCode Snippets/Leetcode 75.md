---
tags:
  - codeSnippet
  - twoPointer
  - pattern
author:
  - jacgit18
  - chatgpt
Comments: This is a coded snippet
Status: Done
Started: 2024-03-03
EditDate: 2024-03-03
Relates: "[[Mind Maps/Leetcode 75|Leetcode 75]]"
---
## Attempt
```javascript
function sortArray(nums) {
    let left = 0;
    let right = nums.length - 1;
    let index = 0;

    while (left < right) {
        // Swap if left is greater than or equal to right
        if (nums[left] >= nums[right]) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;

        } else if (nums[right] > nums[left]) { // This condition seems redundant due to the while loop's logic
            left++;
        }

        // Additional swaps based on the index value
        if (nums[index] > nums[left]) {
            [nums[index], nums[left]] = [nums[left], nums[index]];
        }

        if (nums[index] > nums[right]) {
            [nums[right], nums[index]] = [nums[index], nums[right]];
        }

        index++;
    }
}

```



## Alt Logic
```javascript
function sortColors(nums) {
    let left = 0; // Pointer for 0s
    let right = nums.length - 1; // Pointer for 2s
    let i = 0; // Current element pointer

    while (i <= right) {
        if (nums[i] === 0) {
            // If current element is 0, swap it with the element at the left pointer
            [nums[i], nums[left]] = [nums[left], nums[i]];
            left++; // Move left pointer to the right
            i++; // Move current pointer to the right
        } else if (nums[i] === 2) {
            // If current element is 2, swap it with the element at the right pointer
            [nums[i], nums[right]] = [nums[right], nums[i]];
            right--; // Move right pointer to the left
            // Note: We don't increment i here because the swapped element at index i might be 0 or 1 and needs to be evaluated
        } else {
            // If current element is 1, simply move to the next element
            i++;
        }
    }
}
```

Ask yourself how many swap checks 
makes sense
## Explained
Alright, imagine you have a bunch of colorful balls, and you want to arrange them in a certain order. You have red balls (represented by 0), blue balls (represented by 1), and green balls (represented by 2).

Now, we want to organize these balls in such a way that all the red balls are on the left side, followed by the blue balls, and then the green balls on the right side.

So, we have three baskets: one for red balls (left), one for blue balls (middle), and one for green balls (right). Our goal is to sort these balls by moving them into the correct baskets.

Here's how we do it step by step:

1. **Create Pointers:** We have two special friends, one standing on the left side and the other on the right side. They are helping us organize the balls. Let's call them Lefty and Righty.

2. **Start Sorting:** Now, we go through each ball one by one (represented by the `i` variable).

3. **If it's a Red Ball (0):** If the ball is red, we quickly swap it with the ball that Lefty is pointing to. Lefty then takes a step to the right, and we also move our finger (i) to the next ball.

4. **If it's a Green Ball (2):** If the ball is green, we do a similar swap with the ball that Righty is pointing to. But, we don't move our finger (i) immediately because the ball we swapped might be red or blue. We leave it for the next round to check.

5. **If it's a Blue Ball (1):** If the ball is blue, we just move our finger to the next ball without any swapping. No need to involve Lefty or Righty for blue balls.

6. **Keep Going:** We repeat these steps until our finger (i) reaches the same spot as Righty. That means we've checked and organized all the balls.

By doing this, we cleverly use Lefty and Righty to put the red balls on the left, green balls on the right, and blue balls in the middle, just like magic! And that's how we sort these colorful balls using a cool trick in our code.