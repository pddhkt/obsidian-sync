# Fcitx5 with Quick5 Input Method Setup

Quick reference guide for setting up fcitx5 with Quick (Cangjie) input method on Linux systems.

## System Information

- **Distribution**: Arch Linux
- **Input Method Framework**: fcitx5 5.1.16
- **Display Server**: Wayland
- **Input Engine**: Rime with quick5 schema

## Installation

### Required Packages (Arch Linux)

```bash
sudo pacman -S fcitx5 fcitx5-rime fcitx5-configtool fcitx5-gtk fcitx5-qt
```

**Package breakdown:**
- `fcitx5` - Main input method framework
- `fcitx5-rime` - Rime input engine (supports Cangjie, Quick, etc.)
- `fcitx5-configtool` - GUI configuration tool
- `fcitx5-gtk` - GTK application integration
- `fcitx5-qt` - Qt application integration

## Environment Variables

Add these environment variables to `/etc/environment` for system-wide integration:

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
INPUT_METHOD=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
```

**To apply immediately:**
```bash
sudo nano /etc/environment
# Add the variables above, then reboot or log out/in
```

## Configuration Files

### 1. Main Fcitx5 Config

**Location:** `~/.config/fcitx5/config`

Key settings:
```ini
[Hotkey]
# Trigger input method with Ctrl+Space
TriggerKeys=Control+space

[Behavior]
# Start in English mode
ActiveByDefault=False
# Show preedit (composition) in applications
PreeditEnabledByDefault=True
```

### 2. Input Method Profile

**Location:** `~/.config/fcitx5/profile`

This configures which input methods are available. Default setup:
- Primary: US Keyboard
- Secondary: Rime (for Quick5/Cangjie)

### 3. Rime Schema Configuration

**Location:** `~/.local/share/fcitx5/rime/default.custom.yaml`

Configure available schemas:
```yaml
patch:
  schema_list:
    - schema: cangjie5
    - schema: quick5
```

**User settings location:** `~/.local/share/fcitx5/rime/user.yaml`

Current selection:
```yaml
var:
  previously_selected_schema: quick5
  schema_access_time:
    cangjie5: 1732673629
    quick5: 1732673631
```

### 4. Deploy Rime Configuration

After modifying Rime configs, deploy changes:
```bash
fcitx5-remote -r
```

Or use the GUI:
```bash
fcitx5-configtool
# Right-click Rime → Deploy
```

## Quick Commands

### Start/Stop Fcitx5

```bash
# Check if running
ps aux | grep fcitx5

# Restart fcitx5
fcitx5 -r

# Kill and restart (if frozen)
pkill fcitx5 && fcitx5 -d
```

### Configuration Tools

```bash
# Open GUI configuration
fcitx5-configtool

# Run diagnostics
fcitx5-diagnose
```

### Toggle Input Method

- **Keyboard shortcut**: `Ctrl + Space`
- **Command line**:
  ```bash
  fcitx5-remote -t  # Toggle
  fcitx5-remote -o  # Activate
  fcitx5-remote -c  # Deactivate
  ```

## Verification Steps

### 1. Check Installation

```bash
# Verify packages are installed
pacman -Q fcitx5 fcitx5-rime fcitx5-configtool

# Check fcitx5 is running
systemctl --user status app-org.fcitx.Fcitx5@autostart.service
```

### 2. Test Environment Variables

```bash
# Verify variables are set
env | grep -E "GTK_IM_MODULE|QT_IM_MODULE|XMODIFIERS"
```

Expected output:
```
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
```

### 3. Test Input in Applications

1. Open any text editor (gedit, kate, etc.)
2. Press `Ctrl + Space` to activate input method
3. You should see the Rime input panel
4. Switch to quick5 if needed (F4 key in Rime)
5. Type Quick codes to verify Chinese input works

### 4. Check Rime Schemas

```bash
# List available schemas
ls ~/.local/share/fcitx5/rime/*.yaml

# Check user selection
cat ~/.local/share/fcitx5/rime/user.yaml
```

## Troubleshooting

### Fcitx5 not starting automatically

```bash
# Check autostart service
systemctl --user status app-org.fcitx.Fcitx5@autostart.service

# Enable if needed (usually auto-generated)
systemctl --user enable app-org.fcitx.Fcitx5@autostart.service
```

### Input method not working in some applications

1. Verify environment variables are set correctly
2. Check that GTK/Qt integration packages are installed
3. Restart the application after setting environment variables
4. Try: `GTK_IM_MODULE=fcitx your-app-name`

### Rime not showing Quick5 option

```bash
# Redeploy Rime configuration
fcitx5-remote -r

# Or manually:
rm -rf ~/.local/share/fcitx5/rime/build/
fcitx5 -r
```

### Run full diagnostic

```bash
fcitx5-diagnose
```

This will check configuration, environment, and installed components.

## Notes

- **User dictionaries** are stored in: `~/.local/share/fcitx5/rime/quick5.userdb/`
- **Logs** can be found via `journalctl --user -u app-org.fcitx.Fcitx5@autostart.service`
- Configuration changes usually apply after restarting fcitx5 with `fcitx5 -r`
- On Wayland, fcitx5 uses native Wayland support (no X11 compatibility layer needed)

## Quick Setup Checklist for New System

- [ ] Install fcitx5 packages
- [ ] Add environment variables to `/etc/environment`
- [ ] Reboot or log out/in
- [ ] Run `fcitx5-configtool` to add Rime input method
- [ ] Configure `~/.local/share/fcitx5/rime/default.custom.yaml` with schemas
- [ ] Deploy Rime config with `fcitx5-remote -r`
- [ ] Test with `Ctrl+Space` in any application
- [ ] Verify with `fcitx5-diagnose`

---

**Last Updated:** 2025-11-27
**System:** Arch Linux with Wayland
