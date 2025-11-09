# tmux Workflows & Examples

> Practical workflows for remote development with tmux from Android/Termius

## Related Notes
- [[tmux-quick-reference|Quick Reference Card]]
- [[tmux-usage-guide|Detailed Usage Guide]]
- [[tmux-termius-setup|Termius Android Setup]]
- [[tmux-mosh-linux-setup-guide|Linux Setup Guide]]

---

## Daily Workflow

### Morning Routine

```bash
# 1. On Android: Connect WireGuard VPN
# 2. Open Termius
# 3. Connect to your host
# 4. Attach to your session

tm    # Everything from yesterday is still there!
```

### During Work

```bash
# Create windows as needed
Ctrl+b then c

# Name them for easy identification
Ctrl+b then ,

# Switch between tasks
Ctrl+b then 0/1/2   # or Ctrl+b then n/p
```

### Network Changes (WiFi ↔ Mobile Data)

```
# With Mosh: Auto-reconnects (might freeze briefly)
# With SSH: Connection drops, just reconnect in Termius and run:
tm
```

### End of Day

```bash
# Option 1: Detach (keeps everything running)
Ctrl+b then d

# Option 2: Just close Termius
# Everything keeps running either way!
```

---

## Workflow 1: Simple Single-Window Development

**Best for:** Quick edits, simple tasks

```bash
# 1. Start tmux
tm

# 2. Open your editor
nvim myfile.js

# 3. Need a terminal? Use LazyVim's built-in terminal
Ctrl+\          # Toggle terminal in nvim

# 4. Done? Detach
Ctrl+b then d
```

**Pros:**
- Simple, minimal
- No window switching needed
- Uses nvim's terminal features

**Cons:**
- Can't see server logs while editing
- Limited to nvim's terminal capabilities

---

## Workflow 2: Multi-Window Development (Recommended)

**Best for:** Active development with build/server running

```bash
# 1. Start named session
tms myproject

# 2. Setup Window 0: Editor
nvim
Ctrl+b then ,    # Rename to "editor"

# 3. Create Window 1: Dev Server
Ctrl+b then c
npm run dev
Ctrl+b then ,    # Rename to "server"

# 4. Create Window 2: Git/Commands
Ctrl+b then c
Ctrl+b then ,    # Rename to "git"

# 5. Switch between windows
Ctrl+b then 0    # Editor
Ctrl+b then 1    # Server (check logs)
Ctrl+b then 2    # Git commands
Ctrl+b then 0    # Back to editor
```

**Pros:**
- ✅ Full screen for each task
- ✅ Easy to check server logs
- ✅ Dedicated space for git
- ✅ Works great on small screens

**Cons:**
- More window switching
- Can't see multiple things at once

**Window naming makes this easier:**
```
Status bar shows: [myproject] 0:editor* 1:server- 2:git-
                              ^ Current window
```

---

## Workflow 3: Split Screen with Panes

**Best for:** Monitoring logs while coding (better on tablets)

```bash
# 1. Start in editor
nvim

# 2. Split horizontally (editor top, terminal bottom)
Ctrl+b then "

# 3. Navigate to bottom pane
Ctrl+b then down arrow

# 4. Start server in bottom pane
npm run dev

# 5. Back to top pane (editor)
Ctrl+b then up arrow
# Or just tap the editor pane with mouse

# 6. Need full screen for coding?
Ctrl+b then z    # Zoom editor pane
# Code...
Ctrl+b then z    # Zoom out to see logs again
```

**Typical layouts:**

**Horizontal split (top/bottom):**
```
┌─────────────────┐
│   nvim editor   │  ← 70% height
├─────────────────┤
│  server logs    │  ← 30% height
└─────────────────┘
```

**Vertical split (side by side):**
```
┌──────────┬──────┐
│          │      │
│  editor  │ logs │
│          │      │
└──────────┴──────┘
```

**Pros:**
- See code and logs simultaneously
- Quick pane switching

**Cons:**
- Less space for each pane
- Can be cramped on phones

---

## Workflow 4: Using the Pre-Made Session Script

**Best for:** Consistent project setup

```bash
# Create development session automatically
tmux-dev-session myproject ~/path/to/project

# Or just use current directory
tmux-dev-session
```

This creates:
- Window 0: "editor" (empty, ready for nvim)
- Window 1: "server" (ready to run dev server)
- Window 2: "git" (ready for git commands)

**Customize the script:** Edit `/home/jck/.local/bin/tmux-dev-session`

Example customization - auto-start nvim:
```bash
# In the script, uncomment:
tmux send-keys -t "$SESSION_NAME:0" "nvim" C-m
```

---

## Workflow 5: Multiple Projects

**Best for:** Working on several projects

```bash
# Project 1: Web app
tms webapp
# Setup windows...
Ctrl+b then d    # Detach

# Project 2: API server
tms api
# Setup windows...
Ctrl+b then d    # Detach

# Project 3: Documentation
tms docs
# Setup windows...

# Switch between projects
Ctrl+b then s    # Shows session list:
# - webapp
# - api
# - docs* (current)
# Use arrows to select, Enter to switch
```

**List all projects:**
```bash
tml
```

**Jump to specific project:**
```bash
tmux attach -t webapp
```

---

## Common Scenarios

### Scenario: "I Need to Run Tests While Coding"

```bash
# Window 0: Editor
nvim

# Window 1: Test watcher
Ctrl+b then c
npm test -- --watch
Ctrl+b then ,    # Name: "tests"

# Switch back to editor
Ctrl+b then 0

# Edit code, save
# Check test results
Ctrl+b then 1
```

### Scenario: "Monitoring Multiple Log Files"

