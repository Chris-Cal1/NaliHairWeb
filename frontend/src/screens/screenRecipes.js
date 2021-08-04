import React, {useState, useEffect, createElement} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Card, Comment, Tooltip, } from 'antd';
import Nav from '../components/nav';
import { useTranslation } from 'react-i18next';
import Translator from '../components/translator';
import {Link, Redirect} from 'react-router-dom'
import { HeartOutlined, RightOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled  } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux'

const { Meta } = Card;

function TabPanel(props) {
  const { children, val, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={val !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {val === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function ScreenRecipes(props) {
 
  const [routines, setRoutines] = useState([])
  //Content card
  const [recettes, setRecettes] = useState([])
  //Header
  const classes = useStyles();
  const [val, setVal] = React.useState(0);
  // headclick
  const [click, setClick] = useState(0);
  //type recipe
  const [type, setType] = useState(0);
 //translator
  const { t } = useTranslation()


  useEffect(() => {
    var handleSearchRecipes = async () => {
      
      const data = await fetch('/searchRecipe', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `routine=${routines}&token=${props.token}`
      })
  
      const body = await data.json()
      setRecettes(body.recipes)
  
  }; 
  
  handleSearchRecipes()
  },[]) 


  var handleSearch = async (type) => {
    console.log(type, "type")
    const data = await fetch('/searchRecipe', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `type=${type}&token=${props.token}`
    })

    const body = await data.json()

   // console.log(body, "BODY =======>>")
    if(type == 'all'){
      console.log("TETTEST")
      setRecettes(body.recipes)
    }else{
     setRecettes(body.recipestype) 
    }
    
}; 


  const sendLikes = async (id, value) => {
       console.log(id, value, "SEND ID & value")
   const database = await fetch('/add-like-recipe', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `type=${type}&value=${value}&id=${id}&token=${props.token}`
    
      })
      
      const body = await database.json()
    
    if(type == 'all' || type == ''){
      console.log("TETTEST")
      setRecettes(body.recipes)
    }else{
     setRecettes(body.recipestype) 
    }        
}


  // first card
  const like = (id) => {
    console.log(id, " LIKES ID")
    sendLikes(id, 1)
};
 
  const dislike = (id) => {
    console.log(id, "DISLIKES ID")
    sendLikes(id, 2)
    };



// send numb to reducer
  var handleSubmitRoutine = async (numb) => {
     props.addNumb(numb)

  }

//header 2
  const handleChangeVal = (event, newValue) => {
    setVal(newValue);
  };

var clicked;
var clicked1;
var clicked2;
var clicked3;
var clicked4;
var clicked5;
var clicked6;
var clicked7;
var clicked8;
if(click == 0){
  clicked = styles.btn1
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
} else if(click == 1){
  clicked = styles.btn
  clicked1 = styles.btn1
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
}else if(click == 2){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn1
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
}else if(click == 3){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn1
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
 }else if(click == 4){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn1
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
 }else if(click == 5){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn1
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn
 } else if(click == 6){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn1
  clicked7 = styles.btn
  clicked8 = styles.btn
 } else if(click == 7){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn1
  clicked8 = styles.btn
 } else if(click == 8){
  clicked = styles.btn
  clicked1 = styles.btn
  clicked2 = styles.btn
  clicked3 = styles.btn
  clicked4 = styles.btn
  clicked5 = styles.btn
  clicked6 = styles.btn
  clicked7 = styles.btn
  clicked8 = styles.btn1
  } 



              let singleRecipe = recettes.map((recette,i) => {
                // console.log(recette,  'recettexXX')
              
                return (
                <div key={i} 
                  style={{display:'flex',
                  justifyContent:'center',
                  marginTop: '6%',
                  marginRight: '2%',
                  marginLeft: '2%',
                  
                    }}>
                
                  <Card
                   
                    hoverable
                    style={{ width: 260,
                        borderRadius: 20,
                        size: 'small',
                    }}
                    cover={<img alt="example" src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951248/daniel-bounliane-ZoQIv4NKsyU-unsplash_m2lyaq.jpg" />}
                >
                    
                    <Meta title={recette.name} />
                    <p style={{marginTop: '5px'}}>{recette.bienfaits}</p>
                    <p style={{marginTop: '-18px'}}>{recette.type}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={[
                        <Tooltip key="comment-basic-like" title="Like">
                          <span onClick={() => like(recette._id)}>
                            {createElement(recette.actionLike === 'liked' ? LikeFilled : LikeOutlined)}
                            <span className="comment-action">{recette.likes.length}</span>
                          </span>
                        </Tooltip>,
                        <Tooltip key="comment-basic-dislike" title="Dislike">
                          <span onClick={() => dislike(recette._id)}>
                            {React.createElement(recette.actionDislike === 'disliked' ? DislikeFilled : DislikeOutlined)}
                            <span className="comment-action">{recette.dislikes.length}</span>
                          </span>
                        </Tooltip>,
                        
                      ]}
                      />
                      
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'15%', color:(recette.like === true ? '#F543A5' : 'grey')}} />
                    
                    </div>
                    
                </Card>
                </div>
              
              )})

  return (
    <div >
         
         
         <Nav/>
         <Translator/>
    
         <div className={classes.roots}>
      <AppBar position="static" color="">
        <Tabs
          value={val}
          onChange={handleChangeVal}
          indicatorColor=""
          //textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
           
          <Tab onClick={ () => {setClick(0); handleSearch('all'); setType('all')}} style={clicked} label={t('Toutes les routines')} {...a11yProps(0)} />
          <Tab onClick={ () => {setClick(1);  handleSearch('crépus'); setType('crépus')}} style={clicked1} label={t('Crépus')} {...a11yProps(1)} />
          <Tab onClick={ () => {setClick(2);  handleSearch('ondulé'); setType('ondulé')}} style={clicked2} label={t('Ondulés à bouclés')} {...a11yProps(2)} />
          <Tab onClick={ () => {setClick(3);  handleSearch('frisé'); setType('frisé')}} style={clicked3} label={t('Frisés')} {...a11yProps(3)} />
          <Tab onClick={ () => {setClick(4);  handleSearch('transition'); setType('transition')}} style={clicked4} label={t('En transition')} {...a11yProps(4)} />
          <Tab onClick={ () => {setClick(5);  handleSearch('défrisé'); setType('défrisé')}} style={clicked5} label={t('Défrisé, avec lissage')} {...a11yProps(5)} />
          <Tab onClick={ () => {setClick(6);  handleSearch('tresses'); setType('tresses')}} style={clicked6} label={t('Tresses, nattes, vanilles, locks')} {...a11yProps(6)} />
          <Tab onClick={ () => {setClick(7);  handleSearch('hommes'); setType('hommes')}} style={clicked7} label={t('Hommes')} {...a11yProps(7)} />
          <Tab onClick={ () => {setClick(8);  handleSearch('enfants'); setType('enfants')}} style={clicked8} label={t('Enfants')} {...a11yProps(8)} />
        </Tabs>
      </AppBar>
      <TabPanel value={val} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={val} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={val} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={val} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={val} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={val} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={val} index={6}>
        Item Seven
      </TabPanel>
    </div>
    
    <br/> <br/> 
               <div style={styles.center}>
               <div className="line"></div>
               </div>
           
          
               <div className="routine-page">
                 <div style={styles.card}  >
                 {singleRecipe}
            

                   </div>
                   </div> 
                   <div className="routine-page"></div>
                   <div  className="photo-page"></div>
      </div>
  );
}

const styles = ({
 
  card: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
   },
   btn: {
   // borderColor: "#222222",
   // borderWidth: 1,
   border: '3px solid black',
    fontSize: '20px',
    padding: '15px',
    marginRight: '10px',
    fontWeight: 'bold', 
   }, 
   btn1:{
    // borderColor: "#222222",
    // borderWidth: 1,
    border: '3px solid black',
     fontSize: '20px',
     padding: '15px',
     marginRight: '10px',
     fontWeight: 'bold', 
     backgroundColor: 'black',
     color: 'white'
    },
 });

 const useStyles = makeStyles((theme) => ({
  roots: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  
}));

 function mapStateToProps(state) {
  console.log(state, "STATE ======>>")
  
  return { 
    token: state.token
   }
 
  };


 function mapDispatchToProps(dispatch){
  return {
    addNumb: function(numb){
   //   console.log("NUMB", numb)
      dispatch({type: 'addNumb', numb: numb})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenRecipes)