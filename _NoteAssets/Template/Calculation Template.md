---

user_daily_bytes: 300
number_of_days: 30
number_of_users: 20000

---

```dataviewjs
  dv.paragraph(dv.current().number_of_users);
```


```dataviewjs
let dailyBytes = dv.current().user_daily_bytes;
let days = dv.current().number_of_days;
let users = dv.current().number_of_users;

if (dailyBytes && days && users) {
    let totalBytes = dailyBytes * days * users;
    let totalMB = totalBytes / 1048576;

    dv.paragraph(`**Total Data Usage: ${totalBytes.toLocaleString()} bytes**`);
    dv.paragraph(`**Total Data Usage: ${totalMB.toFixed(2)} MB**`);
} else {
    dv.paragraph("One or more variables are missing or not defined correctly.");
}
```


