import React, {useState, useContext} from 'react';
import { FirebaseContext } from '../Firebase/'
import {Card} from 'antd';
//import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../nav'
import {connect} from 'react-redux';



const ForgetPassword = props => {

    const firebase = useContext(FirebaseContext)
    console.log(firebase, 'firebase')

      //translator
   const { t } = useTranslation()

    const [email, setEmail] = useState('')
    console.log(email, "email")
    const [success, setSuccess] = useState(null);
    const [success1, setSuccess1] = useState(null);
    const [error, setError] = useState(null);
   

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
        .then(() => {
            setError(null);
            //setSuccess(`Consultez votre email ${email} pour changer le mot de passe,`);
            setSuccess(t('Suceess_sfp', {email}));
            setSuccess1(t('Suceess1_sfp'));
            setEmail("");

            setTimeout(() => {
                props.history.push('/screensigninup')
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })

    }


    const disabled = email === "";
  




  return (
    <div style={{position: 'relative'}}>
    <div className="signup-page" >
      <Nav/>
  
 <br/>
<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
<Card hoverable style={styles.form}> 
<Form onSubmit={handleSubmit} >

{                      
                           success && <span 
                                style={{ 
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                                <br/>
                                {success1}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

        <p style={{fontWeight: 'bold', fontSize: '20px', alignItems: 'center', justifyContent : 'center'}}>{t('Forget_pass_sfp')}</p>

       
  

      <FormGroup >
        <Input  onChange={(e) => setEmail(e.target.value)} style={styles.input}  type="email" name="email" id="exampleEmail" placeholder="Email" />
       {/* <button disabled={disabled}>Récupérer</button>*/}
        <Button disabled={disabled}   style={styles.button}>{t('Recuperation')}</Button>
      </FormGroup>

      
     {/*{tabErrorsSignup}* onClick={() => handleSubmit(email)} / } 
      
     { /*<Button disabled={disabled} style={styles.button}>Récupérer</Button>*/}
</Form>


</Card >

</div>


      </div>
      </div>
  )

}

const styles = ({
 
    form: {
     //width: '200px',
     //position: 'relative',
     borderRadius: '5px',
     height: '290px',
     backgroundColor: 'white',
     justifyContent: 'center',
     alignItems: 'center',
     borderColor: 'grey',
     marginTop: '8%',
     marginRight: '2%'
     
    //  elevation: 3,
    //   shadowOffset: { width: 5, height: 5 },
    //   shadowColor: "black",
    //   shadowOpacity: 0.1,
    //   shadowRadius: 3,
    //   borderWidth: 0.3,
  
    },
  
    input: {
   
      borderRadius: '6px',
      backgroundColor: '#E5E5E5',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#E5E5E5',
      marginBottom: '5%'
   
   
     },
  
     button: {
   
      borderRadius: '6px',
      backgroundColor: '#262626',
      color: "white",
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#E5E5E5',
      height: '40px',
      marginBottom: '5px'
   
   
     }
  
   });

export default ForgetPassword