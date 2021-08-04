import React, {useState} from 'react';
import '../App.css';
import Nav from '../components/nav';
import Item from "../components/Item";
import Carousel from "react-elastic-carousel";
import { Image } from 'antd';
import { AiTwotoneStar } from "react-icons/ai";



const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];



function ScreenDetailHairDresser() {

  const [items, setItems] = useState([<Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1620047739/vmahinsjm6osfqrtyv7p.jpg"/>,
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1619272131/ilfaczejkswcpwv6ig6g.jpg"/>, 
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1619262105/oobgqixfvszvfhhqu9sh.jpg"/>,
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951290/vahid-kanani-EruGdZ9J8nA-unsplash_sbmsaq.jpg"/>,
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618525194/k849b50tv3cityb8ms9m.jpg"/> ,
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951274/jaroslav-devia-ILY7a3Zsxxs-unsplash_drjyn4.jpg"/>,
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1618951259/ilyuza-mingazova-_USEzG6LUrw-unsplash_pvmpig.jpg"/>, 
  <Image style={{width: '100%', height: '100%'}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1615757053/routines_capillaires_photo1_nzjh2g.jpg"/>,
]);

  /*const addItem = () => {
    const nextItem = Math.max(1, items.length + 1);
    setItems([...items, nextItem]);
  };

  const removeItem = () => {
    const endRange = Math.max(0, items.length - 1);
    setItems(items.slice(0, endRange));
  };*/


  return (
      
    <div>
        <Nav/>
        <br/>
   <div className="body-dh">
       <div className="bloc1" style={{ display: 'flex', justifyContent: 'center'}}>  
       <img style={{marginRight: '2%', marginLeft: '2%',  width: '100%', height: 'auto',}} src="https://res.cloudinary.com/dzcx4fqfn/image/upload/v1619977187/zujed52bglogrerdem9b.jpg"/>
       </div>
       <div className="bloc2">
           <br/>
       <h1 style={title}>Lola</h1>
          <p style={text1}>Lyon</p>
          <p style={text}>Tél: 0634502239</p>
          <p style={text}>Mail: lola@gmail.com</p>
          <p style={text1}>Passionnée de coiffure, j’exerce ce métier depuis plus de 10 ans, je serai ravie de répondre à vos demandes.
           Je coiffe à domicile et je me déplace aux alentours de Lyon.</p>
       </div>
       <div className="bloc3">
           <br/>
       <h1 style={{marginLeft: '2%'}}>Mes dernières réalisations</h1>
      
     {/* <div className="controls-wrapper">
        <button onClick={removeItem}>Remove Item</button>
        <button onClick={addItem}>Add Item</button>
  </div>*/}
     
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <Item key={item}>{item}</Item>
          ))}
        </Carousel>
      </div>
    
       </div>
       <div className="bloc4" style={{display: 'flex', justifySelf: 'center', flexDirection: 'column'}}>
           <br/>
       <h1 style={{marginLeft: '2%'}}>Préstation</h1>
           <h1 style={margin}>Tissage</h1>
       <p style={margin}>Tissage fermé - 50,00€ </p>
       <p style={margin}>Tissage Ouvert - 50,00€ </p>
      <br/>
       <h1 style={margin}>Crochets braids</h1>
       <p style={margin}> Crochets braids - 50,00€ </p>
       <p style={margin}>Crochets braids vixen sew in - 50,00€ </p>
       <br/>
       <h1 style={margin}>Tresses (Braids)</h1>
       <p style={margin}>Nattes collées tête entière (sans ajout de mèches) - 45,00€ </p>
       <p style={margin}>Nattes collées tête entière (avec ajout de mèches) - 45,00€ </p>
       <p style={margin}>Box braids (effet mi-long) - 45,00€ </p>
       <p style={margin}>Box braids (effet long) - 55,00€ </p>
       <br/>
       <h1 style={margin}>Vanilles (twists)</h1>
       <p style={margin}> Vanilles / Twists sénégalaises - 60,00€ </p>
       <br/>
       <h1 style={margin}>Cornrows</h1>
       <p style={margin}>Cornrows (plus de 5 tresses) - 45,00€ </p>
       <br/>
       <h1 style={margin}>Autre</h1>
       <p style={margin}>Cornrows (moins de 5 tresses) - 35,00€ </p>
       <p style={margin}>Chignon/ ponytail - 35,00€ </p>
       <p style={margin}>Tresses enfants - 40,00€ </p>
       <p style={margin}>Pose perruque - 50,00€ </p>
       <p style={margin}>Fulani hair - 50,00€ </p>
       <p style={margin}>Passion twists - 50,00€ </p>
       <p style={margin}>Tissage avec lace - 60,00€ </p>
       <p style={margin}>fausses locks - 70,00€ </p>
       </div>
       <div className="bloc5"></div>
       <div className="bloc6"></div>
       
       <div className="bloc7">
           <br/><br/>
       <h1 style={{ marginLeft: '2%'}}>Avis</h1>
     <br/>
     <div style={{ display: 'flex', flexDirection: 'row'}}>
     <p style={{fontWeight: 'bold', marginLeft: '2%'}}>Yan</p>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     </div>
     <p style={{marginLeft: '3%', marginRight: '3%'}}>Lorep Ipsum Lorep IpsumLorep IpsumLorep IpsumLorep IpsumLorep IpsumLorep Ipsum</p>
     <br/>
     <div style={{ display: 'flex', flexDirection: 'row'}}>
     <p style={{fontWeight: 'bold', marginLeft: '2%'}}>Brigitte</p>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     <AiTwotoneStar size={20} style={{color: '#FED403'}}/>
     </div>
     <p style={{marginLeft: '3%', marginRight: '3%'}}>Lorep Ipsum Lorep IpsumLorep IpsumLorep IpsumLorep IpsumLorep IpsumLorep Ipsum</p>
       
       </div>  
   </div> 
</div>
  );
}

const title = {
  fontSize: '25px',
  fontWeight: 'bold',
  marginLeft: '2%',

}

const text = {
  fontSize: '20px',
  marginLeft: '2%',
  marginTop: '-15px'

}
const text1 = {
    fontSize: '20px',
    marginLeft: '2%',  
  
  }

const margin = {
  marginLeft: '4%'
}



export default ScreenDetailHairDresser;