import React from 'react';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Heading from '../Heading/Heading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState, useEffect   } from 'react';
import {ServerURL , getData , postData} from '../../services/FetchNodeServices';

export default function RestaurantInterface () {

    const styles = {
   
        root:{
            width:"100vw",
            height:"100vh",
             backgroundColor:"#C44569",
             display:"flex",
             justifyContent:"center",
             alignItems:"center",
        },
   box:{
    width:"70%",
    height:"80%",
    backgroundColor:"#F8F9FC",
    borderRadius:"10px",
    padding:"20px",
   }
    };

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateid, setStateid] = useState('');

    const fetchAllStates = async () => {
      var result = await getData('/statecity/fetch_all_states');
      console.log(result.data);
      setStates(result.data);
    }

    const handleStateChange = (event) => {
      setStateid(event.target.value);
      fetchAllCities(event.target.value);
    }

    const fetchAllCities = async (stateid) => {
      var body = { stateid: stateid };
      var result = await postData('/statecity/fetch_all_cities', body);
      console.log(result.data);
      setCities(result.data);
    }

    useEffect(() => {
      fetchAllStates();
    }, []);

    const fillCities = () => {
      return cities.map((item) => (
        <MenuItem key={item.Cityid} value={item.Cityid}>
          {item.Cityname}
        </MenuItem>
      ));
    };

    const fillStates = () => {
      return states.map((item) => (
        <MenuItem key={item.Stateid} value={item.Stateid}>
          {item.Statename}
        </MenuItem>
      ));
    };
    return(
    <div style={styles.root}>
        <div style={styles.box}>

        <Grid container spacing={2}>
       <Grid size={{xs:12}}>
        <Heading title="Restaurant Registration"/>
       </Grid>

         <Grid size={{xs:6}}>
      <TextField id="outlined-basic" label="Restaurant Name" variant="outlined" fullWidth/>
</Grid>
         <Grid size={{xs:6}}>
      <TextField id="outlined-basic" label="Owner Name" variant="outlined" fullWidth/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth/>
</Grid>
     <Grid size={{xs:12}}>
      <TextField id="outlined-basic" label=" Address" variant="outlined" fullWidth/>
</Grid>
<Grid size={{xs:4}}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="State"
          value={stateid}
          onChange={handleStateChange}
        >
          <MenuItem >-Select State-</MenuItem>
          {fillStates()}  
        </Select>
      </FormControl>
</Grid>
<Grid size={{xs:4}}>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="City"
        >
          <MenuItem >-Select City-</MenuItem>
          {fillCities()}
        </Select>
      </FormControl>
</Grid>
 <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="URL" variant="outlined" fullWidth/>
</Grid>
     <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Fassai Number" variant="outlined" fullWidth/>
</Grid>  
   <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="GST Number" variant="outlined" fullWidth/>
</Grid>   
  <Grid size={{xs:4}}>
       <FormControl variant="outlined"  fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">GST Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="GST Type"
        >
          <MenuItem >-Select GST Type-</MenuItem>
          <MenuItem >5 Star</MenuItem>
          <MenuItem >Others</MenuItem>
        </Select>
      </FormControl>
</Grid>
  <Grid size={{xs:4}}>
        <Button
          component="label"
          variant="contained"
          style={{ backgroundColor: "#3A3A3A", borderRadius: '10px',marginTop:'10px' }}
          fullWidth
          endIcon={<UploadFileIcon />}
        >
          Upload Fassi
          <input type="file" accept="image/*" hidden />
        </Button>
     </Grid> 
  <Grid size={{xs:4}}>
       <Button
          component="label"
          variant="contained"
          style={{ backgroundColor: "#3A3A3A", borderRadius: '10px',marginTop:'10px' }}
          fullWidth
          endIcon={<UploadFileIcon />}
        >
          Upload Shop Act
          <input type="file" accept="image/*" hidden />
        </Button>
</Grid> 
  <Grid size={{xs:4}}>
   <Button
      component="label"
      variant="contained"
      style={{ backgroundColor: "#3A3A3A", borderRadius: '10px',marginTop:'10px' }}
      fullWidth
      endIcon={<UploadFileIcon />}
    >
      Upload Logo
      <input type="file" accept="image/*" hidden />   
   </Button>    
</Grid> 
 <Grid size={{xs:6}}>
        <Button
          component="label"
          variant="contained"
          style={{ backgroundColor: "#3A3A3A", borderRadius: '10px', marginTop: '20px' }}
          fullWidth>
          Submit
        </Button>
     </Grid>
      <Grid size={{xs:6}}>
        <Button
          component="label"
          variant="contained"
          style={{ backgroundColor: "#3A3A3A", borderRadius: '10px', marginTop: '20px' }}
          fullWidth >
      Reset
        </Button>
     </Grid>
        </Grid>
      </div>  
    </div>
    )}