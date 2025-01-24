const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";
const getUniqueIdentifier =()=>{
  if(IS_DEV){
    return "com.fy.tdraft"
  }
  if(IS_PREVIEW){
    return "com.fy.tdraft.preview"
  }
  return "com.fy.tdraft"
}

const getAppName = ()=>{
  if(IS_DEV){
    return "TuneDraft-dev"
  }
  if(IS_PREVIEW){
    return "TuneDraft-preview"
  }
  return "TuneDraft"
}

export default {
  expo: {
    name: getAppName(),
    slug: "TuneDraft",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "TuneDraft",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier(),
      buildNumber: "1.0.0",
    },
    developmentClient: true,
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: getUniqueIdentifier(),
      config: {
        googleSignIn: {
          certificateHash: "76:1F:E6:D0:69:F2:96:23:E8:ED:9B:C4:84:FE:67:22:42:00:4F:71",
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/adaptive-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "d6ccae54-4020-403f-9e1f-5ce7e8c9525e",
      },
    },
    owner: "coke_hui",
  },
};