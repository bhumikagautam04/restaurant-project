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
import Swal from 'sweetalert2'
import FormHelperText from '@mui/material/FormHelperText';

export default function RestaurantInterface () {

    const styles = {
   
        root:{
            width:"100vw",
            height:"auto",
             backgroundColor:"#C44569",
             display:"flex",
             minHeight: "100vh",
             justifyContent:"center",
             alignItems:"center",
        },
   box:{
    width:"70%",
    height:"auto",
    // minHeight: "100vh",
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
    const [resError, setResError] = useState({});

    const fetchAllStates = async () => {
      var result = await getData('/statecity/fetch_all_states');
      console.log(result.data);
      setStates(result.data);
    }
    const handleError=(label,error,message)=>{
      setResError((prevError)=>({...prevError, [label]: {error:error,message:message}}));
    }

       function validation(){
        var submitRecord = true;
        if(restaurantName.trim().length===0){
         handleError('restaurantName',true,'Please Enter Restaurant Name');
          submitRecord = false;
        }
       if(ownerName.trim().length===0){
        handleError('ownerName',true,'Please Enter Owner Name');
         submitRecord = false;
       }
       if(!stateid){
         handleError('stateid',true,'Please Select State');
         submitRecord =false;
       }
       if(!fileFssai.url){
        handleError('fileFssai',true,'Please Upload Fssai');
        submitRecord=false;

       }
       if(!fileShopAct.url){
        handleError('fileShopAct',true,'Please Upload Shop Act');
        submitRecord=false;
       }
       if(!fileLogo.url){
        handleError('fileLogo',true,'Please Upload Logo');
        submitRecord=false;
       }
       if(address.trim().length===0){
        handleError('address',true,'Please Enter Address');
        submitRecord=false;
       }
       if(phoneNumber.trim().length===0){
        handleError('phoneNumber',true,'Please Enter Phone Number');
        submitRecord=false;
       }
       else if(phoneNumber.trim().length!==10){
        handleError('phoneNumber',true,'Please Enter Valid 10 Digit Phone Number');
        submitRecord=false;
       }
       if(mobileNumber.trim().length===0){
        handleError('mobileNumber',true,'Please Enter the Mobile Number');
      submitRecord=false;
      }
      else if(mobileNumber.trim().length!==10){
        handleError('mobileNumber',true,'Please Enter Valid 10 Digit Mobile Number');
        submitRecord=false;
      }
      if(emailid.trim().length===0){
        handleError('emailid',true,'Please Enter Email Id');
        submitRecord=false;
      }
      else if(emailid.includes('@') === false || emailid.includes('.') === false) {
        handleError('emailid',true,'Please Enter Valid Email Id');
        submitRecord=false;
      }
      if(!cityid){
        handleError('cityid',true,'Please Select City');
        submitRecord=false;
      }
      if(!gstType) {
        handleError('gstType',true,'Please Select Gst Type');
        submitRecord=false;
      }
      if(fssai.trim().length===0){
        handleError('fssai',true,'Please Enter Fssai Number');
        submitRecord=false;
      }
      else if(fssai.trim().length!==14){
        handleError('fssai',true,'Please Enter Valid 14 Digit Fssai Number');
        submitRecord=false;
      }
      if(gstNo.trim().length===0){
        handleError('gstNo',true,'Please Enter Gst Number');
        submitRecord=false;
      }
      else if(gstNo.trim().length!==15){
        handleError('gstNo',true,'Please Enter Valid 15 Digit Gst Number');
        submitRecord=false;
      }
      if(url.trim().length===0){
        handleError('url',true,'Please Enter Url');
        submitRecord=false;
      }
      else if(!url.startsWith('http') && !url.startsWith('https')){
        handleError('url',true,'Please Enter Valid Url');
        submitRecord=false;
      }
      return submitRecord;
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
      if(validation()){
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
       if(result.status){
        Swal.fire({
           icon:'success',
          title: 'Restaurant Registration',
          text:result.message
         
        })
       }
       else{
        Swal.fire({
            icon:'error',
          title:'Restaurant Registartion',
          text:result.message
                })
       }
      }
    }

    const fillCities = () => {
      return cities.map((item) => (
        <MenuItem key={item.Cityid} value={item.Cityid}>
          {item.Cityname}
        </MenuItem>
      ));
    };

    const handleFassi = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setFileFssai({url: URL.createObjectURL(file),byte:file});
      handleError('fileFssai', false, '');
    }

    const handleShopAct = (event) => {
      setFileShopAct({url: URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]});
      handleError('fileShopAct',false,'');
    }

    const handleLogo = (event) => {
      setFileLogo({url: URL.createObjectURL(event.target.files[0]),byte:event.target.files[0]});
      handleError('fileLogo',false,'');
    }

    const fillStates = () => {
      return states.map((item) => (
        <MenuItem key={item.Stateid} value={item.Stateid}>
          {item.Statename}
        </MenuItem>
      ));
    };

    return (
    <div style={styles.root}>
        <div style={styles.box}>

        <Grid container spacing={2}>
       <Grid size={{xs:12}}>
        <Heading title="Restaurant Registration"/>
       </Grid>

         <Grid size={{xs:6}}>
      <TextField 
      error={resError?.restaurantName?.error}
      helperText={resError?.restaurantName?.message}
      onFocus={()=>handleError('restaurantName',false," ")}
      id="outlined-basic" label="Restaurant Name" variant="outlined" fullWidth onChange={(event) => setRestaurantName(event.target.value)}/>
</Grid>
         <Grid size={{xs:6}}>
      <TextField 
      error={resError?.ownerName?.error}
      helperText={resError?.ownerName?.message}
      onFocus={()=>handleError('ownerName',false," ")}
      id="outlined-basic" label="Owner Name" variant="outlined" fullWidth onChange={(event) => setOwnerName(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField 
      error={resError?.phoneNumber?.error}
      helperText={resError?.phoneNumber?.message}
      onFocus={()=>handleError('phoneNumber',false," ")}
      id="outlined-basic" label="Phone Number" variant="outlined" fullWidth onChange={(event) => setPhoneNumber(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField 
      error={resError?.mobileNumber?.error}
      helperText={resError?.mobileNumber?.message}
      onFocus={()=>handleError('mobileNumber',false," ")}
      id="outlined-basic" label="Mobile Number" variant="outlined" fullWidth onChange={(event) => setMobileNumber(event.target.value)}/>
</Grid>
         <Grid size={{xs:4}}>
      <TextField 
      error={resError?.emailid?.error}
      helperText={resError?.emailid?.message}
      onFocus={()=>handleError('emailid',false," ")}
      id="outlined-basic" label="Email Address" variant="outlined" fullWidth onChange={(event) => setEmailid(event.target.value)}/>
</Grid>
     <Grid size={{xs:12}}>
      <TextField 
      error={resError?.address?.error}
      helperText={resError?.address?.message}
      onFocus={()=>handleError('address',false,"")}
      id="outlined-basic" label=" Address" variant="outlined" fullWidth onChange={(event) => setAddress(event.target.value)}/>
</Grid>
<Grid size={{xs:4}}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="State"
          onFocus={()=>handleError('stateid',false," ")}
          value={stateid}
          onChange={handleStateChange}
        >
          <MenuItem >-Select State-</MenuItem>
          {fillStates()}  
        </Select>
        {/* {resError?.stateid?.error?<div style={{color:'red',fontSize:12}}>{resError?.stateid?.message}</div>:<></>} */}
           <FormHelperText style={{color:' #d32f2f '}}>{resError?.stateid?.message}</FormHelperText>
      </FormControl>
</Grid>
<Grid size={{xs:4}}>
        <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="City"
          onFocus={()=>handleError('cityid',false,"")}
          value={cityid}
          onChange={handleCityChange}
        >
          <MenuItem >-Select City-</MenuItem>
          {fillCities()}
        </Select>
        {/* {resError?.cityid?.error?<div style={{color:'red',fontSize:12}}>{resError?.cityid?.message}</div>:<></>} */}
           <FormHelperText style={{color:' #d32f2f '}}>{resError?.cityid?.message}</FormHelperText>
      </FormControl>
</Grid>
 <Grid size={{xs:4}}>
      <TextField 
      error={resError?.url?.error}
      helperText={resError?.url?.message}
      onFocus={()=>handleError('url',false,"")}
      id="outlined-basic" label="URL" variant="outlined" fullWidth onChange={(event) => setUrl(event.target.value)}/>
</Grid>
     <Grid size={{xs:4}}>
      <TextField 
      error={resError?.fssai?.error}
      helperText={resError?.fssai?.message}
      onFocus={()=>handleError('fssai',false,"")}
      id="outlined-basic" label="Fassai Number" variant="outlined" fullWidth onChange={(event) => setFssai(event.target.value)}/>
</Grid>  
   <Grid size={{xs:4}}>
      <TextField 
      error={resError?.gstNo?.error}
      helperText={resError?.gstNo?.message}
      onFocus={()=>handleError('gstNo',false,"")} 
      id="outlined-basic" label="GST Number" variant="outlined" fullWidth onChange={(event) => setGstNo(event.target.value)}/>
</Grid>   
  <Grid size={{xs:4}}>
       <FormControl
        variant="outlined"
        fullWidth
        error={Boolean(resError?.gstType?.error)}
      >
        <InputLabel id="demo-simple-select-outlined-label">GST Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
      
          label="GST Type"
          value={gstType}
          onChange={(event) => {
            setGstType(event.target.value);
            handleError('gstType', false, '');
          }}
        >
          <MenuItem value="" disabled>-Select GST Type-</MenuItem>
          <MenuItem value="5 Star">5 Star</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
         <FormHelperText style={{color:' #d32f2f '}}>{resError?.gstType?.message}</FormHelperText>
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
          <input type="file" onChange={handleFassi} accept="image/*" hidden />
        </Button>
        
          {/* {resError?.fileFassi?.error?<div style={{color:'red',fontSize:12}}>{resError?.fileFassi?.message}</div>:<></>} */}
          <FormHelperText style={{color:' #d32f2f '}}>{resError?.fileFssai?.message}</FormHelperText>
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
        <FormHelperText style={{color:' #d32f2f '}}>{resError?.fileShopAct?.message}</FormHelperText>
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
   <FormHelperText style={{color:' #d32f2f '}}>{resError?.fileLogo?.message}</FormHelperText>   
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
       );
}
