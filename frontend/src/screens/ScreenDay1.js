import React, {useState, useEffect, } from 'react';
import '../App.css';
import { Card} from 'antd';
import Nav from '../components/nav'
//import {Link} from 'react-router-dom'

import {connect} from 'react-redux'



function ScreenDay1(props) {

  const [day, setDay] = useState(1)
  const [recettes, setRecettes] = useState([])
  

  // recherche de recettes
  useEffect(() => {
  var handleSearchRecipes = async () => {
    
    const data = await fetch('/recipeDayOne', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `day=${props.numb}`
    })


    const body = await data.json()

    //console.log(body.recette, "BODY =======>>")
    setRecettes(body.recette)
   
}; 

handleSearchRecipes()
},[]) 

  
let recetteDuJour = recettes.map((recette,i) => {
 // console.log("RECETTE", recette)

  return (
     
     
       <Card key={i} 
         hoverable
         style={{ width: 550, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginBottom: '4%' }}
         >
           
           <p style={{fontWeight: 'bold', fontSize: '20px'}}>{recette.number} -{recette.name}</p>
           <img style={{width: '60%', height: 200,}} alt="example" src={recette.url}  />
           <p style={{fontWeight: 'bold', fontSize: '18px', marginTop: '4%'}}> Bienfaits</p>
           <p>{recette.bienfaits}</p>
           <p style={{fontWeight: 'bold', fontSize: '18px'}}>Ingrédients nécessaires</p>
           <p>{recette.ingredients}</p>
           <p style={{fontWeight: 'bold', fontSize: '18px'}}>Mode d'emploi</p>
           <p>{recette.instruction}</p>
         </Card>

)
})

let titreDuJour = recettes.map((recette,i) => {
  //console.log("RECETTE", recette.title)

  return (
     
      <p style={{marginLeft: '2%', fontSize: '25px', marginBottom: '5%'}}>{recette.title} </p>
      

)
})

  return (
    <div >
      
         <Nav/>
      
            <h1 style={{ marginLeft: '2%', fontSize: '40px'}}>Jour 1</h1>
        
           {titreDuJour}   
           
        <div style={styles.card} className="routine-page">  
          {recetteDuJour}  
         
         </div> 
      <div className="recipeD1-page"></div>
      </div> 
      
  );
}

const styles = ({
 
 card: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
 }
});



 function mapStateToProps(state) {
   console.log(state, "STATE ======>")
  return { 
    numb: state.numb1
   }
 
  };


export default connect(
mapStateToProps,
null,
)
(ScreenDay1);