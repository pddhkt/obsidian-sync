# SSH Auto-tmux and Sleep Prevention Setup

## SSH Key Information

**Key Location:** `~/.ssh/termius_key`
**Key Type:** ED25519 (modern, secure SSH key)

### Private Key
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACB6hk5M5tw+Rn4o4MNe3ohxfOq5hpWjQ7zgzqwtyvqsYgAAAJhMJtJLTCbS
SwAAAAtzc2gtZWQyNTUxOQAAACB6hk5M5tw+Rn4o4MNe3ohxfOq5hpWjQ7zgzqwtyvqsYg
AAAEBw/mo1dGIAljrVNEeeA8IUqIP0hxjdQCguptmnBD6JFXqGTkzm3D5Gfijgw17eiHF8
6rmGlaNDvODOrC3K+qxiAAAAD3Rlcm1pdXMtYW5kcm9pZAECAwQFBg==
-----END OPENSSH PRIVATE KEY-----
```

### Public Key
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHqGTkzm3D5Gfijgw17eiHF86rmGlaNDvODOrC3K+qxi termius-android
```

## Connection IP Addresses

1. **Local Network (WiFi):** `192.168.0.98`
   - Use when connecting from the same local network
   - Example: `ssh -i ~/.ssh/termius_key lmt@192.168.0.98`

2. **Tailscale VPN:** `100.126.154.26`
   - Secure remote access via Tailscale
   - Works from anywhere on the same Tailscale network
   - Example: `ssh -i ~/.ssh/termius_key lmt@100.126.154.26`

3. **VPN Network (ctint-linux):** `10.8.0.3`
   - Use when connecting through VPN
   - Example: `ssh -i ~/.ssh/termius_key lmt@10.8.0.3`

4. **Public IPv6:** `2a02:4780:5e:d7fc::1`
   - For external access (if firewall allows)

## Auto-start tmux on SSH

Configured in `~/.bashrc:59-61`:

```bash
if [[ -z "$TMUX" ]] && [[ -n "$SSH_CONNECTION" ]]; then
    tmux attach || tmux
fi
```

This automatically:
- Attaches to existing tmux session if available
- Creates new tmux session if none exists
- Only triggers on SSH connections (not local terminals)

## Sleep Prevention

### Current Status
✓ All sleep/suspend modes are **disabled** (masked)

### What's Disabled
- `sleep.target` - masked
- `suspend.target` - masked
- `hibernate.target` - masked
- `hybrid-sleep.target` - masked

### Benefits
- Device never automatically suspends
- Always accessible via SSH (with power and network)
- Ideal for server/workstation that needs 24/7 access

### Commands

**Check current status:**
```bash
systemctl status sleep.target
```

**Revert if needed later:**
```bash
systemctl unmask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

**Re-enable sleep prevention:**
```bash
systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

## Testing

1. Disconnect from Terminus and reconnect later
2. Device should remain accessible indefinitely
3. Check uptime: `uptime`

## Notes

- Device consumes more power (always on, no sleep)
- Keep plugged in for continuous SSH server use
- Screen may still blank, but system stays awake
