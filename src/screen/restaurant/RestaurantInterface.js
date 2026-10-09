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
import { getData , postData} from '../../services/FetchNodeServices';
import Avatar from '@mui/material/Avatar';

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
    height:"auto",
    backgroundColor:"#F8F9FC",
    borderRadius:"10px",
    padding:"20px",
   },
   center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
   }
    };

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateid, setStateid] = useState('');
    const [cityid, setCityid] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [url, setUrl] = useState('');
    const [fssai, setFssai] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [gstType, setGstType] = useState('');
    const [fileFssai, setFileFssai] = useState('');
    const [fileShopAct, setFileShopAct] = useState('');
    const [fileLogo, setFileLogo] = useState('');
    const [address, setAddress] = useState('');


    const fetchAllStates = async () => {
      var result = await getData('/statecity/fetch_all_states');
      console.log(result.data);
      setStates(result.data);
    }

    const handleStateChange = (event) => {
      setStateid(event.target.value);
      fetchAllCities(event.target.value);
    }

    const handleCityChange = (event) => {
  setCityid(event.target.value);
};

    const fetchAllCities = async (stateid) => {
      var body = { stateid: stateid };
      var result = await postData('/statecity/fetch_all_cities', body);
      console.log(result.data);
      setCities(result.data);
    }

    useEffect(() => {
      fetchAllStates();
    }, []);

    const handleSubmit = async () => {
       var formData = new FormData();
        formData.append('restaurantname', restaurantName);
        formData.append('ownername', ownerName);
        formData.append('phonenumber', phoneNumber);
        formData.append('emailid', emailid);
        formData.append('mobileno', mobileNumber);
        formData.append('url', url);
        formData.append('fssai', fssai);
        formData.append('gstno', gstNo);
        formData.append('gsttype', gstType);
        formData.append('filefssai', fileFssai.byte);
        formData.append('fileshopact', fileShopAct.byte);
        formData.append('filelogo', fileLogo.byte);
        formData.append('address', address);
        formData.append('stateid', stateid);
        formData.append('cityid', cityid);
       var d=new Date();
        var cd=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        formData.append('createdat', cd);
        formData.append('updatedat', cd);

        var result = await postData('/restaurant/restaurant_submit', formData);
        if (!result) {
          alert('Submission failed. Check the browser console and backend server for the error.');
          return;
        }
        alert(result.message || result.status);

    }

    const fillCities = () => {
      return cities.map((item) => (
        <MenuItem key={item.Cityid} value={item.Cityid}>
          {item.Cityname}
        </MenuItem>
      ));
    };

    const handleFassi = (event) => {
      setFileFssai({url: URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]});
    }

    const handleShopAct = (event) => {
      setFileShopAct({url: URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]});
    }

    const handleLogo = (event) => {
      setFileLogo({url: URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]});
    }

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
      <TextField id="outlined-basic" label="Restaurant Name" variant="outlined" fullWidth onChange={(event) => setRestaurantName(event.target.value)}/>
</Grid>
         <Grid size={{xs:6}}>
      <TextField id="outlined-basic" label="Owner Name" variant="outlined" fullWidth onChange={(event) => setOwnerName(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth onChange={(event) => setPhoneNumber(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth onChange={(event) => setMobileNumber(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth onChange={(event) => setEmailid(event.target.value)}/>
</Grid>
     <Grid size={{xs:12}}>
      <TextField id="outlined-basic" label=" Address" variant="outlined" fullWidth onChange={(event) => setAddress(event.target.value)}/>
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
          value={cityid}
          onChange={handleCityChange}
        >
          <MenuItem >-Select City-</MenuItem>
          {fillCities()}
        </Select>
      </FormControl>
</Grid>
 <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="URL" variant="outlined" fullWidth onChange={(event) => setUrl(event.target.value)}/>
</Grid>
     <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="Fassai Number" variant="outlined" fullWidth onChange={(event) => setFssai(event.target.value)}/>
</Grid>  
   <Grid size={{xs:4}}>
      <TextField id="outlined-basic" label="GST Number" variant="outlined" fullWidth onChange={(event) => setGstNo(event.target.value)}/>
</Grid>   
  <Grid size={{xs:4}}>
       <FormControl variant="outlined"  fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">GST Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="GST Type"
          value={gstType}
          onChange={(event) => setGstType(event.target.value)}
        >
          <MenuItem >-Select GST Type-</MenuItem>
          <MenuItem value="5 Star">5 Star</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
</Grid>
 <Grid size={{xs:4}} style={styles.center}>

   <Avatar
        sx={{ width:56, height:56 , backgroundColor:"#B8325A"}}
        alt="Remy Sharp"
        src={fileFssai.url}
        variant="rounded"
      />

 </Grid>
  <Grid size={{xs:4}} style={styles.center}>
     <Avatar
        sx={{ width:56, height:56,backgroundColor: "#B8325A" }}
        alt="Remy Sharp"
        src={fileShopAct.url}
        variant="rounded"
      />
  </Grid>
   <Grid size={{xs:4}} style={styles.center}>
     <Avatar
        sx={{ width:56, height:56 , backgroundColor: "#B8325A"}}
        alt="Remy Sharp"
        src={fileLogo.url}
        variant="rounded"
      />
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
          <input type="file" onChange={handleFassi} accept="image/*" hidden multiple />
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
          <input type="file" onChange={handleShopAct} accept="image/*" hidden multiple />
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
      <input type="file" onChange={handleLogo} accept="image/*" hidden multiple />   
   </Button>    
</Grid> 
 <Grid size={{xs:6}}>
        <Button
          component="label"
          variant="contained"
          onClick ={handleSubmit}
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