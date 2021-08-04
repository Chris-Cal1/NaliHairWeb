import React, {useState, useEffect} from 'react';
import '../App.css';
import { Card, Icon, Button} from 'antd';
import Nav from '../components/nav'
import {Link} from 'react-router-dom'
import { RightOutlined  } from '@ant-design/icons';
import {connect} from 'react-redux'
import numb from '../reducers/numb';


function ScreenProgram(props) {

  const [program, setProgram] = useState(1)
  const [programs, setPrograms] = useState([])

// recherche de programmes
useEffect(() => {
  var handleSearchRecipes = async () => {
    
    const data = await fetch('/searchProgram', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `number=${props.numb}`
    })


    const body = await data.json()

    console.log(body.program, "BODY =======>>")
    setPrograms(body.program)
   
}; 

handleSearchRecipes()
},[]) 

var recipe1;
var recipe2;
var recipe3;
var recipe4;
var recipe5;
var recipe6;
var recipe7;
if(props.numb == 1){
   recipe1 = 1;
   recipe2 = 2;
   recipe3 = 3;
   recipe4 = 4;
   recipe5 = 5;
   recipe6 = 6;
   recipe7 = 7;
} else if(props.numb == 2){
  recipe1 = 11;
  recipe2 = 22;
  recipe3 = 33;
  recipe4 = 44;
  recipe5 = 55;
  recipe6 = 66;
  recipe7 = 77;
}else{
  
}


  return (
    <div >
         
         
         <Nav/>
         <br/>
           
           <h1 style={{marginLeft: '2%', fontSize: '25px',  marginBottom: '2%', fontWeight: 'bold'}}>{programs.name} </h1>
           <p style={{marginLeft: '2%', fontSize: '20px', marginBottom: '-1%'}}>{programs.desc} </p>   
             <br/><br/>
                 <div style={styles.card} className="program-page" >
                <Link to="/screenday1" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe1)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '2%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}} src={programs.urld1}  />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 1</p>
                  <p>{programs.ingredientjour1}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe2)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '2%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}}  src={programs.urld2} />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 2</p>
                  <p>{programs.ingredientjour2}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe3)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}} src={programs.urld3}  />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 3</p>
                  <p>{programs.ingredientjour3}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe4)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}}  src={programs.urld4}  />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 4</p>
                  <p>{programs.ingredientjour4}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe5)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}}  src={programs.urld5} />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 5</p>
                  <p>{programs.ingredientjour5}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe6)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}} src={programs.urld6}  />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 6</p>
                  <p>{programs.ingredientjour6}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                <Link to="/screenday2" style={{  marginRight: '3%'}}>
                <Card
                onClick={() => props.addNumbRecipe(recipe7)}
                hoverable
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-25px'}}  src={programs.urld7} />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold',  marginTop: '-2%'}}>Jour 7</p>
                  <p>{programs.ingredientjour7}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', marginTop: '-17px'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>

                <Link  style={{  marginRight: '3%'}}>
                <Card
                
                
                style={{ width: 500, borderRadius: 10, marginLeft: '5%', marginRight: '2%', marginTop: '1%', visibility: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: 160, height: 160, color: 'red', marginRight: '7%'}}  src={programs.urld7} />
                  <div style={{ flexDirection: 'col' }}>
                  <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '-2%'}}>Jour 7</p>
                  <p>{programs.ingredientjour7}</p>
                  <RightOutlined style={{display: 'flex', justifyContent: 'flex-end'}}/>
                  </div>
                  </div>
                  
                </Card>
                </Link>
                
   
                   </div> 
   

     

         
      
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


 function mapDispatchToProps(dispatch) {

  return {
    addNumbRecipe: function(numbX) {
      console.log("NUMBX", numbX)
        dispatch( {type: 'addNumbRecipe',
                  numbX: numbX
                })
    }
  }
 }

 

 function mapStateToProps(state) {
   console.log(state, 'STATE prog')
  return { 
    numb: state.numb, token: state.token
   }
 
  };


export default connect(
mapStateToProps,
mapDispatchToProps,
)
(ScreenProgram);

