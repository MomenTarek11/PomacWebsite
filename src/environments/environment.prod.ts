// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  endpoint: 'https://pomac.info/api/backend/public/api',
  // endpoint: 'https://backend-beta-dev.pomac.info/public/api',
  baseURL: 'https://pomac.info/api/backend/public',
  appVersion: '1.0.3', // غيره كل ما تعمل تحديث
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
