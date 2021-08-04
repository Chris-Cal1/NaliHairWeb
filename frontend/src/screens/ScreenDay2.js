import React, {useState, useEffect} from 'react';
import '../App.css';
import { Card, Icon, Button} from 'antd';
import Nav from '../components/nav'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


function ScreenDay2(props) {


  const [day, setDay] = useState(2)
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
         style={{ width: 550,  borderRadius: 10, marginLeft: '2%', marginRight: '2%', }}
         >
           
           <p style={{fontWeight: 'bold', fontSize: '20px'}}>{recette.number} -{recette.name}</p>
           <img style={{width: '60%', height: 100}} alt="example" src={recette.url}  />
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
     <div>
      <h1 style={{ marginLeft: '2%', fontSize: '40px'}}>Jour {recette.number}</h1>
      <p style={{marginLeft: '2%', fontSize: '25px', marginBottom: '3%'}}>{recette.title} </p>
      </div>

)
})

  return (
    <div className="recipeD1-page">
         
         
     <Nav/>

           
         {titreDuJour}   

          <div style={styles.card}>

            {recetteDuJour}  
          
          </div> 

         
      
      </div>
  );
}

const styles = ({
 
  card: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'start',
  }
 });

 function mapStateToProps(state) {
  return { 
    numb: state.numb1
   }
 
  };


export default connect(
mapStateToProps,
null,
)
(ScreenDay2);