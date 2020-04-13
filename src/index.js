/*
 * @Author: your name
 * @Date: 2020-04-10 18:14:50
 * @LastEditTime: 2020-04-12 19:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
// import { Widget } from "@uploadcare/react-widget";
import DropboxComponent from './DropboxComponent';
import LocalComponent from './LocalComponent';
import * as firebase from './firebase.js';

mapboxgl.accessToken = 'pk.eyJ1IjoieWNsaSIsImEiOiJjajV3dThzYmQwMHBiMnhwZ2I1N2RvNjViIn0.d3TSyIbtv9B7VwxZfuf63Q';


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // need to pass from parent later
            user_id: "zZsdXvw7AQMr4AeOv8eb",
            dropbox_images: [],
            lng: -89.40235,
            lat: 43.08011,
            zoom: 12
        };

    }

    componentDidMount() {
        //  initilize the map
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        // keep track of user's move
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(5),
                lat: map.getCenter().lat.toFixed(5),
                zoom: map.getZoom().toFixed(2)
            });
        });
        this.fetchImagesFromDropbox(this.state.user_id);
    }

    // fetch user's uploaded dropbox images from the firebase 
    fetchImagesFromDropbox(user_id) {
        let query = firebase.user_db.doc(user_id).collection('dropbox');
        query.onSnapshot(querySnapshot => {
            console.log(`Received query snapshot of size ${querySnapshot.size}`);
            const all_images = querySnapshot.docs.map(doc => doc.data());
            console.log(all_images);
            this.setState({ dropbox_images: all_images })
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
        // firebase.user_db.doc(user_id).collection('dropbox')
        //     .get()
        //     .then(snapshot => {
        //         const all_images = snapshot.docs.map(doc => doc.data());
        //         console.log(all_images);
        //         this.setState({ dropbox_images: all_images })
        //     })
        //     .catch((err) => {
        //         console.log('Error fetching images from dropbox', err);
        //     });

    }

    render() {
        return (
            <div>
                <div display='inline-block'>
                </div>
                {/* display the coordinate */}
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    <button>  <DropboxComponent /></button>
                    {/* <button> </LocalComponent></button> */}
                    <img
                        src={this.state.dropbox_images[this.state.dropbox_images.length - 1] ? this.state.dropbox_images[this.state.dropbox_images.length - 1].thumbnail : null}
                        alt={this.state.dropbox_images[0] ? this.state.dropbox_images[0].name : null}
                    // onClick={() => RenderDishDetail(dish)}
                    />
                </div>
                {/* <p>
                        <label htmlFor='file'>Your file:</label>{' '}
                        <Widget publicKey='ea0425ac5d7d2e35b17c' id='file' />
                    </p> */}

                {/* The mapContainer ref specifies that map should be drawn to the HTML */}
                <div ref={el => this.mapContainer = el} className='mapContainer' />

            </div >
        )
    }
}

ReactDOM.render(<Application />, document.getElementById('app'));