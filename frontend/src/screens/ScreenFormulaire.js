import React, {useState, useEffect, } from 'react';
import ReactPlayer from 'react-player'
import '../App.css';
import { Card, Icon} from 'antd';
//import Nav from './component/Nav'
import {connect} from 'react-redux';
import Stripe from '../components/Stripe';
import Strip from './screenStripe';
import Translator from '../components/translator';
import { useTranslation } from 'react-i18next';

import {Link, Redirect} from 'react-router-dom'
import { Radio, Input, Space, Checkbox, Upload, message, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import{ init } from 'emailjs-com';
init(process.env.REACT_APP_USER_INIT);

const { Dragger } = Upload;
const { TextArea } = Input;



function ScreenFormulaire() {

 //FORMULAIRE
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [message0, setMessage0] = useState("");
  const [message1, setMessage1] = useState("");
  const [image, setImage] = useState([]);
 

   //RADIO
  const [firstRadio, setFirstRadio] = useState(0)
  const [secondRadio, setSecondRadio] = useState(0)
  const [thirdRadio, setThirdRadio] = useState(0)
  const [fourthRadio, setFourthRadio] = useState(0)

// TRADUCTION OF THE SELECTIONS 
var firstRad;
if(firstRadio == 1){
    firstRad = "Souvent"
} else if(firstRadio == 2){
    firstRad = "De temps en temps"
} else if(firstRadio == 3){
    firstRad = "Jamais"
} else if(firstRadio == 4){
    firstRad = "Je viens d'arrêter"
}
var secondRad = secondRadio === 1? "oui" : "non";
var thirdRad = thirdRadio === 1? "oui" : "non";
var fourthRad = fourthRadio === 1? "oui" : "non";


 //CHECKBOX
  const [checkbox, setCheckbox] = useState([])
 // console.log(checkbox, "check check")
  const [checkbox1, setCheckbox1] = useState([])
 // console.log(checkbox1, "check check???????")
  const [checkbox2, setCheckbox2] = useState([])
 // console.log(checkbox2, 'check 22222222')


 // STRIPE
 const [payed, setPayed] = useState(false)
 const [paymentMethod, setPaymentMethod] = useState(null);
console.log(payed, "c'est payé")

 //REDIRECTION
 const [redirection, setRedirection] = useState(false)

  //translator
  const { t } = useTranslation()

// ==========FORMULAIRE=>===========================================+>>>>>>>

const isEmail = () => {
    let mail = document.getElementById("error");
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(regex)){
       mail.style.display = 'none';
        return true;
    } else {
        mail.style.display = 'block';
        mail.style.animation = 'dongle 1s';
        setTimeout(() => {
            mail.style.animation = 'none';
        }, 1000);
        return false;
    }
};


// ====================>>>>>>>> AFFICHAGE ERRORR APRES VALIDATION <<<<<<<===========================================
const failMessage = (messageX) => {

    
    let formMess = document.querySelector('.form-message');

    formMess.innerHTML = messageX;
    formMess.style.opacity = '1';
    formMess.style.color = 'red';

    document.getElementById('email').classList.add('error')
    document.getElementById('age').classList.add('error')

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emails =  document.querySelector('.email');

    if (email.match(regex)){
        emails.style.color = '#36D82E';
     }else {
        emails.style.color = 'red';
    }

    let agex =  document.querySelector('.age');
    if(age.length < 1 ){
        agex.style.color = 'red'
    } else {
        agex.style.color = '#36D82E' 
    }

    let firstR = document.querySelector('.firstRadio');
    if(firstRadio == 0){
        firstR.style.color = 'red'
    } else {
        firstR.style.color = '#36D82E'
    }
    let secondR = document.querySelector('.secondRadio');
    if(secondRadio == 0){
        secondR.style.color = 'red'
    } else {
        secondR.style.color = '#36D82E'
    }
    let thirdR = document.querySelector('.thirdRadio');
    if(thirdRadio == 0){
        thirdR.style.color = 'red'
    } else {
        thirdR.style.color = '#36D82E'
    }
    let fourthR = document.querySelector('.fourthRadio');
    if(fourthRadio == 0){
        fourthR.style.color = 'red'
    }else {
        fourthR.style.color = '#36D82E'
    }

    let check2 = document.querySelector('.check2');
    if(checkbox2.length < 1){
        check2.style.color = 'red'
    } else {
        check2.style.color = '#36D82E'
    }

    let mess = document.querySelector('.mess');
    if(message0.length == ""){
        mess.style.color = 'red'
    } else {
        mess.style.color = '#36D82E'
    }

    let mess1 = document.querySelector('.mess1');
    if(message1.length == ""){
        mess1.style.color = 'red'
    } else {
        mess1.style.color = '#36D82E'
    }

    let pho = document.querySelector('.photos');
    if(image.length == 0){
      pho.style.color = 'red'
    } else {
      pho.style.color = '#36D82E'
    }

   /* let paid = document.querySelector('.payement')
    if(paymentMethod == null){
     paid.style.color = 'red'
    }*/

}

//==================================================================================================================
// ====================>>>>>>>> AFFICHAGE SUCCESS APRES VALIDATION <<<<<<<===========================================
const successMessage = () => {
    let formMess = document.querySelector('.form-message');

    formMess.innerHTML = 'Message envoyé ! Nous vous recontacterons dès que possible.';
    formMess.style.color = '#36D82E';
    formMess.style.opacity = '1';
    document.getElementById('email').classList.remove('error')
    document.getElementById('age').classList.remove('error')

    setTimeout(() => {
        formMess.style.opacity = '0';
    }, 5000);

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emails =  document.querySelector('.email');

    if (email.match(regex)){
        emails.style.color = '';
     }

    let agex =  document.querySelector('.age');
     agex.style.color = ''
    

    let firstR = document.querySelector('.firstRadio');
    if(firstRadio != 0){
        firstR.style.color = ''
    }
    let secondR = document.querySelector('.secondRadio');
    if(secondRadio != 0){
        secondR.style.color = ''
    }
    let thirdR = document.querySelector('.thirdRadio');
    if(thirdRadio != 0){
        thirdR.style.color = ''
    }
    let fourthR = document.querySelector('.fourthRadio');
    if(fourthRadio != 0){
        fourthR.style.color = ''
    }

    let check2 = document.querySelector('.check2');
        check2.style.color = ''

    let mess = document.querySelector('.mess');
        mess.style.color = ''
    

    let mess1 = document.querySelector('.mess1');
        mess1.style.color = ''

    let pho = document.querySelector('.photos');
      pho.style.color = ''

      let paid = document.querySelector('.payement')
      paid.style.color = ''


      setTimeout(redirect, 3000); 
  

}
//====================================================================
// ============>>>>>>> AFFICHAGE DIRECT <<<<<<<======================

let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emails =  document.querySelector('.email');
   if(emails ){
    if (email.match(regex)){
        emails.style.color = '#36D82E';
     }else {
        emails.style.color = '';
    }
}

let agex =  document.querySelector('.age');
if(agex){
  if(age.length > 1 ){
        agex.style.color = '#36D82E'
    } else {
      agex.style.color = ''
    }
}
    
    let firstR = document.querySelector('.firstRadio');
    if(firstR){
      if(firstRadio == 0){
        firstR.style.color = ''
    } else {
        firstR.style.color = '#36D82E'
    }
    }
    
    let secondR = document.querySelector('.secondRadio');
    if(secondR){
      if(secondRadio == 0){
        secondR.style.color = ''
    } else {
        secondR.style.color = '#36D82E'
    }
    }
    
    
    let thirdR = document.querySelector('.thirdRadio');
    if(thirdR){
      if(thirdRadio == 0){
        thirdR.style.color = ''
    } else {
        thirdR.style.color = '#36D82E'
    }
    }

     let fourthR = document.querySelector('.fourthRadio');
    if(fourthR){
     if(fourthRadio == 0){
        fourthR.style.color = ''
    }else {
        fourthR.style.color = '#36D82E'
    } 
    }
   
   
    let check2 = document.querySelector('.check2');
     if(check2){
      if(checkbox2.length < 1){
        check2.style.color = ''
    } else {
        check2.style.color = '#36D82E'
    } 
     }
    
    
    let mess = document.querySelector('.mess');
    if(mess){
     if(message0.length == ""){
        mess.style.color = ''
    } else {
        mess.style.color = '#36D82E'
    } 
    }

     let mess1 = document.querySelector('.mess1');
    if(mess1){
     if(message1.length == ""){
        mess1.style.color = ''
    } else {
        mess1.style.color = '#36D82E'
    } 
    }
   

    let pho = document.querySelector('.photos');
    if(pho){
      if(image.length == 0){
      pho.style.color = ''
    } else {
      pho.style.color = '#36D82E'
    }

    }
    
//=====================================================================================================
  

// ==>> POSITION IMAGES <<=====
var image1 = image[0];
var image2 = image[1];
var image3 = image[2];
var image4 = image[3];
var image5 = image[4];
// =============================


// ===============+>>>> FORMULAIRE REMPLIT PAR L'UTILISTATRICE ENVOYER À L'API <<<<<=============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if(isEmail() && age && firstRadio != 0 && secondRadio != 0 && thirdRadio != 0 && fourthRadio != 0 && checkbox2.length > 0 && message0 != "" && message1 != "" && image.length != 0 ){
    sendFeedback(process.env.REACT_APP_TEMPLATE_EMJS, {
      name,
      prenom,
      age,
      email,
      message0,
      message1,
      firstRad,
      secondRad,
      thirdRad,
      fourthRad,
      checkbox,
      checkbox1,
      checkbox2,
      image1,
      image2,
      image3,
      image4,
      image5,
    });
    } else {
        failMessage("Merci de remplir correctement les champs requis *");
    }
  };
