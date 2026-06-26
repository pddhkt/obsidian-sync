---
type: script-folder-index
project: TimeKids
story: Ancient China
storyId: ancient-china
status: private-beta-demo
date: 2026-06-26
tags:
  - app-idea
  - timekids
  - scripts
  - ancient-china
---

# Ancient China Scripts

Scripts are versioned because the story may need multiple writing passes.

Use this structure:

```text
02-scripts/
  _index.md
  script-v1/
    _index.md
    01-chinese.md
    02-english.md
  script-v2/
    _index.md
    01-chinese.md
    02-english.md
```

## Versioning rules

- Keep `script-v1` as the first private beta demo draft.
- Create `script-v2` only when the story changes meaningfully, not for tiny typo edits.
- Keep scene IDs and line IDs stable across versions where possible.
- If a line changes meaning, keep the old line in the older version and create the new wording in the newer version.
- [[../03-scenes-and-hotspots]] should point to the current selected script version.

## Current selected script

| Version | Status | Chinese | English |
|---|---|---|---|
| script-v1 | private beta demo | [[script-v1/01-chinese|Chinese]] | [[script-v1/02-english|English]] |
