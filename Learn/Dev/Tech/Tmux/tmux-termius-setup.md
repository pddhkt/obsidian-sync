# tmux + Termius Setup for Android

> Complete guide for using tmux from Android with Termius app

## Related Notes
- [[tmux-quick-reference|Quick Reference Card]]
- [[tmux-usage-guide|Detailed Usage Guide]]
- [[tmux-workflows|Workflows & Examples]]
- [[tmux-mosh-linux-setup-guide|Linux Setup Guide]]

---

## Prerequisites

- ✅ Termius app installed on Android
- ✅ WireGuard VPN configured and working
- ✅ SSH server running on Linux machine
- ✅ tmux installed on Linux machine

---

## Connection Setup

### Server Details

```
Hostname: 10.8.0.5 (WireGuard IP)
Port: 22
Username: jck
Authentication: SSH Key
Mosh: Toggle ON (recommended)
```

### SSH Key Authentication

**Key location on server:**
- Private key: `~/.ssh/termius_key`
- Public key: `~/.ssh/termius_key.pub`
- Authorized: `~/.ssh/authorized_keys`

**In Termius:**
1. Menu → Keychain → Keys → +
2. Import the private key
3. Label: "Termius Android Key"
4. No passphrase

### Mosh vs SSH

**Mosh (Recommended):**
- ✅ Auto-reconnects on network changes
- ✅ Handles WiFi ↔ mobile data seamlessly
- ✅ Works over high latency
- ✅ Instant local echo
- Toggle: ON in host settings

**Regular SSH:**
- Simpler, always works
- Manual reconnection needed
- Use if Mosh has issues

---

## Termius Keyboard Setup

### Enable Extended Keyboard

**In Termius (while connected):**
1. Tap **keyboard icon** in top toolbar
2. Enable **"Extended keyboard"** or **"Extra keys"**
3. Shows row of special keys: ESC, Ctrl, Tab, Alt, arrows

### Using Ctrl+b Prefix

**Method 1: Extended keyboard**
1. Tap **Ctrl** key (stays highlighted)
2. Tap **b**
3. Ctrl auto-releases
4. Tap next command key

**Method 2: Android keyboard**
- Some keyboards have Ctrl support
- Try long-press on letter keys

**Testing it works:**
```
Ctrl+b then ?
```
Should show tmux help screen. Press `q` to exit.

### Common Key Combinations

```
Ctrl+b then c        # Extended: Tap Ctrl, tap b, tap c
Ctrl+b then "        # Extended: Tap Ctrl, tap b, tap " key
Ctrl+b then arrows   # Extended: Tap Ctrl, tap b, tap arrow
```

---

## Termius Settings for tmux

### Recommended Settings

**Menu → Settings → Terminal:**
```
Font size: 12-14pt (easier to read on mobile)
Color scheme: Your preference
Cursor style: Block or Underline
```

**Menu → Settings → Keyboard:**
```
Extended keyboard: ON (always show)
Ctrl key in extended keyboard: ON
Screen gestures: ON (optional, for navigation)
```

**Menu → Settings → Connection:**
```
Keep screen on: ON (prevents disconnects)
Reconnect automatically: ON (for SSH mode)
```

**Menu → Settings → Interface:**
```
Show toolbar: ON (quick access to keyboard toggle)
```

### Terminal Size

Termius auto-detects terminal size, but you can optimize:

**Portrait mode:**
- Good for editing code
- Narrower, more lines

**Landscape mode:**
- Better for split panes
- Wider, easier to see multiple things

**In tmux, check size:**
```bash
Ctrl+b then i    # Shows window info including size
```

---

## Using tmux from Termius

### Connection Routine

```
1. On Android: Connect WireGuard VPN
2. Open Termius
3. Tap your host ("Arch Linux Dev")
4. Wait to connect...
5. Once connected: tm
6. You're in tmux!
```

### Daily Workflow

**Morning:**
```bash
# Connect WireGuard → Open Termius → Connect → tm
tm
# Your session from yesterday is still there!
```

**During work:**
```bash
# Create windows as needed
Ctrl+b then c

# Navigate with extended keyboard
Ctrl+b then n/p
# Or tap window number: Ctrl+b then 0/1/2
```

