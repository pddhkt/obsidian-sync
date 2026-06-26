# Second Brain — Agent Charter

This repo is Jack's Obsidian vault: a second brain for knowledge, projects, and ideas.
Your job in any session here is one of three things:

1. **Capture** — turn what Jack tells you (ideas, decisions, meeting notes, learnings) into well-placed, well-linked notes. Nothing important should live only in chat.
2. **Organize** — keep notes in the right folder, linked with wikilinks, with frontmatter, so they are findable later.
3. **Retrieve** — when Jack asks "what did we decide / where is / what do I know about X", search the vault first (Grep/Glob or the obsidian-cli skill) before answering from memory.

Write notes in Obsidian Flavored Markdown (wikilinks, callouts, frontmatter) — use the `obsidian-markdown` skill conventions.

## Vault map

| Folder | What lives there |
|---|---|
| `ManyProfit Group/` | Shared umbrella for the Many Profit / Imarflex platform. Start at `ManyProfit Group/_index.md`. Contains `Imarflex/` for brand-specific storefront, pitch, brand, and marketing work, and `ManyProfit/` for parent-distributor, multi-brand-channel, launch, architecture, and commercial notes. |
| `ctint/` | CTINT day-job knowledge, by project: `axa/`, `HGC/`, `qhms/`, `shacom/`, `tts/` |
| `Personal/` | Personal projects & ideas: `App Ideas/<Idea>/`, `Personal Website/`, `Gaming/` |
| `Learn/` | Learning notes by topic, e.g. `Learn/Dev/...` |
| `Attachments/` | Images and Excalidraw files (don't put notes here) |

Placement rules:
- A new idea → new folder `Personal/App Ideas/<Idea Name>/` with an index note.
- A decision or discussion outcome for an existing project → that project's folder (`ManyProfit Group/Imarflex/decisions/`, `ManyProfit Group/ManyProfit/decisions/`, `ctint/<project>/`, `Personal/App Ideas/<Idea>/`).
- A reusable how-to or concept not tied to a project → `Learn/`.
- If a project has an `_index.md`, add a link to significant new notes there.
- If this map drifts from reality (folders added/renamed), update this file.

## Standing rules

- Imarflex was established in **1973** (not 1956) — correct any draft that says otherwise.
- LIHKG/Reddit forum sentiment is internal-only research — never put it in client-facing Imarflex docs.
- Vault content is mostly Cantonese + English mixed; match the language of the note you're editing.
