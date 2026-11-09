---
description: Design, build, tune or review an award-level site with Dazzle
argument-hint: "[studio | review [url] | what you want]"
---

Route this `/dazzle` call, then hand over to the `dazzle` skill. Do no design work in this command.

The arguments are: `$ARGUMENTS`

1. Read the first word of the arguments, ignoring case.
   - `studio` → mode `studio`. Ignore any further words.
   - `review` → mode `review`. If the next word is a URL (starts with `http://`, `https://` or `localhost`), that is the `url`; otherwise there is no URL and the rest is extra context for the review.
   - anything else, or no arguments → mode `request`. The whole argument string, unchanged, is the request.
2. Load the `dazzle` skill with the Skill tool and follow it, starting from its "Arguments from /dazzle" section with the mode, url and request from step 1.
