var express = require('express');
var router = express.Router();
const App = express();
const request = require('sync-request');

var userModel = require('../models/user')
var programModel = require('../models/program')
var routineModel = require('../models/routine')
var hairdresserModel = require('../models/hairdresser');
var detailhairdresserModel = require('../models/detailhairdresser');
var recipeModel = require('../models/recipe')
var singleRecipeModel = require('../models/singleRecipe')



var uid2 = require('uid2');
var bcrypt = require("bcrypt")

// import of the necessary modules for the backup in cloudinary
var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;
const { url } = require('inspector');
const app = require('../app');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY)


// ajout de recette fake en db
router.post('/fake-recipe', async function(req, res, next) {

  var newRecipe = new recipeModel({
    day: req.body.day,
    title: req.body.title,
    url: req.body.url,
    name: req.body.name,
    bienfaits: req.body.bienfaits,
    instruction: req.body.instruction,
    ingredients: req.body.ingredients,
    coiffure: req.body.coiffure,
    nuit: req.body.nuit,
    astuce: req.body.astuce,
    alimentation: req.body.alimentation,
    
  })


  var recipeSave = await newRecipe.save();

  var result = false;
  if(recipeSave){
    result = true;
  } 
  res.json({result});

});

// ajout de recette fake en db
router.post('/fake-singlerecipe', async function(req, res, next) {

  var newRecipe = new singleRecipeModel({
    url: req.body.url,
    name: req.body.name,
    bienfaits: req.body.bienfaits,
    instruction: req.body.instruction,
    ingredients: req.body.ingredients,
    type: req.body.type,
    benefice: req.body.benefice,
    conservation: req.body.conservation,
    
  })


  var recipeSave = await newRecipe.save();

  var result = false;
  if(recipeSave){
    result = true;
  } 
  res.json({result});

});

// ajout des routines en db
router.post('/routine', async function(req, res, next) {

  var newRoutine = new routineModel({
   types: ['ex', 'frisé'],
    likes: req.body.likes,
    name: req.body.name,
    description: req.body.description,
    duree: req.body.duree,
    url: req.body.url,
    duree: req.body.duree,
    test: req.body.test,
    
  })


  var routineSave = await newRoutine.save();

  var result = false;
  if(routineSave){
    result = true;
  } 
  res.json({result});

})

// ajout des programmes en db
router.post('/program', async function(req, res, next) {

  var newProgram = new programModel({
    urld1: req.body.urld1,
    urld2: req.body.urld2,
    urld3: req.body.urld3,
    urld4: req.body.urld4,
    urld5: req.body.urld5,
    urld6: req.body.urld6,
    urld7: req.body.urld7,
    name: req.body.name,
    desc: req.body.desc,
    ingredientjour1: req.body.ingredientjour1,
    ingredientjour2: req.body.ingredientjour2,
    ingredientjour3: req.body.ingredientjour3,
    ingredientjour4: req.body.ingredientjour4,
    ingredientjour5: req.body.ingredientjour5,
    ingredientjour6: req.body.ingredientjour6,
    ingredientjour7: req.body.ingredientjour7,
  })


  var programSave = await newProgram.save();

  var result = false;
  if(programSave){
    result = true;
  } 
  res.json({result});

})

// ajout de coiffeur en db
router.post('/coiffeur', async function(req, res, next) {

  var newCoiffeur = new hairdresserModel({
    url: req.body.url,
    name: req.body.name,
    coiffures: req.body.coiffures,
    niveauprix: req.body.niveauprix,
    ville: req.body.ville,
    description: req.body.description,
    
    
    
  })


  var coiffeurSave = await newCoiffeur.save();

  var result = false;
  if(coiffeurSave){
    result = true;
  } 
  res.json({result});

})


// recherche de coiffeur par ville en db
router.post('/search-haidress', async function(req, res, next) { 

  var result = false
  //var hairdresser = await hairdresserModel.find({ville: req.body.ville})
  var hairdresser = await hairdresserModel.find({ville: req.body.ville.toLowerCase()})
  var hairdressers = await hairdresserModel.find()
  //console.log(hairdressers, 'MES COIFFEUSES =======>>>>>>')

            if(hairdresser){       
             result = true     
             }   
            res.json({result, hairdresser: hairdresser, hairdressers: hairdressers})   
       });



   // recherche de recettes en db
