import React from 'react';
import './App.css';
import axios from 'axios';
import Autocomplete from './Autocomplete.js';
// import $ from "jquery";
//import heroes from './data.js'
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
const privRoot = new axios.create({
  baseURL: "http://localhost:3000/user"
});
export class Side extends React.Component {
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
      kosher: true,
      nutAllergy: false,
      veganFriendly: true,
      reviewRating: 1,
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
    })
    
  }
 
  handleViewMap = () => {
    console.log("hi");
    return (<iframe width="600" height="450" frameborder="0" src="https://www.google.com/maps/embed/v1/view?zoom=17&center=35.9141,-79.0540&key=AIzaSyBD2pY0bUHkG05T6jCfQCa04QGomHQmtpk" allowfullscreen></iframe>)
    // AIzaSyBD2pY0bUHkG05T6jCfQCa04QGomHQmtpk
  }

  handleGfChange = event => 
    this.setState({ gf: event.target.checked })
    handleKosherChange = event => 
    this.setState({kosher: event.target.checked })
    handleNutChange = event => 
    this.setState({nutAllergy: event.target.checked })
    handleVeganChange = event => 
    this.setState({veganFriendly: event.target.checked })
    
  
handleFilterChange  = event => {
    event.preventDefault();
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
     <div className = "fullWidth">       
     <div className="filter">
<div className = "center">
<strong>Filter Options</strong> <br/>

<input id = "gf" type="checkbox" checked={this.state.gf} onChange={this.handleGfChange} />Gluten Free Options<br/>
<input id = "kosher" type="checkbox" checked={this.state.kosher} onChange={this.handleKosherChange}/>Kosher<br/>
<input id = "nut" type="checkbox" checked={this.state.nutAllergy} onChange={this.handleNutChange}/>Nut-Allergy Friendly<br/>
<input id = "vegan" type="checkbox"  checked={this.state.veganFriendly} onChange={this.handleVeganChange}/>Vegan Friendly<br></br>
<input onClick={this.handleFilterChange} className = "s" type="submit" value="Filter"/>
</div>
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

}
handleSearch = event =>{
  this.setState({heroCards: {"mong": {
      "count": 0,
      "sum": 0,
      "score": 0,
      "id": 5,
      "name": "Ms. Mong",
      "name2": "mong",
      "address": "163 E Franklin St, Chapel Hill, NC 27514",
      "hours": "11AM-10PM",
      "img": "r_icons/mong.png",
      "color": "black",
      "backgroundColor": "#B8B4F9",
      "kosher_options": false,
      "gf": false,
      "nut_friendly": false,
      "vegan": false
    }}})
}
handleSubmitReview = event =>{
  event.preventDefault();
      privRoot.post('/users/' + event.target.value + '/score', {
        "data": 95
     
      })
        .then(res => {
          console.log("posted")
          console.log(res.data);
         
        })
        
      
  


}
  render() {
    return (
      <div>
        <div>
        <div className="card" >
  <div className="card-body">
    <div className = "card-text"> <h1 id = "center">{this.state.guest === true ? <span>You are a guest, please login
      to gain full access
    </span> : <span>You are logged in</span>}</h1></div>
  </div>
</div>
          
        </div>
        {this.renderHeroEditForm()}
        <div>
      {/* <h1>React Autocomplete Demo</h1> */}
      <section className="section">
      <div className="container">
      <h2>Search for a Chapel Hill Restaurant!</h2>
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
      />
      
       <button onClick={this.handleSearch}>Go</button>
       
      </div>
      </section>
     
    </div>



        {Object.keys(this.state.heroCards).map((key, id) => (


<div id = "formCard" className = "card" key={id}> 
<div id = {this.state.heroCards[key].id}   >
   
   <h1 className = "title" >{this.state.heroCards[key].name}</h1>
   <br/>
   <h1 className = "subtitle" >{this.state.heroCards[key].address}</h1>
   <p > {this.state.heroCards[key].hours}</p>
   
   <img  src={require("./" + this.state.heroCards[key].img)} alt="Hero Image"/>


<form >
          <span>Ratings:</span><progress className="progress is-info" value={this.state.heroCards[key].score} max="100" data-text={this.state.heroCards[key].score}>30</progress>
         < div >
<input type="radio" onChange={this.setReviewButton.bind(this)}value="1" name="gender"  /> 1
<input type="radio" onChange={this.setReviewButton.bind(this)} value="2" name="gender" /> 2
<input type="radio" onChange={this.setReviewButton.bind(this)} value="3" name="gender" /> 3
<input type="radio" onChange={this.setReviewButton.bind(this)} value="4" name="gender" /> 4
<input type="radio" onChange={this.setReviewButton.bind(this)} value="5" name="gender" /> 5
</div>
              <div className ="buttons is-centered">
                <button onClick = {this.handleSubmitReview.bind(this)}  className = "button is-link is-centered" type={this.state.heroCards[key].name} value={this.state.heroCards[key].name2} name="submit">Submit Review</button>
              </div>
      </form>   
 
</div>
</div>
))}
  </div>
  
    )
  }
  
}

export default Side;
