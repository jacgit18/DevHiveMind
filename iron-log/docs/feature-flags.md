# Feature flags: how they work

## What a flag is

An `if` in your code that reads its value from somewhere you can change without redeploying. Something outside the code sets the value. The code only asks "is this on for this user or environment?"

## Who or what flips it

- **A person**, through a dashboard or config file (LaunchDarkly, Unleash, a JSON file, an env var). This is the most common case.
- **Targeting rules** that decide per user: percentage rollouts, specific user IDs, beta groups, or environment (on in dev, off in prod).
- **Automation.** For example, a kill switch that turns a feature off when the error rate spikes. This is the exception, not the default. A flag is not normally switched by an event trigger.

## Testing overrides

A browser extension, a `?flag=foo` query param, a localStorage value, or a hidden debug panel. These override the flag locally so both states can be tested without touching prod config. Keep them dev-only or gated so users can't flip them.

## Flag types

| Type | Lifespan | Purpose |
|---|---|---|
| Release | Temporary | Hide unfinished work; remove after rollout |
| Ops | Often long-lived | Kill switches |
| Experiment | Per test | A/B tests |
| Permission | Long-lived | Gate paid or beta features |

## In iron-log

For a solo app, a flag is usually a constant, an env var, or a localStorage boolean. TODO: find the flag already created and note its type and how it is toggled.
