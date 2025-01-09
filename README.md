# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

System requirements: 

* [Node.js (LTS).](https://nodejs.org/en/)
* macOS, Windows (Powershell and [WSL 2](https://nodejs.org/en/)), and Linux are supported.

## Create a new app

```bash
  npx create-expo-app@latest 
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app
   To start the development server, run the following command:
   ```bash
    npx expo start
   ```

* 2-1. After running the command above, you will see a QR code in your terminal. Scan this QR code to open the app on your device. 
* 2-2. If you're using an Android Emulator or iOS Simulator, you can press a or i respectively to open the app.
* 2-3. In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Initialize a development build

```bash
npm install -g eas-cli
```
Log in or sign up for an Expo account.

1. To log in, run the following command:
    ```bash
    eas login
    ```
    This command asks for our Expo account email or username and password to complete the login.
2. Initialize and link the project to EAS  
   For any new project, the first step is to initialize and link it to the EAS servers. Run the following command:
    ```bash
    eas init  
    ```
    On running, this command:

    [2-1].Requests verification of the account owner by entering our Expo account credentials and asks if we want to create a new EAS project:

    #### Output after running eas init
      * ✔ Which account should own this project? > your-username
      * ✔ Would you like to create a project for @your-username/sticker-smash? … yes
      * ✔ Created @your-username/sticker-smash
      * ✔ Project successfully linked (ID: XXXX-XX-XX-XXXX) (modified app.json)
     [2-2].Creates EAS project and provides a link to that project which we can open in the Expo dashboard.

     [2-3].Generates a unique projectId and links this EAS project to the example app on our development machine.

     [2-4].Modifies app.json to include extra.eas.projectId and updates its value with the unique ID created.

3. Configure project for EAS Build
   To set up our project for EAS Build, run the following command:
    ```bash
    eas build:configure
    ```
    On running, this command:
    * [3-1]  Prompts to select a platform: Android, iOS, or All. Since we are creating Android and iOS apps, let's select All.
    * [3-2]  Creates eas.json in the root of our project's directory with the following configuration

       Example eas.json file:
         `{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "enterpriseProvisioning": "universal"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "autoIncrement": "version",
        "enterpriseProvisioning": "universal"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDEFGHIJ"
      }
    }
  }
}`

4. Build preview for test
   
   [4-1] Specifies that the build should use the preview profile defined in the eas.json file. Preview builds are typically used for final testing before release or for sharing with team members.
   ```bash
   eas build -p android --profile preview
   ```
   [4-2] Specifies that the build should only target the iOS platform. This will generate an .ipa file that can be installed on iOS devices or simulators.
   ```bash
   eas build --profile development --platform ios
   ```
   
5. Build for app store submission

    ```bash
   eas build
   ```
   The primary purpose of `eas build` is to generate binary files for your application based on the configuration.
It can be used for:
   Generating Development Builds for testing and debugging.
   Generating Production Builds for releasing to app stores or distributing to users.

   [5-1] Example

   Assuming you have already configured the eas.json file and want to build production versions for both Android and iOS, you can run:

   ```bash
    eas build --platform all --profile production
   ```
   * --platform all: Specifies building for both Android and iOS.

   * --profile production: Specifies using the production build configuration in eas.json.

   [5-2]. Build Results

   After the build is completed, you will get the following results:

    Android: Generates .apk or .aab files.

    iOS: Generates .ipa files.

   You can distribute these files to testers or upload them to app stores.

   [5-3]. Log in to Expo Dashboard for submit:

    [5-3-1]. Visit Expo and log in with your account.

    [5-3-2].Navigate to Build Details:

     On the project page, locate the corresponding build record and click to enter the build details page.

    [5-3-3]. Submit the Build:

     On the right side of the build details page, find the "Submit to an app store" button. Clicking it will guide you through the following steps:

      * Select the target platform (iOS or Android).
      * Configure relevant information for App Store Connect or Google Play.
      * Confirm and submit the build.


