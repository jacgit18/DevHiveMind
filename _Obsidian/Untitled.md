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




