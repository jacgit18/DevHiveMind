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


[KB Cossack Squat](https://www.youtube.com/watch?v=hDIiCBIM6tE)


Lat Pull down


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






| Exercise                         | Old Weight | Weight | Sets | Reps | Priority | Type                        | Body   | Body Part                         | Exercise                                                                  | Tried | Position                              | Bands Orientation        | Range   | Focus           |
| -------------------------------- | ---------- | ------ | ---- | ---- | -------- | --------------------------- | ------ | --------------------------------- | ------------------------------------------------------------------------- | ----- | ------------------------------------- | ------------------------ | ------- | --------------- |
| Scarecrow raises                 | 10         | 20     | 4    | 8    | _Highest | Bands                       | Bottom | Front Mid Delts/Traps             | Scarecrow raises                                                          | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Single Leg Deadlift              | 20         | 30     | 4    | 8    | _Highest | Bands                       | Bottom | Hamstring                         | Single Leg Deadlift                                                       | Yes   | Standing                              | Front Leg                | **N/A** | CM              |
| Squats                           | 10         | 30     | 4    | 8    | _Highest | Bands                       | Bottom | Quads Ham Glutes                  | Squats                                                                    | Yes   | Standing                              | Shoulder Width           | **N/A** | CM              |
| Stiff Leg Deadlift               | 20         | 30     | 4    | 8    | _Highest | Bands                       | Bottom | Hamstring                         | Stiff Leg Deadlift                                                        | Yes   | Standing                              | Wide Pull Middle         | **N/A** | CM/Anti Flexion |
| Sumo squat                       | 20         | 30     | 4    | 8    | _Highest | Bands                       | Bottom | Quads Ham Glutes Inner Thigh      | Sumo squat                                                                | Yes   | Standing                              | Wide Pull Middle         | **N/A** | CM              |
| Squats & Reach                   | 0          | 0      | 4    | 8    | _Highest | Bands                       | Full   | QHGCOD                            | [[Plyometrics#^ab16e7\|Squats & Reach]]                                   | Yes   | Standing                              | Bow & Arrow Hands        | **N/A** | CM              |
| Alternating Cross-body Chest Fly | 20         | 30     | 4    | 8    | _Highest | Bands                       | Upper  | Inner Chest                       | Alternating Cross-body Chest Fly                                          | Yes   | Standing                              | Wide                     | **N/A** | CM              |
| Angled Chest Wide Fly            | 20         | 30     | 4    | 8    | _Highest | Bands                       | Upper  | Top Chest                         | Angled Chest Wide Fly                                                     | Yes   | Standing                              | Lunge Back Leg           | 4       | CM              |
| Drag Curl                        | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Biceps Long Head                  | Drag Curl                                                                 | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Face pulls                       | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Back Rear Delts                   | Face pulls                                                                | Yes   | Grounded                              | Above Ankle Under Foot   | **N/A** | CM              |
| Front & lateral raise            | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Shoulder                          | Front & lateral raise                                                     | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Front/Lateral Raise              | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Front Mid Delts                   | Front/Lateral Raise                                                       | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Hex Chest Press                  | 20         | 30     | 4    | 8    | _Highest | Bands                       | Upper  | M of Chest                        | Hex Chest Press                                                           | Yes   | Standing                              | Wide                     | 4       | CM              |
| Overhead Tricep extensions       | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Tricep Long Head                  | Overhead Tricep extensions                                                | Yes   | Standing                              | Back Leg                 | **N/A** | CM              |
| Squatting forearm curls          | 10         | 30     | 4    | 8    | _Highest | Bands                       | Upper  | Forearm                           | Squatting forearm curls                                                   | Yes   | Standing                              | U Under Feet             | **N/A** | CM              |
| Upright row                      | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Front Mid Delts/Traps             | Upright row                                                               | Yes   | Standing                              | Wide Pull Middle         | **N/A** | CM              |
| V-raise                          | 10         | 20     | 4    | 8    | _Highest | Bands                       | Upper  | Front Lateral Delts/Traps         | V-raise                                                                   | Yes   | Standing                              | Narrow Cross             | **N/A** | CM              |
| Zottman Curls                    | 10         | 30     | 4    | 8    | _Highest | Bands                       | Upper  | Biceps Brachialis Brachioradialis | Zottman Curls                                                             | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Calf presses                     | 10         | 20     | 4    | 8    | High     | Bands                       | Bottom | Calf                              | Calf presses                                                              | Yes   | Standing                              | Close Ball of Foot       | **N/A** | CM              |
| Drop curtsy lunges               | 10         | 20     | 4    | 8    | High     | Bands                       | Bottom | Ham Glutes Outer Thigh            | Drop curtsy lunges                                                        | Yes   | Standing                              | Front Leg                | **N/A** | CM              |
| Single Leg Extension             | 30         | 30     | 4    | 8    | High     | Bands                       | Bottom | Quad                              | Single Leg Extension                                                      | Yes   | Grounded                              | Single Hold              | 0       | CM              |
| Single Leg Extension             | 30         | 30     | 4    | 8    | High     | Bands                       | Bottom | Quad                              | Single Leg Extension                                                      | Yes   | Standing                              | Single Hold              | 0       | CM              |
| Core Lifting Oblique Pulls       | 10         | 20     | 4    | 8    | High     | Bands                       | Core   | Abdominal                         | Core Lifting Oblique Pulls                                                | Yes   | Standing                              | Kneeling Front Leg Lunge | **N/A** | CM              |
| Russian Twists                   | 10         | 20     | 4    | 8    | High     | Bands                       | Core   | Abdominal                         | [[Core#^c16b16 \|Russian Twists]]                                         | Yes   | Grounded                              | Under Foot               | **N/A** | CM/RC           |
| Band roll-ups & unrolls          | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Forearm                           | Band roll-ups & unrolls                                                   | Yes   | Standing                              | On Handles               | **N/A** | CM              |
| Bent-over back fly               | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Back Rear Delt                    | Bent-over back fly                                                        | Yes   | Standing                              | Narrow Cross             | **N/A** | CM              |
| Crank-the-mower row              | 120        | 30     | 4    | 8    | High     | Bands                       | Upper  | Mid Back                          | Crank-the-mower row                                                       | Yes   | Standing                              | Lunge Front              | **N/A** | CM              |
| Hammer Curls                     | 10         | 30     | 4    | 8    | High     | Bands                       | Upper  | Biceps Brachialis                 | Hammer Curls                                                              | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Lying Tricep extensions          | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Tricep                            | Lying Tricep extensions                                                   | Yes   | Grounded                              | Across Behind Yank       | **N/A** | CM              |
| Push Up                          | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Chest                             | Push Up                                                                   | Yes   | Grounded                              | Around Back              | 0       | CM              |
| Reverse-grip curl                | 20         | 30     | 4    | 8    | High     | Bands                       | Upper  | Biceps Brachialis                 | Reverse-grip curl                                                         | Yes   | Standing                              | Above Ankle Under Foot   | **N/A** | CM              |
| Tricep kickbacks                 | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Tricep Lateral Head               | Tricep kickbacks                                                          | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Underhand Row                    | 10         | 20     | 4    | 8    | High     | Bands                       | Upper  | Back Bicep                        | Underhand Row                                                             | Yes   | Grounded                              | Above Ankle Under Foot   | **N/A** | CM              |
| Kick-outs                        | 10         | 20     | 4    | 8    | Low      | Bands                       | Bottom | Abductors Glutes                  | Kick-outs                                                                 | Yes   | Standing                              | Narrow Cross             | **N/A** | CM              |
| Kneeling concentration curl      | 10         | 30     | 4    | 8    | Low      | Bands                       | Upper  | Biceps Long Head                  | Kneeling concentration curl                                               | Yes   | Standing                              | Lunge Front Leg          | **N/A** | CM              |
| Shoulder Press                   | 20         | 30     | 4    | 8    | Low      | Bands                       | Upper  | Shoulder Front Mid Delt           | Shoulder Press                                                            | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Standard Curl                    | 10         | 30     | 4    | 8    | Low      | Bands                       | Upper  | Biceps                            | Standard Curl                                                             | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Donkey kicks                     | 10         | 20     | 4    | 8    | Med      | Bands                       | Bottom | Glutes                            | Donkey kicks                                                              | Yes   | Grounded                              | Single Leg Hand L        | **N/A** | CM              |
| Lunges                           | 10         | 20     | 4    | 8    | Med      | Bands                       | Bottom | Quads Ham Glutes                  | Lunges                                                                    | Yes   | Standing                              | Lunge Front Leg          | **N/A** | CM              |
| Side Dips                        | 10         | 20     | 4    | 8    | Med      | Bands                       | Core   | Obliques Side Abdominal           | Side Dips                                                                 | Yes   | Standing                              | Same Side Straight       | **N/A** | CM              |
| Close Grip Curl                  | 10         | 30     | 4    | 8    | Med      | Bands                       | Upper  | Biceps Long Head                  | Close Curl                                                                | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Lateral Raise                    | 5          | 10     | 4    | 8    | Med      | Bands                       | Upper  | Mid Delts                         | [[Upper#^61234b \| Lateral Raise]]                                        | Yes   | Standing                              | Narrow                   | **N/A** | CM              |
| Overhand Row                     | 10         | 20     | 4    | 8    | Med      | Bands                       | Upper  | Tricep                            | Overhand Row                                                              | Yes   | Grounded                              | Above Ankle Under Foot   | **N/A** | CM              |
| Squatting Concentration Curl     | 10         | 30     | 4    | 8    | Med      | Bands                       | Upper  | Biceps Long Head                  | Squatting Concentration Curl                                              | Yes   | Standing                              | Same side Leg            | **N/A** | CM              |
| Squatting preacher curl          | 10         | 30     | 4    | 8    | Med      | Bands                       | Upper  | Biceps Short Head                 | Squatting preacher curl                                                   | Yes   | Standing                              | U Under Feet             | **N/A** | CM              |
| Standing back fly                | 20         | 30     | 4    | 8    | Med      | Bands                       | Upper  | Back Rear Delt                    | Standing back fly                                                         | Yes   | Standing                              | Hands                    | **N/A** | CM              |
| Zercher Lunge                    | 10         | 20     | 4    | 8    | Med      | Barbell                     | Bottom | Multi                             | [[Cardio#^4b1677\|Zercher Lunge]]                                         | Yes   | Underhand                             | **N/A**                  | **N/A** | CM              |
| Zercher Squats                   | 40         | 50     | 4    | 8    | Med      | Barbell                     | Bottom | Multi                             | [[Cardio#^765b0b\|Zercher Squats]]                                        | Yes   | Underhand                             | **N/A**                  | **N/A** | CM              |
| Overhead Press                   | 10         | 20     | 4    | 8    | _Highest | Barbell/TrapBar             | Upper  | Multi                             | [Overhead Press](https://youtu.be/T06x4_z1nts?si=7Zo_5KzHrfrBAtrh)        | Yes   | Standing                              | **N/A**                  | **N/A** | CM              |
| Squat Jump                       | 20         | 50     | 4    | 8    | _Highest | TrapBar                     | Bottom | Multi                             | [Squat Jump](https://www.youtube.com/watch?v=52-P8hlrKqg)                 | Yes   | Standing                              | **N/A**                  | **N/A** | EP              |
| Double Crunch                    | 0          | 10     | 4    | 8    | _Highest | Dumbbell                    | Core   | Abdominal                         | [[Core#^450568 \|Double Crunch]]                                          | Yes   | Grounded                              | **N/A**                  | **N/A** | RC              |
| Incline Preacher Curl            | 0          | 20     | 4    | 8    | High     | Dumbbell                    | Upper  | Biceps                            | [[Upper#^6d88c7 \| Incline Preacher Curl]]                                | Yes   | Standing                              | **N/A**                  | **N/A** | CM              |
| Incline Row                      | 0          | 20     | 4    | 8    | High     | Dumbbell                    | Upper  | Lats                              | [[Upper#^4b1e6d \|Incline Row]]                                           | Yes   | Bench                                 | **N/A**                  | **N/A** | CM              |
| Reverse Preacher Curl            | 10         | 20     | 4    | 8    | High     | Dumbbell                    | Upper  | Biceps                            | [Reverse Preacher Curl](https://youtu.be/h8LVaKRAFY0?si=ix3lKao_fRA33nqU) | Yes   | Leaning On Curl Machine or swiss ball | **N/A**                  | **N/A** | CM              |
| Mid Row                          | 145        | 165    | 4    | 8    | _Highest | Fixed                       | Upper  | Back Lats                         | Mid Row                                                                   | Yes   | Seated                                | **N/A**                  | **N/A** | PG              |
| Plate Pull Down                  | 70         | 90     | 4    | 8    | _Highest | Fixed                       | Upper  | Back Lats                         | Plate Pull Down                                                           | Yes   | Seated                                | **N/A**                  | **N/A** | CM              |
| Rear Delt Fly                    | 60         | 70     | 4    | 8    | _Highest | Fixed                       | Upper  | Shoulder Delt                     | Rear Delt Fly                                                             | Yes   | Seated                                | **N/A**                  | 0       | CM              |
| Seated Dip                       | 95         | 105    | 4    | 8    | _Highest | Fixed                       | Upper  | Tricep                            | Seated Dip                                                                | Yes   | Seated                                | **N/A**                  | **N/A** | CMEP            |
| Single Arm Plate Pull Down       | 45         | 65     | 4    | 8    | _Highest | Fixed                       | Upper  | Back Lats                         | Single Arm Plate Pull Down                                                | Yes   | Seated                                | **N/A**                  | **N/A** | CM              |
| Lat Pull down                    | 105        | 125    | 4    | 8    | High     | Fixed                       | Upper  | Back Lats                         | [[Upper#^ba48ce \|Lat Pull down]]                                         | Yes   | Underhand                             | **N/A**                  | **N/A** | PG              |
| Leg Press off Back Calf          | 235        | 270    | 4    | 8    | Low      | Fixed                       | Bottom | Calf                              | Leg Press off Back Calf                                                   | Yes   | Toes                                  | **N/A**                  | **N/A** | CM              |
| Leg Press off Back G&H           | 235        | 270    | 4    | 8    | Low      | Fixed                       | Bottom | Multi                             | Leg Press off Back G&H                                                    | Yes   | Heals                                 | **N/A**                  | **N/A** | CM              |
| Leg Press off Back Quads         | 540        | 540    | 4    | 8    | Low      | Fixed                       | Bottom | Quads                             | Leg Press off Back Quads                                                  | Yes   | Close                                 | **N/A**                  | **N/A** | CM              |
| Leg Press Seated                 | 100        | 110    | 4    | 8    | Low      | Fixed                       | Bottom | Multi                             | Leg Press Seated                                                          | Yes   | UpClose                               | **N/A**                  | **N/A** | CM              |
| Low Row                          | 77         | 88     | 4    | 8    | Med      | Fixed                       | Upper  | Lats                              | [Low Row](https://youtu.be/S5jNFL_jzBU?si=v0klXgt6vDqI_Pmu)               | Yes   | Seated                                | **N/A**                  | **N/A** | PG              |
| Shoulder Press                   | 30         | 40     | 4    | 8    | Med      | Fixed                       | Upper  | Shoulder                          | Shoulder Press                                                            | Yes   | Narrow                                | **N/A**                  | **N/A** | CM              |
| Suit Case DeadLift               | 10         | 20     | 4    | 8    | _Highest | Kettlebell                  | Bottom | Multi                             | [Suit Case DeadLift](https://www.youtube.com/watch?v=eUjU3YBHe-Y)         | Yes   | Standing                              | **N/A**                  | **N/A** | CM              |
| Kettlebell Swing                 | 10         | 20     | 4    | 8    | _Highest | Kettlebell                  | Full   | Multi                             | [[Cardio#^bb1837\|Kettlebell Swing]]                                      | Yes   | Standing                              | **N/A**                  | **N/A** | PG              |
| Lunge Twist Halo                 | 10         | 20     | 4    | 8    | High     | Kettlebell                  | Upper  | Multi                             | [[Cardio#^7ecf05\|Lunge Twist Halo]]                                      | Yes   | Standing                              | **N/A**                  | **N/A** | RC              |
| Cossack Squat                    | 10         | 20     | 4    | 8    | Low      | Kettlebell                  | Bottom | Hamstring                         | [[Plyometrics#^3ae11e\|Cossack Squat]]                                    | Yes   | Standing                              | **N/A**                  | **N/A** | CM              |
| Kettlebell Step-Up               | 10         | 20     | 4    | 8    | Low      | Kettlebell                  | Bottom | Multi                             | [[Plyometrics#^c9d45f\|Kettlebell Step-Up]]                               | Yes   | Standing                              | **N/A**                  | **N/A** | EP              |
| Kettlebell Snatch                | 10         | 20     | 4    | 8    | Med      | Kettlebell                  | Full   | Multi                             | [[Cardio#^8b48af\|Kettlebell Snatch]]                                     | Yes   | Standing                              | **N/A**                  | **N/A** | EP              |
| Tib Bar Hamstring Curl           | 0          | 5      | 4    | 8    | High     | Tib Bar                     | Bottom | Hamstring                         | Tib Bar Hamstring Curl                                                    | Yes   | Seated                                | **N/A**                  | **N/A** | CM              |
| Tib Bar Leg Extension            | 0          | 5      | 4    | 8    | High     | Tib Bar                     | Bottom | Quad                              | Tib Bar Leg Extension                                                     | Yes   | Seated                                | **N/A**                  | **N/A** | CM              |

^all


