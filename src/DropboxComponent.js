/*
 * @Author: your name
 * @Date: 2020-04-10 19:21:15
 * @LastEditTime: 2020-04-10 22:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\DropboxComponent.js
 */

import React from 'react';
import DropboxChooser from 'react-dropbox-chooser';
// var fetch = require('isomorphic-fetch'); // 
// var Dropbox = require('dropbox').Dropbox;
// var dbx = new Dropbox({ accessToken: 'qum9scemxpdx70s', fetch: fetch });


export default class DropboxComponent extends React.Component {
    componentDidMount() {


    };
    // trigger after user successfully select files 
    onSuccess(inputFiles) {
        console.log(inputFiles)
    }
    render() {
        return (
            <DropboxChooser
                appKey={'qum9scemxpdx70s'}
                success={files => this.onSuccess(files)}
                // cancel={() => this.onCancel()}
                multiselect={true}
                extensions={['.jpeg', '.raw', '.png', '.jpg']} >
                <div className="dropbox-button">Upload from Dropbox</div>
            </DropboxChooser>
        )
    }


}