import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import '../App.css';
import { Card, Icon} from 'antd';
import Translator from '../components/translator';
import { useTranslation } from 'react-i18next';
//import Nav from './component/Nav'
import {Link} from 'react-router-dom'
import { Input } from 'antd';

const { TextArea } = Input;

function ScreenDiagnostic() {
//translator
const { t } = useTranslation()

  return (

     <div>
         
 <div style={paragraphe}>
            </div> 
            <div style={center}>
                <h1 style={titre}> {t('Title_sd')}</h1>
            </div>
         <br/>
         
         <div style={center}>
            <div className="site-page-header-diagnostic"></div> 
          {/* <img style={{ width: '80%', height: 400 }} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951252/ernan-solozabal-kfQWyxttMeQ-unsplash_lcbsn1.jpg"/>*/}
  </div>
         <br/><br/>
         
         <div style={center}>
               <div className="line"></div>
               </div>
            <br/><br/><br/>
           <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', marginBottom: '3%'}}>
            
            <h1 style={{ fontSize: '27px', width: '40%', marginRight: '2%' }}> {t('Desc_sd')} </h1>
            <ReactPlayer style={{ marginTop: '1%', width: '50%', height: '800px', marginLeft: '2%'}} width='480px' height='240px' controls url='https://www.youtube.com/watch?v=LrnfMZvbA3w' />
            </div>

            <div className="routine-page"> 
            <br/> <br/>
            <div style={center}>
              <Link to="screenformulaire">
            <button style={button} >{t('Second_btn_sd')} <br/>{t('Second_btn_suite_sd')}</button>
            </Link>
            </div>
            <br/> <br/> <br/><br/>

            <div style={center}>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold'}}>{t('Second_title_sd')}</h1>
            </div>
            <br/>
            <div style={{ display: 'flex',justifyContent: 'center', flexDirection: 'row' }}>
           <img style={{ width: '30%', height: 'auto' }} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1619737862/office-620822_1920_tfqibx.jpg"/>
           <img style={{ width: '30%', height: 'auto', marginRight: '3%', marginLeft: '3%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1619737885/dan-dimmock-3mt71MKGjQ0-unsplash_m4uskm.jpg"/>
           <img style={{ width: '30%', height: 'auto' }} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951277/moa-kiraly-CmyOPYfOrhc-unsplash_w2dg3h.jpg"/>
         </div>
       <br/>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                    <p style={{ width: '30%', fontSize: '25px', marginLeft: '2%' }}>{t('Desc_one_sd')} <br/>{t('Desc_one_suite_sd')} </p>
                    <p style={{ width: '30%', fontSize: '25px', marginRight: '3%', marginLeft: '3%'}}>{t('Desc_two_sd')}</p>
                    <p style={{ width: '30%', fontSize: '25px', }}>{t('Desc_three_sd')}</p>
            </div>
            <br/><br/>
           
            <div style={center}>
            <Link to="screenformulaire">
            <button style={button} >{t('Second_btn_sd')} <br/>{t('Second_btn_suite_sd')}</button>
            </Link>
            </div>

            <br/><br/><br/><br/><br/><br/>


         </div>    
    </div>
  );
}

const center = {

   display: 'flex',
   justifyContent: 'center'
    
  }

const titre = {
  fontSize: '50px',
  fontFamily: "Roboto",
  
}

const texte = {
  color: 'white',
  fontSize: '20px',
  fontFamily: "Roboto",
  textShadow: '1px 1px 2px black',
  //width: '40%',
  //height: '80%'

  
}

const paragraphe = {
  marginTop: '5%',
 // marginLeft: '3%',
}

const button = {
    backgroundColor: 'white',
    fontSize: '25px', 
    fontWeight: 'bold',
    padding: '10px',
    border: '3px solid #222222',
    cursor: 'pointer',
    color: 'black'
  
}

export default ScreenDiagnostic;