**Network switch (WiFi ↔ mobile data):**
```
# With Mosh: Automatic reconnection (brief freeze)
# With SSH: Need to reconnect manually, then: tm
```

**End of day:**
```bash
# Option 1: Detach
Ctrl+b then d

# Option 2: Just close Termius
# Both work - session keeps running!
```

---

## Mouse Support in Termius

Your tmux config has mouse enabled - use it!

### Switching Panes

**With keyboard:**
```
Ctrl+b then arrows
```

**With mouse (easier!):**
```
Just tap the pane you want
```

### Resizing Panes

**With keyboard:**
```
Ctrl+b then Ctrl+arrows    # Hold Ctrl, use arrows
```

**With mouse (easier!):**
```
Tap and drag the border between panes
```

### Scrolling

**With keyboard:**
```
Ctrl+b then [    # Enter copy mode
Arrow keys       # Scroll
q                # Exit
```

**With mouse (easier!):**
```
Just scroll normally with finger!
```

### Selecting Text

**Standard Android selection:**
```
1. Double-tap word to select
2. Drag selection handles
3. Tap "Copy"
```

**In tmux copy mode:**
```
Ctrl+b then [    # Enter copy mode
Space            # Start selection
Move cursor      # Extend selection
Enter            # Copy and exit
Ctrl+b then ]    # Paste
```

### Window List

**With keyboard:**
```
Ctrl+b then w    # Show list
Arrow keys       # Navigate
Enter            # Select
```

**With touchscreen:**
```
Ctrl+b then w
Tap the window you want
```

---

## Tips for Mobile Usage

### 1. Keep Extended Keyboard Visible

Always have the extra keys row showing - makes tmux much easier.

### 2. Use Windows Over Panes

On phone screens:
- **Windows** = full screen per task ✅
- **Panes** = cramped, hard to see ❌

On tablets:
- Both work well

### 3. Name Your Windows

Makes the status bar much more useful:

```
Ctrl+b then ,
```

Instead of:
```
[session] 0:bash* 1:bash- 2:bash-
```

You get:
```
[session] 0:editor* 1:server- 2:git-
```

### 4. Use the Mouse

Don't fight against the touchscreen - embrace it:
- Tap panes to switch
- Scroll to view history
- Drag borders to resize
- Double-tap to select

### 5. Zoom Panes When Needed

```
Ctrl+b then z    # Make current pane fullscreen
# Work on it...
Ctrl+b then z    # Zoom back out
```

Great for:
- Reading small text
- Editing in split panes
- Focusing on one task

### 6. Learn One Workflow Well

