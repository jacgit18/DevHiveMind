---
tags:
  - gym
  - bjj
  - mauyThai
  - favorite
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
# Regimen

## Best Practices
1. **Focus on 30 Core Workouts:**  
    - Prioritize functional and foundational exercises to maximize efficiency.
    - Workout more in the winter body retains weight more Oct to Feb.
    - Breath through exercises. exhale on push breath inhale on return depending on exercise.
    - Increase sets for more gain vs more reps for more endurance. Like 3 sets of 10 reps is more slow vs 10 sets of 3 reps can be done more faster.\
    - Vary exercise to trick body rotating exercises pick a number of exercise you want to do  and alternate the load.
2. **Avoid Risky Movements:**
    - Skip upright rows due to the unnatural shoulder position.
3. **Equipment Tips:**
    - Use **barbells** for added weight when building strength.
    - Use **dumbbells** for greater range of motion and correcting muscle imbalances.
    - Any **curlbar** exercise can be done with barbell.


#todo/purchases 
- [ ] [Neck Exercise Equipment](https://neckslevel.com/?srsltid=AfmBOop5fT_Vv8l5LRpyCbvCpA1c5eqQy_aHAuAeLX2zwNFjMtC1X-Y0)
## Stats
- 16% body fat possibly lower need to check
- Eat a minimum of 1900 calories a day 
- 80 oz water
- Check New Weight limits 

| Body  | Machine                           | Weight | Plates#    | Sets | Reps |
| ----- | --------------------------------- | ------ | ---------- | ---- | ---- |
| Lower | Abductor Outer Thigh              | 100    |            | 3    | 10   |
| Lower | Abduction Inner Thigh             | 115    |            | 3    | 10   |
| Lower | Leg Press off Back                | 540    | 5 per side | 3    | 10   |
| Lower | Leg Press Seated Close            | 110    |            | 3    | 10   |
| Lower | Leg Press Seated Far              | 150??  |            | 3    | 10   |
| Upper | Bicep Curls                       | 0      |            | 3    | 10   |
| Upper | Mid Row                           | 165??  |            | 3    | 10   |
| Upper | Isolated Wide Chest               | 90     |            | 3    | 10   |
| Upper | Chest Fly                         | 0      |            | 3    | 10   |
| Upper | Rear Delt Fly                     | 0      |            | 3    | 10   |
| Upper | Chest Press                       | 0      |            | 3    | 10   |
| Upper | Shoulder Press                    | 0      |            | 3    | 10   |
| Upper | Blink Row with individual weights | 42.5   | 1 per side | 3    | 10   |
^machine

OG table

| Body  | Exercise        | Type       | W(lb/kg) | AltType    | Alt W(lb/kg) | Sets | Reps |
| ----- | --------------- | ---------- | -------- | ---------- | ------------ | ---- | ---- |
| Upper |                 | CurlBar    | 0        | CurlBar    | 0            | 3    | 10   |
| Lower | Zercher Squat   | Barbell    | 0        | N/A        | 0            | 3    | 10   |
| Upper | Halo lunge      | Kettlebell | 17       | N/A        | 0            | 8    | 2    |
| Upper | PullUp          | Bodyweight | 90       | Bodyweight | 0            | 3    | 10   |
| Upper | PullUp Neutral  | Bodyweight | 90       | Bodyweight | 0            | 3    | 10   |
| Upper | ChinUp          | Bodyweight | 90       | Bodyweight | 0            | 3    | 10   |
| Upper | SingleArm Press | Kettlebell | 17       | N/A        | 0            | 3    | 10   |
|       |                 | Jumps      | 0        | Jumps      | 0            | 3    | 10   |


| Exercise        | Type       | W(lb/kg) | Sets | Reps |
| --------------- | ---------- | -------- | ---- | ---- |
|                 | CurlBar    | 0        | 3    | 10   |
| Zercher Squat   | Barbell    | 0        | 3    | 10   |
| Halo lunge      | Kettlebell | 17       | 8    | 2    |
| PullUp          | Bodyweight | 90       | 3    | 10   |
| PullUp Neutral  | Bodyweight | 90       | 3    | 10   |
| ChinUp          | Bodyweight | 90       | 3    | 10   |
| SingleArm Press | Kettlebell | 17       | 3    | 10   |
|                 | Jumps      | 0        | 3    | 10   |
^freeweight

| Body  | Exercise       | Type      | W(lb/kg) | AltType    | Alt W(lb/kg) | Time      | Sets |
| ----- | -------------- | --------- | -------- | ---------- | ------------ | --------- | ---- |
| Core  | Russian Twists | Medi Ball | 0        | Kettlebell | 17           | **20**sec | 3    |
| Full  | Farmer Walk    | Dumbbell  | 0        | Dumbbell   | 0            | **20**sec | 3    |
| Lower |                | Rope      | 0        | Rope       | 0            | **20**sec | 3    |
^duration

Experiment Button
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

#todo/Personal/High
- [ ] try creating chart from table 

![](https://www.youtube.com/watch?v=djj7QXZAIjM)


```chart
type: bar
id: freeweight
labels: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
series:
  - title: Title 1
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  - title: Title 2
    data: [5, 4, 3, 2, 1, 0, -1, -2, -3]

```





### Warm-Up & Cool-Down 
Warm up with dynamic stretch to Improve blood flow and flexibility before starting. Then cool down with a static stretch targeting major muscle groups. Basically any static stretch has a dynamic variation with movement. 
- Bodyweight Static to Dynamic
	- Hold push-up extended & unextended
	- Try [[Guards Directory#BJJ Stretches |BJJ Stretches]] & Kicking [[Striking Approach#^7a66bf |Striking Stretches]]
	- [[Core#^60b781 |Tuck Jumps to Plank]]
	- Butterfly Stretch → Dynamic Butterfly Hip Rocks
	- Cat-Cow Stretch → Dynamic Cat-Cow Transitions
	- Pigeon Pose → Dynamic Pigeon Transitions
		- Spinal Twist → Supine Windshield Wipers
		- ![](https://www.youtube.com/watch?v=mNdJti7ZwKI&pp=ygUMU3BpbmFsIFR3aXN0)
		- ![](https://www.youtube.com/watch?v=XxLVEIpb9oY)
	- Plyometric Plank with Shoulder Tap
		- Lizard Pose → Dynamic Hip Flexor Swings
		- For dynamic part lift your back knee off the ground if it was resting begin rocking forward and backward, shifting your weight between your front foot and back toes.
		- ![](https://www.youtube.com/watch?v=gyS68CiPNcY)
	- Scapular Push-Ups 
		- Breathe deeply as you push your chest outward, squeezing your shoulder blades together. Then, reverse the motion by pulling your chest inward and separating your shoulder blades, keeping your elbows straight throughout the movement.
		- ![](https://www.youtube.com/watch?v=FTpVhBkyIzk&list=TLPQMTUxMjIwMjT8Ie0IftYKYw&index=3)
#### Priority Workouts
1. **Explosive Power (Plyometric & Olympic Movements)**
- Start with these to engage fast-twitch muscle fibers and improve explosive strength:
	- Bodyweight
	    - [[Lower#^3b9f2c |Box Jumps]]
	    - [[Lower#^afd7a0 |Lateral Skater Jumps]]
	    - [[Lower#^aad169 |Split Squat Jumps]]
	- *Barbell*/***Dumbbell***
	    - [[Full Body#^0c16fd |Clean to Jerk & Press]]
	- **Kettlebell**
	    - [[Full Body#^8b48af |Kettlebell Snatch]]
	    - [[Lower#^c9d45f |Kettlebell Step-Up]]
2. **Strength Training (Compound Movements)**
- Follow with heavy, compound lifts to build muscle and functional strength:
	- _Barbell_
		- [[Upper#^bcb0df |Bench Press]] - narrow grip for a more compound movement.
		- [[Lower#^308171 |Romanian Deadlift]]
		- [[Full Body#^765b0b |Zercher Squats]]
	- ___Dumbbell___
	    - [[Full Body#^775bc4 |Farmer’s Walk]] 
	- __Kettlebell__
	    - [[Full Body#^7d58d7 |Turkish Get-Up]] (3 sets per side, focusing on control)
	    - [[Lower#^3ae11e |Cossack Squat]]
	- Machine(Rehab) 
		- Chest Press(free weight) - lower seat handles chest height
		- Leg Press back/seated
			- On Toes at the edge hits calves
			- Wide feet inner thigh
			- Narrow feet Quads
			- On heels at edge Glutes and hamstrings
3. **Rotational/Core Strength**
- Focus on rotational movements for striking power and grappling control:
	- ***Dumbbell***/__Kettlebell__
		- [[Full Body#^7ecf05 |Halos]]
	-  ***Medicine Ball***/__Kettlebell__/Rope
		- [[Core#^6516d4|Russian Twists Kettlebell]]/[[Core#^fdacde |Russian Twists Rope]]
	-  ***Medicine Ball***
		- [[Upper#^d58de0 |Rotational Slam]]
4. **Pulling/Grip Strength**
- Then do exercises to build pulling power and grip for grappling:
	- Bodyweight
	    - Pull-Up Variations (Neutral Grip/Chin-Up Grip/Wide Grip)
		    - ![](https://www.youtube.com/watch?v=mRy9m2Q9_1I)
		    - ![](https://www.youtube.com/watch?v=dAScZVF5o9k)
		    - ![](https://www.youtube.com/watch?v=djTQ1C_pvYw&list=TLPQMTQxMjIwMjQ2MGDLyOWw0w&index=2)
	- __Kettlebell__
		- [[Full Body#^bb1837|Kettlebell Swing]]
		- [[Upper#^9def13|Bottoms Up]]
	- Machine(Rehab) 
		- [[Upper#^238b6e |Chest/Rear Fly ]] for rear stop when both arms are straight
		- [[Full Body#^05e3ec |Seated Cable Row]]
		- Pulley Machine can use [[Tower 200.pdf |Tower 200]]
			- Cable Balloon Abduction
				- ![[ab.gif]]
			- [[Upper#^a7be5a |Cable Woodchopper]]
			- Cable Floor Fly
				- ![[fl.gif]]
			- Cable Wolverine
				- ![[_Fitness/Exercise Visuals/unnamed.gif|Wolverine]]
			- [[Core#^b41212|Cable Reverse Crunch]]
5. **Cardio**
- Ropes
	- [[Full Body#^64091e | Alternating Waves]]
	- [[Full Body#^164e0e | Side-to-Side Waves]]

	