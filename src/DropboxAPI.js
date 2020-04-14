/*
 * @Author: your name
 * @Date: 2020-04-12 23:32:40
 * @LastEditTime: 2020-04-13 22:32:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\DropboxAPI.js
 */
// /*
//  * @Author: your name
//  * @Date: 2020-04-12 23:32:40
//  * @LastEditTime: 2020-04-12 23:55:23
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: \mapviewReact\src\Dropbox.js
//  */
// import React from 'react';
// import * as firebase from './firebase.js';
// var Dropbox = require('dropbox').Dropbox;

// var OAuth = require('@zalando/oauth2-client-js');

// const CLIENT_ID = 'qum9scemxpdx70s';

// export default class DropboxAPI extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // need to pass from parent later
//             user_id: "zZsdXvw7AQMr4AeOv8eb"
//         };
//     }

//     componentDidMount() {

//         // var google = new OAuth.Provider({
//         //     id: 'google',   // required
//         //     authorization_url: 'https://google.com/auth' // required
//         // });
//         let dropbox = new OAuth.Provider({
//             id: 'dropbox',   // required
//             authorization_url: 'https://www.dropbox.com/oauth2/authorize' // required
//         });// Create a new request

//         var request = new OAuth.Request({
//             client_id: CLIENT_ID,  // required
//             redirect_uri: 'http://localhost:3000'
//         });

//         // Give it to the provider
//         var uri = dropbox.requestToken(request);
//         // Later we need to check if the response was expected
//         // so save the request
//         dropbox.remember(request);

//         // Do the redirect
//         window.location.href = uri;

//         var response = dropbox.parse(window.location.hash);
//         console.log(response);


//     }






   

// // var dbx = new Dropbox({ accessToken: "I2uLbbAlEjAAAAAAAAAAJDRDXzDk4EsckXkbFvpJ0N8kURiGLVyO2DJpU1687nyW" });
// // // var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
// // dbx.usersGetCurrentAccount()
// //     .then(function (response) {
// //         console.log(response);
// //     })
// //     .catch(function (error) {
// //         console.error(error);
// //     });

// }