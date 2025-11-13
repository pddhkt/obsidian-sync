---
name: git:commit
description: Generate a commit message and commit staged changes
---

Analyze the currently staged changes, generate a concise commit message, and create the commit.

Steps:
1. Run `git status` to see staged files
2. Run `git diff --staged` to see the actual changes
3. Analyze the changes to understand what was modified
4. Generate a single-line commit message that:
   - Is concise (under 72 characters if possible)
   - Uses imperative mood (e.g., "add", "fix", "update", not "added", "fixed", "updated")
   - Summarizes the purpose/impact of the changes
   - Does NOT include any attribution footer

5. Create the commit using `git commit -m "message"`
6. Display the commit message and confirmation to the user

Important:
- Do NOT include Claude Code attribution
- Keep the message to ONE line only
- If there are no staged changes, inform the user and do not commit
- Do NOT push to remote (only commit locally)
