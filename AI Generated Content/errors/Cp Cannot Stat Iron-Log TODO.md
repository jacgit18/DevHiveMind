---
tags:
  - error
author:
  - jacgit18
Description: "cp could not find iron-log/TODO.md at the repo root because the file had been moved to docs/TODO.md (uncommitted) after an earlier directory listing showed it at the root."
Comments:
Purpose: This documentation discusses this error in this context.
Status: Resolved
Started: 2026-10-03
EditDate: 2026-10-03
Relates:
Peer Reviewed:
dg-publish:
---
## Error Details
```dataviewjs
const { Description } = dv.current();

dv.header(3, "Description");
dv.paragraph(
  `${Description}`,
);
```

### Steps to Reproduce

1. `ls -a /home/jac/Videos/iron-log` listed `TODO.md` at the project root.
2. Later, `cp -a /home/jac/Videos/iron-log/TODO.md <DevHiveMind>/iron-log/TODO.md` was run.

### Expected Behavior

The file is copied into DevHiveMind/iron-log.

### Actual Behavior

`cp` failed. `git status` in iron-log then showed `D TODO.md` and `?? docs/TODO.md`: the file was no longer at the root and an identical copy (matches `HEAD:TODO.md`) sat in `docs/`, uncommitted. Who moved it and when is not known; it happened after the earlier listing and after the `docs/` copy to DevHiveMind was made, so that copy lacked it.

## Environment

- Operating System: Linux 7.1.1-76070101-generic
- Software Version: `[Enter Software Version]`
- Relevant Settings/Configuration: iron-log working tree had uncommitted changes; DevHiveMind/iron-log/docs had been copied earlier the same day.

## Error Messages

```
cp: cannot stat '/home/jac/Videos/iron-log/TODO.md': No such file or directory
```

## Screenshots

N/A (text-only session)

## Additional Notes

Detected by `git status` and `git log -- TODO.md`, not by the copy itself. Stale-snapshot class of problem: a listing taken earlier was reused after the tree changed.

## Resolution Steps

Copied `/home/jac/Videos/iron-log/docs/TODO.md` to `DevHiveMind/iron-log/docs/TODO.md` and confirmed with `cmp` that the two are identical.

## Related Issues/References

None.
