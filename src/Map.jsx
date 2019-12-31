import React, {Component} from 'react';
const google = window.google;
var INITIAL_MAP_ZOOM_LEVEL = 20;
var INITIAL_LOCATION = {
  address: 'Mission District, San Francisco',
  position: {
    latitude: 0,
    longitude: -79.0558882
  }
}
var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

//code for creating map and geocoding from http://react.tips/reactjs-and-geocoding/
export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
      data: [],
      weekPrice: 0.00,
      weekPriceCount: 0.00,
      averageWeekPrice: 0.00,
      hasSearched: false,
      search: "",
      amountBook: 0.00,
      amountPrice: 0.00
    };
  }

  //handles search bar submissions- changes geolocation and adds marker.
  geocodeAddress = (address) => {
    this.geocoder.geocode({
      'address': address
    }, function handleResults(results, status) {

      //if successful
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({foundAddress: results[0].formatted_address, isGeocodingError: false});

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }
      //otherwise error
      this.setState({foundAddress: null, isGeocodingError: true});

      //if error, sets map to ocean
      this.map.setCenter({lat: ATLANTIC_OCEAN.latitude, lng: ATLANTIC_OCEAN.longitude});

      this.marker.setPosition({lat: ATLANTIC_OCEAN.latitude, lng: ATLANTIC_OCEAN.longitude});

    }.bind(this));
  }
  //search bar handler
  handleSubmit = e => {
 

  }
  //price estimation method based on geolocation
  calculateOptimization = (address) => {
    
  }

  //price estimation method based on geolocation
  calculatePrice = (address) => {
    
   
  }

  //mounts map and sets intial values
  componentDidMount = () => {
    INITIAL_LOCATION.position.latitude = this.props.latitude;
    INITIAL_LOCATION.position.longitude = this.props.longitude;
    console.log(  INITIAL_LOCATION.position.latitude)
    console.log(  INITIAL_LOCATION.position.longitude)
    this.map = new google.maps.Map(this.mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: this.props.longitude,
        lng: this.props.latitude
      }
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: this.props.longitude,
        lng: this.props.latitude
      }
    })
    this.geocoder = new google.maps.Geocoder();
    // var tempData = this.props.data
    // this.setState({data: tempData})
  }

  //sets ref that is used in return method
  setSearchInputElementReference = (inputReference) => {
    this.searchInputElement = inputReference;
  }

  setMapElementReference = (mapElementReference) => {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>

        <div className="sameSize">
          <div className="callout">
            <div>
              {/* <form onSubmit={this.handleSubmit}>

                <input type="text" id="address" ref={this.setSearchInputElementReference} placeholder="Search Resturants"/>
                <button className="button expanded custom">Search Map</button>
              </form> */}
            </div>
            <div>
              <p className="center">
              </p>
            </div>

            <div className="">
              <div className="">
                <div className="callout">
                  <div className="map" ref={this.setMapElementReference} style={{
                    height: '100%',
                    width: '100%'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Map;
