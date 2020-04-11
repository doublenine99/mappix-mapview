/*
 * @Author: your name
 * @Date: 2020-04-10 18:14:50
 * @LastEditTime: 2020-04-10 21:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapviewReact\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
// import { Widget } from "@uploadcare/react-widget";
import DropboxComponent from './DropboxComponent';


mapboxgl.accessToken = 'pk.eyJ1IjoieWNsaSIsImEiOiJjajV3dThzYmQwMHBiMnhwZ2I1N2RvNjViIn0.d3TSyIbtv9B7VwxZfuf63Q';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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