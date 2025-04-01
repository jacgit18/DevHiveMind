
```javascript
let userInput = prompt("Please enter something:");  

console.log("User input:", userInput);
```


```handwritten-ink
{
	"versionAtEmbed": "0.3.3",
	"filepath": "_NoteAssets/Images To Move/Ink/Writing/2025.2.2 - 8.42am.writing"
}
```



### Deployment strategies

With Lambda traffic shifting, you can send a small subset of traffic to your newest function version while keeping the majority of incoming production traffic to your old, stable version. Some of the following deployment strategies use traffic shifting. Traffic shifting helps you validate that your new Lambda version works as expected, before sending all production traffic to it.

To learn more, expand each of the following three categories.







