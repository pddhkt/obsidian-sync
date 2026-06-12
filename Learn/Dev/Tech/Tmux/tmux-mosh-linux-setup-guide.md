# tmux + Mosh Linux Setup Guide

> Complete setup guide for replicating tmux/Mosh remote development environment on Linux machines

## Related Notes
- [[tmux-quick-reference|Quick Reference Card]]
- [[tmux-usage-guide|Usage Guide]]
- [[tmux-workflows|Workflows]]
- [[tmux-termius-setup|Termius Android Setup]]

---

## Overview

This guide documents the complete setup for a tmux + Mosh remote development environment on Linux, optimized for access from Android via Termius.

**What this setup provides:**
- ✅ Persistent terminal sessions that survive disconnects
- ✅ Multiple windows and split panes
- ✅ Network-resilient connections (Mosh)
- ✅ Secure access via SSH keys
- ✅ Mouse support for mobile devices
- ✅ Optimized for remote development

---

## System Information

**Original setup:**
- Distribution: Arch Linux
- Kernel: 6.17.7-arch1-1
- Shell: bash
- Package manager: pacman

**Should work on:**
- Arch Linux / Manjaro
- Ubuntu / Debian (use `apt` instead of `pacman`)
- Fedora / RHEL (use `dnf` instead of `pacman`)
- Other Linux distributions (adjust package manager)

---

## Prerequisites

Before starting:

1. **Root/sudo access** to the machine
2. **Network access** to the machine (local or via VPN)
3. **WireGuard VPN** (optional but recommended for security)
4. **Android device** with Termius app (for mobile access)

---

## Installation Steps

### Step 1: Install Required Packages

**On Arch Linux / Manjaro:**
```bash
sudo pacman -S tmux mosh openssh
```

**On Ubuntu / Debian:**
```bash
sudo apt update
sudo apt install tmux mosh openssh-server
```

**On Fedora / RHEL:**
```bash
sudo dnf install tmux mosh openssh-server
```

**Verify installation:**
```bash
tmux -V        # Should show: tmux 3.5a or similar
mosh --version # Should show: mosh 1.4.0 or similar
ssh -V         # Should show: OpenSSH version
```

---

### Step 2: Configure and Start SSH Server

**Enable and start SSH service:**

```bash
# Start SSH service now
sudo systemctl start sshd

# Enable SSH to start automatically on boot
sudo systemctl enable sshd

# Verify it's running
sudo systemctl status sshd
```

**Expected output:**
```
● sshd.service - OpenSSH Daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)
     Active: active (running)
```

**Check SSH is listening:**
```bash
sudo ss -tlnp | grep :22
```

Should show SSH listening on port 22.

---

### Step 3: Create tmux Configuration

**Create the config file:**
```bash
mkdir -p ~/.ssh
nano ~/.tmux.conf
```

**Paste this complete configuration:**

```bash
# tmux configuration for remote development
# Based on remote-dev-setup-guide.md

# Enable mouse support (click to switch panes, resize, scroll)
set -g mouse on

# Start window numbers at 1 instead of 0 (easier to reach on keyboard)
set -g base-index 1

# Increase scrollback buffer to 10,000 lines
set -g history-limit 10000

# Fix colors in tmux (256-color support)
set -g default-terminal "screen-256color"

# Reload config with Ctrl+b then r
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Status bar styling
set -g status-style 'bg=colour237 fg=colour250'
set -g status-left '[#S] '
set -g status-right '%Y-%m-%d %H:%M '

# Highlight active window
set -g window-status-current-style 'bg=colour39 fg=colour232 bold'

# Pane border colors
set -g pane-border-style 'fg=colour238'
set -g pane-active-border-style 'fg=colour39'

# Optional: Uncomment to use Ctrl+a instead of Ctrl+b (easier to press)
# unbind C-b
# set -g prefix C-a
# bind C-a send-prefix

# Start pane numbering at 1
setw -g pane-base-index 1

# Renumber windows when one is closed
set -g renumber-windows on

# Faster command sequences (reduce escape time)
set -s escape-time 10
```

**Save and exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

**Test configuration:**
```bash
tmux new-session -d -s test && tmux kill-session -t test && echo "Config is valid!"
```

