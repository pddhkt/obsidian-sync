# tmux Usage Guide

> Comprehensive guide to using tmux for remote development

## Related Notes
- [[tmux-quick-reference|Quick Reference Card]]
- [[tmux-workflows|Workflows & Examples]]
- [[tmux-termius-setup|Termius Android Setup]]
- [[tmux-mosh-linux-setup-guide|Linux Setup Guide]]

---

## What is tmux?

**tmux** (terminal multiplexer) creates persistent terminal sessions that:
- Survive network disconnections
- Allow multiple windows and split panes
- Keep processes running even when you disconnect
- Perfect for remote development from mobile devices

---

## Basic Concepts

### Sessions
A session is a collection of windows. Think of it as a workspace.
- Sessions keep running even when you disconnect
- You can have multiple sessions for different projects
- Attach/detach from sessions at will

### Windows
Windows are like browser tabs - only one visible at a time.
- Each session can have multiple windows
- Switch between them with hotkeys
- Great for: editor, server, git, etc.

### Panes
Panes split a window into multiple sections, all visible at once.
- Horizontal splits (top/bottom)
- Vertical splits (left/right)
- Navigate between panes with arrows or mouse

---

## Starting tmux

### Quick Start (Using Aliases)

```bash
# Load aliases (already auto-loaded in interactive bash)
source ~/.bashrc

# Attach to existing session or create new one
tm

# Create/attach to named session
tms myproject

# List all sessions
tml

# Kill specific session
tmk projectname
```

### Full Commands

```bash
# Start new unnamed session
tmux

# Start new named session
tmux new -s projectname

# List all running sessions
tmux ls

# Attach to most recent session
tmux attach

# Attach to specific session
tmux attach -t projectname

# Kill specific session
tmux kill-session -t projectname

# Kill all sessions
tmux kill-server
```

---

## The Prefix Key

**Every tmux command starts with the prefix key: `Ctrl+b`**

### How It Works

1. Press and hold `Ctrl`
2. Press `b` (while holding Ctrl)
3. Release both keys
4. Press the command key

**Example:** Creating a new window
- Press `Ctrl+b`
- Release
- Press `c`

### Why a Prefix?

The prefix prevents conflicts with normal terminal shortcuts. It tells tmux "the next key is for you, not the terminal."

---

## Window Management

Windows let you organize different tasks (editor, server, git, etc.)

### Creating & Navigating

```
Ctrl+b then c        # Create new window
Ctrl+b then n        # Next window
Ctrl+b then p        # Previous window
Ctrl+b then 0-9      # Jump directly to window 0-9
Ctrl+b then l        # Toggle between last two windows
Ctrl+b then w        # Interactive window list (use arrows, Enter)
```

### Organizing Windows

```
Ctrl+b then ,        # Rename current window
Ctrl+b then .        # Move window to different number
Ctrl+b then &        # Kill current window (asks confirmation)
```

### Window List View

Press `Ctrl+b then w` to see:
```
(0) 0: editor*        # Current window marked with *
(1) 1: server-
(2) 2: git-
```

Use arrow keys to navigate, Enter to select, `q` to cancel.

---

## Pane Management

Panes split your screen to see multiple terminals at once.

### Creating Panes

```
Ctrl+b then "        # Split horizontally (top/bottom)
Ctrl+b then %        # Split vertically (left/right)
```

**Mnemonic:**
- `"` looks horizontal (―)
- `%` has a vertical line (|)

### Navigating Panes

```
Ctrl+b then arrows   # Move to pane in that direction
Ctrl+b then o        # Cycle through panes
Ctrl+b then ;        # Toggle to last active pane
Ctrl+b then q        # Show pane numbers (press number to jump)
```

**With mouse (enabled):**
- Just tap the pane you want!

### Resizing Panes

```
Ctrl+b then Ctrl+arrows   # Resize current pane (hold Ctrl)
```

**With mouse (enabled):**
- Tap and drag the border between panes

### Pane Layouts

```
Ctrl+b then space    # Cycle through preset layouts
Ctrl+b then z        # Toggle zoom (fullscreen current pane)
Ctrl+b then !        # Break pane into new window
```

### Managing Panes

```
Ctrl+b then x        # Kill current pane (asks confirmation)
Ctrl+b then {        # Swap with previous pane
Ctrl+b then }        # Swap with next pane
```

---

## Session Management

### Detaching & Attaching

**Detach** = disconnect from session (session keeps running)

