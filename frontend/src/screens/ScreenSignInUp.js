
import React, {useState, useEffect, useContext} from 'react';
import '../App.css';
import {Card} from 'antd';
//import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import { FirebaseContext } from '../components/Firebase';
import Nav from '../components/nav1';
import { useTranslation } from 'react-i18next';
import Translator from '../components/translator';
import {connect} from 'react-redux';


function ScreenSignInUp(props) {

  const firebase = useContext(FirebaseContext);

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])
   //translator
   const { t } = useTranslation()


  //=======>>>Firebase<<<<<<<<<<<<<

  const data = {
    pseudo: signUpUsername,
    email: signUpEmail,
    password: signUpPassword,
}

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState('')

  //=======>>><<<<<=========



  var handleSubmitSignup = async () => {
    
    if(signUpPassword.length > 5){
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      props.addToken(body.token)
      setUserExists(true)
      
    } else {
      setErrorsSignup(body.error)
    }
    }
  }

  var handleSubmitSignin = async () => {

    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      props.addToken(body.token)
      setUserExists(true)
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  if(userExists){
    return <Redirect to='/screenroutine' />
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  //=======<<< FIREBASE>>>>>>==========

  const handleChange = e => {
   setLoginData({...loginData, [e.target.id]: e.target.value});
}

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    firebase.signupUser(email, password)
    .then( authUser => {
        return firebase.user(authUser.user.uid).set({
            pseudo,
            email
        })
    })
    .then(() => {
      setLoginData({...data});
      props.history.push('/screenroutine');
  })
  .catch(error => {
      setError(error);
      setLoginData({...data});
  })
   
}



const handleSubmit1 = e => {
  e.preventDefault();
  var email = signInEmail;
  var password = signInPassword;
  firebase.loginUser(email, password)
  .then(user => {
    console.log(user, "mon user")
      setSignInEmail('');
      setSignInPassword('');
      props.history.push('/screenroutine');
  })
  .catch(error => {
      setError(error);
      setSignInEmail('');
      setSignInPassword('');
  })
  
}




const { pseudo, email, password } = loginData;

 // gestion erreurs
 const errorMsg = error !== '' && <span>{error.message}</span>;

// ======= FIREBASE END ============
  return (
    <div style={{position: 'relative'}}>
    <div className="signup-page" >
      <Nav/>
  
{/* <p> ScreenSignInUp</p>
              <Link to="/"><Button href="" style={{width:'80px'}} type="primary">Home</Button></Link>
 */}

 {/* Screen sign up */}
 <br/>
<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
<Card hoverable style={styles.form}> 
<Form  onSubmit={(e) => {handleSubmit(e); handleSubmitSignup()}}>

      <FormGroup >
      {errorMsg}
        <p style={{fontWeight: 'bold', fontSize: '20px', alignItems: 'center', justifyContent : 'center'}}>{t('Inscription')}</p>

        {/* <Label for="exampleUsername" className="mr-sm-2">Username</Label> */}
        <Input onChange={(e) =>{ setSignUpUsername(e.target.value); handleChange(e)}} value={signUpUsername} style={styles.input} type="username" name="username" id="pseudo" placeholder="Prénom" />
      </FormGroup>

      <FormGroup >
        {/* <Label for="exampleEmail" className="mr-sm-2">Email</Label> */}
        <Input  onChange={(e) => {setSignUpEmail(e.target.value); handleChange(e)}} value={signUpEmail} style={styles.input}   type="email" name="email" id="email" placeholder="Email" />
      </FormGroup>

      <FormGroup>
        {/* <Label for="examplePassword" className="mr-sm-2">Password</Label> */}
        <Input onChange={(e) => {setSignUpPassword(e.target.value); handleChange(e)}} value={signUpPassword} style={styles.input} type="password" name="password" id="password" placeholder="Mot de passe" />
      </FormGroup>
      
      {tabErrorsSignup}

      <Button  style={styles.button}>CONNEXION</Button>
</Form>

{/* Screen sign in  */}

</Card >
<Card hoverable style={styles.form}>  
<Form  onSubmit={(e) => {handleSubmit1(e); handleSubmitSignin()}} >

      <FormGroup >
      <p style={{fontWeight: 'bold', fontSize: '20px', alignItems: 'center', justifyContent : 'center'}}>{t('Connexion')}</p>
        {/* <Label for="exampleEmail" className="mr-sm-2">Email</Label> */}
        <Input onChange={(e) => setSignInEmail(e.target.value)} style={styles.input}  type="email" name="email" id="exampleEmail" placeholder="Email" />
      </FormGroup>

      <FormGroup>
        {/* <Label for="examplePassword" className="mr-sm-2">Password</Label> */}
        <Input onChange={(e) => setSignInPassword(e.target.value)} style={styles.input} type="password" name="password" id="examplePassword" placeholder="Mot de passe" />
      </FormGroup>
      {tabErrorsSignin}
     <Link to="/forgetpassword"><p><font color="black">{t('Forget_pass')}</font></p></Link>
      <Button style={styles.button}>CONNEXION</Button>
</Form>
</Card>
</div>
          {/* SIGN-IN */}

          {/* <div className="Sign">
                  
                  <Input className="Login-input" placeholder="E-mail" />

                  <Input.Password className="Login-input" placeholder="Mot de passe" />
            

            <Link to="/routine"><Button href="" style={{width:'80px'}} type="primary">Valider</Button></Link>

          </div> */}

          {/* SIGN-UP */}

          {/* <div className="Sign">
                  
                  <Input className="Login-input" placeholder="Prénom" />

                  <Input className="Login-input" placeholder="E-mail" />

                  <Input.Password className="Login-input" placeholder="Mot de passe" />
            

                  <Link to="/routine"><Button href="" style={{width:'80px'}} type="primary">Valider</Button></Link>

          </div> */}

      </div>
      </div>
  );
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

 function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
     // console.log(token, "TOKEN ======>")
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenSignInUp)
