# Gas App

A React Native mobile application for consumer and delivery partner login, profile management, and booking features. Built with Expo and React Navigation.

## Features

- Splash screen with animated logo
- Consumer and Delivery Partner login flows
- OTP verification for secure login
- Dashboard with quick access cards (Book Now, Address, Booking History, Profile)
- Profile management with form validation and image picker
- Custom Drawer and Bottom Tab navigation
- Consistent theming and gradient buttons

## Project Structure

```
├── App.js
├── index.js
├── package.json
├── app.json
├── assets/
│   └── [icons, images, logo, etc.]
├── src/
│   ├── component/
│   │   ├── Button.js
│   │   └── LinearGradientButton.js
│   ├── navigation/
│   │   ├── BottomTabs.js
│   │   └── DrawerNavigator.js
│   ├── screens/
│   │   ├── authentication/
│   │   │   ├── Login.js
│   │   │   ├── LoginSelection.js
│   │   │   └── OtpVerification.js
│   │   ├── Consumer/
│   │   │   └── Profile/
│   │   │       ├── ConsumerProfileForm.js
│   │   │       └── Form.js
│   │   ├── Pages/
│   │   │   └── Dashboard.js
│   │   └── splashscreen/
│   │       └── SplashScreen.js
│   └── styles/
│       └── Theme.js
```

## Getting Started

### Prerequisites

- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd gas_app/gas
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

### Running the App

- Start the development server:
    ```sh
    npm start
    ```
- Run on Android:
    ```sh
    npm run android
    ```
- Run on iOS:
    ```sh
    npm run ios
    ```
- Run on Web:
    ```sh
    npm run web
    ```

## Dependencies

- React Native
- Expo
- React Navigation (Drawer, Bottom Tabs)
- Formik & Yup (form validation)
- react-native-animatable (animations)
- expo-image-picker (profile image)
- react-native-keyboard-aware-scroll-view
- react-native-otp-textinput

## Customization

- Update theme colors in [`src/styles/Theme.js`](src/styles/Theme.js)
- Replace images/icons in [`assets/`](assets/)
- Modify navigation in [`src/navigation/DrawerNavigator.js`](src/navigation/DrawerNavigator.js) and [`src/navigation/BottomTabs.js`](src/navigation/BottomTabs.js)

## License

This project is licensed under the 0BSD License.

---

**Made with ❤️ using React Native & Expo**
