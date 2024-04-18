import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const AddAddress = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [boardName, setBoardName] = useState("");
  const [boardAddress, setBoardAddress] = useState("");
  const [boardDetails, setBoardDetails] = useState("");
  const [session, setSession] = useState("");

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleAdd = () => {
    // Here you can add logic to Add the Added location data or perform further actions
    console.log("Province:", province);
    console.log("District:", district);
    console.log("Tehsil:", tehsil);
    console.log("Session:", session);

    // Here you can add logic to Add the board information or perform further actions
    console.log("Board Name:", boardName);
    console.log("Board Address:", boardAddress);
    console.log("Board Details:", boardDetails);

    // Clear the input fields after saving
    setProvince("");
    setDistrict("");
    setTehsil("");
    setSession("");
    setBoardName("");
    setBoardAddress("");
    setBoardDetails("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
      >
        {/* Location Details Section */}
       
        <Card sx={{ width: '300px' }}>
          <CardContent>
          <div>
          <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
        
        >

          <h2 >Province</h2>
            
  <div style={{ display: 'flex', alignItems: 'center'  }}>
    <TextField label="Province Name " value={province} onChange={handleChange(setProvince)} />
    <Button variant="contained" onClick={handleAdd}>Add</Button>
  </div>
  

  </Box>
  
  
  <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
        
        >
  <h2 >District</h2>

  <div style={{ display: 'flex', alignItems: 'center' }}>
    
  <TextField label=" Select Province " value={province} onChange={handleChange(setProvince)} />
    
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>

  <TextField label=" District Name " value={district} onChange={handleChange(setDistrict)} />

  </div>
  
  </Box>

  <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
        
        >
<h2>Tehsil</h2>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <TextField label=" Select  District  " value={district} onChange={handleChange(setDistrict)} />

  </div>
  <TextField label="  Tehsil Name " value={tehsil} onChange={handleChange(setTehsil)} />

  </Box>
</div>



            <Button variant="contained" onClick={handleAdd} fullWidth sx={{ mt: 2 }}>
              Add Location
            </Button>          </CardContent>
        </Card>

        {/* Session Information Section */}
       
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
      >
        {/* Location Details Section */}
        

        {/* Session Information Section */}
        

        {/* Board Information Section */}
        <Card sx={{ width: '300px' }}>
          <CardContent>
            <TextField label="Add Board Name" value={boardName} onChange={handleChange(setBoardName)} />
            <TextField label="Add Board Address" value={boardAddress} onChange={handleChange(setBoardAddress)} />
            <TextField label="Add Board Details" value={boardDetails} onChange={handleChange(setBoardDetails)} />
            <Button variant="contained" onClick={handleAdd} fullWidth sx={{ mt: 2 }}>
              Add Board Information
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Box

        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        p={2}
        sx={{ border: '2px solid grey', borderRadius: '10px' }}
      >
        {/* Location Details Section */}
        

        {/* Session Information Section */}
        <Card sx={{ width: '300px' }}>
          <CardContent>
            <TextField label="Add Session" value={session} onChange={handleChange(setSession)} />
            <Button variant="contained" onClick={handleAdd} fullWidth sx={{ mt: 2 }}>
              Add Session
            </Button>
          </CardContent>
        </Card>

        {/* Board Information Section */}
        
      </Box>
    </Box>
  );
};