// ============================================================================================

//===============>> REMISE DES COMPTEURS À 0 APRES VALIDATION <<<<=============================
  const sendFeedback = (templateId, variables) => {

    window.emailjs
      .send(process.env.REACT_APP_SERVICE_EMJS, templateId, variables)
      .then((res) => {
        console.log('success !');
        successMessage();
        setName("");
        setPrenom("");
        setAge("");
        setEmail("");
        setMessage0("");
        setMessage1("");
        setFirstRadio(0);
        setSecondRadio(0);
        setThirdRadio(0);
        setFourthRadio(0);
        setCheckbox([]);
        setCheckbox1([]);
        setCheckbox2([]);
        setImage([])
      })
      .catch(
        (err) => {
            failMessage("Une erreur s'est produite, veuillez réessayer.")
        }
         // document.querySelector('.form-message').innerHTML =
          //  "Une erreur s'est produite, veuillez r√©essayer."
          )
  };

  // ============================================================================================

  const redirect = () => {
    setRedirection(true);  
}


if(redirection){
    return <Redirect to='/screensuccess' /> 
}

// ==========RADIO=>===========================================+>>>>>>>



const onChange = e => {
    console.log('radio checked', e.target.value);
    
    setFirstRadio(e.target.value)
  };

  const onChange1 = e => {
    console.log('radio checked', e.target.value);
    
    setSecondRadio(e.target.value)
  };

  const onChange2 = e => {
    console.log('radio checked', e.target.value);
    
    setThirdRadio(e.target.value)
  };

  const onChange3 = e => {
    console.log('radio checked', e.target.value);
    
    setFourthRadio(e.target.value)
  };

   // ============================================================================================

