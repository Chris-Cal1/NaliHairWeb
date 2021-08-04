import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import ScreenHome from './screens/ScreenHome';
import ScreenSignInUp from './screens/ScreenSignInUp';
import ScreenRoutine from './screens/ScreenRoutine';
import ScreenProgram from './screens/ScreenProgram';
import ScreenDay1 from './screens/ScreenDay1';
import ScreenDay2 from './screens/ScreenDay2';
import ScreenSelectedPhoto from './screens/ScreenSelectedPhoto';
import ScreenHairDresser from './screens/ScreenHairDresser';
import ScreenDetailHairDresser from './screens/ScreenDetailHairDresser';
import ScreenRecipes from './screens/screenRecipes';
import ScreenDiagnostic from './screens/ScreenDiagnostic';
import ScreenFormulaire from './screens/ScreenFormulaire';
import ScreenStripe from './screens/screenStripe';
import ScreenBecomeAHairdress from './screens/becomeAHairdresser';
import ScreenSuccess from './screens/ScreenSuccess';
import ForgetPassword from './components/ForgetPassword';

import Pagetest from './screens/pagetest';


import numb from './reducers/numb';
import numb1 from './reducers/numb1';
import token from './reducers/token';




const store = createStore(combineReducers({numb, numb1, token, }))




function App() {
  return (

    <Provider store={store}>

    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenSignInUp} path="/screensigninup" exact />
        <Route component={ForgetPassword} path="/forgetpassword"  exact />


        <Route component={ScreenRoutine} path="/screenroutine" exact />
        <Route component={ScreenDiagnostic} path="/screendiagnostic" exact />
        <Route component={ScreenFormulaire} path="/screenformulaire" exact />
        <Route component={ScreenStripe} path="/screenstripe" exact />

        <Route component={ScreenProgram} path="/screenprogram" exact />
        <Route component={ScreenDay1} path="/screenday1" exact />
        <Route component={ScreenDay2} path="/screenday2" exact />

        <Route component={ScreenRecipes} path="/screenrecipes" exact />

        <Route component={ScreenSelectedPhoto} path="/screenselectedphoto" exact />

        <Route component={ScreenHairDresser} path="/screenhairdresser" exact />
        <Route component={ScreenDetailHairDresser} path="/screendetailhairdresser" exact />

        <Route component={ScreenBecomeAHairdress} path="/screenbecomeahairdress" exact />
        <Route component={ScreenSuccess} path="/screensuccess" exact />
        
        <Route component={Pagetest} path="/pagetest" exact />

      </Switch>
    </Router>
     
   
  </Provider>

  );
}

export default App;
