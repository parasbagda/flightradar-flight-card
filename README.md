# Flightradar Flight Card

A custom Home Assistant card for displaying Flightradar flight information.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/YOUR_USERNAME/flightradar-flight-card.svg)](https://github.com/YOUR_USERNAME/flightradar-flight-card/releases)

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the three dots in the top right corner and select "Custom repositories"
4. Add this repository URL and select "Lovelace" as the category
5. Click "Install"
6. Refresh your browser

### Manual Installation

1. Download `flightradar-flight-card.js` from the [latest release](https://github.com/YOUR_USERNAME/flightradar-flight-card/releases/latest)
2. Copy it to your `config/www` folder
3. Add the resource in Home Assistant:
   - Go to **Settings** → **Dashboards** → **Resources**
   - Click **Add Resource**
   - URL: `/local/flightradar-flight-card.js`
   - Resource Type: JavaScript Module

## Usage

Add the card to your dashboard:

```yaml
type: custom:flightradar-flight-card
entity: sensor.your_flight_entity
```

### Configuration Options

| Option        | Type    | Required | Default              | Description                         |
| ------------- | ------- | -------- | -------------------- | ----------------------------------- |
| `entity`      | string  | Yes      | -                    | The entity ID of your flight sensor |
| `name`        | string  | No       | Entity friendly name | Custom name for the card header     |
| `show_header` | boolean | No       | `true`               | Show/hide the card header           |
| `show_state`  | boolean | No       | `true`               | Show/hide the state badge           |

### Example Configuration

```yaml
type: custom:flightradar-flight-card
entity: sensor.flight_tracker
name: My Flight
show_header: true
show_state: true
```

## Development

### Prerequisites

- Node.js 22+
- npm
- Docker (for running the development Home Assistant instance)

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/flightradar-flight-card.git
cd flightradar-flight-card

# Install dependencies
npm install

# Build the card
npm run build
```

### Development with Home Assistant

This project includes a Docker-based Home Assistant instance for testing your card in real-time. The setup is inspired by the [lovelace-mushroom](https://github.com/piitaya/lovelace-mushroom) project.

```bash
# Start Home Assistant and watch for changes
npm run start:hass

# Or if you need to rebuild the Docker image
npm run start:hass:build
```

Once running:

1. Open http://localhost:8123 in your browser
2. Complete the Home Assistant onboarding (first time only)
3. Navigate to the dashboard to see your card
4. Changes to your code will automatically rebuild, just refresh the browser

The `.hass_dev` folder contains:

- `configuration.yaml` - Home Assistant configuration with test entities
- `ui-lovelace.yaml` - Dashboard with card examples and testing controls

### Available Scripts

| Command                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| `npm run build`            | Build the production bundle                 |
| `npm run watch`            | Build and watch for changes                 |
| `npm run start`            | Alias for `npm run watch`                   |
| `npm run start:hass`       | Start HA dev instance and watch for changes |
| `npm run start:hass:build` | Rebuild HA container and start watching     |
| `npm run stop:hass`        | Stop the HA dev instance                    |
| `npm run logs:hass`        | View HA container logs                      |
| `npm run lint`             | Run ESLint                                  |
| `npm run lint:fix`         | Run ESLint with auto-fix                    |
| `npm run format`           | Format code with Prettier                   |
| `npm run format:check`     | Check code formatting                       |
| `npm run release`          | Create a new release                        |

### Manual Testing in Home Assistant

If you prefer to test in your own Home Assistant instance:

1. Build the card: `npm run build`
2. Copy `dist/flightradar-flight-card.js` to your Home Assistant `config/www` folder
3. Add the resource in Home Assistant (see Manual Installation)
4. Add the card to a dashboard

### Creating a Release

This project uses [release-it](https://github.com/release-it/release-it) for automated releases:

```bash
npm run release
```

This will:

1. Run linting and build
2. Bump the version based on conventional commits
3. Generate/update the CHANGELOG
4. Create a git tag and push
5. GitHub Actions will create the release with assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.
