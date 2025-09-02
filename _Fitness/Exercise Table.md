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
![](https://www.youtube.com/watch?v=djj7QXZAIjM)
```chart
type: bar
id: all
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

## Stats

#todo/Med/Dev 
- [ ] Revisit and edit chart switch to table with current top exercises of focus


find for stretches


- [[Plyometrics#^8a3d01|ISO Calf Raise with Lunge]]
- [[Plyometrics#^58f942|Lunge ISO Heel Raise]]




![Incline Dumbbell Row - YouTube](https://www.youtube.com/watch?v=tZUYS7X50so&list=WL&index=10) ^4b1e6d



Reverse Preacher Curl(3:14)


![The ONLY 2 Exercises You Need For Massive Arms - YouTube](https://youtu.be/WvlDMlMx1Ok?si=zkQUEy6z-KkU5OqJ&t=196)

- Single Arm Incline Preacher Curl ^6d88c7
	- ![Incline Bench Preacher Curl - YouTube](https://www.youtube.com/watch?v=02TvQZiVdic)

No green band or use something tighter or move higher up leg for deadlift

[Reverse Preacher Curl](https://youtu.be/h8LVaKRAFY0?si=ix3lKao_fRA33nqU)


[KB Cossack Squat](https://www.youtube.com/watch?v=hDIiCBIM6tE)


Lat/Plate Pull down 65

Mid Row 165


[Kettlebell Snatch](https://www.youtube.com/embed/Pm-b2XFeABA?feature=oembed)

[Seated Cable Row](https://www.youtube.com/watch?v=UCXxvVItLoM&list=TLPQMTUxMjIwMjSCoRXDSuxPzQ&index=9)

[Curtsy Lunge](https://www.youtube.com/watch?v=RvDcKx9KsD8)

[Halo Lunge Twist](https://www.youtube.com/watch?v=kt97CnwNZrE&list=TLPQMTUxMjIwMjSqjLz-Yp-KTQ&index=3)

[Shin Splints Stretches And Exercises - Feel Better FAST! - YouTube](https://youtu.be/olpUrL-w2qg?si=MqXCdiId_KdLBn2I)


[🎥 Reverse Hyperextensions - Incline Bench - YouTube](https://www.youtube.com/watch?v=Vr3FYsX6zRE)

[Glute ham raise on back extension - YouTube](https://www.youtube.com/watch?v=-DLrUNl30U4)



[Hanging Knee Raise - YouTube](https://youtu.be/RD_A-Z15ER4?si=sgl3EuUCG3gCZl60)

[How To Perform HAMMER CURLS \| Biceps Exercise Tutorial - YouTube](https://youtu.be/BRVDS6HVR9Q?si=1ZzT73ed4fM-vwLt) 

[CONCENTRATION CURL - YouTube](https://youtu.be/VMbDQ8PZazY?si=P0KE-GIfGr7KOoto) 

- [14 Calisthenics Exercises on Gymnastics Rings](https://www.gornation.com/blogs/news/exercises-gymnastics-rings) 






| Old Weight | Weight | Sets | Reps | Priority | Type    | Body   | Body Part                    | Exercise                                | Tried | Position  | Bands Orientation        | Range   | Focus           |
| ---------- | ------ | ---- | ---- | -------- | ------- | ------ | ---------------------------- | --------------------------------------- | ----- | --------- | ------------------------ | ------- | --------------- |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Bottom | Front Mid Delts/Traps        | Scarecrow raises                        | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Bottom | Hamstring                    | Single Leg Deadlift                     | Yes   | Standing  | Front Leg                | **N/A** | CM              |
| 10         | 30     | 4    | 8    | _Highest | Bands   | Bottom | Quads Ham Glutes             | Squats                                  | Yes   | Standing  | Shoulder Width           | **N/A** | CM              |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Bottom | Hamstring                    | Stiff Leg Deadlift                      | Yes   | Standing  | Wide Pull Middle         | **N/A** | CM/Anti Flexion |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Bottom | Quads Ham Glutes Inner Thigh | Sumo squat                              | Yes   | Standing  | Wide Pull Middle         | **N/A** | CM              |
| 0          | 0      | 4    | 8    | _Highest | Bands   | Full   | QHGCOD                       | [[Plyometrics#^ab16e7\|Squats & Reach]] | Yes   | Standing  | Bow & Arrow Hands        | **N/A** | CM              |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Upper  | Inner Chest                  | Alternating Cross-body Chest Fly        | Yes   | Standing  | Wide                     | **N/A** | CM              |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Upper  | Top Chest                    | Angled Chest Wide Fly                   | Yes   | Standing  | Lunge Back Leg           | 4       | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Biceps Long Head             | Drag Curl                               | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Back Rear Delts              | Face pulls                              | Yes   | Grounded  | Above Ankle Under Foot   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Shoulder                     | Front & lateral raise                   | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Front Mid Delts              | Front/Lateral Raise                     | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 20         | 30     | 4    | 8    | _Highest | Bands   | Upper  | M of Chest                   | Hex Chest Press                         | Yes   | Standing  | Wide                     | 4       | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Tricep Long Head             | Overhead Tricep extensions              | Yes   | Standing  | Back Leg                 | **N/A** | CM              |
| 10         | 30     | 4    | 8    | _Highest | Bands   | Upper  | Forearm                      | Squatting forearm curls                 | Yes   | Standing  | U Under Feet             | **N/A** | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Front Mid Delts/Traps        | Upright row                             | Yes   | Standing  | Wide Pull Middle         | **N/A** | CM              |
| 10         | 20     | 4    | 8    | _Highest | Bands   | Upper  | Front Lateral Delts/Traps    | V-raise                                 | Yes   | Standing  | Narrow Cross             | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Bottom | Calf                         | Calf presses                            | Yes   | Standing  | Close Ball of Foot       | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Bottom | Ham Glutes Outer Thigh       | Drop curtsy lunges                      | Yes   | Standing  | Front Leg                | **N/A** | CM              |
| 30         | 30     | 4    | 8    | High     | Bands   | Bottom | Quad                         | Single Leg Extension                    | Yes   | Grounded  | Single Hold              | 0       | CM              |
| 30         | 30     | 4    | 8    | High     | Bands   | Bottom | Quad                         | Single Leg Extension                    | Yes   | Standing  | Single Hold              | 0       | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Core   | Abdominal                    | Core Lifting Oblique Pulls              | Yes   | Standing  | Kneeling Front Leg Lunge | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Forearm                      | Band roll-ups & unrolls                 | Yes   | Standing  | On Handles               | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Back Rear Delt               | Bent-over back fly                      | Yes   | Standing  | Narrow Cross             | **N/A** | CM              |
| 120        | 30     | 4    | 8    | High     | Bands   | Upper  | Mid Back                     | Crank-the-mower row                     | Yes   | Standing  | Lunge Front              | **N/A** | CM              |
| 10         | 30     | 4    | 8    | High     | Bands   | Upper  | Biceps Brachialis            | Hammer Curls                            | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Tricep                       | Lying Tricep extensions                 | Yes   | Grounded  | Across Behind Yank       | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Chest                        | Push Up                                 | Yes   | Grounded  | Around Back              | 0       | CM              |
| 20         | 30     | 4    | 8    | High     | Bands   | Upper  | Biceps Brachialis            | Reverse-grip curl                       | Yes   | Standing  | Above Ankle Under Foot   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Tricep Lateral Head          | Tricep kickbacks                        | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | High     | Bands   | Upper  | Back Bicep                   | Underhand Row                           | Yes   | Grounded  | Above Ankle Under Foot   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | Low      | Bands   | Bottom | Abductors Glutes             | Kick-outs                               | Yes   | Standing  | Narrow Cross             | **N/A** | CM              |
| 10         | 30     | 4    | 8    | Low      | Bands   | Upper  | Biceps Long Head             | Kneeling concentration curl             | Yes   | Standing  | Lunge Front Leg          | **N/A** | CM              |
| 10         | 30     | 4    | 8    | Low      | Bands   | Upper  | Biceps                       | Standard Curl                           | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | Med      | Bands   | Bottom | Glutes                       | Donkey kicks                            | Yes   | Grounded  | Single Leg Hand L        | **N/A** | CM              |
| 10         | 20     | 4    | 8    | Med      | Bands   | Bottom | Quads Ham Glutes             | Lunges                                  | Yes   | Standing  | Lunge Front Leg          | **N/A** | CM              |
| 10         | 20     | 4    | 8    | Med      | Bands   | Core   | Obliques Side Abdominal      | Side Dips                               | Yes   | Standing  | Same Side Straight       | **N/A** | CM              |
| 10         | 30     | 4    | 8    | Med      | Bands   | Upper  | Biceps Long Head             | Close Curl                              | Yes   | Standing  | Narrow                   | **N/A** | CM              |
| 10         | 20     | 4    | 8    | Med      | Bands   | Upper  | Tricep                       | Overhand Row                            | Yes   | Grounded  | Above Ankle Under Foot   | **N/A** | CM              |
| 10         | 30     | 4    | 8    | Med      | Bands   | Upper  | Biceps Long Head             | Squatting Concentration Curl            | Yes   | Standing  | Same side Leg            | **N/A** | CM              |
| 10         | 30     | 4    | 8    | Med      | Bands   | Upper  | Biceps Short Head            | Squatting preacher curl                 | Yes   | Standing  | U Under Feet             | **N/A** | CM              |
| 20         | 30     | 4    | 8    | Med      | Bands   | Upper  | Back Rear Delt               | Standing back fly                       | Yes   | Standing  | Hands                    | **N/A** | CM              |

^all


