import React, {useState, useEffect} from 'react';
import '../App.css';
import { Card, Icon, Button, Popover} from 'antd';
import Translator from '../components/translator';
import { useTranslation } from 'react-i18next';

import Nav from '../components/nav'
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';

import {Input} from 'reactstrap';
import {  SearchOutlined,  } from '@ant-design/icons';
import { Image } from 'antd';



const { Meta } = Card;


function ScreenHairDresser() {

  const [ville, setVille] = useState('')
  console.log(ville)
  const [coiffeuses, setCoiffeuses] = useState([])
  console.log(coiffeuses, "COIFFEUSES t")
  const [desc, setDesc] = useState('')
  //translator
  const { t } = useTranslation()

  const text = <span>Title</span>;
  const content = (
  <div>
    
    <p>Mon numero: 06 23 25 28 39</p>
    <p>Adresse : 20 rue du soleil-couchant</p>
    <p>{desc}</p>
    
  </div>
);
  

useEffect(() => {
  var handleSearchRecipes = async () => {
    
    const data = await fetch('/search-haidress', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `ville=${ville}`
    })


    const body = await data.json()

    console.log(body.hairdressers, "BODY =======>>")
    setCoiffeuses(body.hairdressers)
   
}; 

handleSearchRecipes()
},[]) 


  var handleSearch = async () => {
    
    const data = await fetch('/search-haidress', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `ville=${ville}`
    })

    const body = await data.json()

   // console.log(body.hairdresser, "BODY =======>>")
    setCoiffeuses(body.hairdresser)
}; 


let coiffeusesDuCoin = coiffeuses.map((coiffeuse,i) => {
  
    
  return (
  
  <div key={i} 
    style={{display:'flex',
    justifyContent:'center',
    marginTop: '6%',
    marginRight: '2%',
    marginLeft: '2%',
    
      }}>
 <Popover  placement="top" overlayStyle={{width: 250}}  title={coiffeuse.name} content={content} trigger="click">
  
    <Card
    onClick={ () => setDesc(coiffeuse.description)}
    hoverable
    style={{ width: 260,
         borderRadius: 20,
         size: 'small',
       }}
    cover={<img alt="example" src={coiffeuse.url}  />}
  >
    
    <Meta title={coiffeuse.name} />
    <p style={{marginTop: '5px'}}>{coiffeuse.coiffures}</p>
    <p style={{marginTop: '-18px'}}>{coiffeuse.niveauprix}</p>
    <p style={{marginTop: '-18px'}}>{coiffeuse.ville}</p> 
    <p style={{marginTop: '-18px'}}>{coiffeuse.description}</p>
    <Link to="/screendetailhairdresser">
    <p style={{marginTop: '-15px'}}>{t('Link_sh')}</p>
    </Link>
  </Card>
  
  </Popover>
  </div>

)})

//
  return (
    <div>
          <Nav/>
          <Translator/>
             
            
            <div className="body-sh">
              <div className="bloc1111" >
              
              </div>
              <div className="bloc2222" style={{ border: '4px solid black', marginLeft: '1%', paddingRight: '5%'}}>
              <h1 style={{ marginLeft: '2%',  marginTop: '1%'}}>{t('Title_sh')}</h1>
              <p style={{marginLeft: '2%',  marginBottom: '-0%', }}> {t('Desc_sh')} </p>
            </div>
            </div>
            <br/><br/>

            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <h1 style={{ fontSize: '30px', marginTop: '1%', marginLeft: '-2%'}}>{t('second_title_sh')}</h1>
            </div>
              <div style={styles.box} >
                
              <Input onChange={(e) => setVille(e.target.value)} type="ville" name="ville" id="ville" placeholder={t('placeholder_sh')} bsSize="sm" style={styles.searchbar}/>
             
                <Button style={styles.button} 
                onClick={() => handleSearch()}>
                  <SearchOutlined style={{color: 'white', fontSize: '25px'}}/>
                  </Button>
                 </div>
                 
                <div style={styles.card}  className="routine-page">
                
                {coiffeusesDuCoin}
             
                 </div>  
      
      </div>
  );
}

const styles = ({
  
  searchbar: {
   backgroundColor: '#ECF0F1',
   borderRadius: 10,
   border: 0, 
   width: 220,
   height: 50,
   justifyContent: 'center',
   alignContent: 'center',
   padding: 10,
   
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    alignContent: 'center', 
    fontWeight: 'bold',
  },
  button: {
   backgroundColor: "#222222", 
   borderRadius: 10, 
   width: 80, 
   height: 50,
   fontFamily: '',
   marginLeft: '1%'
 },
 card: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
 }, btn: {
  borderColor: "black",
  borderWidth: 1
 }
});

export default ScreenHairDresser;