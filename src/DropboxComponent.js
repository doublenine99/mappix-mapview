/*
 * @Author: your name
 * @Date: 2020-04-10 19:21:15
 * @LastEditTime: 2020-04-13 22:31:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\DropboxComponent.js
 */

import React from 'react';
import DropboxChooser from 'react-dropbox-chooser';
import * as firebase from './firebase.js';
// import $ from 'jquery';

// var exiftool = require('exiftool.js');
import * as exiftool from 'exiftool.js';
import * as fs from 'fs';
// var fs = require('fs');


export default class DropboxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // need to pass from parent later
            user_id: "zZsdXvw7AQMr4AeOv8eb"
        };
    }
    // upload the user selected images to firebase storage
    // TODO: authentication rule for storage
    uploadDropboxImage = async (imageURL, thumbnailURL, imageName) => {

        // fetch thumbnail from the temp link and upload to our firebase storage and databse
        const thumbnailResponse = await fetch(thumbnailURL);
        const thumbnailblob = await thumbnailResponse.blob();
        const thumbnailLocationRef = firebase.storage.ref('users/' + String(this.state.user_id) + '/dropboxThumbnail/' + String(imageName));
        thumbnailLocationRef
            .put(thumbnailblob)
            .then((result) => {
                //Get URL and store to pass
                thumbnailLocationRef.getDownloadURL().then((url) => {
                    firebase.user_db.doc(this.state.user_id).collection('dropbox').doc(imageName)
                        .update({ thumbnail: String(url) });
                });
            });


        // fetch the meta data from the original image and upload to our database
        exiftool.getExifFromUrl(imageURL, (exif) => {
            console.log(exif);
            if (exif == null || exif['GPSLatitudeRef'] == null) {
                console.log(imageName + "does not have valid geo exif information");
            }
            else {
                let altitude = exif['GPSAltitude'];
                const altitudeRef = exif['GPSAltitudeRef'];  // "0" ?
                const latitudeArray = exif['GPSLatitude'].split(",");
                const latitudeRef = exif['GPSLatitudeRef'];  // "N" or "S"
                const longtitudeArray = exif['GPSLongitude'].split(",");
                const longtitudeRef = exif['GPSLongitudeRef']  // "W" or "E"

                // console.log(latitudeArray)
                const latNumber = parseFloat(latitudeArray[0]) + parseFloat(latitudeArray[1] / 60) + parseFloat(latitudeArray[2] / 3600);
                const latitude = (latitudeRef === 'N' ? latNumber : -latNumber);
                // console.log(latitude);
                const lngNumber = parseFloat(longtitudeArray[0]) + parseFloat(longtitudeArray[1] / 60) + parseFloat(longtitudeArray[2] / 3600);
                const longtitude = (longtitudeRef === 'E' ? lngNumber : -lngNumber);
                // console.log(longtitude);
                const imageGeoPoint = new firebase.GeoPoint(latitude, longtitude);
                // console.log(imageGeoPoint);
                firebase.user_db.doc(this.state.user_id).collection('dropbox').doc(imageName)
                    .update({
                        location: imageGeoPoint,
                        altitude: parseFloat(altitude)
                    });

            }
        });

        // fetch original image from the temp link and upload to our firebase storage and databse
        const response = await fetch(imageURL);
        const blob = await response.blob();
        const imagedLocationRef = firebase.storage.ref('users/' + String(this.state.user_id) + '/dropbox/' + String(imageName));
        // console.log(blob)
        imagedLocationRef
            .put(blob)
            .then((result) => {
                //Get URL and store to pass
                imagedLocationRef.getDownloadURL().then((url) => {
                    firebase.user_db.doc(this.state.user_id).collection('dropbox').doc(imageName)
                        .update({ imageLink: String(url) });
                });
            });
    }
    // trigger after user successfully select files 
    onSuccess(inputFiles) {
        console.log(inputFiles);

        inputFiles.forEach((image) => {
            if (image && image.isDir) {
                // console.log("select folder preview link is", image.link)
            }
            else if (image && !image.isDir) {
                firebase.user_db.doc(this.state.user_id).collection('dropbox').doc(image.name)
                    .set({
                        name: image.name,
                    });
                this.uploadDropboxImage(image.link, image.thumbnailLink, image.name);

            }
            else {
                console.log("image is null")
            }

        })


    }
    render() {
        return (
            // folder select and direct link cannot be enable together
            <DropboxChooser
                appKey={'qum9scemxpdx70s'}
                success={files => this.onSuccess(files)}
                // cancel={() => this.onCancel()}
                multiselect={true}
                // folderselect={true}
                linkType={"direct"} // or "direct"
                // extensions={['.jpeg', '.raw', '.png', '.jpg']}
                extensions={['images']}
            >
                <div className="dropbox-button">Upload from Dropbox</div>
            </DropboxChooser>
        )
    }


}