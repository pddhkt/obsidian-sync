## WireGuard Tunnel Usage

### Prerequisites
- `wireguard-tools` installed (provides `wg` and `wg-quick`).
- Client profile located at `/etc/wireguard/ctint-linux.conf` with `chmod 600` and root ownership.
- `openresolv` package installed so `wg-quick` can update DNS; run `sudo resolvconf -u` after installation.
- Keep the private and preshared keys in the config secret.

### Starting the Tunnel
1. Ensure `resolvconf` is ready: `sudo resolvconf -u` (skip if already done).
2. Bring the interface up:
   ```bash
   sudo wg-quick up ctint-linux
   ```
3. Verify status:
   ```bash
   sudo wg show
   ip addr show ctint-linux
   ```
4. Confirm routing/DNS by checking public IP:
   ```bash
   curl ifconfig.me
   ```

### Stopping the Tunnel
1. Tear down the interface:
   ```bash
   sudo wg-quick down ctint-linux
   ```
2. Confirm it is removed:
   ```bash
   ip addr show ctint-linux
   ```

### Troubleshooting Notes
- If `wg-quick` fails with `resolvconf: signature mismatch`, reinstall `openresolv` and rerun `sudo resolvconf -u`.
- Ensure UDP port `51820` is open on the VPS and reachable from the client.
- When the tunnel is up, traffic is routed through `ctint-linux`; if sites fail to load, check firewall rules or DNS settings.

### systemd Control Reference
- systemd is the service manager that starts and monitors background services on most Linux systems.
- `systemctl start wg-quick@ctint-linux`: bring the tunnel up via systemd for the current session.
- `systemctl stop wg-quick@ctint-linux`: shut the tunnel down immediately.
- `systemctl restart wg-quick@ctint-linux`: reapply configuration by stopping then starting.
- `systemctl enable wg-quick@ctint-linux`: auto-start the tunnel at boot (can undo with `disable`).
- `systemctl status wg-quick@ctint-linux`: view current state and recent logs (`journalctl -u wg-quick@ctint-linux`).

### Monitoring the Tunnel
- Install TUI monitors:
  ```bash
  sudo pacman -S nload bmon
  ```
- View WireGuard-specific stats (handshakes, cumulative bytes):
  ```bash
  watch -n1 'sudo wg show ctint-linux'
  ```
- Check live throughput gauges:
  ```bash
  sudo nload ctint-linux
  ```
- Inspect history graphs and per-interval rates:
  ```bash
  sudo bmon -p ctint-linux
  ```

### RX vs TX Quick Reference
- **RX (Receive):** Download traffic entering `ctint-linux`.
- **TX (Transmit):** Upload traffic leaving `ctint-linux`.
- Comparing both helps spot asymmetric usage and confirm tunnel activity.
