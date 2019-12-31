import React from 'react';
import './App.css';
import axios from 'axios';
import Autocomplete from './Autocomplete.js';
// import logo from './image3.jpeg';
import Map from './Map.jsx';
import Test from './test.jsx';

// import logo from './Old-well-banner.jpg';
import logo from './test_banner.jpg';
import { MainApp } from './MainApp';
// import $ from "jquery";
//import heroes from './data.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const privRoot = new axios.create({
  baseURL: "http://localhost:3000/user"
});
export class cardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true,
      name: "",
      person:[],
      login: '0',
      heroCards: {},
      defaultHeroCards: {},
      filterCards:{},
      ratings :[],
      gf: false,
      kosher: false,
      nutAllergy: false,
      veganFriendly: false,
      reviewRating: 1,
      showMap: false,
      longitude: 35.9141313,
      latitude: -79.0558882,
      sum: 0,
      count: 0,
      tempRatings: []
    };

  }
  componentDidMount = () => {
    this.setState({guest: this.props.guest})
    pubRoot.get('/restaurants')
    .then(res => {
      this.setState({
        heroCards: res.data.result,
        defaultHeroCards: res.data.result
      })
      const _hibachi = (res.data.result.hibachi.name);
      const _moes = (res.data.result.moes.name);
      const _chipotle = (res.data.result.chipotle.name);
      const _pizzapress = (res.data.result.pizzapress.name);
      const _banditos = (res.data.result.banditos.name);
      const _mong = (res.data.result.mong);
      const _suttons = (res.data.result.suttons.name);
      const _panera = (res.data.result.panera.name);
      const _chabad = (res.data.result.chabad.name);
      const _cosmic = (res.data.result.cosmic.name);
      const _cp = (res.data.result.cp.name);
      const _sup_dogs = (res.data.result.sup_dogs.name);
      const _lotsa = (res.data.result.lotsa.name);
      // console.log(_mong);

      
    })
    
  }
 

  handleGfChange = event => {
    this.setState({ gf: event.target.checked })
    this.state.showMap = false;
  }
    
    handleKosherChange = event => 
    this.setState({kosher: event.target.checked })
    handleNutChange = event => 
    this.setState({nutAllergy: event.target.checked })
    handleVeganChange = event => 
    this.setState({veganFriendly: event.target.checked })
    
  
handleFilterChange  = event => {
    event.preventDefault();
    this.state.showMap = false;
    const hero = this.state.defaultHeroCards

    const checkGF = this.state.gf
    const checkKosher = this.state.kosher 
    const checkNut = this.state.nutAllergy
    const checkVegan = this.state.veganFriendly
    var heroFilter = this.state.defaultHeroCards
    if(!checkGF && !checkKosher && !checkNut && !checkVegan){
      heroFilter = this.state.defaultHeroCards
    }
    else{
      if(checkGF){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].gf === checkGF) {
            return hero[key]
          }
        });
      }
      
      if(checkKosher){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].kosher_options === checkKosher) {
            return hero[key]
          }
        });
      }
      if(checkNut){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].nut_friendly === checkNut) {
            return hero[key]
          }
        });
      }
      if(checkVegan){
        heroFilter = Object.keys(hero).map(function (key) {
          if(hero[key].vegan === checkVegan) {
            return hero[key]
          }
        });
      }
      heroFilter = heroFilter.filter(function( element ) {
        return element !== undefined;
     });
    }
   

   
   this.setState({heroCards: heroFilter})
    
      
  }
  renderHeroEditForm = () => {

    return (  
<div>
  <div className = "filter_options">
<strong>Filter Options: </strong> <br></br>
<input className = "gf" id = "gf" type="checkbox" checked={this.state.gf} onChange={this.handleGfChange} />  Gluten Free Options &#09;
<input className = "k" id = "kosher" type="checkbox" checked={this.state.kosher} onChange={this.handleKosherChange}/>Kosher
<input className = "n" id = "nut" type="checkbox" checked={this.state.nutAllergy} onChange={this.handleNutChange}/>Nut-Allergy Friendly
<input className = "v" id = "vegan" type="checkbox"  checked={this.state.veganFriendly} onChange={this.handleVeganChange}/>Vegan Friendly
<input id = "b" id="filter_button" class="button is-primary" onClick={this.handleFilterChange}  type="submit" value="Filter"/>
  </div>
</div>
            )
};


