# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

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

   ```bash
    npx expo start
   ```
   In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


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

2-1.Requests verification of the account owner by entering our Expo account credentials and asks if we want to create a new EAS project:

#### Output after running eas init
* ✔ Which account should own this project? > your-username
* ✔ Would you like to create a project for @your-username/sticker-smash? … yes
* ✔ Created @your-username/sticker-smash
* ✔ Project successfully linked (ID: XXXX-XX-XX-XXXX) (modified app.json)
  2-2.Creates EAS project and provides a link to that project which we can open in the Expo dashboard.

2-3.Generates a unique projectId and links this EAS project to the example app on our development machine.

2-4.Modifies app.json to include extra.eas.projectId and updates its value with the unique ID created.

3. Configure project for EAS Build
   To set up our project for EAS Build, run the following command:
```bash
eas build:configure
```
On running, this command:
* [3-1] . Prompts to select a platform: Android, iOS, or All. Since we are creating Android and iOS apps, let's select All.
* [3-2]. Creates eas.json in the root of our project's directory with the following configuration

4. Build preview
```bash
eas build -p android --profile preview
```



