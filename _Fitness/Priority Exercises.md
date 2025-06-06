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
# Attributes

## Stats

#todo/Med/Dev 
- [ ] Revisit and edit chart switch to table with current top exercises of focus
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


## Calories
> [!tip] Food for Thought
>  Watch food videos before or while eating to stimulate your appetite and help you eat more without feeling full too quickly. Also walk around while eating and limit water to eat more.


#todo/BAU/Life 
- [ ] Order [[Food]] from CookUnity twice a month or some alt staying under $260 and $70 left over for super market and eating out maybe $30 more if eating out or networking so $360 for food at max

- 15% body fat 
- **Weight Last Year:** 113 lbs
- **WaterToDrink:** 80 oz

| Weeks | Weight | Date       |
| ----- | ------ | ---------- |
| 0     | 120    | 05/01/2025 |
| 1     | 122    | 06/01/2025 |
| 2     |        |            |
| 3     |        |            |
| 4     |        |            |
| 5     |        |            |
| 6     |        |            |
| 7     |        |            |

- **Maintain Current Weight:** ~2,100 calories/day
- **Calorie Goal for Gaining Weight (fast approach):** ~3,600 calories/day
- **Calorie Goal for Gaining Weight (moderate approach):** ~3,300 calories/day (current target)
- **Maintain New Weight (goal weight):** ~2,800 calories/day
- **Slow Weight Gain:** ~1,700–1,800 calories/day over the course of a year (extremely slow, not typical for bulking).
 
##### **Protein Requirements:**
1. **Daily Protein for Maintenance/Gain:** ~158 – 330 grams of protein per day
2. **Protein for Cutting (higher intake for muscle preservation):** ~180 grams/day

## Best Practices
#todo/BAU/Workout  
- [ ] Alternate between **hypertrophy and strength phases on different days**. Aim to train **at least 5 to 6 days per week**, which allows for effective coverage of both upper and lower body across both training phases.
- [ ] After you've built a solid training foundation (about a year or more of consistent training), consider **shifting your focus in multi-week blocks** so alternating phase every 6 weeks.
- [ ] Advance stage shift focus of phases:
	- [ ] For Lower body focus on 80% strength training and 20% hypertrophy. 
	- [ ] For Upper body focus on 20% strength training and 80% hypertrophy training to failure with high volume.
- [ ] Cycle in different exercises every **8-12 weeks** to avoid stagnation.
- [ ] Do 10 empty reps to reduce injury before doing excercise.
- [ ] Follow [[Workout Phases]] starting June and focus on [[Optimal Order Of Operations For Body Development]] and [[Optimal Order by Exercise Type]]. 
- [ ] Focus on solo arm exercises always starting with left arm then shift to dual arm exercises for muscle Imbalance, test out two arm excercise again in August if still a issue try again in October with Barbell chest press and chest flys.
- [ ] For full body days and in general always start strength phase but for full body days alternate area of focus so one day focus strength training on lower then next day upper and the part of the body that isn't doing strength should focus on hypertrophy and use this day for experimenting throwing in random exercises.
- [ ] If you're not **feeling the target muscle** during an exercise, **reduce momentum** and slow down the movement to improve control and mind-muscle connection and If you feel **off balance**, try **making a fist**—this creates full-body tension and enhances stability during the lift.
- [ ] Sprint to and from gym a twice a week after you build to it on Upper body or full body days where you aren't doing MMA, You can also skip first part of warm up regimen. 











#### Schedule 

#todo/BAU/Workout 
- [ ] For one of the days at Gym focus on full body while also using the day for experimenting.
- [ ] For rest days make it one of my weekdays like if I have a networking event and there isn't a good timing in terms of going before or maybe even after the event and you can also take cold Baths on that day
- [ ] If very sore or exhausted do a light day with bands to still get something in but not do anything heavy with weights.


- [ ] Start Using O2 trainer again for diaphragmatic breathing
	- Try using during cold baths but first maybe try before or after bath.
- [ ] Cold Bath max 20 minutes to help regulate nervous system assuming warm start first if not lesser by end of May start cold fully and while listening to 60 BPM(Beats Per Minute) metronome.
	- Maybe switch to back to warm start or cold showers in the fall at a lower frequency.
	- But if Cold start about 3 min total.

- Sleep 
	- [ ] Stop Eating 3 hour before sleep
	- [ ] Stop Drinking 2 hour before sleep
	- [ ] Stop Scrolling 1 hour before sleep







- **Rotational/Core Strength**:  RC
- **Pulling/Grip Strength**: PG

**Seasonal Training Strategy**

Your body tends to **retain more weight during the colder months** (October to February), making it an ideal time to **increase training frequency** and build mass or strength.

- Once you’ve hit your baseline, aim for **6 workouts per week in the winter** to take advantage of this natural tendency.
    
- In the **warmer months**, when energy is often spent on outdoor activities and appetite may decrease, **4 to 5 workouts per week** can be more sustainable.














# Dynamic Warm-Up (RAMP Protocol) & Static Cool-Down 

Start with a dynamic stretch to Improve blood flow and flexibility. End with a static stretch targeting major muscle groups. Basically any static stretch has a dynamic variation with movement. 

#todo/BAU/Workout 
- [ ] If you took a cold bath before working out make sure you really stretch to warm up again to reduce injury.

**Recommended Duration:** ~2–3 minutes per section (Total: 10–15 min)  
**Tip:** Prioritize movement quality over speed. Use Duck Walks between sections or as part of the "Activate" phase.

> Sprinting engages the whole body with a tall, open, and powerful posture, emphasizing full extension and drive, whereas jogging is more contained—focused on lower-body movement with a relatively closed, compact posture.

