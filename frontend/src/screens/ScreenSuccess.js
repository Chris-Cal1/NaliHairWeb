import React from 'react';
import Nav from '../components/nav';


const ScreenSuccess = () => {
  return (
    <div className="body-ss">
     <div className="bloc111"> 
      <Nav/>
      </div>  
      <div className="bloc222" >
          <br/> 
          <div style={center}>Merci !</div>
          <br/> 
          <div style={center}>Vos réponses ont bien été envoyées.</div> 
          <br/> 
          <div style={center}>Nous vous recontacterons sous 24h à 48h.</div> 
     </div>
    </div>
  );
}

const center = {
     display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
}
const titre = {
   
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '45px',
    fontFamily: "Roboto",
    
  }


export default ScreenSuccess;