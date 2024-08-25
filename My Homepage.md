---
banner: "https://ambcrypto.com/blog/wp-content/uploads/2023/05/Midjourney-blog-ft-compressed.jpg"
banner_y: 0.58
---
`BUTTON[daily-note]` 🪴 `BUTTON[weekly-note]` 🪴 `BUTTON[light-mode, dark-mode]` 🪴 `BUTTON[tasks]`
> [!multi-column]
> 
> ```dataviewjs
> let goals = dv.pages('"Review/Goals"');
> dv.table(["Goal", "Deadline", "Progress"],
>     goals.map(goal => [
>         `<span style="font-size: 1.2em;">${goal.file.link}</span>`,
>         goal.Deadline,
>         `<progress value="${goal.progress}" max="${goal.target}"></progress><br>${Math.round((goal.progress / goal.target) * 100)}% completed`
>     ])
> );
> dv.container.classList.add("cards-align-top");
> ```
> 
> ```dataviewjs
> const pages = dv.pages('"Review/Daily"')
>   .where((p) => "Writing" in p || "Workout" in p || "Reading" in p)
>   .sort((p) => p.file.day, "desc")
>   .map((p) =>
>     Object.create({
>       link: p.file.link,
>       day: p.file.day,
>       Writing: p.Writing,
>       Workout: p.Workout,
>       Reading: p.Reading,
>     })
>   );
> function getStreak(validate) {
>   let count = 0;
>   for (const note of pages) {
>     if (validate(note)) count++;
>     else break;
>   }
>   return count;
> }
> function getRecord(validate) {
>   let record = 0;
>   let count = 0;
>   for (const note of pages) {
>     if (validate(note)) {
>       count++;
>       record = Math.max(record, count);
>     } else {
>       count = 0;
>     }
>   }
>   return record;
> }
> const done = "✅";
> const skip = "🟥";
> const fileRows = pages
>   .filter((p) => p.day >= moment().subtract(1, "w"))
>   .sort((p) => p.day)
>   .map((note) => [
>     note.link,
>     note.Writing ? done : skip,
>     note.Workout ? done : skip,
>     note.Reading ? done : skip,
>   ]);
> const writing = [
>   getStreak((note) => note.Writing),
>   getRecord((note) => note.Writing),
> ];
> const workout = [
>   getStreak((note) => note.Workout),
>   getRecord((note) => note.Workout),
> ];
> const reading = [
>   getStreak((note) => note.Reading),
>   getRecord((note) => note.Reading),
> ];
> dv.table(
>   ["Habits", "✍🏼", "💪🏼", "📖"],
>   [
>     ...fileRows,
>     ["‎"],
>     ["**Streak**", writing[0], workout[0], reading[0]],
>     ["**Record**", writing[1], workout[1], reading[1]],
>   ]
> );
> ```

---




- ### Satisfaction #mcl/list-card 
	```dataviewjs  
	dv.span("**🏋️ Proudness 🏋️**")  
	const calendarData = {  
	colors: {  
	greeny: ["#B3FFD9", "#99FFC2", "#66FFB2", "#33FF99", "#00CC66"]
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

> [!success]+ Remember
> **Even if we only did what we were capable of, we'd astound ourselves.** 
---



- #### Projects #mcl/list-card 
    - [[Project 1]]
    - [[Project 2]]
    - [[project 3]]
        - Collaboration 
- #### Learning & System
    - [[00 Home|Learning Goal 1]]
    - [[00 Home|Initiative 1]]
    - [[00 Home|Initiative 2]]
- #### Personal
    - **[[Goal Dashboard|Goals]]**
    - **[[Tasks Calendar|Calendar]]**


> [!multi-column]
> > [!summary] Recently Created
>>  ```dataview
> list
> from ""
> Sort file.ctime DESC
> limit 7
> 
>> [!Todo] Recently Updated
>>  ```dataview
>> 	list
>> 	from ""
>> 	Sort file.mtime DESC
>> 	limit 7
>>```
---
```meta-bind-button
style: primary
label: Open Daily Note
hidden: true
id: daily-note
action:
  type: command
  command: daily-notes
```

```meta-bind-button
style: primary
hidden: true
label: Open Weekly Note
id: weekly-note
action:
  type: command
  command: periodic-notes:open-weekly-note
```

```meta-bind-button
style: destructive
label: View Tasks
hidden: true
id: tasks
action:
  type: command
  command: card-board:open-card-board-plugin-0
```
---

```meta-bind-button
style: destructive
label: Light Mode
id: light-mode
hidden: true
actions:
  - type: command
    command: theme:use-light
```
```meta-bind-button
style: primary
label: Dark Mode
id: dark-mode
hidden: true
actions:
  - type: command
    command: theme:use-dark
```