Start with [[tmux-workflows#Workflow 2 Multi-Window Development Recommended|Workflow 2: Multi-Window Development]]

Master it before trying complex pane layouts.

### 7. Use Landscape for Panes

**Portrait:** Better for single windows
**Landscape:** Better for split panes (more width)

Rotate your phone/tablet based on task.

### 8. Keyboard Shortcuts Muscle Memory

Practice these until automatic:
```
Ctrl+b then c    # New window
Ctrl+b then n    # Next window
Ctrl+b then d    # Detach
```

Rest can be learned as needed.

---

## Troubleshooting Termius + tmux

### "Can't Type Ctrl+b"

**Solutions:**
1. Enable extended keyboard in Termius
2. Check Ctrl key is visible in extra keys
3. Try tapping Ctrl (it should highlight)
4. Some keyboards: try physical keyboard via Bluetooth

**Test:**
```
Ctrl+b then ?    # Should show help
```

### "Connection Keeps Dropping"

**With SSH:**
- Normal on network changes
- Just reconnect and run `tm`

**With Mosh:**
- Should auto-reconnect
- If failing, check Mosh installed: `which mosh-server`
- Try disabling Mosh toggle, use regular SSH

### "Terminal Size Is Wrong"

**In tmux:**
```bash
Ctrl+b then d    # Detach
# Rotate phone or resize Termius
tm               # Reattach - size updates
```

**Force resize:**
```bash
Ctrl+b then :
:resize-window -A
```

### "Mouse Doesn't Work"

**Check config:**
```bash
cat ~/.tmux.conf | grep mouse
# Should show: set -g mouse on
```

**Reload config:**
```
Ctrl+b then r
```

### "Colors Look Wrong"

**Check tmux:**
```bash
echo $TERM    # Should show: screen-256color or tmux-256color
```

**Fix in Termius:**
- Settings → Terminal → Terminal type
- Set to: xterm-256color

### "Keyboard Keeps Disappearing"

**Termius settings:**
- Settings → Interface → Keep keyboard visible: ON
- Or: Tap keyboard icon to toggle manually

### "Can't See Status Bar"

**Terminal too small:**
- Increase font size in Termius
- Use landscape mode
- Zoom out system display settings

**Status bar disabled:**
```bash
Ctrl+b then :
:set status on
```

---

## Screen Size Optimization

### Phone (Small Screen)

**Recommended setup:**
```
Font size: 10-12pt
Windows: 2-3 maximum
Panes: Avoid, use windows instead
Orientation: Portrait for code, landscape for logs
```

**Example layout:**
```
Window 0: nvim (portrait)
Window 1: server logs (landscape, wider view)
```

### Tablet (Medium Screen)

**Recommended setup:**
```
Font size: 12-14pt
Windows: 3-5 comfortable
Panes: 2-3 panes work well
Orientation: Landscape preferred
```

**Example layout:**
```
Window 0: Editor (fullscreen)
Window 1: Split panes (editor + logs)
Window 2: Git
```

### Folding Phone (Variable)

**Folded (small screen):**
- Use windows
- Larger font

**Unfolded (large screen):**
- Can use panes
- Smaller font for more content

---

## Quick Tips Summary

### Essential Termius Settings
- ✅ Extended keyboard: ON
- ✅ Keep screen on: ON
- ✅ Font size: 12-14pt
- ✅ Mosh toggle: ON

### Essential tmux Commands for Mobile
```
tm                   # Connect/attach
Ctrl+b then c        # New window
Ctrl+b then n        # Next window (easy to tap repeatedly)
Ctrl+b then z        # Zoom pane (important on small screen)
Ctrl+b then d        # Detach
```

### Mouse Features to Use
- Tap panes to switch
- Scroll through history
- Double-tap to select text
- Drag borders to resize

### Connection Checklist
1. ✅ WireGuard connected
2. ✅ Termius connected
3. ✅ Run: `tm`
4. ✅ Start working!

---

## Advanced: Termius Snippets

**Create shortcuts for common commands:**

**In Termius:**
1. Menu → Snippets → +
2. Create snippets:

```
Name: Attach tmux
Command: tm

Name: Dev Session
Command: tmux-dev-session myproject

Name: List Sessions
Command: tml
```

**Usage:**
- Tap snippet name → auto-types command
- Faster than typing on mobile keyboard

---

## Network Performance

### WireGuard + Mosh + tmux

**Latency:**
- WireGuard: ~2-6ms overhead
- Mosh: Minimal additional overhead
- tmux: Negligible overhead
- **Total perceived latency:** Excellent for terminal work

**On network switch:**
1. WireGuard reconnects (usually automatic)
2. Mosh detects and reconnects
3. tmux session still running
4. **You see:** Brief freeze, then continues

**Battery impact:**
- WireGuard: Low
- Mosh: Very low (UDP, efficient)
- tmux: None (server-side)

### Bandwidth Usage

**Typical tmux session:**
- Idle: ~1 KB/s (keepalive)
- Active typing: ~2-5 KB/s
- Scrolling logs: ~10-50 KB/s

**Very data-efficient for mobile!**

---

## Summary

**Perfect mobile development setup:**
```
Android Device
    ↓
WireGuard VPN (secure tunnel)
    ↓
Mosh (handles network changes)
    ↓
tmux (persistent sessions)
    ↓
Your Development Environment
```

**Each layer adds:**
- WireGuard: Security & access
- Mosh: Network resilience
- tmux: Session persistence

**Result:**
- Code from anywhere
- Survive network changes
- Never lose your work
- Full Linux development on mobile!

---

*Last updated: 2025-11-09*
