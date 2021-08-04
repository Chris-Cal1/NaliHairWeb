import React, {useState, useEffect, createElement} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { Card, Comment, Tooltip, } from 'antd';
import Nav from '../components/nav';
import video from '../video/routine.gif';
import Translator from '../components/translator';
import {Link, Redirect} from 'react-router-dom';
import { HeartOutlined, RightOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled  } from '@ant-design/icons';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux'

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

function ScreenRoutine(props) {
 //Content card
  const [routines, setRoutines] = useState([])
  //Header
  const classes = useStyles();
  const [val, setVal] = React.useState(0);
  //LIKE
  const [likes, setLikes] = useState(0);
  const [likesOne, setLikesOne] = useState(0);
  const [likesTwo, setLikesTwo] = useState(0);
  const [likesThree, setLikesThree] = useState(0);
  //DISLIKE
  const [dislikes, setDislikes] = useState(0);
  const [dislikesOne, setDislikesOne] = useState(0);
  const [dislikesTwo, setDislikesTwo] = useState(0);
  const [dislikesThree, setDislikesThree] = useState(0);
 //Action
  const [action, setAction] = useState(null);
  const [actionOne, setActionOne] = useState(null);
  const [actionTwo, setActionTwo] = useState(null);
  const [actionThree, setActionThree] = useState(null);
// color
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedOne, setIsLikedOne] = useState(false);
  const [isLikedTwo, setIsLikedTwo] = useState(false);
  const [isLikedThree, setIsLikedThree] = useState(false);
// Secure dislike
  const [disLiked, setDisLiked] = useState(false);
  const [disLikedOne, setDisLikedOne] = useState(false);
  const [disLikedTwo, setDisLikedTwo] = useState(false);
  const [disLikedThree, setDisLikedThree] = useState(false);
// headclick
const [click, setClick] = useState(0);
 //type recipe
 const [type, setType] = useState(0);
//translator
const { t } = useTranslation()

  useEffect(() => {
    var handleSearchRoutines = async () => {
      
      const data = await fetch('/searchRoutine', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `routine=${routines}&token=${props.token}`
      })
  
  
      const body = await data.json()
    
     // console.log(body.user.likes, "BODY =======>>")
      if(body.user){
      if(body.user.likes == 1){
        setIsLiked(true);
         setAction('liked')
      } if(body.user.likes1 == 1){
         setIsLikedOne(true);
         setActionOne('liked');
      }  if(body.user.likes2 == 1){
         setIsLikedTwo(true);
         setActionTwo('liked');
     }  if(body.user.likes3 == 1){
         setIsLikedThree(true);
         setActionThree('liked');

      } if(body.user.dislikes == 1){
        setDisLiked(true);
        setAction('disliked')
      } if(body.user.dislikes1 == 1){
         setDisLikedOne(true);
         setActionOne('disliked');
      }  if(body.user.dislikes2 == 1){
         setDisLikedTwo(true);
         setActionTwo('disliked');
      }  if(body.user.dislikes3 == 1){
          setDisLikedThree(true);
          setActionThree('disliked');
}
  }

      setRoutines(body.routine[0])

      setLikes(body.routine[0].likes.length)
      setLikesOne(body.routine[0].likes1.length)
      setLikesTwo(body.routine[0].likes2.length)
      setLikesThree(body.routine[0].likes3.length)

      setDislikes(body.routine[0].dislikes.length)
      setDislikesOne(body.routine[0].dislikes1.length)
      setDislikesTwo(body.routine[0].dislikes2.length)
      setDislikesThree(body.routine[0].dislikes3.length)
     
  }; 
  
  handleSearchRoutines()
  },[]) 


  const sendLikes = async (val, numb) => {
       console.log(val, numb, "val & numb")
   const database = await fetch('/add-like', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `value=${val}&card=${numb}&token=${props.token}`
    
      })
      
      const body = await database.json()

     //console.log(body.routine.likes.length, "  BODY")
      setLikes(body.routine.likes.length)
      setLikesOne(body.routine.likes1.length)
      setLikesTwo(body.routine.likes2.length)
      setLikesThree(body.routine.likes3.length)  
      
      setDislikes(body.routine.dislikes.length)
      setDislikesOne(body.routine.dislikes1.length)
      setDislikesTwo(body.routine.dislikes2.length)
      setDislikesThree(body.routine.dislikes3.length) 
}



  // first card
 
  const like = () => {
    if(isLiked == false){ 
    setAction('liked');
    sendLikes(1, 1)
    setIsLiked(true)
    setDisLiked(false)
  }
};
 
  const dislike = () => {
    if(disLiked == false){
    setAction('disliked');
    setIsLiked(false)
    sendLikes(2, 1)
    setDisLiked(true)
    }
    
  };

  // second card
  const likeOne = () => {
    
    if(isLikedOne == false){
    setActionOne('liked'); 
    sendLikes(1, 2);
    setIsLikedOne(true)
    setDisLikedOne(false)
    }
    
  };

  const dislikeOne = () => {
    
    if(disLikedOne == false){
    setActionOne('disliked');
    setIsLikedOne(false) 
    sendLikes(2, 2);
    setDisLikedOne(true)
    }
    
  };
  
  // third card
  const likeTwo = () => {
    
    if(isLikedTwo == false){
     setActionTwo('liked'); 
     sendLikes(1, 3)
     setIsLikedTwo(true)
     setDisLikedTwo(false)
    }
   
  };

  const dislikeTwo = () => {
    
    if(disLikedTwo == false){
    setActionTwo('disliked');
    setIsLikedTwo(false) 
    sendLikes(2, 3)
    setDisLikedTwo(true)
    }
  };
  //fourth card
  const likeThree = () => {
    
    if(isLikedThree == false){
      setActionThree('liked'); 
      sendLikes(1, 4);
     }
      setIsLikedThree(true)
      setDisLikedThree(false)
    
    
  };

  const dislikeThree = () => {

    if(disLikedThree == false){
     setActionThree('disliked'); 
     sendLikes(2, 4)
     }
     setIsLikedThree(false)  
     setDisLikedThree(true)
    
  };

  var color;
  if(isLiked == true){
    color ='#F543A5'
  } else {
    color = 'grey'
  }
  var colorOne;
  if(isLikedOne == true){
    colorOne ='#F543A5'
  } else {
    colorOne = 'grey'
  }
  var colorTwo;
  if(isLikedTwo == true){
    colorTwo ='#F543A5'
  } else {
    colorTwo = 'grey'
  }
 var colorThree;
  if(isLikedThree == true){
    colorThree ='#F543A5'
  } else {
    colorThree = 'grey'
  }
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    
  ];
  const actionsOne = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={likeOne}>
        {createElement(actionOne === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likesOne}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislikeOne}>
        {React.createElement(actionOne === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikesOne}</span>
      </span>
    </Tooltip>,
    
  ];
  const actionsTwo = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={likeTwo}>
        {createElement(actionTwo === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likesTwo}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislikeTwo}>
        {React.createElement(actionTwo === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikesTwo}</span>
      </span>
    </Tooltip>,
    
  ];
  const actionsThree = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={likeThree}>
        {createElement(actionThree === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likesThree}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislikeThree}>
        {React.createElement(actionThree === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikesThree}</span>
      </span>
    </Tooltip>,
    
  ];



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