```bash
# Create 4 panes for different logs
Ctrl+b then "    # Split horizontal
Ctrl+b then %    # Split vertical (top pane)
Ctrl+b then down # Move to bottom
Ctrl+b then %    # Split vertical (bottom pane)

# Now you have 4 panes:
# ┌────────┬────────┐
# │ log 1  │ log 2  │
# ├────────┼────────┤
# │ log 3  │ log 4  │
# └────────┴────────┘

# In each pane, tail different logs
tail -f /var/log/app1.log
# (switch panes and repeat)
```

### Scenario: "Database + App + Logs"

**Window layout:**
```
Window 0: "editor" - nvim
Window 1: "app" - npm run dev
Window 2: "db" - psql database
Window 3: "logs" - tail -f logs/*.log
```

```bash
# Quick navigation
Ctrl+b then 0    # Edit code
Ctrl+b then 1    # Check app output
Ctrl+b then 2    # Run SQL queries
Ctrl+b then 3    # Check logs
```

### Scenario: "Pair Programming Session"

```bash
# Person 1: Create session
tmux new -s pair-session

# Person 2: Attach to same session (different SSH connection)
tmux attach -t pair-session

# Both see and control the same session!
# Great for remote collaboration
```

### Scenario: "Long Running Build"

```bash
# Start tmux
tm

# Start build in new window
Ctrl+b then c
npm run build    # Takes 30 minutes

# Detach and do other things
Ctrl+b then d

# Close Termius, get coffee, switch networks...

# Later: Check if build finished
tm
Ctrl+b then 1    # Check build window
```

---

## Tips for Mobile Development

### 1. Use Windows Over Panes on Small Screens

**Phones:**
- Windows are better (full screen per task)
- Panes are cramped

**Tablets:**
- Panes work well
- 2-3 panes comfortable

### 2. Name Everything

```bash
# Name sessions
Ctrl+b then $

# Name windows
Ctrl+b then ,
```

Makes navigation much easier!

### 3. Use the Window List

```
Ctrl+b then w
```

Visual list with navigation - great for touchscreens

### 4. Leverage Mouse Support

Your config has mouse enabled:
- **Tap** to switch panes
- **Drag** borders to resize
- **Scroll** through history
- **Double-tap** to select words

### 5. Keep It Simple at First

Start with:
- 2-3 windows max
- Minimal panes
- Learn one workflow well

Expand as you get comfortable.

---

## Productivity Patterns

### The "Main + Monitor" Pattern

```
Window 0: Main work (editor)
Window 1: Monitor (server, always running)
```

Stay in Window 0 most of the time, occasionally check Window 1.

### The "Edit-Test-Commit" Pattern

```
Window 0: Editor
Window 1: Test runner
Window 2: Git
```

Cycle: Edit (0) → Test (1) → Commit (2) → repeat

### The "Full Stack" Pattern

```
Window 0: Frontend code
Window 1: Frontend dev server
Window 2: Backend code
Window 3: Backend server
Window 4: Database CLI
Window 5: Git
```

### The "Focus" Pattern

```
# Just one window: editor
# Use nvim's built-in terminal for everything
# Minimalist, distraction-free
```

---

## Troubleshooting Workflows

### "I Have Too Many Windows!"

```bash
# List windows
Ctrl+b then w

# Kill unwanted windows
Ctrl+b then &    # Kills current window

# Or navigate and kill specific ones
Ctrl+b then 5
Ctrl+b then &
```

### "Lost Track of What's Where"

```bash
# Use descriptive names
Ctrl+b then ,

# Status bar shows all windows:
[session] 0:editor* 1:server- 2:git-
```

### "Panes Are Too Small"

```bash
# Zoom current pane (temporary fullscreen)
Ctrl+b then z

# Work in fullscreen
# Toggle back when needed
Ctrl+b then z
```

### "Accidentally Split Too Many Times"

```bash
# Close unwanted panes
Ctrl+b then x    # Close current pane

# Or break pane to new window
Ctrl+b then !    # Pane becomes Window
```

---

## Advanced: Session Templates

Create a script for your common projects:

**Example:** `~/bin/start-webapp-session`

```bash
#!/bin/bash
SESSION="webapp"
PROJECT="$HOME/projects/my-web-app"

tmux new-session -d -s $SESSION -c $PROJECT

# Window 0: Editor
tmux rename-window -t $SESSION:0 'editor'
tmux send-keys -t $SESSION:0 "nvim" C-m

# Window 1: Frontend dev server
tmux new-window -t $SESSION:1 -n 'frontend' -c $PROJECT
tmux send-keys -t $SESSION:1 "npm run dev" C-m

# Window 2: Backend API
tmux new-window -t $SESSION:2 -n 'backend' -c $PROJECT/api
tmux send-keys -t $SESSION:2 "npm start" C-m

# Window 3: Git
tmux new-window -t $SESSION:3 -n 'git' -c $PROJECT

# Select editor window
tmux select-window -t $SESSION:0

# Attach
tmux attach -t $SESSION
```

Usage:
```bash
chmod +x ~/bin/start-webapp-session
start-webapp-session
```

---

## Summary: Choosing Your Workflow

**New to tmux?** → Workflow 2 (Multi-Window)
**Small phone screen?** → Workflow 2 (Multi-Window)
**Tablet/larger screen?** → Workflow 3 (Split Panes)
**Simple tasks?** → Workflow 1 (Single Window)
**Multiple projects?** → Workflow 5 (Multiple Sessions)
**Consistent setup?** → Workflow 4 (Session Scripts)

**Remember:**
- Start simple
- Add complexity as needed
- Experiment to find what works for you
- Mobile development is different - embrace the constraints!

---

*Last updated: 2025-11-09*