---

### Step 4: Add Bash Aliases and Functions

**Edit your .bashrc:**
```bash
nano ~/.bashrc
```

**Add to the end of the file:**

```bash
# ======================
# tmux Workflow Helpers
# ======================

# Quick tmux attach or create
# Usage: tm [session-name]
# If no session-name provided, attaches to existing session or creates new one
alias tm='tmux attach || tmux'

# tmux with specific session name
# Usage: tms projectname
tms() {
    local session_name="${1:-main}"
    tmux attach -t "$session_name" 2>/dev/null || tmux new -s "$session_name"
}

# List all tmux sessions
alias tml='tmux ls'

# Kill specific tmux session
# Usage: tmk [session-name]
tmk() {
    local session_name="${1}"
    if [[ -z "$session_name" ]]; then
        echo "Usage: tmk <session-name>"
        echo "Available sessions:"
        tmux ls 2>/dev/null || echo "No active sessions"
        return 1
    fi
    tmux kill-session -t "$session_name"
}

# Optional: Auto-start tmux on SSH login
# Uncomment the following lines to automatically start/attach tmux when you SSH in
# if [[ -z "$TMUX" ]] && [[ -n "$SSH_CONNECTION" ]]; then
#     tmux attach || tmux
# fi
```

**Save and exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

**Reload bashrc:**
```bash
source ~/.bashrc
```

**Test aliases:**
```bash
# These should now work:
tm --version    # Should show tmux help (alias tries to attach/create)
tml             # Should show no sessions or list active ones
```

---

### Step 5: Create Session Script

**Create the script file:**
```bash
mkdir -p ~/.local/bin
nano ~/.local/bin/tmux-dev-session
```

**Paste this content:**

```bash
#!/bin/bash
# tmux development session template
# Creates a multi-window tmux session for development workflow
# Usage: tmux-dev-session [session-name] [project-directory]

SESSION_NAME="${1:-dev}"
PROJECT_DIR="${2:-$HOME}"

# Check if session already exists
tmux has-session -t "$SESSION_NAME" 2>/dev/null

if [ $? != 0 ]; then
    echo "Creating new tmux session: $SESSION_NAME"

    # Create new session with first window (editor)
    tmux new-session -d -s "$SESSION_NAME" -n "editor" -c "$PROJECT_DIR"

    # Window 0: Editor (LazyVim)
    # Uncomment the following line to auto-start nvim
    # tmux send-keys -t "$SESSION_NAME:0" "nvim" C-m

    # Window 1: Dev server / Build
    tmux new-window -t "$SESSION_NAME:1" -n "server" -c "$PROJECT_DIR"
    # Example: Auto-start dev server (uncomment and modify as needed)
    # tmux send-keys -t "$SESSION_NAME:1" "npm run dev" C-m

    # Window 2: Git / Commands
    tmux new-window -t "$SESSION_NAME:2" -n "git" -c "$PROJECT_DIR"

    # Select window 0 (editor) as the starting window
    tmux select-window -t "$SESSION_NAME:0"

    echo "Session '$SESSION_NAME' created with 3 windows:"
    echo "  0: editor  (for nvim/LazyVim)"
    echo "  1: server  (for dev server/build)"
    echo "  2: git     (for git commands)"
    echo ""
    echo "Attaching to session..."
fi

# Attach to the session
tmux attach -t "$SESSION_NAME"
```

**Save and exit:** `Ctrl+O`, `Enter`, `Ctrl+X`

**Make executable:**
```bash
chmod +x ~/.local/bin/tmux-dev-session
```

**Verify it's in PATH:**
```bash
echo $PATH | grep "$HOME/.local/bin"
```

If not in PATH, add to `.bashrc`:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

**Test script:**
```bash
tmux-dev-session test-session
# Should create session with 3 windows
# Exit with: Ctrl+b then d
tmux kill-session -t test-session
```

---

### Step 6: Generate SSH Keys for Termius

**Create SSH key for Android/Termius access:**

```bash
# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Generate ED25519 key (modern, secure, small)
ssh-keygen -t ed25519 -f ~/.ssh/termius_key -C "termius-android" -N ""
```

