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
The Composition API and Options API are two different approaches to writing components in Vue.js. While both achieve the same goal—building reactive and reusable components—they differ in their syntax and the way they organize code. Here's an explanation of both, including their differences and use cases:  
  
### Options API  
  
The Options API is the traditional way of defining components in Vue. It organizes the component code by options (like `data`, `methods`, `computed`, `watch`, and lifecycle hooks).  
  
#### Example:  
  
```javascript  
<template>  
<div>  
<p>{{ message }}</p>  
<button @click="increment">Increment</button>  
<p>Count: {{ count }}</p>  
</div>  
</template>  
  
<script>  
export default {  
data() {  
return {  
message: 'Hello Vue!',  
count: 0,  
};  
},  
methods: {  
increment() {  
this.count += 1;  
},  
},  
};  
</script>  
```  
  
#### Characteristics:  
- **Structure**: Organized by options (`data`, `methods`, `computed`, etc.).  
- **Readability**: Easy for newcomers to understand because it's declarative.  
- **Scalability**: Can become less manageable in large components because logic related to a specific feature can be spread across multiple options.  
  
### Composition API  
  
The Composition API was introduced in Vue 3. It allows developers to organize component logic based on feature rather than options, using functions like `setup`, `reactive`, `ref`, and others.  
  
#### Example:  
  
```javascript  
<template>  
<div>  
<p>{{ message }}</p>  
<button @click="increment">Increment</button>  
<p>Count: {{ count }}</p>  
</div>  
</template>  
  
<script>  
import { ref } from 'vue';  
  
export default {  
setup() {  
const message = ref('Hello Vue!');  
const count = ref(0);  
  
const increment = () => {  
count.value += 1;  
};  
  
return {  
message,  
count,  
increment,  
};  
},  
};  
</script>  
```  
  
#### Characteristics:  
- **Structure**: Organized by feature, using the `setup` function.  
- **Readability**: Initially harder for newcomers, but improves clarity in larger components by grouping related logic together.  
- **Scalability**: Better for larger components and complex logic. Facilitates the reuse of logic across different components via composition functions.  
  
### Key Differences  
  
1. **Organization**:  
- **Options API**: Groups code by options (data, methods, computed, etc.).  
- **Composition API**: Groups code by feature, within the `setup` function.  
  
2. **Reactivity**:  
- **Options API**: Uses `data` for reactive state, `computed` for derived state, and `methods` for functions.  
- **Composition API**: Uses `ref` and `reactive` for reactive state, and functions inside `setup` for logic.  
  
3. **Code Reusability**:  
- **Options API**: Reuses logic through mixins and higher-order components, which can lead to namespace collisions and less clear code.  
- **Composition API**: Promotes reusable logic through composition functions, which are easier to manage and understand.  
  
4. **Learning Curve**:  
- **Options API**: Easier for beginners due to its declarative nature.  
- **Composition API**: More flexible and powerful, but requires understanding of JavaScript's reactive system and a different way of thinking about component structure.  
  
### When to Use Which  
  
- **Options API**: Suitable for simpler applications or for developers and teams who are already comfortable with Vue 2.x.  
- **Composition API**: Recommended for larger applications, projects that require highly reusable logic, or when using Vue 3 features extensively.  
  
### Example Comparison  
  
#### Options API Example:  
  
```javascript  
<template>  
<div>  
<p>{{ fullName }}</p>  
<button @click="incrementAge">Increment Age</button>  
</div>  
</template>  
  
<script>  
export default {  
data() {  
return {  
firstName: 'John',  
lastName: 'Doe',  
age: 30,  
};  
},  
computed: {  
fullName() {  
return `${this.firstName} ${this.lastName}`;  
},  
},  
methods: {  
incrementAge() {  
this.age += 1;  
},  
},  
};  
</script>  
```  
  
#### Composition API Example:  
  
```javascript  
<template>  
<div>  
<p>{{ fullName }}</p>  
<button @click="incrementAge">Increment Age</button>  
</div>  
</template>  
  
<script>  
import { ref, computed } from 'vue';  
  
export default {  
setup() {  
const firstName = ref('John');  
const lastName = ref('Doe');  
const age = ref(30);  
  
const fullName = computed(() => `${firstName.value} ${lastName.value}`);  
  
const incrementAge = () => {  
age.value += 1;  
};  
  
return {  
firstName,  
lastName,  
age,  
fullName,  
incrementAge,  
};  
},  
};  
</script>  
```  
  
In conclusion, the Options API and Composition API offer different approaches to writing Vue components. The Options API is straightforward and suitable for smaller components, while the Composition API provides more flexibility and is better suited for larger applications with complex logic.