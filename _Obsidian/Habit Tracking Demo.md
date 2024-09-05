---
banner: "https://i.redd.it/wh8o4f9ilph91.png"
banner_y: 0.5
---
### Habit Tracker 

```dataviewjs
const pages = dv.pages('"Review/Daily"')
  .where((p) => "Writing" in p || "Workout" in p || "Reading" in p)
  .sort((p) => p.file.day, "desc")
  .map((p) =>
    Object.create({
      link: p.file.link,
      day: p.file.day,
      Writing: p.Writing,
      Workout: p.Workout,
      Reading: p.Reading,
    })
  );

function getStreak(validate) {
  let count = 0;
  for (const note of pages) {
    if (validate(note)) count++;
    else break;
  }
  return count;
}

function getRecord(validate) {
  let record = 0;
  let count = 0;

  for (const note of pages) {
    if (validate(note)) {
      count++;
      record = Math.max(record, count);
    } else {
      count = 0;
    }
  }
  return record;
}

const done = "✅";
const skip = "🟥";

const fileRows = pages
  .filter((p) => p.day >= moment().subtract(1, "y"))
  .sort((p) => p.day)
  .map((note) => [
    note.link,
    note.Writing ? done : skip,
    note.Workout ? done : skip,
    note.Reading ? done : skip,
  ]);

const writing = [
  getStreak((note) => note.Writing),
  getRecord((note) => note.Writing),
];
const workout = [
  getStreak((note) => note.Workout),
  getRecord((note) => note.Workout),
];
const reading = [
  getStreak((note) => note.Reading),
  getRecord((note) => note.Reading),
];

dv.table(
  ["Date", "✍🏼", "💪🏼", "📖"],
  [
    ...fileRows,
    ["‎"],
    ["**Streak**", writing[0], workout[0], reading[0]],
    ["**Record**", writing[1], workout[1], reading[1]],
  ]
);

```

