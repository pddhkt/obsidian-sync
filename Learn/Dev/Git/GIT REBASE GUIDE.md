
# Git Rebase Guide

## What is Rebase?

Rebase moves your commits to a new base commit. Instead of creating a merge commit, it rewrites history by placing your commits on top of the target branch.

### Visual Example

**Before rebase:**
```
main:    A---B---C
              \
feature:       D---E
```

**After `git rebase main`:**
```
main:    A---B---C
                  \
feature:           D'---E'
```

The commits D and E become D' and E' (new hashes) because they now have C as their parent instead of B.

---

## Rebase vs Merge

| Aspect | Rebase | Merge |
|--------|--------|-------|
| History | Linear, clean | Preserves branch structure |
| Commit hashes | Changed | Preserved |
| Conflict resolution | Once per commit | Once for all |
| Safe for shared branches | No | Yes |

### When to Use Rebase
- Updating feature branch with latest main
- Cleaning up local commits before pushing
- Solo work on a feature branch

### When to Use Merge
- Shared branches with multiple collaborators
- Preserving complete history is important
- Already pushed commits

---

## Common Rebase Commands

### 1. Update Feature Branch with Main
```bash
git checkout feature-branch
git rebase main
```

### 2. Continue After Resolving Conflicts
```bash
# After fixing conflicts in files
git add <resolved-files>
git rebase --continue
```

### 3. Abort Rebase (if something goes wrong)
```bash
git rebase --abort
```

### 4. Skip a Problematic Commit
```bash
git rebase --skip
```

---

## Interactive Rebase

Interactive rebase (`git rebase -i`) lets you modify commits before applying them.

### Basic Usage
```bash
# Rebase last N commits
git rebase -i HEAD~N

# Example: Modify last 5 commits
git rebase -i HEAD~5
```

### Interactive Commands

When you run interactive rebase, an editor opens with commits listed:

```
pick abc1234 First commit message
pick def5678 Second commit message
pick ghi9012 Third commit message
```

**Available commands:**
| Command | Short | Description |
|---------|-------|-------------|
| pick | p | Use commit as-is |
| reword | r | Use commit, but edit message |
| edit | e | Stop for amending |
| squash | s | Merge into previous commit (keep message) |
| fixup | f | Merge into previous commit (discard message) |
| drop | d | Remove commit entirely |

### Squash Example

To combine 3 commits into 1:

```bash
git rebase -i HEAD~3
```

Change:
```
pick abc1234 Add feature
pick def5678 Fix typo
pick ghi9012 Add tests
```

To:
```
pick abc1234 Add feature
squash def5678 Fix typo
squash ghi9012 Add tests
```

Save and close. A new editor opens to combine commit messages.

---

## Force Push After Rebase

After rebasing, your local branch diverges from remote:

```bash
# Only if you're the only one working on this branch!
git push --force-with-lease

# Or standard force push
git push -f
```

### Safety Warning

**NEVER force push to shared branches** unless:
- You're the only one working on the branch
- You've coordinated with teammates
- No one has pulled your old commits

---

## Practical Scenarios

### Scenario 1: Keep Feature Branch Updated
```bash
# On feature branch
git fetch origin
git rebase origin/main
# Resolve any conflicts
git push --force-with-lease
```

### Scenario 2: Clean Up Messy Commits Before PR
```bash
# Squash 5 "WIP" commits into meaningful ones
git rebase -i HEAD~5
# Change 'pick' to 'squash' for commits to combine
```

### Scenario 3: Fix Commit Message
```bash
git rebase -i HEAD~1
# Change 'pick' to 'reword'
# Save, then edit the message in new editor
```

### Scenario 4: Remove Accidental Commit
```bash
git rebase -i HEAD~3
# Change 'pick' to 'drop' for the bad commit
```

---

## Troubleshooting

### Stuck in Rebase
```bash
# Check status
git status

# See what's happening
git rebase --show-current-patch

# Abort if needed
git rebase --abort
```

### Conflicts During Rebase
1. Open conflicting files
2. Resolve conflicts (look for `<<<<<<<`, `=======`, `>>>>>>>`)
3. `git add <resolved-files>`
4. `git rebase --continue`

### Lost Commits After Rebase
```bash
# Find lost commits in reflog
git reflog

# Recover specific commit
git cherry-pick <commit-hash>
```

---

## Golden Rules

1. **Never rebase shared/public branches** (main, develop, etc.)
2. **Always use `--force-with-lease`** instead of `-f` when possible
3. **Backup before complex rebases**: `git branch backup-branch`
4. **Rebase often** to avoid massive conflict resolution later