//============CHECKBOX============================================+>>>




  function onChangeCheckbox(checkedValues) {
    console.log('checked = ', checkedValues);
    setCheckbox([...checkbox, checkedValues])
  }
  function onChangeCheckbox1(checkedValues) {
    console.log('checked = ', checkedValues);
    setCheckbox1([...checkbox1, checkedValues])
  }
  function onChangeCheckbox2(checkedValues) {
    console.log('checked = ', checkedValues);
    setCheckbox2([...checkbox2, checkedValues])
  }
  
  
  
  const plainOptions = ['Cuir chevelu sec', 'Racines grasses', 'Pertes de cheveux', 'Pas assez de volume', 'Trop de volume', 'Démangeaisons', 'Péllicules', 'Psoriasis'];
  const options = [
    { label: t('First_checkbox_value_one_sf'), value: 'Cuir chevelu sec' },
    { label: t('First_checkbox_value_two_sf'), value: 'Racines grasses' },
  ];

  const options1 = [
    { label: t('First_checkbox_value_three_sf'), value: 'Pertes de cheveux' },
    { label: t('First_checkbox_value_four_sf'), value: 'Pas assez de volume' },
  ];

  const options2 = [
    { label: t('First_checkbox_value_five_sf'), value: 'Trop de volume' },
    { label: t('First_checkbox_value_six_sf'), value: 'Démangeaisons' },
    { label: t('First_checkbox_value_seven_sf'), value: 'Péllicules' },
  ];
 
  const options3 = [
    { label: t('First_checkbox_value_eigth_sf'), value: 'Psoriasis' },
   
  ];

