import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import logo from '../image/logo-nali.png';
import { Nav, NavItem, NavLink } from 'reactstrap';

/*function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}*/

/*TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};*/

/*function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}*/

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      
      <AppBar position="static" color="">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor=""
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
           <Nav style={navigation} className='active'>
  
          <img style={{width: 100, height: 100, marginTop: '-1%', marginLeft: '-2%', marginRight: '1%'}} src={logo}></img>  
          <NavLink href='/'><p style={navitem} > Home</p></NavLink>
          <NavLink href='/screenroutine'><p style={navitem}>Routine</p></NavLink>
          <NavLink href='/screenrecipes'><p style={navitem}>Recettes</p></NavLink>
          <NavLink href='/screenselectedphoto'><p style={navitem}>Journal</p></NavLink>
          <NavLink href='/screenhairdresser'><p style={navitem}>Se coiffer</p></NavLink>
          


        </Nav>
        </Tabs>
      </AppBar>
      
    
    </div>
  );
}

const navigation =
 {
    height: '90px',
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: '1%',
    //padding: 0,
   // marginLeft: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
   // justifyContent: 'space-around',
    
   // boxShadow: '0px 1px 1px 0px',
  }

  const navitem =
 {
  fontFamily: 'Roboto', 
  fontSize: '30px',
  backgroundColor: "",
  // color: '#262626',
  marginRight: '60px',
  marginBottom: 0,
  float: 'left',
  color: 'black',
  }
