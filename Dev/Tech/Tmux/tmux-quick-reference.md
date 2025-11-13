# tmux Quick Reference

> Quick reference card for tmux commands - essential shortcuts for remote development

## Related Notes
- [[tmux-usage-guide|Detailed Usage Guide]]
- [[tmux-workflows|Workflows & Examples]]
- [[tmux-termius-setup|Termius Setup]]
- [[tmux-mosh-linux-setup-guide|Linux Setup Guide]]

---

## Starting & Connecting

```bash
tm                   # Start/attach session (alias)
tms name             # Named session (alias)
tmux                 # Start new session
tmux new -s name     # Start named session
tmux ls              # List all sessions
tml                  # List sessions (alias)
tmux attach          # Attach to last session
tmux attach -t name  # Attach to specific session
```

---

## The Prefix Key: `Ctrl+b`

**All tmux commands start with `Ctrl+b`**

1. Press `Ctrl+b` together
2. Release both keys
3. Then press the command key

---

## Windows (Like Browser Tabs)

```
Ctrl+b then c        # Create new window
Ctrl+b then n        # Next window
Ctrl+b then p        # Previous window
Ctrl+b then 0-9      # Jump to window 0-9
Ctrl+b then w        # List all windows (navigate with arrows)
Ctrl+b then ,        # Rename current window
Ctrl+b then &        # Kill current window (asks confirmation)
```

---

## Panes (Split Screen)

```
Ctrl+b then "        # Split horizontal (top/bottom)
Ctrl+b then %        # Split vertical (left/right)
Ctrl+b then arrows   # Navigate between panes
Ctrl+b then o        # Cycle through panes
Ctrl+b then z        # Zoom/unzoom pane (toggle fullscreen)
Ctrl+b then x        # Kill current pane (asks confirmation)
Ctrl+b then {        # Swap pane with previous
Ctrl+b then }        # Swap pane with next
```

**Mouse Support (Enabled):**
- Tap a pane to switch
- Tap and drag borders to resize
- Scroll to view history

---

## Session Management

```
Ctrl+b then d        # Detach (session keeps running)
Ctrl+b then s        # List all sessions
Ctrl+b then $        # Rename current session
tmk name             # Kill session (alias)
tmux kill-session -t name  # Kill specific session
tmux kill-server     # Kill all sessions
```

---

## Copy Mode & Scrolling

```
Ctrl+b then [        # Enter copy mode
Arrow keys           # Navigate in copy mode
Page Up/Down         # Scroll faster
q                    # Quit copy mode
```

**Note:** With mouse enabled, just scroll normally!

---

## Help & Info

```
Ctrl+b then ?        # Show all keybindings (q to quit)
Ctrl+b then t        # Show clock (q to quit)
Ctrl+b then i        # Show window info
Ctrl+b then r        # Reload config (custom binding)
```

---

## Most Used Commands (90% Coverage)

```
tm                   # Connect/start
Ctrl+b then c        # New window
Ctrl+b then n/p      # Next/previous window
Ctrl+b then d        # Detach
Ctrl+b then z        # Zoom pane
Ctrl+b then ,        # Rename window
```

---

## Common Scenarios

**Lost session:**
```bash
tml              # List sessions
tm               # Attach to last
```

**Kill everything:**
```bash
tmux kill-server
```

**Stuck in copy mode:**
```
Press: q
```

**Exit tmux completely:**
```bash
exit             # In each pane/window
```

---

## Config Location

**Config file:** `~/.tmux.conf`

**Features enabled:**
- ✅ Mouse support
- ✅ 10,000 line scrollback
- ✅ 256-color terminal
- ✅ Window numbering starts at 1
- ✅ Custom status bar

---

*Last updated: 2025-11-09*
