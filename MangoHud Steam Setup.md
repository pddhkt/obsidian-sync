## MangoHud + GameMode Setup for Steam Games

### For Deep Rock Galactic (or any Steam game):

1. Open Steam
2. Right-click the game in your library
3. Click "Properties"
4. Under "Launch Options", add this command:

gamemoderun mangohud %command%

### What this does:
- gamemoderun: Activates GameMode for CPU/GPU performance boost
- mangohud: Enables performance overlay (FPS, temps, GPU usage)
- %command%: Steam's placeholder for the actual game executable

### In-Game Hotkeys:
- Shift+F12: Toggle MangoHud overlay on/off
- Shift+F11: Cycle through different overlay layouts
- F12: Take screenshot with performance metrics

### Test MangoHud First:
Run this to verify MangoHud works:
  mangohud glxgears

You should see a performance overlay in the top-left corner.

### Alternative: Global Enable (All Steam Games)
Create environment file:
  echo "MANGOHUD=1" > ~/.config/environment.d/mangohud.conf

Then restart Steam.

### MangoHud Configuration:
Config file location: ~/.config/MangoHud/MangoHud.conf
Edit with GOverlay GUI: goverlay

### GameMode Status:
Check if GameMode is active:
  gamemoded -s

### Troubleshooting:
- No overlay? Press Shift+F12 to toggle
- Still no overlay? Check ~/.config/MangoHud/MangoHud.conf exists
- Game crashes? Remove "gamemoderun" and use just "mangohud %command%"