//SECOND CHECKBOX LONGUEURS


  const options4 = [
    { label: t('Second_checkbox_value_one_sf'), value: 'Cheveux secs' },
    { label: t('Second_checkbox_value_two_sf'), value: 'Cheveux poisseux' },
  ];

  const options5 = [
    { label: t('Second_checkbox_value_three_sf'), value: 'Cheveux abimés ou cassants' },
  ];

  const options6 = [
    { label: t('Second_checkbox_value_four_sf'), value: 'Boucles mal formées' },
    { label: t('Second_checkbox_value_five_sf'), value: 'Frisottis' },
  ];
 
  const options7 = [
    { label: t('Second_checkbox_value_six_sf'), value: 'Cheveux ternes' },
    { label: t('Second_checkbox_value_seven_sf'), value: 'Fourches aux pointes' },
  ];

  //THIRD CHECKBOX LONGUEURS


  const options8 = [
    { label: t('Third_checkbox_value_one_sf'), value: 'Avoir des boucles bien formées' },
  ];

  const options9 = [
    { label: t('Third_checkbox_value_two_sf'), value: 'Arrêter les lissages' },
  ];

  const options10 = [
    { label: t('Third_checkbox_value_three_sf'), value: 'Arrêter les dé/colorations' },
  ];
 
  const options11 = [
    { label: t('Third_checkbox_value_four_sf'), value: 'Retrouver des cheveux doux' },
  ];

  const options12 = [
    { label: t('Third_checkbox_value_five_sf'), value: 'Entretenir la couleur naturelle' },
  ];

  const options13 = [
    { label: t('Third_checkbox_value_six_sf'), value: 'Accélérer la pousse des cheveux' },
  ];

  const options14 = [
    { label: t('Third_checkbox_value_seven_sf'), value: 'Espacer les lavages' },
  ];
 
  const options15 = [
    { label: t('Third_checkbox_value_eigth_sf'), value: 'Apaiser le cuir chevelu' },
  ];

  const options16 = [
    { label: t('Third_checkbox_value_nine_sf'), value: 'Lutter contre les frisottis' },
  ];
 
  const options17 = [
    { label: t('Third_checkbox_value_ten_sf'), value: 'garder les boucles bien formées pendant plusieurs jours' },
  ];


   // ============================================================================================
  // =========================================PHOTO ================================++>>>>>>>>


  const proops = {
    
    name: 'file',
    multiple: true,
    /*action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',*/
   /* onClick(){
     handleClick()
    },*/

    beforeUpload: file => {
      console.log('DEBUG file.type', file.type);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList, 'INFO FILE');
        console.log(info, 'iNFO FILE 1')
       uploadImage(info)
      }
      if (info) {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
     
  };


  const uploadImage = async (files) => {
    console.log(files.file, "TR>Y")
    var formData = new FormData();
        formData.append('file', files.file );
      
        
       const database = await fetch('/formulaire-pics', {
          method: 'POST',
          body: formData
        
          })
          
          const body = await database.json()
          console.log(body, "body ====>")
          setImage([...image, body.image])
  }



 /*var succ; 
 var img;
 if(image != ""){
   succ = "Téléchargement de l'image réussit"
   img = <img style={{width: 200, height: 'auto', borderRadius: 3}} src={image}></img>
 }*/