router.post('/recipeDayOne', async function(req, res, next) { 

  var result = false
  var recette = await recipeModel.find({day: req.body.day})
  console.log(recette, 'MA RECETTE =======>>>>>>')

            if(recette){       
             result = true     
             }   
            res.json({result, recette: recette})   
       });    

  // recherche de programme en db
  router.post('/searchProgram', async function(req, res, next) { 

    var result = false
    var program = await programModel.findOne({number: req.body.number})
    console.log(program, 'MON PROGRAMv=======>>>>>>')
  
              if(program){       
               result = true     
               }   
              res.json({result, program: program})   
         });


         router.post('/searchRoutine', async function(req, res, next) { 

          var result = false
          var user = await userModel.findOne({token: req.body.token})
         // console.log(user, "USER ====>>>")
          var routine = await routineModel.find()
          //console.log(routine, 'MES ROUTINES =======>>>>>>')
                
          if(routine){       
          result = true     
          }   
          res.json({routine, routine: routine, user: user})   
          })
          


         router.post('/searchRecipe', async function(req, res, next) { 

          var result = false
          var recipes = await singleRecipeModel.find()
          var recipestype = await singleRecipeModel.find({type: req.body.type})
          
          //console.log(recipestype, 'MES RECETTES =======>>>>>>')
           

          if(recipes){
            for(var i=0; i< recipes.length; i++){
            for(var y=0; y< recipes[i].likes.length; y++){
             if(recipes[i].likes[y] == req.body.token){
              recipes[i].like = true;
              recipes[i].actionLike = "liked";
             } else {
              recipes[i].like = false;
              recipes[i].actionLike = "";
             }
            }
            for(var z=0; z< recipes[i].dislikes.length; z++){
              if(recipes[i].dislikes[z] == req.body.token){
                recipes[i].actionDislike = "disliked";
              } else {
                recipes[i].actionDislike = "";
              }
            }
          }
          }

          if(recipestype){
             for(var i=0; i< recipestype.length; i++){
               for(var y=0; y< recipestype[i].likes.length; y++){
                 if(recipestype[i].likes[y] == req.body.token){
                  recipestype[i].like = true;
                  recipestype[i].actionLike = "liked";
                 } else {
                  recipestype[i].like = false;
                  recipestype[i].actionLike = "";
                 }
               }
               for(var z=0; z< recipestype[i].dislikes.length; z++){
                if(recipestype[i].dislikes[z] == req.body.token){
                  recipestype[i].actionDislike = "disliked";
                } else {
                  recipestype[i].actionDislike = "";
                }
              }
             }
           }

          res.json({recipes: recipes, recipestype: recipestype})   
          })




router.post('/sign-up', async function(req, res, next){
  
  // générez le hash via bcrypt.
  const hash = bcrypt.hashSync(req.body.password, 10);

  var error = []
  var result = false
  var userSave = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.email,
  })

 if(data != null){
   error.push('Utilisateur déjà présent')
 }

 if(req.body.username == ''
 || req.body.email == ''
 || req.body.password == ''
 ){
   error.push('champs vides')
 }

 if(error.length == 0) {
    var newUser = new userModel({
    name: req.body.username,
    email: req.body.email,
    password: hash,
    token: uid2(32)
 
  })
   userSave = await newUser.save();
   console.log("USERSAVE ======>>",userSave)

  
    if(userSave){
    result = true
    token = userSave.token
  }
 }
 
  res.json({result, userSave, error, token});

});

router.post('/sign-in', async function(req, res, next){

  
  var result = false
  var user = null
  var error = []
  var token = null

  if(req.body.email == ''
  || req.body.password == ''
  ){
    error.push('champs vides')
  }
  if(error.length == 0) {

  const user = await userModel.findOne({ 
    email: req.body.email,
    //password: req.body.password,

  })

  //Vérifiecation que le mot de passe chiffré correspond à celui enregistré en base de données.
  if(user) {
    if(bcrypt.compareSync(req.body.password, user.password)){
  result = true
  token = user.token
   } else {
   result = false
   error.push('mot de passe incorrect')
  } 
  }  else {
    error.push('email incorrect')
  }
}
   res.json({result, user, error, token});

})

//adding information from new photo cards to the database
router.post('/add-pics', async function(req, res, next) {

  var result = false;
  
   var pictureName = './tmp/'+uniqid()+'.jpg';
    //console.log(pictureName, ".....!!")
    var resultCopy = await req.files.file.mv(pictureName);
    //console.log(resultCopy, "RESULTCOPY")
  
    if(!resultCopy){ 
      var resultCloudinary = await cloudinary.uploader.upload(pictureName);
     // console.log( 'RESULT CLOUDINARY ===============>>>>>', resultCloudinary) 
     fs.unlinkSync(pictureName);
    }
  
    var userPhoto = await userModel.findOne({token: req.body.token})
    
    var date = new Date().toLocaleString()
    
    if(userPhoto){
      userPhoto.photo.push({url: resultCloudinary.url, date: date, comment: 'Add com'});
     
      var photoSave = await userPhoto.save()
      
      //console.log("PHOTOSAVE",photoSave.photo[photoSave.photo.length - 1])
     if(photoSave){       
     result = true     
      } 
    }
  // sending to the frontend the last photo cards information taken by the user
   res.json({result, photoSave: photoSave.photo});
   // fs.unlinkSync(pictureName);
  });

  // extraction of photo card information from the database
