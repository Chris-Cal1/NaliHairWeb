import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

  const config = {
    apiKey: process.env.REACT_APP_APIKEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTHDOMAINE_FIREBASE,
    projectId: process.env.REACT_APP_PROJECTID_FIREBASE,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore()
    }

     // inscription
     signupUser = (email, password) => 
     this.auth.createUserWithEmailAndPassword(email, password);
 
     // Connexion
     loginUser = (email, password) => 
     this.auth.signInWithEmailAndPassword(email, password);
 
     // Déconnexion
     signoutUser = () => this.auth.signOut();
 
     // Récupérer le mot de passe
     passwordReset = email => this.auth.sendPasswordResetEmail(email); 
 
     // firestore
     user = uid => this.db.doc(`users/${uid}`);
   
}

export default Firebase;