// { /* <div className="routine-page" style={{}}>*/}  {firstRadio === 5 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
//  </Radio>*/} 

  return (
     

    
       <div className="formulaire-page">
     
     <Translator/>
         
           <br/> <br/> <br/>  
            <div style={center}>
                <h1 style={titre}> {t('Title_sf')}</h1>
            </div>
         <br/>
        
        
      
       
          
     <div className="contact-form">
   
         <br/>
      <h1>{t('ID_sf')}</h1>
      <div >
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginRight: '2%', width: '40%' }}>
        <input
            style={input}
            type="text"
            id="prénom"
            name="prénom"
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Carmen"
            value={prenom}
            />
         
       <p>{t('Prénom_sf')}</p>
       </div>

       <div style={{display: 'flex', flexDirection: 'column', marginLeft: '2%', width: '40%' }}>
        <input style={input}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Dupont"
          value={name}
          autoComplete="off"
        />
        
        <p>{t('Nom_sf')}</p>
     </div>

        </div>
        <br/>

        <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
            <h2 className="email">{t('Email_sf')} <font color='red'>*</font></h2>
            <label id="error" style={{display: 'none',color: '#ff4d4d', transformOrigin: '50% 50%'}} >Email non valide</label>
          <input style={input}
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="carmen.dupont@gmail.com *"
            value={email}
            autoComplete="off"
          />
          
          <p>{t('Desc_email_sf')}</p>
        </div>

        <br/>

        <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
        <h2 className="age">{t('Age_sf')} <font color='red'>*</font></h2>
        <input style={input}
          type="text"
          id="age"
          name="age"
          onChange={(e) => setAge(e.target.value)}
          placeholder="25 *"
          value={age}
        />
        </div>

        <br/><br/>

        <h1>{t('Diag_sf')}</h1>

       <h2 className="firstRadio">{t('First_radio_sf')} <font color='red'>*</font></h2>
 
        <Radio.Group onChange={onChange} value={firstRadio}>
          <Space direction="vertical">
            <Radio value={1}>{t('First_radio_value_one_sf')}</Radio>
            <Radio value={2}>{t('First_radio_value_two_sf')}</Radio>
            <Radio value={3}>{t('First_radio_value_three_sf')}</Radio>
            <Radio value={4}>{t('First_radio_value_four_sf')}</Radio>
            
               
           
          </Space>
        </Radio.Group>
        <br/><br/>

        <h2 className="secondRadio">{t('Second_radio_sf')} <font color='red'>*</font></h2>
            
            <Radio.Group onChange={onChange1} value={secondRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Seconde_radio_value_one_sf')}</Radio>
                <Radio value={2}>{t('Seconde_radio_value_two_sf')}</Radio>
            </Space>
            </Radio.Group>

            <br/><br/>

            <h2 className="thirdRadio">{t('Third_radio_sf')} <font color='red'>*</font></h2>
            
            <Radio.Group onChange={onChange2} value={thirdRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Third_radio_value_one_sf')}</Radio>
                <Radio value={2}>{t('Third_radio_value_two_sf')}</Radio>
            </Space>
            </Radio.Group>

            <br/><br/>

            

            <h2>{t('First_checkbox_sf')}</h2>
            <Checkbox.Group options={options} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options1} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options2} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options3} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <p>{t('Desc_first_checkbox_sf')}</p>
            <br />
            <br />

            <h2>{t('Second_checkbox_sf')}</h2>
            <Checkbox.Group options={options4} defaultValue={['']} onChange={onChangeCheckbox1} />
            <br />
            <br />
            <Checkbox.Group options={options5} defaultValue={['']} onChange={onChangeCheckbox1} />
            <br />
            <br />
            <Checkbox.Group options={options6} defaultValue={['']} onChange={onChangeCheckbox1} />
            <br />
            <br />
            <Checkbox.Group options={options7} defaultValue={['']} onChange={onChangeCheckbox1} />
            <br />
            <br />
            <p>{t('Desc_second_checkbox_sf')}</p>
            <br />
            <br />


            <h2 className="check2">{t('Third_checkbox_sf')}<font color='red'>*</font></h2>
            <Checkbox.Group options={options8} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options9} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options10} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options11} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options12} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options13} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options14} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options15} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options16} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <Checkbox.Group options={options17} defaultValue={['']} onChange={onChangeCheckbox2} />
            <br />
            <br />
            <p>{t('Desc_third_checkbox_sf')}</p>

            <br />
            <br />


            <h2 className="fourthRadio">{t('Fourth_radio_sf')} <font color='red'>*</font></h2>
            
            <Radio.Group onChange={onChange3} value={fourthRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Fourth_radio_value_one_sf')}</Radio>
                <Radio value={2}>{t('Fourth_radio_value_two_sf')}</Radio>
            </Space>
            </Radio.Group>
            <p>{t('Desc_foruth_radio_sf')}</p>
        
            <br />
            <br />
        
            <h2 className="mess">{t('First_message_sf')}<font color='red'>*</font></h2>
            <textarea style={textearea}
                    id="message0"
                    name="message0"
                    onChange={(e) => setMessage0(e.target.value)}
                    placeholder="message *"
                    value={message0}
                    />

            <br />
            <br />
        
            <h2 className="mess1">{t('Second_message_sf')} <font color='red'>*</font></h2>
            <textarea style={textearea}
                      
                    id="message1"
                    name="message1"
                    onChange={(e) => setMessage1(e.target.value)}
                    placeholder="message *"
                    value={message1}
                    />

             <p>{t('Desc_second_message_sf')}</p>       

             <br />
             <br />

             <h2 className="photos">{t('Photo_sf')} <font color='red'>*</font></h2>

             <Dragger {...proops} >
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </Dragger>

        
            
            <p >{t('Desc_photo_one_sf')}<br/> {t('Desc_photo_two_sf')}</p>
            
            <br/>
            <br/>

            <h2 className="payement">{t('Payment_sf')} <font color='red'>*</font></h2>
        <br/>
        
        


     <Stripe/>



                 
      </div>
       <div style={{marginTop: '-5%', }}>
      <div className="form-message"></div>
      <input style={button} 
        className="button"
        type="button"
        value={t('Btn_sf')}
        onClick={handleSubmit}
      />
      </div> 
    
  <br/> <br/> <br/>

        
      
      
    </div>
       
        
          <br/>  
          <br/>  
          <br/>  
          <br/> 
          <br/>  
          <br/>  
          <br/>  
          <br/>  


            
    
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
  //color: 'grey',
  fontSize: '12px',
  //fontFamily: "Roboto",
  //textShadow: '1px 1px 2px black',

  //width: '40%',
  //height: '80%'
}

const textearea = {
  background: 'none',
    fontFamily: "Verdana", 
   // "Geneva", "Tahoma" "sans-serif",
    fontSize: '1.1rem',
    border: '1px solid #C9CACB',
    padding: '12px',
    borderRadius: 3,
    color: 'black',
    width: '80%',
  
}




const button = {
    backgroundColor: 'white',
    fontSize: '25px', 
    fontWeight: 'bold',
    padding: '10px',
    border: '3px solid #222222',
    cursor: 'pointer',
    transition: '.2s',
    borderRadius: 3,
    width: '100%',
  
  
}

const input = {
    background: 'none',
    fontFamily: "Verdana", 
   // "Geneva", "Tahoma" "sans-serif",
    fontSize: '1.1rem',
    border: '1px solid #C9CACB',
    padding: '12px',
    borderRadius: 3,
    color: 'black',
  
}


export default ScreenFormulaire;