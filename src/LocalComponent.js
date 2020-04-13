/*
 * @Author: your name
 * @Date: 2020-04-12 19:05:17
 * @LastEditTime: 2020-04-12 19:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\LocalComponent.js
 */


import React from 'react';
import * as firebase from './firebase.js';
// var exiftool = require('exiftool-wrapper');
import * as exiftool from 'exiftool-wrapper';

export default class LocalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // need to pass from parent later
            user_id: "zZsdXvw7AQMr4AeOv8eb"
        };
    }
    componentDidMount() {

    };
    // upload the user selected images to firebase storage
    // TODO: authentication rule for storage
    uploadDropboxImage = async (imageURL, thumbnailURL, imageName) => {
        // const thumbnailResponse = await fetch(thumbnailURL);
        // const thumbnailblob = await thumbnailResponse.blob();

        let localfile = null;
        const thumbnailLocationRef = firebase.storage.ref('users/' + String(this.state.user_id) + '/dropboxThumbnail/' + String(imageName));
        thumbnailLocationRef
            .put(localfile)
            .then((result) => {
                //Get URL and store to pass
                thumbnailLocationRef.getDownloadURL().then((url) => {
                    firebase.user_db.doc(this.state.user_id).collection('local').doc(imageName)
                        .update({ thumbnail: String(url) });
                });
            });
        const response = await fetch(imageURL);
        const blob = await response.blob();
        // TODO: fetch meta data from blob
        const meta = exiftool.metadataSync({ source: blob });
        console.log(meta)
        const imagedLocationRef = firebase.storage.ref('users/' + String(this.state.user_id) + '/local/' + String(imageName));
        console.log(blob)
        imagedLocationRef
            .put(blob)
            .then((result) => {
                //Get URL and store to pass
                imagedLocationRef.getDownloadURL().then((url) => {
                    firebase.user_db.doc(this.state.user_id).collection('local').doc(imageName)
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
                firebase.user_db.doc(this.state.user_id).collection('local').doc(image.name)
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


            <div>
                
            </div>
            // // folder select and direct link cannot be enable together
            // <DropboxChooser
            //     appKey={'qum9scemxpdx70s'}
            //     success={files => this.onSuccess(files)}
            //     // cancel={() => this.onCancel()}
            //     multiselect={true}
            //     // folderselect={true}
            //     linkType={"direct"} // or "direct"
            //     // extensions={['.jpeg', '.raw', '.png', '.jpg']}
            //     extensions={['images']}
            // >
            //     <div className="dropbox-button">Upload from Dropbox</div>
            // </DropboxChooser>
        )
    }


}