![https://youtu.be/Aj5SONT3T2o?si=9z5TvZuR1iBfgjch&t=515](https://youtu.be/Aj5SONT3T2o?si=9z5TvZuR1iBfgjch&t=515)

**Skipping Foundation (2-3 mins):**
- **Focus:** Tall posture, head up, expressive arms, **active ankle dorsiflexion on landing.**
- **Cue:** "Land like you're stepping on a hot plate - quick, light, front of foot angled up (dorsiflexed)."
- **Execution:** Skip continuously, focusing on rhythm and form. Keep core engaged, back straight.

**When to Use Weights:**
    - ✅ **Mobility/Activation**: Use **bodyweight only**
    - ✅ **Strength/Endurance/Burnout**: Add **light weights** (only if form stays clean)

⏱️ **Total Time:** 5–15 minutes(about 7 min at home and gym)
🎯 **Each Exercise:** 10–15 reps or 20–30 seconds unless noted


---
> **Start off Back like a baby and progress to standing then running**
#### **1. Raise (Increase Body Temp & Heart Rate)**
_~2–3 minutes total – pick 2–3_ or pick one to do for the whole time.

##### **Grounded On Back**
- Bicycles – **1 min**
##### Seated
- Rower or Incline Treadmill Walk – **1 min**

##### **Grounded On Side**
- **Side-to-Side Rolling** – Roll from side to side across a mat, using arms and hips to initiate; great for warm blood flow in spine/core.
    
- **Side-Lying Bicycles** – Pedal your top leg like a bike in the air to raise HR slightly and warm up hips.

##### **Grounded On Front**
- [[Upper#^4a9cd1 |Pike Push-Ups]] – **6–8 reps**
- [[Core#^60b781 |Tuck Jumps to Plank]]– **6 reps**

##### **Standing**
- ***Free Flow Skipping*** at or on the way to gym.
- **Shoulder Rolls** – Forward & backward, *10 reps each*
- **Torso Twists** – Controlled rotation side-to-side - like throwing hook, *15–20 reps*
- **Neck Rolls** – Slow circles, 5 reps each direction
- **[[Wrist Curl]]** - Do a few sets not as many as you would other exercises at home maybe in gym for specific variations.
- Jump Rope – **1 min**
- Fast High Knees + Butt Kicks – **30s each**
- Arm Swings (Hugs) – **30s**
- Punch Ups with 5lb dumbbells
- Chest Fly with 5lb dumbbells
- Jumping Jacks – **1 min**
- [Arm Circles](https://www.youtube.com/watch?v=YGXgpcr7UY4) with 5lb dumbbells different ranges – *20 reps each direction*
- Shadowboxing with Resistance bands (fast-paced) – *30–45s*

#### **2. Activate (Engage Muscle Groups)**
_~2–3 minutes total – pick 4–5_
##### **Grounded On Back**
- Glute Bridges – **10–12 reps**

##### Seated
- [[Core#^a235d1 |Pancake Stretch]]

##### **Grounded On Side**
- [[Core#^5805af |Side Plank Hip dip]] (floor or bench feet on ground or bench) - **10–12 reps** - Lateral flexion
- **Side-Lying Leg Lifts** – Top leg lifts straight up and down; targets glute medius.
- **Side-Lying Hip Circles** – Lift top leg and draw slow circles in the air.
- **Side Plank Leg Raises** – From a side plank, lift top leg up/down; glutes + core activation.
- ***Rotational Side Plank*** -  3–4 slow rotations per side
##### **Grounded On Front**
- Superman Hold – **20–30s hold**
- [[Lower#^01867f |Quadruped Kickbacks]] – **8–10 reps/side**
- Plyometric Plank Shoulder Taps – **8–12 taps** - use bands if doing regular plank
- Push-Up Hold (top and bottom) – **10s each**
- [[Upper#^5ff8c1 |Scapular Push-Ups ]] – **10–12 reps with deep breathing**
	- Breathe deeply as you push your chest outward, squeezing your shoulder blades together. Then, reverse the motion by pulling your chest inward and separating your shoulder blades, keeping your elbows straight throughout the movement.
- ***Elbow Push-ups (Pike Push-up Focus)*** - 8 reps
- ***Scorpion Stretch*** - 30 sec each side
- ***Supine lower body*** - t position leg raise to opposite hand (6 reps/side)

##### **Standing**
- Calf Raises – **10–12 reps**
- Shoulder Band Pull-Aparts – **15–20 reps**
- [[Lower#^b0a0df|TIB Raise]]
- [[Lower#^8a3d01|ISO Calf Raise with Lunge]]
- [[Lower#^58f942|Lunge ISO Heel Raise]]
- [[Lower#^da4cd0|Banded Joint Mobilizations]]
- Twisted arms

**Optional Add-In:**
- **Duck Walks** – **2 passes across gym or 30–45 seconds** - with mediball

###### Sprinting  Specific - 1 min 
- ***Single-Leg RDL w/ Knee Drive Swing*** - Hold 3 sec in each part explode, swing, and Step.


#### **3. Mobilize (Dynamic Range of Motion)**
_~3–4 minutes total – choose a flow or 3–5 moves_

##### **Grounded On Back**
- [[Lower#^4158ea |“Open Book” Thoracic Twist]] – **6 reps/side**
- Dynamic [[Core#^beda1a |Supine Windshield Wipers]] – **4–6 transitions + 10s pose**

##### Seated
- **Spinal Twists** - 30 sec
- [[Lower#^ee779f |90/90 Transitions ]] – **8 reps**
- Butterfly Hip Rocks → Butterfly Stretch – **8 rocks + 10s stretch**
- [[Core#^eb4c68 | Pancake Stretch]]  - **4 sets 8 reps**

##### **Grounded On Side**
- **Side-Lying Leg Lifts** – Leg raises to warm up outer hips/glutes(Try standing version as well)
##### **Grounded On Front**
- **Inchworms** – Stand → walk hands to plank → back up, 5–8 reps
- **World’s Greatest Stretch** – Deep lunge + rotation opposite side arm in relation to front kneeling knee, 3–5 per side
- [[Lower#^9744bc |Dynamic Cat-Cow]] → Hold Cat-Cow Stretch – **6–8 transitions + 10s hold**
- Dynamic Hip Flexor Swings -> [[Lower#^357346 |Lizard Pose ]] (Just a lower to the ground version with elbows down) – **6 swings + 10s hold/side**
	- For dynamic part lift your back knee off the ground if it was resting begin rocking forward and backward, shifting your weight between your front foot and back toes.
##### **Standing** - **10 reps Each Limb**
- ***Scapular Wall Slides*** – Slide arms up/down while back touches wall
- ***Leg Swings*** – Front/back & side-to-side
- ***Walking Lunges + Reach*** – Forward lunge + arms overhead
- ***Hip Circles / Openers*** – Knee lift and rotate out
- ***Knee Hugs to Calf Raise*** – Alternate legs, balance & stretch
##### Sprinting  Specific - 1 min
- ***Backward Walking & Skipping***
- ***Carioca***
- ***High Knee Circles***
* ***Internal/External Ankle Circles***
* ***Lateral Leg Swings (side-to-side)***
* ***Linear Leg Swings (forward/back)***
- ***Side Shuffles***

###### Spinal Twist - *5 reps/side*
- ***Half-Kneeling Cossack V Reach*** - keep tension in extend leg. 
- ***Half-Kneeling Lunge V Reach with Rotation*** - side bend and rotate towards back foot away from front then alternate front foot. 
- ***Walking Lunges with Reach*** - Step into lunge, drive *up* powerfully through the front heel, reaching both arms overhead tall. Keep torso upright. (Focuses on extension, hip flexor stretch).
- ***Quarter-Kneeling Cossack V Reach*** - keep back leg hovering off floor in a split squat position rotating down towards back foot at a downward angle into the ground.

#### **4. Potentiate (Prep for Explosive Work)**
_~1–2 minutes total – pick 2_
##### **Grounded On Side**
- **Side Plank with Knee Drive** – From a side plank, explosively drive the top knee toward the chest, mimicking sprint mechanics.
##### **Grounded On Front**
- Clap Push-Ups or Explosive Incline Push-Ups – **4–6 reps**

##### **Standing**
- Jump Squats or Band-Assisted – **6–8 reps**
- Bounding (forward/lateral) – **2–3 passes**
- Power Skips – **2 passes (20–30 yards)**

##### Sprinting  Specific - 1 min
- ***Power skips for height***
- ***Bounding***
- ***Sprint activation:***  
	- 3 build-up sprints (gradually increasing effort from 60% → 80% → 90%)  
  
# Exercises
>**Barbell Exercises: Upper vs Lower Body Considerations**
Upper body barbell exercises—like the bench press—can sometimes place unnecessary strain on the wrists due to the fixed, straight bar grip. If the grip doesn’t align naturally with your wrist and shoulder joints, it can cause discomfort or even injury over time.
In contrast, barbell movements for the lower body (like squats and deadlifts) or full-body lifts often allow for a more natural grip or distribute load in a way that’s generally better tolerated.

The general principles of **training phases** like strength and hypertrophy apply to most exercises. However, when training **smaller muscles and stabilizers**, it's often better to prioritize **tempo and control over intensity** example calf raises and wrist curls should be done with a slow tempo about 3x15.  You should also limit combination exercises since focused on adding weight.
### Breathing & Core Engagement in Exercise
- **Inhale** during the **eccentric phase** (_lowering the weight_).
- **Exhale** during the **concentric phase** (_lifting the weight_), which is typically the more strenuous part of the movement.
- While performing static holds like a **plank**, focus on **slow, steady breathing** throughout the duration of the hold.
- No matter the movement—whether lifting, lowering, or holding—**keep your core engaged the entire time**. A braced core provides essential stability and protects your spine during all phases of the exercise.

### Equipment Tips:
- Use **barbells** for added weight when building strength.
- Use **dumbbells** for greater range of motion and correcting muscle imbalances.
- Any **curlbar** exercise can be done with barbell.

### **Progression Rules**
- **Hypertrophy**: Add 1 rep/set or +2.5 lbs weekly
- **Strength**: +5 lbs/week (upper), +10 lbs (lower)
- **Injury Rule**: If pain >2/10, regress load or variation

## Regimen
#todo/BAU/Workout

- [ ] Do [[Grip Strength Training]]
- [ ] Dead Hang at BK-MMA & Leg Day
- [ ] Eventually add hanging weight to your pull-ups using heavy resistance band to secure plate body. 
- [ ] Cycle in [[Stability Ball Workout Plan]] for core strengthening, flexibility, and stretching,  
- [ ] Try Larsen bench press on flat bench or incline bench hovering or keeping straight legs to focus more on core.
- [ ] After doing that deadlifts for a while switch to deficit deadlifts where you're standing on a plate and doing the deadlift which increases range of motion of the motion.
- [ ] Use [[Tower 200.pdf |Tower 200]] for practicing cable machine exercises the weight ranges from 25 to 45 lb.  
- [ ] Use Sled on full body day

- [ ] When doing Incline reverse crunch a flexion excercise were you should suck in belly button towards bench. 
- [ ] Point toes inward keep butt down for Leg extension

- [ ] For Single arm Variation of wide dumbbell curl try with cable starting behind back wrist height.
- [ ] Keep elbows high above head and alt cable height at hip and foot level for Overhead extension.

- [ ] Use 30 to 45 degree angle for incline bench press which seem more effective for your body type then flat bench.

Muscle tightness reduction regimen

- [ ] Hover in more of a standing position for abduction leg squeezing machine 70 to 80 lb.

- [ ] Half lateral chest press meaning alternating between the full squeeze and a half movement not going all the way. Same thing with adduction machine.

### Balance Board Programming  
- **Beginners:** 2-3x/week (5-10 mins/session) or 2 songs length.
- **Intermediate/Advanced:** 3-4x/week (10-15 mins/session) 4 songs.  
- **Elite (MMA/Gymnasts):** 5x/week (integrated into warm-ups or cooldowns).

### Hip Thrust Program 

- **Day 1 (Heavy)**  
	- Hip Thrust: 4x8 @ 130–180 lbs (1.5x BW)  
	- Single-Leg Hip Thrust: 3x12/leg @ 90 lbs 
  
- **Day 2 (Hypertrophy)**  -  Slow eccentric to failure
	- Hip Thrust: 3x12/leg @ 70–90 lbs 
	- Single-Leg Hip Thrust: 3x12/leg @ 70 lbs 
	- Bodyweight Hip Thrust Holds: 3x30 sec (squeeze glutes)  
	- Kettlebell Swing (for hip snap): 4x15  

- **Day 3 (Explosive)**  
	- Hip Thrust: 6x3 @ 90 - explosive concentric, 1-second pause, controlled eccentric

###  O2 Trainer Routine
#### **Frequency:**  
- **Days Per Week:** **4–5 days** (allow 2–3 rest days for recovery).  
- **Sessions Per Day:** **1–2 times daily** (morning + pre/post-workout).  
  
#### **Duration & Sets:**  
- **Start Light:**  
- **Week 1:** 2–3 sets of **30 sec – 1 min** per session (low resistance if needed).  
- **Week 2+:** 3–4 sets of **1–2 min** per session (progress to max resistance).  
- **Max Session Time:** **10–15 mins total daily** (avoid overfatiguing respiratory muscles).  

#### **Signs to Reduce Frequency/Overtraining**  
- Dizziness or lightheadedness.  
- Excessive ribcage/diaphragm soreness.  
- No improvement in endurance after 2–3 weeks.  
  
### Row Machine Program
- **Workout 1: 1 Minute On, 1 Minute Off**
- **Workout 2: All-Out in a Minute**
- **Workout 3: 10 to 20 Alternation** - for 20 min or less alt from 10 to 20 strokes per minute
- **Workout 4: Power Strokes**
- **Workout 5:  Rounds 1 to 4**
	- Round 1: Row one minute, then rest for 90 seconds.
	- Round 2: Row two minutes, then rest for three minutes.
	- Round 3: Row three minutes, then rest for four minutes and 30 seconds.
	- Round 4: Row four minutes, then rest for six minutes.
	- Round 5: Row three minutes, then rest for four minutes and 30 seconds.
	- Round 6: Row two minutes, then rest for three minutes.
	- Round 7: Row for one minute.

### Risky Exercises & Movements:
- Skip upright rows due to the unnatural shoulder position.
- Skip Renegade rows
- Stay away from 
	- Romanian dead lift (can be dangerous if not done properly)
	- Dumbbell Lateral raise 
	- Hanging Leg raises 
	- Leg extension if pain don't do it 
	- Doing max weight for excercise that hit same muscle on the same day
- Stop two reps before exercise failure alternate this depending how you feel.


| Best Order Of Operations  | Day     | Session Type | Options (Choose 1)                                                |
| ------------------------- | ------- | ------------ | ----------------------------------------------------------------- |
| **Glutes/Hamstrings**     | **Sun** | Gym          | Lower Body + Sled                                                 |
| **Core**                  | **Mon** | MMA/Gym      | Full Body & BJJ + Kickboxing **OR** BJJ + Judo **OR** BJJ+Judo+MT |
| **Scapular & Upper Back** | **Tue** | Gym          | Upper Body + Run + Balance Board                                  |
| **Lats/Traps**            | **Wed** | Gym          | Upper Body + Run + Balance Board                                  |
| **Quads**                 | **Thu** | Gym          | Full Body + Sled                                                  |
| **Chest/Delts**           | **Fri** | MMA or Gym   | BJJ+MT **OR** BJJ+Kickboxing **OR** BJJ+Kickboxing+MT             |
| **Arms**                  | **Sat** | MMA or Gym   | BJJ+MT **OR** BJJ+Kickboxing **OR** BJJ+Kickboxing+MT             |


## **Optimal Workout Order of Operations**

> **Train intensity before volume**. Prioritize neural output early, then shift to fatigue-driven work.



- [ ] **Deload**: Switch phases every 4–6 weeks to reduce volume so go form compound or hypertrophy to Explosive after 2 years or so or as it gets harder to add muscle.

| Goal                        | Sets | Reps   | Tempo                                | **Rest**  |
| --------------------------- | ---- | ------ | ------------------------------------ | --------- |
| **Strength / Compound**     | 3–4  | 6–10   | Controlled (2-1-2)                   | 60–90 sec |
| **Explosive Power**         | 3–5  | 3–6    | Explosive concentric, slow eccentric | 2–3 min   |
| **Hypertrophy / Endurance** | 2–4  | 12–20+ | Smooth and rhythmic (1-0-1 or 2-0-2) | 30–60 sec |



##### Explosive Power (EP Phase)
Prioritize resistance bands for explosive phase they can be used for other phase but the most optimal use case is for explosive power also 2 sets 10 reps for warm up when it comes to bands.

> Speed is a skill—train it while fresh.

| Exercise                 | Goal Weight    | Adjusted Timeline |
| ------------------------ | -------------- | ----------------- |
| **Hip Thrust**           | 225–250 lbs    | 12–18 months      |
| **Hack Squat Machine**   | 180–200 lbs    | 6–9 months        |
| **Deadlift**             | 225–275 lbs    | 12–18 months      |
| **Bench Press**          | 135–155 lbs    | 9–12 months       |
| **Overhead Press**       | 95–105 lbs     | 9–12 months       |
| **Weighted Pull-Ups**    | +30 lbs (fast) | 9–12 months       |
| **Single-Leg Leg Press** | 40 lbs max     | Immediately       |

- **Why**: Start with these to engage fast-twitch muscle fibers and improve explosive strength which can include Plyometric & Olympic Movements. Requires high neural drive and pristine form. Fatigue kills both.


- **Prescription**:
    - **3–5 sets of 3–5 reps**
    - **≥85% 1RM** or max intent with lighter loads
    - **Tempo**: 1s up (max speed), 2s down
    - **Rest**: 3–5 minutes
    - **Examples**: Olympic lifts, jump squats, med ball slams, weighted sprints, trap bar jumps



---

##### **Strength Compound (CM Phase)**
**Starting Point** will switch to optimal order of **EP** → **CM** → **Hypertrophy (PG/RC)**  

> Strength tolerates some fatigue, but still demands precision.

| Exercise                   | Goal Multiplier | Goal @  120     | Timeline (Estimated) | Goal @ 150      | Timeline (Adjusted) |
| -------------------------- | --------------- | --------------- | -------------------- | --------------- | ------------------- |
| **Hip Thrust**             | 2.5x            | **300 lbs**     | 9–12 months          | **375 lbs**     | 12–24 months        |
| ~~**Hack Squat Machine**~~ | ~~2x~~          | ~~**240 lbs**~~ | ~~4–6 months~~       | ~~**300 lbs**~~ | ~~6–12 months~~     |
| **Deadlift**               | 2.5x            | **300 lbs**     | 9–12 months          | **375 lbs**     | 12–24 months        |
| **Bench Press**            | 1.5x            | **180 lbs**     | 6–8 months           | **225 lbs**     | 9–18 months         |
| **Overhead Press**         | 1.0x            | **120 lbs**     | 6–8 months           | **150 lbs**     | 12–24 months        |
| **Weighted Pull-Ups**      | +0.5x           | **+60 lbs**     | 6–9 months           | **+75 lbs**     | 9–18 months         |
| **Single-Leg Leg Press**   | 2x              | **240 lbs**     | 4–6 months           | **315 lbs**     | 6–12 months         |
| **Power Sled**             | 2x              | **240 lbs**     | 4–6 months           | **300 lbs**     | 4–6 months          |

- **Why**: Builds raw output, joint integrity, and compound movement proficiency. Follow with heavy, compound lifts to build muscle and functional strength use narrow grip or positioning for more of a compound movement.

- **Prescription**:
    - **4–5 sets of 4–8 reps**
    - **75–85% 1RM**
    - **Tempo**: 2–1–2 (eccentric–pause–concentric)
    - **Rest**: 2–4 minutes
    - **Examples**: Squats, deadlifts, bench press, weighted pull-ups.


---


##### **Hypertrophy & Endurance (HE Phase)**
> Size/endurance = can be done under more fatigue because it's about _muscle burn_, not _perfect speed or maximum tension_

| Exercise                 | Rep Range Focus | Goal @ 120 lb | Timeline (Est.) | Goal @ 150 lb | Timeline (Adjusted) |
| ------------------------ | --------------- | ------------- | --------------- | ------------- | ------------------- |
| **Hip Thrust**           | 12–15 reps      | 185–225 lbs   | 6–9 months      | 225–280 lbs   | 9–12 months         |
| **Hack Squat Machine**   | 10–12 reps      | 145–180 lbs   | 3–4 months      | 180–225 lbs   | 4–6 months          |
| **Deadlift**             | 8–10 reps       | 185–225 lbs   | 6–9 months      | 225–280 lbs   | 9–12 months         |
| **Bench Press**          | 10–12 reps      | 110–135 lbs   | 4–6 months      | 135–170 lbs   | 6–9 months          |
| **Overhead Press**       | 10–12 reps      | 70–90 lbs     | 4–6 months      | 90–115 lbs    | 6–9 months          |
| **Weighted Pull-Ups**    | 6–8 reps        | +35–45 lbs    | 4–6 months      | +45–55 lbs    | 6–9 months          |
| **Single-Leg Leg Press** | 12–15 reps      | 145–180 lbs   | 3–4 months      | 180–225 lbs   | 4–6 months          |

- **Why**: Focuses on metabolic stress and time-under-tension. Fatigue is actually useful here.

- **Prescription**:
    - **3–4 sets of 8–15 reps**
    - **60–75% 1RM**
    - **Tempo**: 3–1–1 (emphasize eccentric)
    - **Rest**: 30–90 seconds
    - **Examples**: Isolation lifts, machine work, burnout sets


| Body  | Exercise                                    | Tried | Focus  | Type       | W(lb/kg) |                      | Priority | Duration | Sets | AltType    | Tried | Alt W(lb/kg) |
| ----- | ------------------------------------------- | ----- | ------ | ---------- | -------- | -------------------- | -------- | -------- | ---- | ---------- | ----- | ------------ |
| Core  | [[Core#^6516d4\|Russian Twists]]            | Yes   | RC     | Kettlebell | 17.6     | Rotational           | Highest  | 00:00:20 | 3    | MediBall   |       | 0            |
| Core  | [[Core#^fdacde \|Russian Twists]]           |       | RC     | Rope       | 0        | Rotational           | Highest  | 00:00:20 | 3    | Rope       |       | *0*          |
| Full  | [[Full Body#^775bc4 \|Farmer’s Walk]]       |       | CM     | Kettlebell | 17.6     | Anti Lateral Flexion | Highest  | 00:00:20 | 3    | Dumbbell   |       | *20*         |
| Full  | [[Full Body#^0c52b2 \|Farmers March]]       |       | CM     | Kettlebell | 17.6     | Anti Lateral Flexion | Highest  | 00:00:20 | 3    | Dumbbell   |       | *20*         |
| Full  | [[Lower#^eadbc3 \|B-Stance Squat]]          |       | CM     | Kettlebell | 17.6     |                      | Highest  | 01:00:00 | 3    | Dumbbell   |       | *20*<br>     |
| Upper | [[Upper#^b1e482 \|Dead Hang]]               | Yes   | PG     | Bodyweight | 0        |                      | Highest  | 00:00:30 | 1    | Bodyweight |       | 0            |
| Upper | Switch Catch                                | Yes   | EP     | Dumbbell   | 5        |                      | Highest  | 01:00:00 | 1    | Dumbbell   |       | *5*          |
| Lower | [[Lower#^3b9f2c \|Box Jumps]]               |       | EP     | Jump       | 0        |                      | Highest  | 00:00:20 | 3    | Jump       |       | *0*          |
| Upper | [[Upper#^f49369 \|VMX Rope Trainer]]        |       | PG     | Fixed      | 0        |                      | Highest  | 01:00:00 |      | Fixed      |       | 0            |
| Upper | Seated Band Row                             | Yes   | PG     | Band       | 0        |                      | High     | 00:00:20 | 3    | Fixed      | yes   | *0*          |
| Upper | [[Full Body#^05e3ec \|Seated Cable Row]]    | Yes   | PG     | Fixed      | 0        |                      | High     | 00:00:20 | 3    | Fixed      | yes   | *0*          |
| Full  | Jump Rope                                   |       | Cardio | Rope       | 0        |                      | High     | 00:00:20 | 3    | Jump       |       | *0*          |
| Lower | [[Lower#^aad169 \|Split Squat Jumps]]       |       | EP     | Jump       | 0        |                      | Med      | 00:00:20 | 3    | Jump       |       | *0*          |
| Lower | [[Lower#^afd7a0 \|Lateral Skater Jumps]]    |       | EP     | Jump       | 0        |                      | Med      | 00:00:20 | 3    | Jump       |       | *0*          |
| Full  | [[Upper#^d58de0 \|Rotational Slam]]         |       | RC     | MediBall   | 20       |                      | Low      | 00:00:20 | 3    | MediBall   |       | 20           |
| Full  | [[Full Body#^64091e \| Alternating Waves]]  |       | Cardio | Rope       | 0        |                      | Low      | 00:00:20 | 3    | Rope       |       | *0*          |
| Full  | [[Full Body#^164e0e \| Side-to-Side Waves]] |       | Cardio | Rope       | 0        |                      | Low      | 00:00:20 | 3    | Rope       |       | *0*          |
^duration


---

![[muscle-anatomy-chart.jpg]]

| Exercise                            | Old Weight | Weight    | Sets | Reps | Tried | Type       | Priority | Bands Orientation | Body   | Body Part             | Position  | Exercise                                                                | Per Side | Motion        | Range | Focus |
| ----------------------------------- | ---------- | --------- | ---- | ---- | ----- | ---------- | -------- | ----------------- | ------ | --------------------- | --------- | ----------------------------------------------------------------------- | -------- | ------------- | ----- | ----- |
| Alternating Cross-body Chest Fly    | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Chest                 | Standing  | Alternating Cross-body Chest Fly                                        | *10*     | Pull          | N/A   | CM    |
| Angled Chest Fly                    | 20         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Chest                 | Standing  | Angled Chest Fly                                                        | *20*     | Push          | 4     | CM    |
| Face pulls                          | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Back                  | Grounded  | Face pulls                                                              | *10*     | Pull          | N/A   | CM    |
| Front & lateral raise               | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Shoulder              | Standing  | Front & lateral raise                                                   | *10*     | Pull          | N/A   | CM    |
| Zottman Curls                       | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Multi                 | Standing  | Zottman Curls                                                           | *10*     | Pull          | N/A   | CM    |
| Hammer Curls                        | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Multi                 | Standing  | Hammer Curls                                                            | *10*     | Pull          | N/A   | CM    |
| Hex Chest Press                     | 20         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Chest                 | Standing  | Angled Chest Fly                                                        | **90**   | Push          | 4     | CM    |
| Lunges                              | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Bottom | Legs Multi            | Standing  | Lunges                                                                  | *10*     | Push          | N/A   | CM    |
| Overhand Row                        | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Tricep                | Grounded  | Overhand Row                                                            | *10*     | Pull          | N/A   | CM    |
| Overhead Tricep extensions          | 10         | 20        | 4    | 8    |       | Bands      | _Highest |                   | Upper  | Multi                 | Standing  | Overhead Tricep extensions                                              | *10*     | Pull          | N/A   | CM    |
| Shoulder Press                      | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Shoulder              | Standing  | Shoulder Press                                                          | *10*     | Pull          | N/A   | CM    |
| Standing back fly                   | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Multi                 | Standing  | Standing back fly                                                       | *10*     | Pull          | N/A   | CM    |
| Upright row                         | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Multi                 | Standing  | Upright row                                                             | *10*     | Pull          | N/A   | CM    |
| Squats                              | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Bottom | Legs Multi            | Standing  | Squats                                                                  | *10*     | Push          | N/A   | CM    |
| Squats & Reach                      | 0          | 0         | 4    | 8    |       | Bands      | _Highest |                   | Bottom | Legs Multi            | Standing  | [[Lower#^ab16e7 \|Squats & Reach]]                                      | *10*     | Push          | N/A   | CM    |
| Sumo squat                          | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Bottom | Legs Multi            | Standing  | Sumo squat                                                              | *10*     | Push          | N/A   | CM    |
| Single Leg Deadlift                 | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Bottom | Multi                 | Standing  | Single Leg Deadlift                                                     | *10*     | Pull          | N/A   | CM    |
| Deadlift                            | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Full   | Multi                 | Standing  | Deadlift                                                                | *10*     | Anti Flexion  | N/A   | CM    |
| Drag Curl                           | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Multi                 | Standing  | Drag Curl                                                               | *10*     | Pull          | N/A   | CM    |
| Reverse-grip curl                   | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Multi                 | Standing  | Reverse-grip curl                                                       | *10*     | Pull          | N/A   | CM    |
| Close Grip Curl                     | 10         | 20        | 4    | 8    | Yes   | Bands      | _Highest |                   | Upper  | Biceps                | Standing  | Close Curl                                                              | *10*     | Pull          | N/A   | CM    |
| Wide Curl                           | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Biceps                | Standing  | Wide Curl                                                               | *10*     | Pull          | N/A   | CM    |
| Core Lifting Oblique Pulls          | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Core   | Core                  | Standing  | Core Lifting Oblique Pulls                                              | *10*     | Pull          | N/A   | CM    |
| Crank-the-mower row                 | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Back                  | Grounded  | Crank-the-mower row                                                     | *10*     | Pull          | N/A   | CM    |
| Drop curtsy lunges                  | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Bottom | Legs Multi            | Standing  | Drop curtsy lunges                                                      | *10*     | Push          | N/A   | CM    |
| Front raise                         | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Multi                 | Standing  | Front raise                                                             | *10*     | Pull          | N/A   | CM    |
| Lying Tricep extensions             | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Tricep                | Grounded  | Lying Tricep extensions                                                 | *10*     | Pull          | N/A   | CM    |
| Push Up                             | 10         | 20        | 4    | 8    | Yes   | Bands      | High     | Around Back       | Upper  | Chest                 | Grounded  | Push Up                                                                 | *10*     | Push          | 0     | CM    |
| Russian Twists                      | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Core   | Core                  | Grounded  | [[Core#^c16b16 \|Russian Twists]]                                       | *10*     | Rotational    | N/A   | CM    |
| Single Leg Extension                | 30         | 30        | 4    | 8    | Yes   | Bands      | High     | Single Hold       | Bottom | Hamstring             | Grounded  | Single Leg Extension                                                    | *30*     | Push          | 0     | CM    |
| Single Leg Extension                | 30         | 30        | 4    | 8    | Yes   | Bands      | High     | Single Hold       | Bottom | Hamstring             | Standing  | Single Leg Extension                                                    | *30*     | Push          | 0     | CM    |
| Tricep kickbacks                    | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Multi                 | Standing  | Tricep kickbacks                                                        | *10*     | Pull          | N/A   | CM    |
| Underhand Row                       | 10         | 20        | 4    | 8    | Yes   | Bands      | High     |                   | Upper  | Back                  | Grounded  | Underhand Row                                                           | *10*     | Pull          | N/A   | CM    |
| Band roll-ups & unrolls             | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Forearm               | Standing  | Band roll-ups & unrolls                                                 | *10*     | Pull          | N/A   | CM    |
| Bent-over back fly                  | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Back                  | Standing  | Bent-over back fly                                                      | *10*     | Pull          | N/A   | CM    |
| Calf presses                        | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Bottom | Calf                  | Standing  | Calf presses                                                            | *10*     | Pull          | N/A   | CM    |
| Donkey kicks                        | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Bottom | Leg Multi             | Grounded  | Donkey kicks                                                            | *10*     | Push          | N/A   | CM    |
| Lateral Raise                       | 5          | 10        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | [[Upper#^61234b \| Lateral Raise]]                                      | **10**   | Pull          | N/A   | CM    |
| Scarecrow raises                    | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Bottom | Shoulder              | Standing  | Scarecrow raises                                                        | *10*     | Pull          | N/A   | CM    |
| Side Dips                           | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Core   | Core                  | Standing  | Side Dips                                                               | *10*     | Pull          | N/A   | CM    |
| Kneeling concentration curl         | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | Kneeling concentration curl                                             | *10*     | Pull          | N/A   | CM    |
| Squatting forearm curls             | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Forearm               | Standing  | Squatting forearm curls                                                 | *10*     | Pull          | N/A   | CM    |
| Squatting Concentration Curl        | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | Squatting Concentration Curl                                            | *10*     | Pull          | N/A   | CM    |
| Squatting preacher curl             | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | Squatting preacher curl                                                 | *10*     | Pull          | N/A   | CM    |
| Standard Curl                       | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | Standard Curl                                                           | *10*     | Pull          | N/A   | CM    |
| V-raise                             | 10         | 20        | 4    | 8    | Yes   | Bands      | Med      |                   | Upper  | Multi                 | Standing  | V-raise                                                                 | *10*     | Pull          | N/A   | CM    |
| Kick-outs                           | 10         | 20        | 4    | 8    | Yes   | Bands      | Low      |                   | Bottom | Glutes                | Standing  | Kick-outs                                                               | *10*     | Pull          | N/A   | CM    |
| Bench Press                         | 30         | 40        | 4    | 8    | Yes   | Barbell    | _Highest | N/A               | Upper  | Chest                 | Flat      | [[Upper#^bcb0df \|Bench Press]]                                         | *17.5*   | Push          | N/A   | CM    |
| Bench Press                         | 30         | 40        | 4    | 8    | Yes   | Barbell    | _Highest | N/A               | Upper  | Chest                 | Incline   | [[Upper#^3f7ed5 \|Bench Press]]                                         | *17.5*   | Push          | N/A   | CM    |
| Deadlift                            | 20         | 40        | 4    | 8    | Yes   | Barbell    | _Highest | N/A               | Full   | Multi                 | Standing  | [[Lower#^1260ed \|Deadlift]]                                            | *10*     | Pull          | N/A   | CM    |
| Zercher Deadlift                    | 20         | 40        | 4    | 8    |       | Barbell    | _Highest | N/A               | Full   | Multi                 | Underhand | [[Full Body#^b30c79\|Zercher Deadlift]]                                 | *45*     | Pull          | N/A   | CM    |
| Romanian Deadlift                   | 20         | 40        | 4    | 8    |       | Barbell    | _Highest | N/A               | Full   | Multi                 | Standing  | [[Lower#^308171 \|Romanian Deadlift]]                                   | *10*     | Pull          | N/A   | CM    |
| B Squats                            | 20         | 40        | 4    | 8    |       | Barbell    | High     | N/A               | Bottom | Multi                 | Standing  | B Squats                                                                | *25*     | Pull          | N/A   | CM    |
| Clean to Jerk & Press               | 0          | 20        | 4    | 8    | Yes   | Barbell    | High     | N/A               | Full   | Multi                 | Standing  | [[Full Body#^0c16fd \|Clean to Jerk & Press]]                           | **5**    | Pull          | N/A   | EP    |
| Zercher Lunge                       | 20         | 40        | 4    | 8    |       | Barbell    | Med      | N/A               | Bottom | Multi                 | Underhand | [[Full Body#^4b1677\|Zercher Lunge]]                                    | *10*     | Push          | N/A   | CM    |
| Zercher Squats                      | 20         | 40        | 4    | 8    | Yes   | Barbell    | Med      | N/A               | Bottom | Multi                 | Underhand | [[Full Body#^765b0b \|Zercher Squats]]                                  | *25*     | Pull          | N/A   | CM    |
| Nordic Hamstring Curl               | 0          | 0         | 4    | 8    |       | Bodyweight | _Highest | N/A               | Bottom | Hamstring             | Grounded  | [[Lower#^4e02bb \|Nordic Hamstring Curl]]                               | ****     | Pull          | N/A   | CM    |
| PullUp                              | 0          | 0         | 4    | 8    | Yes   | Bodyweight | _Highest | N/A               | Upper  | Back Lats             | Neutral   | [[Upper#^e81d31 \|PullUp]]                                              | ****     | Pull          | N/A   | PG    |
| Rev Crunch                          | 0          | 0         | 4    | 8    | Yes   | BodyWeight | _Highest | N/A               | Core   | Lower Abdom           | Bench     | Rev Crunch try on incline bench                                         | *0*      | Flexion       | N/A   | RC    |
| Rev Nordic                          | 0          | 0         | 4    | 8    | Yes   | BodyWeight | _Highest | N/A               | Core   | Lower Abdom           | Grounded  | [[Core#^dd110e \|Rev Nordic]]                                           | *0*      | Pull          | N/A   | RC    |
| Back Extension                      | 0          | 15        | 4    | 8    | Yes   | BodyWeight | High     | N/A               | Core   | Abdom                 | Bench     | Back Extension                                                          | *0*      | Extension     | N/A   | RC    |
| ChinUp                              | 0          | 0         | 4    | 8    |       | Bodyweight | High     | N/A               | Upper  | Lats                  | Underhand | [[Upper#^a2d3cc \|ChinUp]]                                              | ****     | Pull          | N/A   | PG    |
| Dip                                 | 0          | 0         | 4    | 8    | Yes   | BodyWeight | High     | N/A               | Upper  | Tricep                | Wide      | Dip                                                                     | *0*      | Push          | N/A   | CMEP  |
| Dip                                 | 0          | 0         | 4    | 8    | Yes   | BodyWeight | High     | N/A               | Upper  | Tricep                | Narrow    | [[Upper#^a56816 \|Dips]]                                                | *0*      | Push          | N/A   | CMEP  |
| Double Crunch                       | 0          | 0         | 4    | 8    |       | BodyWeight | High     | N/A               | Core   | Abdom                 | Grounded  | [[Core#^450568 \|Double Crunch]]                                        | *0*      | Pull          | N/A   | RC    |
| PullUp                              | 0          | 0         | 4    | 8    | Yes   | Bodyweight | High     | N/A               | Upper  | Lats                  | Wide      | [[Upper#^bf9596 \|PullUp]]                                              | ****     | Pull          | N/A   | PG    |
| Half Kneeling Row                   | 22         | 55        | 4    | 8    | Yes   | Cable      | High     | N/A               | Upper  | Multi                 | Kneeling  | [[Upper#^0a983d \|Half Kneeling Row]]                                   | *10*     | Pull          | N/A   | CM    |
| Angled Chest Fly                    | 80         | 90        | 4    | 8    | Yes   | Cable      | _Highest | N/A               | Upper  | Chest                 | Standing  | Angled Chest Fly                                                        | **90**   | Push          | 4     | CM    |
| Pallof Press                        | 20         | 30        | 4    | 8    | Yes   | Cable      | _Highest | N/A               | Core   | Side Abbs             | Standing  | [[Core#^0729fc\|Pallof Press]]                                          | **44**   | Anti Rotation | N/A   | CM    |
| Kneeling Cable Crunch               | 33         | 44        | 4    | 8    | Yes   | Cable      | High     | N/A               | Core   | Upper Abdom add twist | Grounded  | [[Core#^9ffa73\|Kneeling Cable Crunch]]                                 | **44**   | Pull          | N/A   | CM    |
| Cable Curl                          | 30         | 40        | 4    | 8    | Yes   | Cable      | Med      | N/A               | Upper  | Bicep                 | Standing  | [[Upper#^42bc7c \| Cable Curl]]                                         | ****     | Pull          | N/A   | CM    |
| Cable Balloon Abduction             | ***160***  | ***160*** | 4    | 8    |       | Cable      | High     | N/A               | Upper  | Chest                 | Standing  | [[CableBalloonAbduction.gif \|Cable Balloon Abduction]]                 | *80*     | Pull          | 0     | PG    |
| Cable Snap Downs                    | ***160***  | ***160*** | 4    | 8    |       | Cable      | High     | N/A               | Upper  | Chest                 | Standing  | [Cable Snap Downs](https://www.youtube.com/shorts/IW40KjCwNmA)          | *80*     | Pull          | 0     | PG    |
| Cable Wolverine                     | ***160***  | ***160*** | 4    | 8    |       | Cable      | High     | N/A               | Upper  | Chest                 | Standing  | [[CableWolverine.gif\|Cable Wolverine]]                                 | *80*     | Pull          | 0     | PG    |
| Single Arm Back Cable Lateral Raise | 10         | 10        | 4    | 8    | Yes   | Cable      | High     | N/A               | Upper  | Shoulder              | Standing  | [[Upper#^971765 \|Single Arm Back Cable Lateral Raise]]                 | **0**    | Pull          | N/A   | PG    |
| Pancake Stretch                     | ***160***  | ***160*** | 4    | 8    |       | Cable      | High     | N/A               | Full   | Multi                 | Seated    | [[Core#^c47ced \| Pancake Stretch]]                                     | ***80*** | Pull          | 0     | RC    |
| Cable Woodchopper                   | ***160***  | ***160*** | 4    | 8    |       | Cable      | Med      | N/A               | Upper  | Multi                 | Standing  | [[Upper#^a7be5a \|Cable Woodchopper]]                                   | ***80*** | Pull          | 0     | RC    |
| Lateral Head Single Arm             | 10         | 20        | 4    | 8    | Yes   | Cable      | Med      | N/A               | Upper  | Shoulder              | Standing  | [[Upper#^88a124 \|Lateral Head Single Arm]]                             | ****     | Pull          | N/A   | CM    |
| Two Hand Overhead extension         | 0          | 0         | 4    | 8    |       | Cable      | Med      | N/A               | Upper  | Tricep                | Standing  | [[Upper#^05b651 \|Two Hand Overhead extension]]                         | **0**    | Pull          | N/A   | PG    |
| Cable Floor Fly                     | ***160***  | ***160*** | 4    | 8    |       | Cable      | Low      | N/A               | Upper  | Chest                 | Standing  | [[CableFloorFly.gif \|Cable Floor Fly]]                                 | ***80*** | Push          | 0     | PG    |
| Leg Cable Reverse Crunch            | 0          | 0         | 4    | 8    |       | Cable      | Low      | N/A               | Core   | Legs Multi            | Grounded  | [[Core#^b41212\| Leg Cable Reverse Crunch]]                             | *45*     | Pull          | 0     | RC    |
| Hip Extension                       | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises#^d00f82 \|Hip Extension]]                 | *10*     | Push          | N/A   | CM    |
| Hip Flexion                         | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises \|Hip Flexion ]]                          | *10*     | Push          | N/A   | CM    |
| Kickback                            | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises#^0552eb \|Kickback]]                      | *10*     | Push          | N/A   | CM    |
| Pull Through                        | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises#^8ca0fd \|Pull Through]]                  | *10*     | Push          | N/A   | CM    |
| Side Kick                           | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises#^dc7113 \|Side Kick]]                     | *10*     | Push          | N/A   | CM    |
| Step Through Lunge                  | 10         | 20        | 4    | 8    |       | Cables     | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Cable Machine Leg Exercises#^62416f \|Step Through Lunge]]            | *10*     | Push          | N/A   | CM    |
| Arnold Press                        | 10         | 20        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Shoulder              | Standing  | [[Full Body#^569c1a \| Arnold Press]]                                   | **10**   | Push          | N/A   | CM    |
| Incline Row                         | 0          | 0         | 4    | 8    |       | Dumbbell   | High     | N/A               | Upper  | Lats                  | Bench     | [[Upper#^4b1e6d \|Incline Row]]                                         | *0*      | Pull          | N/A   | CM    |
| Super Rom Lateral Raises            | 5          | 10        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Multi                 | Standing  | [[Upper#^767e47 \|Super Rom Lateral Raises]]                            | *0*      | Pull          | N/A   | CM    |
| Two Arm Row                         | 10         | 20        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Lats                  | Standing  | [[Upper#^cf2720 \|Two Arm Row]]                                         | *0*      | Pull          | N/A   | CM    |
| Reverse Preacher Curl               | 0          | 0         | 4    | 8    |       | Dumbbell   | High     | N/A               | Upper  | Biceps                | Standing  | [[Upper#^b1905f\| Lying back Reverse Preacher Curl]]                    | ****     | Pull          | N/A   | CM    |
| Wrist Curl                          | 5          | 10        | 4    | 8    | Yes   | Dumbbell   | High     | N/A               | Upper  | Forearm               | Standing  | [[Upper#^1156ec\|Wrist Curl]]                                           | *0*      | Pull          | N/A   | CM    |
| Wide Curl                           | 0          | 15        | 4    | 8    | Yes   | Dumbbell   | High     | N/A               | Upper  | Biceps                | Standing  | [[Upper#^60f95e \|Wide Curl]]                                           | ****     | Pull          | N/A   | CM    |
| Incline Preacher Curl               | 0          | 20        | 4    | 8    | Yes   | Dumbbell   | High     | N/A               | Upper  | Biceps                | Standing  | [[Upper#^6d88c7 \| Incline Preacher Curl]]                              | ****     | Pull          | N/A   | CM    |
| Bench Press                         | 10         | 15        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Chest                 | Incline   | [[Upper#^db98b7 \|Bench Press]]                                         | *20*     | Push          | N/A   | CM    |
| Overhead Extension                  | 10         | 15        | 4    | 8    | Yes   | Dumbbell   | Med      | N/A               | Upper  | Tricep                | Standing  | [[Upper#^f128a8 \|Overhead Extension]]                                  | **20**   | Pull          | N/A   | CM    |
| Rear Delt Fly                       | 10         | 15        | 4    | 8    | Yes   | Dumbbell   | High     | N/A               | Upper  | Shoulder Delt         | Both      | [[Upper#^98fc91\|Rear Delt Fly]]                                        | *10*     | Pull          | 0     | CM    |
| Skull Crusher                       | 5          | 10        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Tricep                | Seated    | [[Upper#^6beb70\|Skull Crusher]]                                        | *15*     | Push          | N/A   | CM    |
| Shoulder Press                      | 15         | 20        | 4    | 8    | Yes   | Dumbbell   | Med      | N/A               | Upper  | Shoulder              | Seated    | Shoulder Press                                                          | *10*     | Push          | N/A   | CM    |
| Lateral Raise                       | 5          | 10        | 4    | 8    | Yes   | Dumbbell   | Low      | N/A               | Upper  | Multi                 | Standing  | [[Upper#^034a05\| Lateral Raise]]                                       | **10**   | Pull          | N/A   | CM    |
| Zottman Curls                       | 10         | 15        | 4    | 8    | Yes   | Dumbbell   | _Highest | N/A               | Upper  | Biceps                | Standing  | [[Upper#^bee68f\| Zottman Curls]]                                       | **10**   | Push          | N/A   | CM    |
| Hammer Curls                        | 10         | 20        | 4    | 8    | Yes   | Dumbbell   | High     | N/A               | Upper  | Biceps                | Standing  | [[Upper#^eddf76\| Hammer Curls]]                                        | **10**   | Push          | N/A   | CM    |
| Single Arm Concentration Curls      | 10         | 20        | 4    | 8    | Yes   | Dumbbell   | Med      | N/A               | Upper  | Biceps                | Seated    | [[Upper#^40500c\| Single Arm Concentration Curls]]                      | **10**   | Push          | N/A   | CM    |
| Abduction Outer Thigh               | 110        | 120       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Bottom | Outer Thigh           | Spread    | Abduction Outer Thigh                                                   | **110**  | Push          | 7     | CM    |
| Chest Fly                           | 80         | 90        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Chest                 | Seated    | [[Upper#^238b6e \|Chest Fly]]                                           | **90**   | Push          | 4     | CM    |
| Chest Press                         | 50         | 60        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Chest                 | Wide      | Chest Press                                                             | **60**   | Push          | 1     | CM    |
| Hip Thrust                          | 120        | 130       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Bottom | Hamstring/Hips        | Seated    | [[Lower#^2559bb \|Hip Thrust]]                                          | *60*     | Push          | N/A   | CM    |
| Mid Row                             | 145        | 165       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Back Lats             | Seated    | Mid Row                                                                 | **165**  | Pull          | N/A   | PG    |
| Plate Pull Down                     | 70         | 90        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Back Lats             | Seated    | Plate Pull Down                                                         | *45*     | Pull          | N/A   | CM    |
| Rear Delt Fly                       | 60         | 70        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Shoulder Delt         | Seated    | Rear Delt Fly                                                           | **60**   | Pull          | 0     | CM    |
| Seated Dip                          | 95         | 105       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Tricep                | Seated    | Seated Dip                                                              | **125**  | Push          | N/A   | CMEP  |
| Single Arm Plate Pull Down          | 45         | 65        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Upper  | Back Lats             | Seated    | Single Arm Plate Pull Down                                              | **65**   | Pull          | N/A   | CM    |
| Single Leg Press                    | 90         | 180       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Bottom | Hamstring             | Seated    | Single Leg Press                                                        | *135*    | Push          | N/A   | CM    |
| Overhead Squat                      | 0          | 40        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Full   | Hamstring             | Standing  | [[Full Body#^cbb17a \|Overhead Squat]]                                  | *150*    | Push          | N/A   | CM    |
| Hack Squat                          | 270        | 300       | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Bottom | Hamstring             | Seated    | [[Lower#^1de02b \|Hack Squat]]                                          | *150*    | Push          | N/A   | CM    |
| Goblet Squat                        | 30         | 30        | 4    | 8    | Yes   | Fixed      | _Highest | N/A               | Full   | Hamstring             | Standing  | [[Full Body#^dec99b \|Goblet Squat]]                                    | *150*    | Push          | N/A   | CM    |
| Adduction Inner Thigh               | 110        | 120       | 4    | 8    | Yes   | Fixed      | High     | N/A               | Bottom | Inner Thigh           | Squeeze   | Adduction Inner Thigh                                                   | **140**  | Pull          | 0     | CM    |
| Lat Pull down                       | 105        | 125       | 4    | 8    | Yes   | Fixed      | High     | N/A               | Upper  | Back Lats             | Underhand | [[Upper#^ba48ce \|Lat Pull down]]                                       | **125**  | Pull          | N/A   | PG    |
| Leg Extension                       | 75         | 85        | 4    | 8    | Yes   | Fixed      | High     | N/A               | Bottom | Hamstring             | Seated    | Leg Extension                                                           | **85**   | Push          | 0     | CM    |
| Shoulder Press                      | 30         | 40        | 4    | 8    | Yes   | Fixed      | Med      | N/A               | Upper  | Shoulder              | Narrow    | Shoulder Press                                                          | *20*     | Push          | N/A   | CM    |
| Shoulder Press                      | 60         | 70        | 4    | 8    | Yes   | Fixed      | Med      | N/A               | Upper  | Shoulder              | Wide      | Shoulder Press                                                          | *35*     | Push          | N/A   | CM    |
| Low Row                             | 77         | 88        | 4    | 8    | Yes   | Fixed      | Med      | N/A               | Upper  | Lats                  | Seated    | [Low Row](https://youtu.be/S5jNFL_jzBU?si=v0klXgt6vDqI_Pmu)             | **88**   |               | N/A   | PG    |
| Angled Leg Press                    | 300        | 360       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Legs Multi            | WTCH      | Angled Leg Press                                                        | *180*    | Push          | N/A   | CM    |
| Angled Leg Press                    | 300        | 360       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Legs Multi            | WTCH      | Angled Leg Press                                                        | *180*    | Push          | N/A   | CM    |
| Leg Press off Back Abductor         | 540        | 540       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Inner Thigh           | Wide      | Leg Press off Back Abductor                                             | *270*    | Push          | N/A   | CM    |
| Leg Press off Back Calf             | 235        | 270       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Calf                  | Toes      | Leg Press off Back Calf                                                 | *135*    | Push          | N/A   | CM    |
| Leg Press off Back G&H              | 235        | 270       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Multi                 | Heals     | Leg Press off Back G&H                                                  | *135*    | Push          | N/A   | CM    |
| Leg Press off Back Quads            | 540        | 540       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Quads                 | Close     | Leg Press off Back Quads                                                | *270*    | Push          | N/A   | CM    |
| Leg Press Seated                    | 100        | 110       | 4    | 8    | Yes   | Fixed      | Low      | N/A               | Bottom | Multi                 | UpClose   | Leg Press Seated                                                        | **110**  | Push          | N/A   | CM    |
| Jefferson Curl                      | 0          | 0         | 4    | 8    |       | Kettlebell | _Highest | N/A               | Back   | Lower Abdom           | Platform  | [[Core#^7f79f3 \| Jefferson Curl]]                                      | *0*      | Pull          | N/A   | RC    |
| Kettlebell Swing                    | 17.6       | 17.6      | 4    | 8    | Yes   | Kettlebell | _Highest | N/A               | Full   | Multi                 | Standing  | [[Full Body#^bb1837\|Kettlebell Swing]]                                 | **17.6** | Both          | N/A   | PG    |
| Turkish Get-Up                      | 17.6       | 17.6      | 4    | 8    | Yes   | Kettlebell | _Highest | N/A               | Full   | Multi                 | Grounded  | [[Full Body#^7d58d7 \|Turkish Get-Up]]                                  | **17.6** | Both          | N/A   | RC    |
| Bottoms Up                          | 17.6       | 17.6      | 4    | 8    | Yes   | Kettlebell | High     | N/A               | Upper  | Multi                 | Standing  | [[Upper#^9def13\|Bottoms Up]]                                           | **17.6** | Pull          | N/A   | PG    |
| Lunge Twist Halo                    | 17.6       | 17.6      | 4    | 8    |       | Kettlebell | High     | N/A               | Upper  | Multi                 | Standing  | [[Full Body#^7ecf05 \|Lunge Twist Halo]]                                | **17.6** | Pull          | N/A   | RC    |
| Around the World                    | 17.6       | 17.6      | 4    | 8    | Yes   | Kettlebell | Med      | N/A               | Upper  | Multi                 | Standing  | Around the World                                                        | **17.6** | Pull          | N/A   | RC    |
| Kettlebell Snatch                   | 17.6       | 17.6      | 4    | 8    |       | Kettlebell | Med      | N/A               | Full   | Multi                 | Standing  | [[Full Body#^8b48af \|Kettlebell Snatch]]                               | **17.6** | Pull          | N/A   | EP    |
| Single Arm Clean Press              | 17.6       | 17.6      | 4    | 8    |       | Kettlebell | Med      | N/A               | Upper  | Multi                 | Standing  | Single Arm Clean Press                                                  | **17.6** | Pull          | N/A   | EP    |
| Cossack Squat                       | 17.6       | 17.6      | 4    | 8    |       | Kettlebell | Low      | N/A               | Bottom | Hamstring             | Standing  | [[Lower#^3ae11e \|Cossack Squat]]                                       | **17.6** | Push          | N/A   | CM    |
| Kettlebell Step-Up                  | 17.6       | 17.6      | 4    | 8    |       | Kettlebell | Low      | N/A               | Bottom | Multi                 | Standing  | [[Lower#^c9d45f \|Kettlebell Step-Up]]                                  | **17.6** | Push          | N/A   | EP    |
| Landmine Twist                      | 0          | 10        | 4    | 8    | Yes   | Landmine   | High     | N/A               | Upper  | Core                  | Standing  | [[Upper#^b8a4b6 \|Landmine Twist ]]                                     | *10*     | Pull          | N/A   | CM    |
| Anti-Rotation Press                 | 0          | 10        | 4    | 8    | Yes   | Landmine   | _Highest | N/A               | Full   | Multi                 | Standing  | [[Landmines#^759af1\|Anti-Rotation Press]]                              | *0*      | Pull          | N/A   | RC    |
| Landmine RDL                        | 0          | 10        | 4    | 8    | Yes   | Landmine   | _Highest | N/A               | Full   | Multi                 | Standing  | [[Landmines#^c3c1f0 \|Landmine RDL]]                                    | *0*      | Rotational    | N/A   | RC    |
| Landmine Russian Twist              | 0          | 10        | 4    | 8    | Yes   | Landmine   | _Highest | N/A               | Core   | Multi                 | Grounded  | [[Landmines#^f73ff4\|Landmine Russian Twist]]                           | *0*      | Rotational    | N/A   | RC    |
| Landmine Z Press                    | 0          | 10        | 4    | 8    | Yes   | Landmine   | _Highest | N/A               | Core   | Multi                 | Grounded  | [[Landmines#^aa7892\|Landmine Z Press]]                                 | *0*      | Rotational    | N/A   | RC    |
| Rotational Press                    | 0          | 10        | 4    | 8    | Yes   | Landmine   | _Highest | N/A               | Full   | Multi                 | Standing  | [[Landmines#^ae56eb\|Rotational Press]]                                 | *0*      | Rotational    | N/A   | RC    |
| Lateral Rotations                   | 0          | 10        | 4    | 8    | Yes   | Landmine   | Med      | N/A               | Full   | Multi                 | Standing  | [[Landmines#^ceab94 \|Lateral Rotations]]                               | *0*      | Pull          | N/A   | RC    |
| Squat to Press                      | 0          | 10        | 4    | 8    | Yes   | Landmine   | Low      | N/A               | Full   | Multi                 | Standing  | [[Landmines#^70b95c \|Squat to Press]]                                  | *0*      | Pull          | N/A   | RC    |
| Single-Arm Shoulder Press           | 0          | 10        | 4    | 8    | Yes   | Landmine   | High     | N/A               | Upper  | Shoulder              | Standing  | [[Landmines#^2a2dc9 \|Single-Arm Shoulder Press]]                       | *0*      | Pull          | N/A   | RC    |
| Reverse Lunge + Rotation            | 0          | 10        | 4    | 8    | Yes   | Landmine   | Med      | N/A               | Full   | Multi                 | Standing  | [[Landmines#^82208b\|Reverse Lunge + Rotation]]                         | *0*      | Pull          | N/A   | RC    |
| Hip Toss                            | 0          | 10        | 4    | 8    | Yes   | Landmine   | Low      | N/A               | Full   | Multi                 | Standing  | [[Landmines#^b4696f \|Hip Toss]]                                        | *0*      | Pull          | N/A   | RC    |
| Power Sled                          | 0          | 50        | 4    | 8    | Yes   | Sled       | _Highest | N/A               | Full   | Multi                 | Standing  | [[Full Body#^03bc4f \|Power Sled]]                                      | *25*     | Both          | N/A   | CM    |
| Tire Flip                           | 0          | 0         | 4    | 8    |       | Tire       | _Highest | N/A               | Full   | Multi                 | Standing  | Tire Flip                                                               | **0**    | Both          | N/A   | CM    |
| Arm Circles                         | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Upper  | Shoulder              | Standing  | [[Total Body Resistance Exercise#^661445\|Arm Circles]]                 | *10*     | Pull          | N/A   | CM    |
| Burpee                              | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Full   | Multi                 | Standing  | [[Total Body Resistance Exercise#^3dcd4e \|Burpee]]                     | *10*     | Pull          | N/A   | CM    |
| Fallout Rollouts                    | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Core   | Multi                 | Standing  | [[Total Body Resistance Exercise#^7e128f \|Fallout Rollouts]]           | *10*     | Pull          | N/A   | CM    |
| Hip Openers                         | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^723ad2 \|Hip Openers]]                | *10*     | Pull          | N/A   | CM    |
| Jump Lunges                         | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^41abf0 \|Jump Lunges]]                | *10*     | Pull          | N/A   | CM    |
| Single-Arm Rotational Row           | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Upper  | Multi                 | Standing  | [[Total Body Resistance Exercise#^0f0cba\|Single-Arm Rotational Row]]   | *10*     | Pull          | N/A   | CM    |
| Pistol Squats                       | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^0c4d25 \|Pistol Squats]]              | *10*     | Pull          | N/A   | CM    |
| Jump Squats                         | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^726153 \|Jump Squats]]                | *10*     | Pull          | N/A   | CM    |
| Assisted Deep Squat Hold            | 0          | 0         | 4    | 8    |       | TRX        | _Highest | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^a4b669 \|Assisted Deep Squat Hold]]   | *10*     | Pull          | N/A   | CM    |
| Atomic Push Up                      | 0          | 0         | 4    | 8    |       | TRX        | High     | N/A               | Upper  | Multi                 | Standing  | [[Total Body Resistance Exercise#^9a11d1 \|Atomic Push]]                | *10*     | Pull          | N/A   | CM    |
| Alternating Superman Pulls          | 0          | 0         | 4    | 8    |       | TRX        | High     | N/A               | Upper  | Multi                 | Standing  | [[Total Body Resistance Exercise#^58f92b\| Alternating Superman Pulls]] | *10*     | Pull          | N/A   | CM    |
| Mount Climbers                      | 0          | 0         | 4    | 8    |       | TRX        | High     | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^865012 \|Mount Climbers]]             | *10*     | Pull          | N/A   | CM    |
| Russian Twists                      | 0          | 0         | 4    | 8    |       | TRX        | High     | N/A               | Core   | Multi                 | Standing  | [[Total Body Resistance Exercise#^d7d533 \|Russian Twists]]             | *10*     | Pull          | N/A   | CM    |
| T-Spine Rotations                   | 0          | 0         | 4    | 8    |       | TRX        | High     | N/A               | Full   | Multi                 | Standing  | [[Total Body Resistance Exercise#^623746 \|T-Spine Rotations]]          | *10*     | Pull          | N/A   | CM    |
| Hamstring Floss                     | 0          | 0         | 4    | 8    |       | TRX        | Med      | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^370c0c \|Hamstring Floss]]            | *10*     | Pull          | N/A   | CM    |
| Knee Tucks                          | 0          | 0         | 4    | 8    |       | TRX        | Med      | N/A               | Core   | Multi                 | Standing  | [[Total Body Resistance Exercise#^45141d \|Knee Tucks]]                 | *10*     | Pull          | N/A   | CM    |
| Rotating Plank                      | 0          | 0         | 4    | 8    |       | TRX        | Med      | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^d3c2d7 \| Rotating Plank]]            | *10*     | Pull          | N/A   | CM    |
| Curl to Y-Fly                       | 0          | 0         | 4    | 8    |       | TRX        | Med      | N/A               | Upper  | Multi                 | Standing  | [[Total Body Resistance Exercise#^2f8cfd \|Curl to Y-Fly]]              | *10*     | Pull          | N/A   | CM    |
| Hamstring Curls                     | 0          | 0         | 4    | 8    |       | TRX        | Med      | N/A               | Bottom | Multi                 | Standing  | [[Total Body Resistance Exercise#^567e9e \|Hamstring Curls]]            | *10*     | Pull          | N/A   | CM    |
| Perfect Fitness Ab Carver Pro       | 0          | 0         | 4    | 8    | Yes   | Wheel      | High     | N/A               | Core   | Core                  | Grounded  | Perfect Fitness Ab Carver Pro                                           | *10*     | Pull          | N/A   | CM    |
^all