```
Ctrl+b then d        # Detach from current session
```

After detaching:
- All windows/panes keep running
- Close your terminal/Termius
- Come back later and attach

**Attach** = reconnect to running session

```bash
tm                   # Attach to last session
tmux attach          # Same
tmux attach -t name  # Attach to specific session
```

### Managing Multiple Sessions

```
Ctrl+b then s        # Interactive session list
Ctrl+b then (        # Switch to previous session
Ctrl+b then )        # Switch to next session
Ctrl+b then $        # Rename current session
```

### Creating Named Sessions

Named sessions are easier to identify:

```bash
# Create named session
tmux new -s work

# Later, attach to it
tmux attach -t work

# Or use alias
tms work
```

---

## Copy Mode & Scrolling

Copy mode lets you scroll through terminal history and copy text.

### Entering Copy Mode

```
Ctrl+b then [        # Enter copy mode
```

### Navigation in Copy Mode

```
Arrow keys           # Move cursor
Page Up/Down         # Scroll by page
Ctrl+u / Ctrl+d      # Scroll half-page up/down
g                    # Go to top
G                    # Go to bottom
/pattern             # Search forward
?pattern             # Search backward
n                    # Next search result
N                    # Previous search result
```

### Copying Text (Vi Mode)

```
Space                # Start selection
Enter                # Copy selection and exit
Escape or q          # Exit copy mode
```

### Paste

```
Ctrl+b then ]        # Paste copied text
```

### With Mouse (Enabled)

**Easier way:**
- Just scroll normally with mouse/touchscreen!
- Double-tap to select words
- Long-press to copy (standard Android)

---

## Customization

### Configuration File

Location: `~/.tmux.conf`

Your current config includes:
```bash
# Mouse support
set -g mouse on

# Scrollback buffer
set -g history-limit 10000

# 256 colors
set -g default-terminal "screen-256color"

# Window numbering starts at 1
set -g base-index 1

# Reload config
bind r source-file ~/.tmux.conf \; display "Config reloaded!"
```

### Reloading Config

After editing `~/.tmux.conf`:

```
Ctrl+b then r        # Reload config (custom binding)
```

Or from command line:
```bash
tmux source-file ~/.tmux.conf
```

---

## Command Mode

You can type tmux commands directly:

```
Ctrl+b then :        # Enter command mode
```

Examples:
```
:new-window -n server     # Create window named "server"
:split-window -h          # Split horizontally
:resize-pane -D 10        # Resize down 10 lines
:setw synchronize-panes   # Type in all panes at once
```

Press `Escape` to cancel, `Enter` to execute.

---

## Tips & Tricks

### 1. Synchronize Panes
Type the same command in all panes at once:
```
Ctrl+b then :
:setw synchronize-panes on
```
Toggle off: same command again

### 2. Swap Windows
Move window 2 to position 0:
```
Ctrl+b then :
:swap-window -s 2 -t 0
```

### 3. Join Pane from Another Window
```
Ctrl+b then :
:join-pane -s 2.1    # Bring pane 1 from window 2 here
```

### 4. Display Pane Numbers
```
Ctrl+b then q        # Shows numbers on each pane
```
Press the number quickly to jump to that pane.

### 5. Clock Display
```
Ctrl+b then t        # Show clock in current pane
```
Press `q` to exit.

---

## Troubleshooting

### "No current client"
You're not in a tmux session. Run `tm` to start/attach.

### "Can't find session"
List sessions with `tml` or `tmux ls`. It may have been killed.

### Colors Look Wrong
Check `~/.tmux.conf` has:
```bash
set -g default-terminal "screen-256color"
```

### Mouse Not Working
Check `~/.tmux.conf` has:
```bash
set -g mouse on
```

### Lost in Copy Mode
Press `q` to exit.

### Panes Are Too Small
Use `Ctrl+b then z` to zoom current pane fullscreen.

---

## Getting Help

```
Ctrl+b then ?        # List all keybindings
man tmux             # Full manual
```

Press `q` to exit help screen.

---

## Summary

**Essential workflow:**
1. Start: `tm`
2. Create windows: `Ctrl+b c`
3. Switch windows: `Ctrl+b n/p` or `Ctrl+b 0-9`
4. Split panes: `Ctrl+b "` or `Ctrl+b %`
5. Navigate: arrows or mouse tap
6. Detach: `Ctrl+b d`
7. Reattach later: `tm`

**Everything else builds on these basics!**

---

*Last updated: 2025-11-09*
