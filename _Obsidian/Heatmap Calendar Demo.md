```dataviewjs  
dv.span("**🏋️ Proudness 🏋️**")  
const calendarData = {  
colors: {  
greeny: ["#330000", "#4C0000", "#660000", "#800000", "#990000", "#CC0000", "#FF3333", "#FF6666", "#FF8080", "#FF9999"]
},  
entries: []  
}  
for(let page of dv.pages('"Review/Daily"').where(p=>p.Proudness)){  
calendarData.entries.push({  
date: page.file.name,  
intensity: page.Proudness,  
content: await dv.span(`[](${page.file.name})`), //for hover preview  
})  
}  
renderHeatmapCalendar(this.container, calendarData) 
```

---


---