// send numb to reducer
  var handleSubmitRoutine = async (numb) => {
     props.addNumb(numb)

  }

//header 2
  const handleChangeVal = (event, newValue) => {
    setVal(newValue);
  };

//className={classes.root} 
  return (
    <div >
         
         
         <Nav/>
         <Translator/>
        
         <h1 style={{ marginLeft: '2%', fontSize: '25px'}}>{t('routine_title')}</h1>
         <br/>
         <img src={video} style={{ position: 'absolute', width: '100%', height: '50%'}}></img>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
          <Tab onClick={ () => {setClick(0);  setType('all')}} style={clicked}  label={t('Toutes les routines')} {...a11yProps(0)} />
          <Tab onClick={ () => {setClick(1);  setType('crépus')}} style={clicked1} label={t('Crépus')} {...a11yProps(1)} />
          <Tab onClick={ () => {setClick(2);  setType('ondulé')}} style={clicked2}  label={t('Ondulés à bouclés')} {...a11yProps(2)} />
          <Tab onClick={ () => {setClick(3);  setType('frisé')}} style={clicked3}  label={t('Frisés')} {...a11yProps(3)} />
          <Tab onClick={ () => {setClick(4);  setType('transition')}} style={clicked4}  label={t('En transition')} {...a11yProps(4)} />
          <Tab onClick={ () => {setClick(5);  setType('défrisé')}} style={clicked5}  label={t('Défrisé, avec lissage')} {...a11yProps(5)} />
          <Tab onClick={ () => {setClick(6);  setType('tresses')}}  style={clicked6} label={t('Tresses, nattes, vanilles, locks')} {...a11yProps(6)} />
          <Tab onClick={ () => {setClick(7);  setType('hommes')}} style={clicked7}  label={t('Hommes')} {...a11yProps(7)} />
          <Tab onClick={ () => {setClick(8);  setType('enfants')}} style={clicked8}   label={t('Enfants')} {...a11yProps(8)} />
          
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
      <br/><br/> <br/> 
            <div style={styles.center}>
               <div className="line"></div>
       </div>
           
           {/* <h1 style={{marginLeft: '2%', fontSize: '25px', marginBottom: '2%', fontWeight: 'bold'}}>{programs.name} </h1>
           <p style={{marginLeft: '2%', fontSize: '20px', marginBottom: '-1%'}}>{programs.desc} </p>    */}
               <div className="routine-page">
                 <div style={styles.card}  >
                   {/**/ }

                   <Card 
                 
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%',  }}
                 
                  >
                      
                      <div style={{display: 'flex', flexDirection: 'row', }}>
                    <img
                      style={{width: '40%' ,height: 'auto', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-26px'}}
                      alt="example"
                      src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951261/jassir-jonis-NnjYBP1zH8c-unsplash_nxfkso.jpg"
                    /> 
                     <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold',}}>Diagnostic personalisé</p>
                    <p style={{ marginRight: '10%'}}></p>
                    <p></p>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actionsThree}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'20%', color: colorThree,  }} />
                    
                   
                    </div>
                    <Link to="screendiagnostic">
                    <RightOutlined
                    
                     style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px', marginTop: '-10%' }}/>
                     </Link>
                     </div>
                   </div>
                       
                      
                  </Card>
               
               <Card 
                  onClick={() => handleSubmitRoutine(1)}
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: '40%', height: 'auto', color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-26px'}} src={routines.url}  />
                    <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold'}}>{routines.name}</p>
                    <p>{routines.description}</p>
                    <p>{routines.duree}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actions}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'13%', color: color}} />
                    
                    
                    </div>
                    <Link to="/screenprogram" style={{ }}>
                    <RightOutlined style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px'}}/>
                    </Link>
                    </div>
                    </div>
                    
                  </Card>
                  
                 
                  {/*to="/screenprogram"*/}
                  
                  <Card 
                   onClick={() => handleSubmitRoutine(2)}
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: '40%', height: 'auto', color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-26px'}} src={routines.url1}  />
                    <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold'}}>{routines.name1}</p>
                    <p>{routines.description1}</p>
                    <p>{routines.duree}</p>
                    <br/> <br/>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actionsOne}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'12%', color: colorOne}} />
                 
                    
                    </div>
                    <Link to="/screenprogram">
                    <RightOutlined   style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px' }}/>
                    </Link>
                    </div>
                    
                    </div>
                    
                  </Card>
                  
                  {/* onClick={() => handleSubmitRoutine()}*/}
                  <Card 
                
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                  <img style={{width: '40%', height: 'auto', color: 'red', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-26px'}} src={routines.url2}  />
                    <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold',}}>{routines.name2}</p>
                    <p>{routines.description2}</p>
                    <p>{routines.duree}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actionsTwo}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'13%', color: colorTwo}} />
                    
                    
                    </div>
                    <Link  style={{  marginRight: '2%'}}>
                    <RightOutlined 
                    
                    style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px'}}/>
                    </Link>
                    </div>
                    </div>
                    
                  </Card>
                  
                  {/* onClick={() => handleSubmitRoutine()}*/}
                  
                  <Card 
                 
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%',  }}
                 
                  >
                      
                      <div style={{display: 'flex', flexDirection: 'row', }}>
                    <img
                      style={{width: '40%' ,height: 'auto', marginRight: '7%', marginLeft: '-25px', marginTop: '-25px', marginBottom: '-28px'}}
                      alt="example"
                      src={routines.url3}
                    /> 
                     <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold', }}>{routines.name3}</p>
                    <p style={{ marginRight: '10%'}}>{routines.description3}</p>
                    <p>{routines.duree}</p>
                    <br/>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actionsThree}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'13%', color: colorThree,  }} />
                    
                   
                    </div>
                    <Link >
                    <RightOutlined
                    
                     style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px', marginTop: '-10%' }}/>
                     </Link>
                     </div>
                   </div>
                       
                      
                  </Card>



                 
                  <Card 
                 
                  hoverable
                  style={{ width: 500, borderRadius: 10, marginLeft: '2%', marginRight: '2%', marginTop: '4%', visibility: 'hidden' }}
                 
                  >
                      
                      <div style={{display: 'flex', flexDirection: 'row', }}>
                    <img
                      style={{width: '40%' ,height: 'auto', marginRight: '7%', marginLeft: '-5%', marginTop: '-5%', marginBottom: '-5%'}}
                      alt="example"
                      src={routines.url3}
                    /> 
                     <div style={{ flexDirection: 'col' }}>
                    <p style={{fontSize: '15px', fontWeight: 'bold',}}>Diagnostic personalisé</p>
                    <p style={{ marginRight: '10%'}}></p>
                    <p></p>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                       <Comment
                      actions={actionsThree}
                      />
                    <HeartOutlined  style={{ marginRight:'2%', marginTop:'13%', color: colorThree,  }} />
                    
                   
                    </div>
                    <Link >
                    <RightOutlined
                    
                     style={{display: 'flex', justifyContent: 'flex-end', fontSize: '20px', marginTop: '-10%' }}/>
                     </Link>
                     </div>
                   </div>
                       
                      
                  </Card>

                   </div>
                   </div> 
   

                  

         
      
      </div>
  );
}

const styles = ({
 
  card: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
  }, btn: {
    // borderColor: "#222222",
    // borderWidth: 1,
    border: '3px solid black',
    backgroundColor: 'rgba(255, 255, 255, .7)',
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white'
     }, center: {
    display: 'flex',
    justifyContent: 'center'
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
)(ScreenRoutine)

