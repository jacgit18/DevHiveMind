---
tags: 
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
Two-way binding in Vue.js allows you to establish a connection between the data in your Vue instance and the user interface (UI), so that when the data changes, the UI updates automatically, and vice versa. There are a couple of ways to achieve two-way binding in Vue.js:  
  
1. **Using `v-model` Directive**: The `v-model` directive creates a two-way binding on form input elements and custom components. It automatically picks the correct way to update the element based on the input type.  
  
2. **Using `v-bind` and `v-on` Directives Explicitly**: You can achieve two-way binding manually by using `v-bind` to bind the value of an input element to a data property and `v-on` (or its shorthand `@`) to listen for input events and update the data property accordingly.  
  
Here's an example of both methods:  
  
```html  
<!DOCTYPE html>  
<html lang="en">  
<head>  
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
<title>Vue Two-Way Binding</title>  
<script src="[https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js](https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js)"></script>  
</head>  
<body>  
  
<div id="app">  
<!-- Using v-model directive -->  
<input type="text" v-model="message">  
<p>{{ message }}</p>  
  
<!-- Using v-bind and v-on directives -->  
<input type="text" :value="message2" @input="updateMessage2($event)">  
<p>{{ message2 }}</p>  
</div>  
  
<script>  
new Vue({  
el: '#app',  
data: {  
message: '', // Data property for v-model  
message2: '' // Data property for manual two-way binding  
},  
methods: {  
updateMessage2(event) {  
this.message2 = event.target.value;  
}  
}  
});  
</script>  
  
</body>  
</html>  
```  
  
In this example:  
- The first input field uses `v-model` to bind the input value directly to the `message` data property.  
- The second input field uses `v-bind` (`:`) to bind the value of the input to the `message2` data property and `v-on` (`@`) to listen for the `input` event, triggering the `updateMessage2` method to update the `message2` property accordingly.  
  
Both methods achieve two-way binding, automatically updating the data when the input value changes and updating the input value when the data changes.