---
tags:
  - gym
  - bjj
  - mauyThai
  - favorite
author:
  - gitUserNamePlaceHolder
banner: "![[weight-lifting-anime-mashle-funny-workout-dve2194rciuyep9p.gif]]"
banner_y: 
banner_x: NaN
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---

#todo/Med/Dev 
- [ ] Revisit [Data Visualization](https://www.youtube.com/watch?v=djj7QXZAIjM) and edit chart switch to table with current top exercises of focus 



```chart
type: bar
id: main
labels: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
series:
  - title: Title 1
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  - title: Title 2
    data: [5, 4, 3, 2, 1, 0, -1, -2, -3]
```


Experimental Button That Generates files
```dataviewjs
let pages = dv.pages("#workouts").where(b => b.date_of_workout >= DateTime.now().minus({weeks:1})).groupBy(b => b.date_of_workout)

for (let group of pages.sort(d => d.key, 'desc')) { 
	dv.header(6, group.key);
	dv.table(["File", "Exercise", "Set", "Reps", "Time", "Weight"], 
		group.rows 
			.sort(k => k.type, 'asc')
			.map(k => [k.file.link, k["exercise"], k["sets"], k["reps"], k["time"], k["weight"]]))
}
```
```button
name Add Exercise
type command
action QuickAdd: Add Exercise
color purple
```
^button-l21b



| Exercise                            | Old Weight | Weight | Body  | Type       | Body Part               | Position   | Sets | Reps | Priority |
| ----------------------------------- | ---------- | ------ | ----- | ---------- | ----------------------- | ---------- | ---- | ---- | -------- |
| Pallof Press                        | 20         | 30     | Core  | Cable      | Obliques Side Abdominal | _Middle    | 4    | 8    | _Highest |
| Deadlift                            | 40         | 50     | Full  | Barbell    | Multi                   | Standing   | 4    | 8    | _Highest |
| Power Sled                          | 40         | 50     | Full  | Sled       | Multi                   | Standing   | 4    | 8    | _Highest |
| Bench Press                         | 30         | 40     | Upper | Barbell    | Chest                   | Incline    | 4    | 8    | _Highest |
| Bench Press                         | 10         | 15     | Upper | Dumbbell   | Chest                   | Incline    | 4    | 8    | _Highest |
| Single Arm Back Cable Lateral Raise | 10         | 10     | Upper | Cable      | Shoulder                | _Low Angle | 4    | 8    | _Highest |
| Mid Row                             | 145        | 165    | Upper | Fixed      | Back Lats               | Seated     | 4    | 8    | _Highest |
| Rear Delt Fly                       | 60         | 70     | Upper | Fixed      | Shoulder Delt           | Seated     | 4    | 8    | _Highest |
| Single Arm Plate Pull Down          | 45         | 65     | Upper | Fixed      | Back Lats               | Seated     | 4    | 8    | _Highest |
| Arnold Press                        | 10         | 20     | Upper | Dumbbell   | Shoulder                | Standing   | 4    | 8    | _Highest |
| Zottman Curls                       | 10         | 15     | Upper | Dumbbell   | Biceps                  | Standing   | 4    | 8    | _Highest |
| Bottoms Up                          | 17.6       | 20     | Upper | Kettlebell | Multi                   | Standing   | 4    | 8    | _Highest |
| Chest Press                         | 50         | 60     | Upper | Fixed      | Chest                   | Wide       | 4    | 8    | _Highest |
^main


