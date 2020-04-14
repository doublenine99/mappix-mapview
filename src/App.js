/*
 * @Author: your name
 * @Date: 2020-04-13 22:51:06
 * @LastEditTime: 2020-04-14 01:11:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\App.js
 */
import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import Cluster from '@urbica/react-map-gl-cluster';
// import 'mapbox-gl/dist/mapbox-gl.css';

import DropboxComponent from './DropboxComponent';
import * as firebase from './firebase.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // need to pass from parent later
      user_id: "zZsdXvw7AQMr4AeOv8eb",
      dropbox_images: [],
      // lng: -89.40235,
      // lat: 43.08011,
      // zoom: 12,
      viewport: {
        latitude: 43.08011,
        longitude: -89.40235,
        width: "100vw",
        height: "100vh",
        zoom: 12
      },
      selectedImage: null
    };
  }
  componentDidMount() {
    this.fetchImagesFromDropbox(this.state.user_id);

  }
  // fetch user's uploaded dropbox images from the firebase 
  fetchImagesFromDropbox(user_id) {
    let query = firebase.user_db.doc(user_id).collection('dropbox');
    query.onSnapshot(querySnapshot => {
      // console.log(`Received query snapshot of size ${querySnapshot.size}`);
      const all_images = querySnapshot.docs.map(doc => doc.data()).filter(image => image.location != null);
      console.log(all_images);
      this.setState({ dropbox_images: all_images })
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

  }

  render() {

    return (

      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken='pk.eyJ1IjoieWNsaSIsImEiOiJjajV3dThzYmQwMHBiMnhwZ2I1N2RvNjViIn0.d3TSyIbtv9B7VwxZfuf63Q'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          onViewportChange={viewport => {
            this.setState({ viewport: viewport })
          }}
        >
          {<div className='sidebarStyle'>
            <div>Longitude: {this.state.viewport.longitude} | Latitude: {this.state.viewport.latitude} | Zoom: {this.state.viewport.zoom}</div>
            <button>  <DropboxComponent /></button>
            {/* <button> </LocalComponent></button> */}
          </div>}
          {this.state.dropbox_images.map(image => (
            <Marker
              key={image.name}
              latitude={image.location.latitude}
              longitude={image.location.longitude}
              cluster="true"
            >
              <button
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ selectedImage: image });
                }}
              >
                <img src={image.thumbnail} alt="thumbnail pic" height="420" width="420" />
              </button>

            </Marker>
          ))}

          {this.state.selectedImage != null ?
            (
              <Popup
                latitude={this.state.selectedImage.location.latitude}
                longitude={this.state.selectedImage.location.longitude}
                onClose={() => {
                  this.setState({ selectedImage: null });
                }}
              >
                <div>
                  <h2>{this.state.selectedImage.name}</h2>
                  <img src={this.state.selectedImage.imageLink} alt="original image" height="200" width="200" />

                </div>
              </Popup>
            )
            : null}
        </ReactMapGL>

      </div>
    );
  }
}