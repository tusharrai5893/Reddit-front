// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //base_url: 'https://reddit-clone-5893.herokuapp.com/api/', ng serve --host 0.0.0.0
  base_url: 'http://192.168.29.249:8080/api/' != null ? 'http://192.168.29.249:8080/api/' : "http://localhost:8080/api/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
