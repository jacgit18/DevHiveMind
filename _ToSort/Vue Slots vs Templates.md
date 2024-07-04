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
Using templates with `#` (known as template refs) over `slot` in Vue.js allows for a more flexible and powerful way to manage content distribution within components. This method leverages Vue's `v-slot` directive for named slots, providing clear and maintainable code for complex component structures.

### Understanding Slots and Template Refs in Vue.js

In Vue.js, slots are placeholders in a component where you can pass content from the parent scope into the child component. Named slots and scoped slots are advanced features that help manage this content distribution more effectively.

### Basic Slot Example

A basic slot example involves a parent component passing content to a child component using a slot:

**Child Component (MyComponent.vue):**
```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

**Parent Component:**
```vue
<template>
  <MyComponent>
    <p>This is passed from the parent</p>
  </MyComponent>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
};
</script>
```

### Named Slots

Named slots allow you to define multiple slots and specify which content goes into each slot:

**Child Component (MyComponent.vue):**
```vue
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

**Parent Component:**
```vue
<template>
  <MyComponent>
    <template v-slot:header>
      <h1>Header Content</h1>
    </template>
    <p>Main Content</p>
    <template v-slot:footer>
      <p>Footer Content</p>
    </template>
  </MyComponent>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
};
</script>
```

### Scoped Slots

Scoped slots allow you to pass data from the child component to the parent, making the content inside the slot dynamic and reactive:

**Child Component (MyComponent.vue):**
```vue
<template>
  <div>
    <slot :message="message"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from child'
    };
  }
};
</script>
```

**Parent Component:**
```vue
<template>
  <MyComponent>
    <template v-slot:default="slotProps">
      <p>{{ slotProps.message }}</p>
    </template>
  </MyComponent>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
};
</script>
```

### Using Template with `#` Syntax

Vue 2.6+ introduced shorthand syntax for named slots, making the code more concise. The `v-slot` directive can be abbreviated with `#`.

**Child Component (MyComponent.vue):**
```vue
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

**Parent Component:**
```vue
<template>
  <MyComponent>
    <template #header>
      <h1>Header Content</h1>
    </template>
    <p>Main Content</p>
    <template #footer>
      <p>Footer Content</p>
    </template>
  </MyComponent>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent
  }
};
</script>
```

### Practical Example with Multiple Slots and Scoped Slots

**Child Component (Card.vue):**
```vue
<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot :title="title" :content="content"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Card Title',
      content: 'Card Content'
    };
  }
};
</script>

<style>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
```

**Parent Component:**
```vue
<template>
  <Card>
    <template #header>
      <h1>Custom Header</h1>
    </template>
    <template #default="{ title, content }">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </template>
    <template #footer>
      <button>Custom Footer Button</button>
    </template>
  </Card>
</template>

<script>
import Card from './Card.vue';

export default {
  components: {
    Card
  }
};
</script>
```

In this example:
- **Named Slots** (`#header` and `#footer`) allow for custom content in the card's header and footer.
- **Scoped Slots** (`#default="{ title, content }"`) allow the parent component to use data (`title` and `content`) provided by the child component.

### Conclusion

Using `v-slot` and its shorthand `#` syntax in Vue.js for templates offers a powerful way to manage and distribute content within components. This approach enhances the flexibility and readability of your Vue.js applications, making it easier to build complex and dynamic user interfaces.