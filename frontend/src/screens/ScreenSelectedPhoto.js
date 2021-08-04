import React, {useState, useEffect, } from 'react';
import '../App.css';
import { Comment, Form, Input, Card, Button, Modal, Image} from 'antd';
import Nav from '../components/nav';
import Stock from '../components/stok'
import {Link} from 'react-router-dom';
import {  SearchOutlined, DeleteOutlined  } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import Translator from '../components/translator';
import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.css';
import '../index.css';
import {connect} from 'react-redux'
import moment from 'moment';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { cache } from 'ejs';


const { Meta } = Card;
const { TextArea } = Input;

/*const CommentList = ({ comments }) => (
  <List
    style={{marginTop: '-60px'}}
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);*/


 const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea style={{width: 200, height: 10}} rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="default">
        Add Comment
      </Button>
    </Form.Item>
  </>
);



function ScreenSelectedPhoto(props) {

 
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  //console.log(checked.bol, "checked")

  //comments
  //const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState({val:''});
  //console.log(value, "value")
  
  const [fileDB, setFileDB] = useState([]);
  //console.log(fileDB, "FILE DB")
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  //translator
  const { t } = useTranslation()
  



  // Displays photo cards from the database on loading
  useEffect(() => {
    const findPhoto = async () => {
  
      const dataWishlist = await fetch(`/card-picture?token=${props.token}`)
  
      const body = await dataWishlist.json()
        // console.log(body, "BODY")
         setFileDB(body)
    }
  
    findPhoto()
  },[])

const uploadImage = async (files) => {
  console.log(files[0], "file xy")
  var formData = new FormData();
      formData.append('file', files[0] );
      formData.append('token', props.token);
      
      console.log(formData, "DATA")
     const database = await fetch('/add-pics', {
        method: 'POST',
        body: formData
      
        })
        
        const body = await database.json()
        setFileDB(body.photoSave)
}

const addComment = async (id) => {
      if (!value) {
        return;
      }
      setSubmitting(true)
      setChecked(false);
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
        setValue({val:''})
       // setComments([comments,{
      //        content: <p>{value}</p>,
      //        datetime: moment().fromNow(),}])
        
      }, 1000);
     const database = await fetch('/add-comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `comment=${value}&id=${id}&token=${props.token}&check=${checked}`
      
        })
        
        const body = await database.json()

       // console.log(body.photoSave, "  BODY")
        setFileDB(body.photoSave)
        
}



// deleting a photo card
const handleClickDeletePhoto = async (id) => {
    //console.log("ID 1 ======>>>", id )

  const response = await fetch('/delete-photo', {
  method: 'DELETE',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  body: `id=${id}&token=${props.token}`
  });

  var myPictureCopy = [...fileDB]
    var position = null
    for(let i=0;i<myPictureCopy.length;i++){
        if(myPictureCopy[i]._id == id){
            position = i
            myPictureCopy.splice(position,1);
            
        }
    } setFileDB(myPictureCopy)    

}


    const handleChange = (e,i) => {
     // console.log(i, "E I")
      setValue(e.target.value)      
};


    const handleChangeAffich = async (id) => {
      console.log(id, "id on change")
      setChecked((prev) => !prev);
      //console.log(checked, "checked")

      const database = await fetch('/check-comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id=${id}&token=${props.token}&check=${checked}`
      
        })
        
        const body = await database.json()

       // console.log(body.photoSave, "  BODY")
        setFileDB(body.photoSave)
        
      
    };

if(fileDB){
  var uploadOne = fileDB.map((file,i) => {
     //console.log("FF ALL", file._id,)
     
     return (
        <div key={i}>
         <Card
          hoverable
                   style={{ width: 250, borderRadius: 10, marginLeft: '10px', marginRight: '10px', marginTop: '5%' }}>
                    
                     <p style={{fontSize: '15px', fontWeight: 'bold'}}>{new Date(file.date).toLocaleDateString()}</p>
                     <img onClick={()=> {setModal2Visible(true); setModalPhoto(file.url);}} style={{width: 160, height: 160, color: 'red', marginRight: '7%'}} src={file.url}  />
                     <p style={{fontSize: '15px', fontWeight: 'bold', marginTop: '4%'}}>Commentaire</p>
                     
                    
                  <p style={{}}>{file.comment}</p>
           
                  <div className={classes.root}>
                    
                     
                    <FormControlLabel
                      style={{}}
                      control={<Switch checked={file.check} onChange={() => handleChangeAffich(file._id)} />}
                      label="Add comments"
                    />
                    <div className={classes.container}>
                      <Fade in={file.check}>
                       
                          <div style={{display: 'flex', flexDirection:'column'}}>
                         
                          <Comment
                            
                            content={
                              <Editor
                                onChange={(e) => handleChange(e,i)}
                                onSubmit={() => { addComment(file._id)}}
                                submitting={submitting}
                                value={value.val}
                              />
                            }
                          />
                          </div>
                       
                      </Fade>
                    </div>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'flex-end'  }}>
                     <DeleteOutlined 
                     style={{marginTop: '-10%'}}
                     color="black"
                     onClick={() => handleClickDeletePhoto(file._id)}/>  
                     </div>
                     
                   </Card>
         </div>
   
   )
   }).reverse()}

   // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();

};
   
  return (
    <div>
         
             
             
               <Nav/>
               <Translator/>
             
               <div className="site-page-header-selec-photo">
                 <div style={styles.inner}>
                   <br/><br/> <br/><br/><br/>
                   <h1 style={{display: 'flex',fontSize: '30px', marginLeft: '4%'}}>{t('Journal_photo')}</h1>
                   <p style={{display: 'flex', justifyContent: 'center', fontSize: '20px', marginLeft: '4%', marginRight: '4%'}}>{t('Desc_journal_photo')}</p>
                 </div>
               </div>
               <br/> <br/> 
               <div style={styles.center}>
               <div className="line"></div>
               </div>
               <br/> <br/> 
              <div style={styles.box}>
                 <Button style={styles.button} onClick={handleClick}>
                   <p style={{color: 'white', fontSize: '25px',  marginRight: '2%'}}> {t('Btn_téléchargement')}
                       <SearchOutlined style={{marginLeft:'4%', color: 'white', fontSize: '25px'}}/>
                   </p>           
                 </Button>
              
             </div>
              
              <div style={styles.card} className="routine-page">
                {uploadOne}
               
                  <Modal
                    title="Photo"
                    centered
                    visible={modal2Visible}
                    onOk={() => setModal2Visible(false)}
                    onCancel={() => setModal2Visible(false)}
                  >
                    <img style={{width: 450, height: 450, }} src={modalPhoto}  />
                    
                  </Modal>
                 </div>
                
             
            <input style={{display: 'none'}} type="file"
                ref={hiddenFileInput} onChange={(event) => {uploadImage(event.target.files)}}></input>   
        <div  className="photo-page"></div>
      </div>
  );
}



const styles = ({
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
   width: 310, 
   height: 50,
   fontFamily: '',
   marginLeft: '1%'
 },
 card: {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
 },
 inner: {
   width: '28%',
   height:' 100%',
   backgroundColor: 'rgba(255, 255, 255, .7)'

 },
 center: {
  display: 'flex',
  justifyContent: 'center'
 },
});

const useStyles = makeStyles((theme) => ({
  root: {
     },
  container: {
    display: 'flex',
  },
  paper: { 
    width: 270
  },
 
}));


function mapStateToProps(state) {
  console.log(state, "STATE ======>>")
  return { 
    token: state.token
   }
 
  };


  export default connect(
  mapStateToProps,
  null,
  
  )
  (ScreenSelectedPhoto);