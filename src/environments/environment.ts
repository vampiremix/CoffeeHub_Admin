// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDwZos6EDeCYliEN3P8ognprOZhG0OS2Ks",
    authDomain: "coffee-hub.firebaseapp.com",
    databaseURL: "https://coffee-hub.firebaseio.com",
    projectId: "coffee-hub",
    storageBucket: "coffee-hub.appspot.com",
    messagingSenderId: "985010208244"
  }
};