**Add public key to authorized_keys:**
```bash
cat ~/.ssh/termius_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/termius_key
chmod 644 ~/.ssh/termius_key.pub
```

**Display private key for import to Termius:**
```bash
cat ~/.ssh/termius_key
```

**Copy the entire output** (from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`)

**Security note:** After importing to Termius, you may want to:
```bash
# Backup the key somewhere safe
cp ~/.ssh/termius_key ~/termius_key.backup

# The key stays on the server, this is just for importing to Termius app
```

---

### Step 7: Firewall Configuration (Optional)

**If you have a firewall enabled:**

**For UFW (Ubuntu/Debian):**
```bash
# Check if UFW is active
sudo ufw status

# If active, allow SSH and Mosh
sudo ufw allow 22/tcp          # SSH
sudo ufw allow 60000:61000/udp # Mosh

# Reload
sudo ufw reload
```

**For firewalld (Fedora/RHEL):**
```bash
# Check if firewalld is active
sudo firewall-cmd --state

# If active, allow SSH and Mosh
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-port=60000-61000/udp

# Reload
sudo firewall-cmd --reload
```

**For iptables:**
```bash
# Check current rules
sudo iptables -L -n

# Add rules if needed
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 60000:61000 -j ACCEPT
```

**If no firewall is active:**
- No configuration needed
- SSH and Mosh will work immediately

---

### Step 8: Get Machine IP Address

**Find your machine's IP address:**

**For local network:**
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**For WireGuard VPN:**
```bash
ip addr show <wireguard-interface> | grep "inet " | awk '{print $2}' | cut -d/ -f1
```

Example (if WireGuard interface is `wg0`):
```bash
ip addr show wg0 | grep "inet " | awk '{print $2}' | cut -d/ -f1
```

**Note this IP address** - you'll need it for Termius setup.

---

## Testing the Setup

### Test 1: tmux Basics

```bash
# Start tmux
tm

# Create a window
Ctrl+b then c

# List sessions (in another terminal/SSH session)
tmux ls

# Detach
Ctrl+b then d

# Reattach
tm

# Kill session
tmux kill-session -t 0
```

### Test 2: Session Script

```bash
# Create dev session
tmux-dev-session myproject ~/projects/test

# Should see 3 windows: editor, server, git
# Verify with: Ctrl+b then w

# Exit
Ctrl+b then d
tmux kill-session -t myproject
```

### Test 3: SSH Access

**From another machine or local terminal:**
```bash
# Test SSH with key
ssh -i ~/.ssh/termius_key <username>@<ip-address>

# Example:
ssh -i ~/.ssh/termius_key jck@10.8.0.5
```

Should connect without password.

### Test 4: Mosh Access

**From another machine with Mosh installed:**
```bash
mosh --ssh="ssh -i ~/.ssh/termius_key" <username>@<ip-address>

# Example:
mosh --ssh="ssh -i ~/.ssh/termius_key" jck@10.8.0.5
```

Should connect via Mosh.

---

## Termius Android Setup

### Import SSH Key to Termius

1. **Copy the private key** (from Step 6 output)
2. **Open Termius** on Android
3. **Menu → Keychain → Keys → +**
4. **"Import from clipboard"** or **"Paste key"**
5. **Label:** Termius Android Key
6. **Passphrase:** (leave empty)
7. **Save**

### Create Host in Termius

**For SSH connection:**
1. **Tap "+" → New Host**
2. **Configure:**
   ```
   Alias: Linux Dev (SSH)
   Hostname: <your-ip-address>
   Port: 22
   Username: <your-username>
   Keys: [Select: Termius Android Key]
   ```
3. **Save**

**For Mosh connection (recommended):**
1. **Tap "+" → New Host**
2. **Configure:**
   ```
   Alias: Linux Dev (Mosh)
   Hostname: <your-ip-address>
   Username: <your-username>
   Keys: [Select: Termius Android Key]
   Mosh: ✅ Toggle ON
   ```
3. **Save**

### Connect and Test

1. **Connect WireGuard** (if using VPN)
2. **Open Termius** → Tap host
3. **Should connect successfully**
4. **Run:** `tm`
5. **Should start tmux**

---

## Configuration Files Reference

### File Locations

```
~/.tmux.conf                      # tmux configuration
~/.bashrc                         # Bash aliases/functions (append to end)
~/.local/bin/tmux-dev-session     # Session script (make executable)
~/.ssh/termius_key                # Private key (keep secure)
~/.ssh/termius_key.pub            # Public key
~/.ssh/authorized_keys            # Authorized keys for SSH login
```

### Permissions

```bash
# Verify correct permissions
ls -la ~/.ssh/

# Should show:
# drwx------  .ssh/                    (700)
# -rw-------  authorized_keys          (600)
# -rw-------  termius_key              (600)
# -rw-r--r--  termius_key.pub          (644)
```

**Fix if needed:**
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/termius_key
chmod 644 ~/.ssh/termius_key.pub
```

---

## Troubleshooting

### SSH Service Won't Start

```bash
# Check status
sudo systemctl status sshd

# Check logs
sudo journalctl -u sshd -n 50

# Check config syntax
sudo sshd -t

# Common fix: Regenerate host keys
sudo ssh-keygen -A
sudo systemctl restart sshd
```

### Can't Connect from Termius

**Checklist:**
1. ✅ SSH service running? `sudo systemctl status sshd`
2. ✅ Firewall allows port 22? `sudo ufw status` or `sudo firewall-cmd --list-all`
3. ✅ Correct IP address? `ip addr show`
4. ✅ WireGuard connected on Android? (if using VPN)
5. ✅ SSH key imported to Termius?
6. ✅ Key in authorized_keys? `cat ~/.ssh/authorized_keys`

**Test from Linux terminal:**
```bash
# Test local SSH
ssh localhost

# Test with key
ssh -i ~/.ssh/termius_key <username>@localhost
```

### Mosh Won't Connect

**Install check:**
```bash
which mosh-server
# Should show: /usr/bin/mosh-server or similar
```

**If not found:**
```bash
sudo pacman -S mosh    # Arch
sudo apt install mosh  # Ubuntu
sudo dnf install mosh  # Fedora
```

**Firewall check:**
```bash
# Mosh needs UDP ports 60000-61000
sudo ufw allow 60000:61000/udp
```

**Try SSH instead:**
- Disable Mosh toggle in Termius
- Connect via regular SSH
- Once working, re-enable Mosh

### tmux Config Errors

**Test config:**
```bash
tmux source-file ~/.tmux.conf
```

**If errors, check syntax:**
```bash
# View config
cat ~/.tmux.conf

# Common issues:
# - Missing closing quotes
# - Wrong color numbers
# - Typos in option names
```

### Aliases Don't Work

**Reload bashrc:**
```bash
source ~/.bashrc
```

**Check aliases loaded:**
```bash
alias | grep tm
type tms
```

**If not found:**
- Ensure added to `.bashrc` not `.bash_profile`
- Check no syntax errors in `.bashrc`
- Try new terminal session

---

## Customization

### Change tmux Prefix Key

Edit `~/.tmux.conf`, uncomment these lines:
```bash
unbind C-b
set -g prefix C-a
bind C-a send-prefix
```

Now use `Ctrl+a` instead of `Ctrl+b`.

### Auto-start tmux on SSH Login

Edit `~/.bashrc`, uncomment:
```bash
if [[ -z "$TMUX" ]] && [[ -n "$SSH_CONNECTION" ]]; then
    tmux attach || tmux
fi
```

### Customize Status Bar

Edit `~/.tmux.conf`:
```bash
# Add more info to status bar
set -g status-left '[#S] #H | '  # Add hostname
set -g status-right 'CPU: #{cpu_percentage} | %Y-%m-%d %H:%M '
```

### Create Multiple Session Scripts

Copy and modify `tmux-dev-session`:
```bash
cp ~/.local/bin/tmux-dev-session ~/.local/bin/tmux-webapp-session
nano ~/.local/bin/tmux-webapp-session
# Customize for webapp workflow
```

---

## Security Best Practices

### 1. SSH Key Management

```bash
# Use strong keys (ED25519 or RSA 4096)
ssh-keygen -t ed25519 -f ~/.ssh/key_name

# Or RSA 4096
ssh-keygen -t rsa -b 4096 -f ~/.ssh/key_name

# With passphrase (more secure)
ssh-keygen -t ed25519 -f ~/.ssh/key_name
# Enter passphrase when prompted
```

### 2. Disable Password Authentication

**Edit SSH config:**
```bash
sudo nano /etc/ssh/sshd_config
```

**Change/add these lines:**
```
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin no
```

**Restart SSH:**
```bash
sudo systemctl restart sshd
```

### 3. Use Fail2Ban

**Install:**
```bash
sudo pacman -S fail2ban    # Arch
sudo apt install fail2ban  # Ubuntu
```

**Enable:**
```bash
sudo systemctl enable --now fail2ban
```

### 4. Keep System Updated

```bash
# Arch
sudo pacman -Syu

# Ubuntu
sudo apt update && sudo apt upgrade

# Fedora
sudo dnf upgrade
```

---

## Backup Configuration

**Save your config files:**
```bash
# Create backup directory
mkdir -p ~/tmux-config-backup

# Backup files
cp ~/.tmux.conf ~/tmux-config-backup/
cp ~/.local/bin/tmux-dev-session ~/tmux-config-backup/
grep -A 50 "tmux Workflow Helpers" ~/.bashrc > ~/tmux-config-backup/bashrc-tmux-section.txt

# Backup SSH keys (secure location!)
cp ~/.ssh/termius_key ~/tmux-config-backup/
cp ~/.ssh/termius_key.pub ~/tmux-config-backup/

# Archive
tar -czf tmux-config-backup.tar.gz -C ~ tmux-config-backup/
```

**Restore on new machine:**
```bash
# Extract
tar -xzf tmux-config-backup.tar.gz -C ~

# Copy files
cp ~/tmux-config-backup/.tmux.conf ~/
cp ~/tmux-config-backup/tmux-dev-session ~/.local/bin/
chmod +x ~/.local/bin/tmux-dev-session

# Append bashrc section
cat ~/tmux-config-backup/bashrc-tmux-section.txt >> ~/.bashrc

# SSH keys
cp ~/tmux-config-backup/termius_key* ~/.ssh/
chmod 600 ~/.ssh/termius_key
chmod 644 ~/.ssh/termius_key.pub
cat ~/.ssh/termius_key.pub >> ~/.ssh/authorized_keys
```

---

## Quick Setup Checklist

Use this for setting up on new machines:

```
□ Install packages: tmux, mosh, openssh
□ Start and enable SSH: systemctl start/enable sshd
□ Create ~/.tmux.conf (copy from reference above)
□ Add bash aliases to ~/.bashrc
□ Create ~/.local/bin/tmux-dev-session script
□ Make script executable: chmod +x
□ Generate SSH key: ssh-keygen -t ed25519
□ Add public key to ~/.ssh/authorized_keys
□ Set correct permissions on ~/.ssh/*
□ Configure firewall (if active): allow 22/tcp, 60000-61000/udp
□ Get IP address: ip addr show
□ Test locally: tmux, tm, tmux-dev-session
□ Test SSH: ssh -i key user@ip
□ Import key to Termius
□ Create host in Termius
□ Connect and test from Android
□ Enable Mosh toggle
□ Test network resilience
```

---

## Summary

**This setup provides:**
- ✅ tmux with optimized config for remote work
- ✅ Mosh for network-resilient connections
- ✅ SSH key authentication for security
- ✅ Helpful bash aliases (tm, tms, tml, tmk)
- ✅ Session script for quick project setup
- ✅ Mouse support for mobile devices
- ✅ Ready for Android/Termius access

**Total setup time:** ~15-30 minutes

**Files created:**
- `~/.tmux.conf` (44 lines)
- `~/.bashrc` (additions: 37 lines)
- `~/.local/bin/tmux-dev-session` (43 lines)
- `~/.ssh/termius_key` (private key)
- `~/.ssh/termius_key.pub` (public key)

**Services configured:**
- sshd (OpenSSH server)
- Firewall rules (if applicable)

**Ready to code from anywhere!** 🚀

---

*Last updated: 2025-11-09*
*Tested on: Arch Linux 6.17.7-arch1-1*
