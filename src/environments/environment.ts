// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //  changed API url below ( Because first the project was hosted on heroku but the heroku free tier got expired)
  // So i (Pankaj Phour) changed the hosting platform from heroku to render 
  Url : 'https://nodeapi-pwyk.onrender.com',
  // Url : 'https://pankaj-node-api.herokuapp.com',


  // URL for testing purpose only 
  // Url : 'http://localhost:3000',
  User : 'https://630369f20de3cd918b34e39e.mockapi.io/',
  Stats : 'https://630369f20de3cd918b34e39e.mockapi.io/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