router.get('/card-picture', async function(req, res, next){

  var photos = []
 var user = await userModel.findOne({token: req.query.token})

    // console.log(user.photo, "USERRR")

  if(user){
    photos = user.photo
   // photos = await userModel.find({photo: user.photo})
     //console.log('PHOTOOOO', photos)
  
  }
// sending photo cards information to the frontend
 res.json(photos)
})

  // extraction of photo card information from the database
  router.post('/add-comment', async function(req, res, next){
   var result = false;
   var id = req.body.id;
   var position = null;
   var user = await userModel.findOne({token: req.body.token})
  
       console.log(req.body.comment, id, req.body.check, "comment & id")
  
    if(user){
      for(var i=0; i<user.photo.length; i++){
        //console.log(user.photo[i], "BOUCLE")
        
        if(user.photo[i]._id == id ){
          position = i
          console.log(i, "position")
         user.photo[i].comment = req.body.comment
         user.photo[i].check = req.body.check
             
        }
      }
      var photoSave = await user.save()
      if(photoSave){       
        result = true     
        } 
    }
    console.log(result, "result")
  // sending photo cards information to the frontend
   res.json({result, photoSave: photoSave.photo})
  })


// Deleting photo card information from the user's database
router.delete('/delete-photo', async function(req, res, next) {
  var result = false
  var id = req.body.id
  var position = null
  var user = await userModel.findOne({token: req.body.token})
  //console.log(user.photo, "USERPHOTO")
  console.log(req.body.id, "mon id front")
  if(user != null){
    for(var i=0; i<user.photo.length; i++){
      console.log(user.photo[i]._id, "BOUCLE")
      if(user.photo[i]._id == id ){
        position = i
        console.log(i, "position")
        user.photo.splice(position,1);
      }
    }
    
    var photoSave = await user.save()
  

    if(photoSave){       
      result = true     
      }   
   }
  // console.log("RESULT===>>", result)
  res.json({result});
})

