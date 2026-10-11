# 019. A monthly grocery list under Daily: admin-only, kept on the device first

Status: accepted by the user, 2026-10-10 (device-only first and the Occasional section were chosen by the user)
Depth class: product and data

## Context

The owner shops at several places each month (a vegetable market, a few chains, a wholesale club), buys the same things every month, and has a few items bought once in a blue moon. They want a list that starts fresh each month with the same items, where each item has a count and a price (they often buy several of one thing). It sits under the Daily tab, admin-only for now ([[feature-flags]]).

Putting it in the sync means a new server table, migration, commands, row-level security, the erase-my-data function and about twenty client files (the supplements path, found by tracing `supplements` end to end). That is a large production change for an admin-only feature the user may reshape after using it.

## Decision

1. **Two kinds of document, both kept on this device only.** `grocery/main` is the catalogue: store names in order, and items `{id, n, store, qty, cents, once}` (`qty` the usual count, `cents` the last unit price, `once` = occasional). `grocery/YYYY-MM` is one month: `lines {itemId: {got, qty, cents}}` and `pulled [itemId]`. Both live in the browser's storage (`LS`), read at startup in every data mode. Their paths are not in the sync's map (`parsePath` returns null), which the sync already treats as "stays in the browser". No server, migration or API change.
2. **A month is derived, not reset.** A month with no saved document is the catalogue's regular items with nothing ticked. Nothing is copied or cleared when the month changes; the list is "fresh" because the month has no record yet. Past months stay readable with the month arrows (back to any month, never past the current one).
3. **Occasional items** (`once`) stay in the catalogue but are not on a month's list. An *Occasional* card lists them; *Add to this month* pulls one onto that month only (`pulled`), *Take off* removes it again.
4. **Count and price.** The count may be a decimal (0.01 to 999, for produce by weight); the price is the unit price in whole cents (so totals do not drift), up to $999,999.99. A line's total is `round(qty × cents)`. The month screen shows, per store and overall: got of count, spent (ticked items), expected (all items), and how many have no price. Ticking records the count and price paid in the month, so a later catalogue change does not rewrite it. A price typed in the **current** month is remembered as the item's usual price for next month; editing an older month never changes today's price. A count change is that month's only.
5. **Stores** are free text the user creates (by adding an item with a store, or in Edit → Stores). A store can be removed only when it has no items. Items with no store show under *Anywhere*. The store drop-downs also offer suggested stores you have not used yet (BJ's, C-Town, Whole Foods, Flatbush Co-Op, Aldi; `SUGGESTED_STORES` in `lib/grocery.ts`); picking one adds it to your stores. Groceries is the first button in the Daily section row, ahead of Supplements, which still opens first.
6. **Data file and backups include it** (additive `grocery` part, left out when empty, `DATA_FORMAT` unchanged): import *Add* keeps what is here and adds missing items, stores and months (a line that exists here stays whole); *Replace* makes the list match the file (the old months are removed only after the new ones are written). A **Groceries** choice shows in the import sheet only for a file that holds a list. **Delete my data** also clears the device's list, since it is the user's data.
7. **Admin-only:** `grocery: 'admin'` in `FEATURES`, the Daily section is hidden by `useFeature('grocery')`. Release: change to `'all'`, then delete the flag and the check. There is no API route, so no `requireAdmin` is needed.

## Alternatives considered

- **Full sync now** (new `grocery_*` tables, commands, RLS, erase function, client mapping). Right end state if the list proves useful, but about twenty files and a production migration for an unproven feature. Deferred, not rejected (see Consequences).
- **Reuse `list_items` for the catalogue.** Cheaper than a new table, but still needs a migration (CHECK on list names) and client mapping; and the month records would still need their own storage. Deferred with the sync work.
- **Copy last month's list into a new document each month.** Needs a rollover step that can fail or double-run, and edits to the catalogue would not reach the copy. The derived month has no such step.
- **Everything every month, skip rare items by not ticking.** Clutters the list with items bought a few times a year. Lost; the user chose the Occasional section.
- **Integer counts only.** Simpler, but produce is bought by weight at the vegetable market. Decimals allowed.

## Consequences

- The list exists only on the device it was typed on. A phone and a laptop each have their own, until syncing is added; the data file moves one to the other. Clearing the browser's site data deletes it (back it up with Export or the GitHub backup).
- **Past months are read through today's catalogue** (intended, kept simple): removing an item drops it from past months' totals, and a new item shows up unticked in past months. A month stores only ticks, counts and prices by item id.
- **Whose list it is (review fix, 2026-10-11).** The list belongs to the device's owner, like the synced data (`sync/owner`). When the device is handed to a different account (an empty device taken over, or the user's "wipe for the new account") the app clears the list (`onOwnerChange` in `apiDb.ts`, `clearGrocery`). A plain sign-out and sign-in as the same account keeps it: clearing on every sign-out would delete a list that exists nowhere else. Only an admin exports, backs up or imports the list (`isAdminNow()`; the Groceries import choice is hidden otherwise).
- **Importing "Add" with ids from another device.** Ids are made per device, so an incoming item is matched to a local one by name and store; otherwise it is added under a new id if its own is taken, and its month lines follow that mapping. Lines for items the file does not list, or that could not be added, are dropped, never attached to another item.
- Adding sync later: add a path kind per document (`grocery` and `grocerymonths`), rows and commands, and an admin gate on the routes (`requireAdmin`); existing device data uploads through the same import road as other documents. Backlog entry: "Sync the grocery list".
