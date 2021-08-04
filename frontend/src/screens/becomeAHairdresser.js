import React, {useState, useEffect, } from 'react';
import '../App.css';
import Translator from '../components/translator';
import { useTranslation } from 'react-i18next';
import Nav from '../components/nav';
import { Redirect} from 'react-router-dom'
import { Radio, Input, Space, Checkbox, Upload, message, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import{ init } from 'emailjs-com';
init(process.env.REACT_APP_USER_INIT);

const { Dragger } = Upload;
const { TextArea } = Input;



function ScreenBecomeAHairdress() {

 //FORMULAIRE
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message0, setMessage0] = useState("");
  const [image, setImage] = useState([]);
 

   //RADIO
  const [firstRadio, setFirstRadio] = useState(0)
  const [secondRadio, setSecondRadio] = useState(0)
  const [thirdRadio, setThirdRadio] = useState(0)
  const [thirdRadioVal, setThirdRadioVal] = useState("");
 // console.log(thirdRadioVal.length, 'VALEUR DE L INPUT DE LA 3EME RADIO')
  const [fourthRadio, setFourthRadio] = useState(0);
  const [fifthRadio, setFifthRadio] = useState(0);
  const [fifthRadioVal, setFifthRadioVal] = useState("");
 // console.log(fifthRadioVal, 'VALEUR DE L INPUT DE LA 5EME RADIO')

// TRADUCTION OF THE SELECTIONS 
var firstRad;
if(firstRadio == 1){
    firstRad = "Moins de 2 ans"
} else if(firstRadio == 2){
    firstRad = "Entre 2 ans et 5 ans "
} else if(firstRadio == 3){
    firstRad = "Entre 6 ans et 10 ans"
} else if(firstRadio == 4){
    firstRad = "Plus de 10 ans"
}
//console.log(firstRad, "première radio")
var secondRad = secondRadio === 1? "oui" : "non";


var thirdRad;
if(thirdRadio == 1){
    thirdRad = "CAP coiffure"
} else if(thirdRadio == 2){
    thirdRad = "BTS Coiffure "
} else if(thirdRadio == 3){
    thirdRad = thirdRadioVal
}

var fourthRad = fourthRadio === 1? "oui" : "non";

var fifthRad;
if(fifthRadio == 1){
    fifthRad = "CAP coiffure"
} else if(fifthRadio == 2){
    fifthRad = "BTS Coiffure "
} else if(fifthRadio == 3){
    fifthRad = fifthRadioVal
}

//REDIRECTION
 const [redirection, setRedirection] = useState(false)
//TRANSLATOR
 const { t } = useTranslation()

 //CHECKBOX
  const [checkbox, setCheckbox] = useState([])
  console.log(checkbox, 'check 22222222')
  const [checkboxInput, setCheckboxInput] = useState("")
  console.log(checkboxInput, 'check 33333')
  var posInput;
  for(var i =0; i< checkbox.length; i++){
    if(checkbox[i] == 'Autre, veuillez préciser'){
      posInput = 1; 
    }
  }
  //console.log(posInput, "pos")
  


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

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emails =  document.querySelector('.email');

    if (email.match(regex)){
        emails.style.color = '#36D82E';
     }else {
        emails.style.color = 'red';
    }

    let id = document.querySelector('.identité');
     if(name.length == 0 || prenom.length == 0){
        id.style.color = 'red' 
     } else {
        id.style.color = '#36D82E'  
     }

     let nom = document.querySelector('.nom');
     if(name.length == 0){
         nom.style.color = 'red'
     } else {
        nom.style.color = '#36D82E' 
     }

     let prénom = document.querySelector('.prenom');
     if(prenom.length == 0){
       prénom.style.color = 'red'
    } else {
       prénom.style.color = '#36D82E' 
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
    let fourthR = document.querySelector('.fourthRadio');
    if(fourthRadio == 0){
        fourthR.style.color = 'red'
    }else {
        fourthR.style.color = '#36D82E'
    }

    let check = document.querySelector('.check');
    if(checkbox.length < 1){
        check.style.color = 'red'
    } else {
        check.style.color = '#36D82E'
    }   

}

//==================================================================================================================
// ====================>>>>>>>> AFFICHAGE SUCCESS APRES VALIDATION <<<<<<<===========================================
const successMessage = () => {
    let formMess = document.querySelector('.form-message');

    formMess.innerHTML = 'Message envoyé ! Nous vous recontacterons dès que possible. vous allez être redirigé dans quelques secondes';
    formMess.style.color = '#36D82E';
    formMess.style.opacity = '1';
    document.getElementById('email').classList.remove('error')
    
    setTimeout(() => {
        formMess.style.opacity = '0';
    }, 5000);


    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emails =  document.querySelector('.email');

    if (email.match(regex)){
        emails.style.color = '';
     }

     let id = document.querySelector('.identité');
     if(name.length != 0 || prenom.length != 0){
        id.style.color = '' 
     } 

     let nom = document.querySelector('.nom');
     if(name.length != 0){
         nom.style.color = ''
     } 

     let prénom = document.querySelector('.prenom');
     if(prenom.length != 0){
       prénom.style.color = ''
    } 

    let firstR = document.querySelector('.firstRadio');
    if(firstRadio != 0){
        firstR.style.color = ''
    }
    let secondR = document.querySelector('.secondRadio');
    if(secondRadio != 0){
        secondR.style.color = ''
    }
    
    let fourthR = document.querySelector('.fourthRadio');
    if(fourthRadio != 0){
        fourthR.style.color = ''
    }

    let check = document.querySelector('.check');
        check.style.color = ''


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

    let id = document.querySelector('.identité');
    if(id){
        if(name.length == 0 || prenom.length == 0){
            id.style.color = '' 
            } else {
            id.style.color = '#36D82E'  
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
    

     let fourthR = document.querySelector('.fourthRadio');
    if(fourthR){
     if(fourthRadio == 0){
        fourthR.style.color = ''
    }else {
        fourthR.style.color = '#36D82E'
    } 
    }
   
   
    let check = document.querySelector('.check');
     if(check){
      if(checkbox.length < 1){
        check.style.color = ''
    } else {
        check.style.color = '#36D82E'
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

    if(isEmail() && firstRadio != 0 && secondRadio != 0  && fourthRadio != 0 && checkbox.length > 0 && name.length != 0 && prenom.length != 0 ){
    sendFeedback(process.env.REACT_APP_TEMPLATE_EMJS2, {
      name,
      prenom,
      email,
      phone,
      message0,
      firstRad,
      secondRad,
      thirdRad,
      fourthRad,
      fifthRad,
      checkbox,
      checkboxInput,
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
        setEmail("");
        setMessage0("");
        setFirstRadio(0);
        setSecondRadio(0);
        setThirdRadio(0);
        setFourthRadio(0);
        setCheckbox([]);
        setCheckboxInput("");
        setImage([]);
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


  const onChange4 = e => {
    console.log('radio checked', e.target.value);
    
    setFifthRadio(e.target.value)
  };

   // ============================================================================================

//============CHECKBOX============================================+>>>




  function onChangeCheckbox(checkedValues) {
    console.log('checked = ', checkedValues);
    setCheckbox([...checkbox, checkedValues])
  }
  


  //THIRD CHECKBOX LONGUEURS


  const options = [
    { label: t('Checkbox_one_sbh'), value: 'tresses, vanilles, braids et/ou locks' },
  ];

  const options1 = [
    { label: t('Checkbox_two_sbh'), value: 'Tissages' },
  ];

  const options2 = [
    { label: t('Checkbox_three_sbh'), value: 'lissages' },
  ];
 
  const options3 = [
    { label: t('Checkbox_fourth_sbh'), value: 'Défrisage' },
  ];

  const options4 = [
    { label: t('Checkbox_five_sbh'), value: 'Brushing' },
  ];

  const options5 = [
    { label: t('Checkbox_six_sbh'), value: 'Coloration' },
  ];

  const options6 = [
    { label: t('Checkbox_seven_sbh'), value: 'Pose lace' },
  ];
 
  const options7 = [
    { label: t('Checkbox_eigth_sbh'), value: 'Piqué laché' },
  ];

  const options8 = [
    { label: t('Checkbox_nine_sbh'), value: 'Soins naturels' },
  ];
 
  const options9 = [
    { label: t('Checkbox_ten_sbh'), value: 'Autre, veuillez préciser' },
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

 

  return (
        
   <div className="body-bah">
       <div className="bloc55">
       <Nav/>
       <Translator/>
       </div>
        <br/> 
    <div className="bloc11">
        <h1 style={titre}> {t('Title_sbh')}</h1>
    </div>
   
    <div className="bloc33">
    <br/>
      <h1 className="identité">{t('ID_sbh')}</h1>
      <div >
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginRight: '2%', width: '40%' }}>
        <input
            style={input}
            type="text"
            id="prénom"
            name="prénom"
            onChange={(e) => setPrenom(e.target.value)}
            placeholder={t('Placeholder_sbh_i')}
            value={prenom}
            />
         
       <p className="prenom">{t('Prénom_sbh')} <font color='red'>*</font></p>
       </div>

       <div style={{display: 'flex', flexDirection: 'column', marginLeft: '2%', width: '40%' }}>
        <input style={input}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder={t('Placeholder_sbh_i')}
          value={name}
          autoComplete="off"
        />
        
        <p className="nom">{t('Nom_sbh')} <font color='red'>*</font></p>
     </div>

        </div>
        <br/>

        <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
            <h2 className="email">{t('Email_sbh')} : <font color='red'>*</font></h2>
            <label id="error" style={{display: 'none',color: '#ff4d4d', transformOrigin: '50% 50%'}} >Email non valide</label>
          <input style={input}
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Placeholder_sbh_i')}
            value={email}
            autoComplete="off"
          />
          
          <p>{t('Desc_email_sbh')}</p>
        </div>

        <br/>

        <div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
        <h2 className="age">{t('Phone_sbh')} </h2>
        <input style={input}
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t('Placeholder_sbh')}
          value={phone}
        />
        </div>

        <br/><br/>

       <h2 className="firstRadio">{t('First_question_sbh')} <font color='red'>*</font></h2>
 
        <Radio.Group onChange={onChange} value={firstRadio}>
          <Space direction="vertical">
            <Radio value={1}>{t('First_radio_value_one_sbh')}</Radio>
            <Radio value={2}>{t('First_radio_value_two_sbh')}</Radio>
            <Radio value={3}>{t('First_radio_value_three_sbh')}</Radio>
            <Radio value={4}>{t('First_radio_value_fourth_sbh')}</Radio>
          
          </Space>
        </Radio.Group>
        <br/><br/><br/>

        <h2 className="check">{t('Second_question_sbh')} <font color='red'>*</font></h2>
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
            <Checkbox.Group options={options4} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options5} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options6} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options7} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options8} defaultValue={['']} onChange={onChangeCheckbox} />
            <br />
            <br />
            <Checkbox.Group options={options9} defaultValue={['']} onChange={onChangeCheckbox} />
            {  posInput === 1 ? <Input onChange={(e) => setCheckboxInput(e.target.value)} style={{ width: 200, marginLeft: 10 }} /> : null}
            
    
            <br />
            <br />
            <br />

        <h2 className="secondRadio"> {t('third_question_sbh')} <font color='red'>*</font></h2>
            
            <Radio.Group onChange={onChange1} value={secondRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Second_radio_value_one_sbh')}</Radio>
                <Radio value={2}>{t('Second_radio_value_two_sbh')}</Radio>
            </Space>
            </Radio.Group>

            <br/><br/><br/>

            <h2 className="thirdRadio">{t('fourth_question_sbh')} </h2>
            
            <Radio.Group onChange={onChange2} value={thirdRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Third_radio_value_one_sbh')}</Radio>
                <Radio value={2}>{t('Third_radio_value_two_sbh')}</Radio>
                <Radio value={3}>{t('Third_radio_value_three_sbh')}</Radio>
                 {thirdRadio === 3 ? <Input onChange={(e) => setThirdRadioVal(e.target.value)} style={{ width: 200, marginLeft: 10 }} /> : null} 
            </Space>
            </Radio.Group>

            <br/><br/><br/>

        

            <h2 className="fourthRadio">{t('fives_question_sbh')}<font color='red'>*</font></h2>
            
            <Radio.Group onChange={onChange3} value={fourthRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Fourth_radio_value_one_sbh')}</Radio>
                <Radio value={2}>{t('Fourth_radio_value_two_sbh')}</Radio>
            </Space>
            </Radio.Group>
           
            <br />
            <br />
            <br/>

            <h2 className="fifthRadio">{t('sixth_question_sbh')} </h2>
             
            <Radio.Group onChange={onChange4} value={fifthRadio}>
            <Space direction="vertical">
                <Radio value={1}>{t('Fives_radio_value_one_sbh')}</Radio>
                <Radio value={2}>{t('Fives_radio_value_two_sbh')}</Radio>
                <Radio value={3}>{t('Fives_radio_value_three_sbh')} </Radio>
                 {fifthRadio === 3 ? <Input onChange={(e) => setFifthRadioVal(e.target.value)} style={{ width: 200, marginLeft: 10 }} /> : null} 
            </Space>
            </Radio.Group>

            <br/><br/><br/>
            
        
            <h2 className="mess">{t('seventh_question_sbh')} </h2>
            <textarea style={textearea}
                    id="message0"
                    name="message0"
                    onChange={(e) => setMessage0(e.target.value)}
                    placeholder={t('Placeholder_sbh')}
                    value={message0}
                    />

             <br />
             <br />
             <br/>

             <h2 className="photos"> {t('eighth_question_sbh')} </h2>

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

        
            
            <br/>
            <br/>
            <br/>

            <div className="form-message"></div>
            <input style={button} 
                className="button"
                type="button"
                value={t('btn_sbh')}
                onClick={handleSubmit}
            />
                   
                   <br/> <br/> <br/>   
      </div>
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
  marginLeft: '4%',
  marginLeft: '4%',
  marginTop: '3%'
  
}

const texte = {
  fontSize: '12px',
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


export default ScreenBecomeAHairdress;