router.post('/check-comment', async function(req, res, next){
  var result = false;
  var id = req.body.id;
  var token = req.body.token;
  var checked = req.body.check;
  var position = null;
  var user = await userModel.findOne({token: token})
 
      console.log(checked, id, "comment & id")
 
   if(user){
     for(var i=0; i<user.photo.length; i++){
       //console.log(user.photo[i], "BOUCLE")
       
       if(user.photo[i]._id == id ){
         position = i
         console.log(i, "position")
        user.photo[i].check = checked
            
       }
     }
     var photoSave = await user.save()
     if(photoSave){       
       result = true     
       } 
   }
   console.log(result, "result")
 // sending photo cards information to the frontend
  res.json({result, photoSave: photoSave.photo})
 })




 // add likes and dislikes to the db
 router.post('/add-like', async function(req, res, next){
  var result = false;
  var result1 = false;
  var isLiked = req.body.value;
  var cardNumber = req.body.card;
  var token = req.body.token;
 
  //console.log(token, "tok")
  //console.log(isLiked, cardNumber, "isLike, CardNumb")
  
  var user = await userModel.findOne({token: token})

  if(user){
    if(isLiked == 1) {
      console.log('add permission liked')
      if(cardNumber == 1 && user.likes.length == 0 ){
        user.likes.push(1);
      } else if(cardNumber == 2 && user.likes1.length == 0 ){
        user.likes1.push(1);
      }else if(cardNumber == 3 && user.likes2.length == 0 ){
        user.likes2.push(1);
      }else if(cardNumber == 4 && user.likes3.length == 0 ){
        user.likes3.push(1);
      } else {
        
      }
    }
    if(isLiked == 2){
      console.log('delete permission liked')
      if(cardNumber == 1 && user.likes.length == 1){
        user.likes.splice(0, 1)
      }else if(cardNumber == 2 && user.likes1.length == 1) {
        user.likes1.splice(0, 1)
      }else if(cardNumber == 3 && user.likes2.length == 1) {
        user.likes2.splice(0, 1)
      }else if(cardNumber == 4 && user.likes3.length == 1 ) {
        user.likes3.splice(0, 1)
      } else {
        
      }
    }
    if(isLiked == 2) {
      console.log('Add dislike permission')
      if(cardNumber == 1 && user.dislikes.length == 0 ){
        user.dislikes.push(1);
      } else if(cardNumber == 2 && user.dislikes1.length == 0 ){
        user.dislikes1.push(1);
      }else if(cardNumber == 3 && user.dislikes2.length == 0 ){
        user.dislikes2.push(1);
      }else if(cardNumber == 4 && user.dislikes3.length == 0 ){
        user.dislikes3.push(1);
      } else {
        
      }
    }
    if(isLiked == 1){
      console.log("delete dislike permission")
      if(cardNumber == 1 && user.dislikes.length == 1){
        user.dislikes.splice(0, 1)
      }else if(cardNumber == 2 && user.dislikes1.length == 1) {
        user.dislikes1.splice(0, 1)
      }else if(cardNumber == 3 && user.dislikes2.length == 1) {
        user.dislikes2.splice(0, 1)
      }else if(cardNumber == 4 && user.dislikes3.length == 1 ) {
        user.dislikes3.splice(0, 1)
      } else {
        
      }
    }
  }

  var userLikeSave = await user.save()
  if(userLikeSave){       
   result1 = true     
   }
  var routine = await routineModel.findOne({_id: "604f53b94244dad88972cfa0"})
  
  
  if(isLiked == 1){
  console.log("Like")
  if(cardNumber == 1 && user.likes.length == 1){
        routine.likes.push(token);  
  }else if(cardNumber == 2 && user.likes1.length == 1) {
        routine.likes1.push(token);
  }else if(cardNumber == 3 && user.likes2.length == 1) {
        routine.likes2.push(token);
  }else if(cardNumber == 4 && user.likes3.length == 1 ) {
        routine.likes3.push(token);
  } else {
    console.log('Already liked')
  }
}

if(isLiked == 2){
  console.log("DisLike")
  if(cardNumber == 1 && user.likes.length == 0){
    for(var i =0; i< routine.likes.length; i ++){
      if(routine.likes[i] == token){
        routine.likes.splice(i, 1)
      }
    }
   
  }else if(cardNumber == 2 && user.likes1.length == 0) {
    for(var i =0; i< routine.likes1.length; i ++){
      if(routine.likes1[i] == token){
        routine.likes1.splice(i, 1)
      }
    }
    
  }else if(cardNumber == 3 && user.likes2.length == 0) {
    for(var i =0; i< routine.likes2.length; i ++){
      if(routine.likes2[i] == token){
        routine.likes2.splice(i, 1)
      }
    }
  
  }else if(cardNumber == 4 && user.likes3.length == 0) {
    for(var i =0; i< routine.likes3.length; i ++){
      if(routine.likes3[i] == token){
        routine.likes3.splice(i, 1)
      }
    }
    
  } else {
    console.log('nothing to delete')
  }
}

if(isLiked == 1){
  console.log("disLike 2")
  if(cardNumber == 1 && user.dislikes.length == 0){
    for(var i =0; i< routine.dislikes.length; i ++){
      if(routine.dislikes[i] == token){
        routine.dislikes.splice(i, 1)
      }
    }
   
  }else if(cardNumber == 2 && user.dislikes1.length == 0) {
    for(var i =0; i< routine.dislikes1.length; i ++){
      if(routine.dislikes1[i] == token){
        routine.dislikes1.splice(i, 1)
      }
    }
    
  }else if(cardNumber == 3 && user.dislikes2.length == 0) {
    for(var i =0; i< routine.dislikes2.length; i ++){
      if(routine.dislikes2[i] == token){
        routine.dislikes2.splice(i, 1)
      }
    }
    
  }else if(cardNumber == 4 && user.dislikes3.length == 0 ) {
    for(var i =0; i< routine.dislikes3.length; i ++){
      if(routine.dislikes3[i] == token){
        routine.dislikes3.splice(i, 1)
      }
    }
   
  } else {
    console.log('Already liked')
  }
}
if(isLiked == 2){
  console.log("Like 2")
  if(cardNumber == 1 && user.dislikes.length == 1){
        routine.dislikes.push(token);
  }else if(cardNumber == 2 && user.dislikes1.length == 1) {
         routine.dislikes1.push(token);
  } else if(cardNumber == 3 && user.dislikes2.length == 1) {
        routine.dislikes2.push(token);
  }else if(cardNumber == 4 && user.dislikes3.length == 1) {
        routine.dislikes3.push(token);
  } else {
    console.log('nothing to delete')
  }
}
  
var likeSave = await routine.save()
    if(likeSave){       
     result = true     
     }
 console.log(result, "RESULT")
  res.json({result,  routine: likeSave, user: user})
 })






 // add likes and dislikes to recipe to the db
 router.post('/add-like-recipe', async function(req, res, next){
  var result = false;
  var result1 = false;
  var cardID = req.body.id;
  var token = req.body.token;
  var isLiked = req.body.value;
  var alreadyLiked = 0;
  var alreadyDisliked = 0;
 
 // console.log(token, "tok")
 // console.log(cardID, "CARDID")
 // console.log(isLiked, "ISLIKED")

  var user = await userModel.findOne({token: token})
  var recipe = await singleRecipeModel.findOne({_id: cardID})

   if(recipe){
    if(isLiked == 1){
    for(var i=0; i<recipe.likes.length; i++){
       if(recipe.likes[i] == token){
         console.log('already liked')
         alreadyLiked = 1;
       }
       }
     }   
   
  if(isLiked == 1){
    if(alreadyLiked == 0){
      recipe.likes.push(token);
         console.log('like');
    }
  }

  if(isLiked == 1){
    if(alreadyLiked == 0){
         console.log('delete dislike')
         for(var i =0; i< recipe.dislikes.length; i++){
          if(recipe.dislikes[i] == token){
            recipe.dislikes.splice(i, 1)
          }
       }
    }
  }

   if(isLiked == 2){
     for(var i=0; i< recipe.dislikes.length; i++){
       if(recipe.dislikes[i] == token){
        console.log('already disliked');
        alreadyDisliked = 1;   
       }
     }
   }

   if(isLiked == 2){
     if(alreadyDisliked == 0){
       console.log('dislike')
       recipe.dislikes.push(token);
     }
   }

   if(isLiked == 2){
    if(alreadyDisliked == 0){
      console.log('delete like')
    for(var i =0; i< recipe.likes.length; i++){
       if(recipe.likes[i] == token){
         recipe.likes.splice(i, 1)
       }
      }
     }
    }
   }
  
  var likeSave = await recipe.save()
  if(likeSave){       
   result = true     
   }


   var recipes = await singleRecipeModel.find()
   var recipestype = await singleRecipeModel.find({type: req.body.type})

   if(recipes){
    for(var i=0; i< recipes.length; i++){
    for(var y=0; y< recipes[i].likes.length; y++){
     if(recipes[i].likes[y] == req.body.token){
      recipes[i].like = true;
      recipes[i].actionLike = "liked";
     } else {
      recipes[i].like = false;
      recipes[i].actionLike = "";
     }

    }
    for(var z=0; z< recipes[i].dislikes.length; z++){
      if(recipes[i].dislikes[z] == req.body.token){
        recipes[i].actionDislike = "disliked";
      } else {
        recipes[i].actionDislike = "";
      }
    }
  }
  }

  if(recipestype){
     for(var i=0; i< recipestype.length; i++){
       for(var y=0; y< recipestype[i].likes.length; y++){
         if(recipestype[i].likes[y] == req.body.token){
          recipestype[i].like = true;
          recipestype[i].actionLike = "liked";
         } else {
          recipestype[i].like = false;
          recipestype[i].actionLike = "";
         }
       }
       for(var z=0; z< recipestype[i].dislikes.length; z++){
        if(recipestype[i].dislikes[z] == req.body.token){
          recipestype[i].actionDislike = "disliked";
        } else {
          recipestype[i].actionDislike = "";
        }
      }
     }
   }

  res.json({result, recipe: likeSave, recipestype: recipestype,  recipes: recipes })
 })



 //adding information from new photo cards to the database
router.post('/formulaire-pics', async function(req, res, next) {

  var result = false;

  console.log('salut')

  console.log(req.files, 'hello')
  
   var pictureName = './tmp/'+uniqid()+'.jpg';
 
    //console.log(pictureName, ".....!!")
   var resultCopy = await req.files.file.mv(pictureName);
    //console.log(resultCopy, "RESULTCOPY")
  
    if(!resultCopy){ 
      var resultCloudinary = await cloudinary.uploader.upload(pictureName);
      console.log( 'RESULT CLOUDINARY ===============>>>>>', resultCloudinary) 
     fs.unlinkSync(pictureName);
   }
  
  // sending to the frontend the last photo cards information taken by the user
   res.json({result, image: resultCloudinary.url});
  });





router.post('/create-checkout-session', async (req, res) => {
 
  console.log("test com back")
    
// Create a PaymentIntent with the order amount and currency
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000, // Specify amount here
  currency: "eur" // Specify currency here
});
// Return client secret
res.send({
  clientSecret: paymentIntent.client_secret
});

  });
 



module.exports = router;