setReviewButton(event) {
  //console.log(event.target.value)
  event.preventDefault();
  var target = event.target.value
  this.setState({
    reviewRating: target
  })
  this.state.showMap = false;

}

myFunction = (item) => {
  console.log(item);
};

//

handleSearch = event =>{
  // alert("You searched " + this.refs.Autocomplete.state.userInput);
  var address = this.refs.Autocomplete.state.userInput;
  console.log(address);
  // console.log(this.state.heroCards.mong);
  // let OPMong = (this.state.heroCards['mong'].name);
  // console.log(OPMong);
  // this.state.defaultHeroCards.forEach(myFunction(this.state.defaultHeroCards.hibachi));
  // console.log(Object.keys(this.state.defaultHeroCards));
  // for(var i = 0; i < this.state.heroCards.length; i++){
  //   // console.log(address === this.state.heroCards[i].name)
  //   console.log("yofi");
  // }
  // console.log(restaurants);
  if(address === "Ms. Mong"){
    this.setState({heroCards: {"mong": this.state.heroCards['mong']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Bandito's Mexican Cafe"){
    this.setState({heroCards: {"banditos": this.state.heroCards['banditos']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Hibachi & Co"){
    this.setState({heroCards: {"hibachi": this.state.heroCards['hibachi']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Moe's Southwest Grill"){
    this.setState({heroCards: {"moes": this.state.heroCards['moes']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Chipotle Mexican Grill"){
    this.setState({heroCards: {"chipotle": this.state.heroCards['chipotle']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Sutton's Drug Store"){
    this.setState({heroCards: {"suttons": this.state.heroCards['suttons']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Panera Bread"){
    this.setState({heroCards: {"panera": this.state.heroCards['panera']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Chabad House"){
    this.setState({heroCards: {"chabad": this.state.heroCards['chabad']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Cosmic Cantina"){
    this.setState({heroCards: {"cosmic": this.state.heroCards['cosmic']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Curry Point Express"){
    this.setState({heroCards: {"cp": this.state.heroCards['cp']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Sup Dogs"){
    this.setState({heroCards: {"suo_dogs": this.state.heroCards['sup_dogs']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "Lotsa Stone Fired Pizza"){
    this.setState({heroCards: {"lotsa": this.state.heroCards['lotsa']}});
    this.state.longitude = 35.9121788;
    this.state.latitude = -79.0597643;
    this.state.showMap = true;
  }
  if(address === "The Pizza Press" ){
  this.setState({heroCards: {"pizzapress": {
    "count": 0,
    "sum": 0,
    "score": 66,
    "id": 3,
    "name": "The Pizza Press",
    "name2": "pizzapress",
    "address": "133 W Franklin St Suite 120 Suite 120, Chapel Hill, NC 27516",
    "hours": "11AM-10PM",
    "img": "r_icons/pizzapress.png",
    "color": "black",
    "backgroundColor": "#DED9D7",
    "kosher_options": false,
    "gf": false,
    "nut_friendly": true,
    "vegan": false,
    "place_id": "ChIJX8ix0RHDrIkRLz4z_MQ6SME"
  }}, longitude: 35.9121788, latitude:-79.0597643})
  this.state.longitude = 35.9121788;
  this.state.latitude = -79.0597643;
  this.state.showMap = true;
 }
else if(address === undefined){
  this.setState({showMap: false})
  this.state.showMap = false;
}
 else{
   console.log(address)
  this.state.longitude = parseInt(address.substring(0,2));
  this.state.latitude = parseInt(address.substring(3,5));
  this.setState({showMap: true})
  this.state.showMap = true;
  
 }
}
handleSubmitReview = event =>{
  event.preventDefault();
  if(event.target.value !== "hibachi"){
    alert("You are a guest, you need to login to submit reviews")
  }
 else{

  pubRoot.post('/restaurants/' + event.target.value + '/score', {
    "data": 95
 
  })
    .then(res => {
      alert("Review Sent!")
      console.log("posted")
      console.log(res.data);
     
    })
    
 }
    
}


renderMap(){
  return(<Map latitude = {this.state.latitude} longitude = {this.state.longitude}/>)
}
renderOther(){
  return(
   <div>
   </div>
  )
}
  render() {
    return (
      <div>
     
        
 <div>
     <div class=""> 
       <img src={logo} alt="Logo" />
     <h1 id = "hero_image">{this.state.guest === true ? <span>You Are a guest, Login For Full Access</span> 
     : <span>You are logged in</span>}</h1>
     </div>    
</div> 

            
        <div>

      <div id = "fullWidth2" className = "card">

      <div id = "auto" className="" >
        <div id = "search" className = "searchbar_content">
        <div className="searchbar_content">
        <strong>Search Local Restaurants!</strong><br></br>
        </div>
        <button class="button is-primary" onClick={this.handleSearch}>Go</button>
      <Autocomplete  
        suggestions={[
          "Hibachi & Co",
          "Moe's Southwest Grill",
          "Chipotle Mexican Grill",
          "The Pizza Press",
          "Bandito's Mexican Cafe",
          "Ms. Mong",
          "Sutton's Drug Store",
          "Panera Bread",
          "Chabad House",
          "Cosmic Cantina",
          "Curry Point Express",
          "Sup Dogs",
          "Lotsa Stone Fired Pizza"
        ]}
        ref="Autocomplete"
        
      />
      
      
       </div>
       
       </div>
       
       </div>
      
       <div id = "filter_bar" className = "card">
       {this.renderHeroEditForm()}
       </div>
    


     
     
      <div >
   
        </div>
    </div>
    <div className = "moveMap">
      

    {this.state.showMap === true
          ? this.renderMap()
          : this.renderOther()}
              </div>
<div className = "spaceUp">




        {Object.keys(this.state.heroCards).map((key, id) => (

<div id = "formCard" key={id}> 
<div id = {this.state.heroCards[key].id}>

<h1 className="card_title">{this.state.heroCards[key].name}</h1>

<img className="card-img-top" src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>
{/* <div class="container">
  <img src="img_avatar.png" alt="Avatar" class="image" style="width:100%"></image>
  <div class="middle">
    <div class="text">John Doe</div>
  </div>
</div> */}


<div class="card-body">

    {/* <h1 className="card_title">{this.state.heroCards[key].name}</h1> */}

    <p class="card-text">{this.state.heroCards[key].address}<br></br> {this.state.heroCards[key].hours}<form>
          <span>Ratings:</span><progress className="progress is-info" value={this.state.heroCards[key].score} max="100" data-text={this.state.heroCards[key].score}>30</progress>
         < div id = "centered">
<input id = "centered" type="radio" onChange={this.setReviewButton.bind(this)}value="1" name="gender"  /> 1
<input type="radio" onChange={this.setReviewButton.bind(this)} value="2" name="gender" /> 2
<input type="radio" onChange={this.setReviewButton.bind(this)} value="3" name="gender" /> 3
<input type="radio" onChange={this.setReviewButton.bind(this)} value="4" name="gender" /> 4
<input type="radio" onChange={this.setReviewButton.bind(this)} value="5" name="gender" /> 5
</div>
              <div className ="buttons is-centered">
                <button onClick = {this.handleSubmitReview.bind(this)}  className = "button is-link is-centered" type={this.state.heroCards[key].name} value={this.state.heroCards[key].name2} name="submit">Submit Review</button>
              </div>
      </form>   </p>
    
   </div>







 
</div>
</div>
))}
  </div>
  </div>
    )
  }
  
}



export default cardPage;