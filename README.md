# Energy 3D Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/YOUR_USERNAME/energy-3d-card.svg)](https://github.com/YOUR_USERNAME/energy-3d-card/releases)

A beautiful 3D animated energy flow visualization card for Home Assistant.

![Preview](images/preview.gif)

## Features

- 🎨 Beautiful 3D house visualization
- ⚡ Animated energy flow particles
- 🔌 Multiple entity support (sum multiple sensors)
- ☀️ Solar, Grid, and Battery flows
- 🎛️ Visual configuration editor
- 📱 Responsive design

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click on "Frontend"
3. Click the three dots menu → "Custom repositories"
4. Add `https://github.com/YOUR_USERNAME/energy-3d-card` with category "Lovelace"
5. Click "Install"
6. Restart Home Assistant

### Manual

1. Download `energy-3d-card.js` from the [latest release](https://github.com/YOUR_USERNAME/energy-3d-card/releases)
2. Copy to `config/www/energy-3d-card/`
3. Add to Lovelace resources:
   ```yaml
   resources:
     - url: /local/energy-3d-card/energy-3d-card.js
       type: module
