import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import Popup from "../../../components/Popup";

export const AddAddress = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [boardName, setBoardName] = useState("");
  const [boardAddress, setBoardAddress] = useState("");
  // const [boardDetails, setBoardDetails] = useState("");
  const [session, setSession] = useState("");
  const [tehsil, setTehsil] = useState([]);
  const tagRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = (value) => {
    const newtehsil = tehsil.filter((val) => val !== value);
    setTehsil(newtehsil);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTehsil([...tehsil, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };
  const Tags = ({ data, handleDelete }) => {
    return (
      <Box
        sx={{
          background: "#283240",
          height: "100%",
          display: "flex",
          padding: "0.2rem",
          margin: "0 0.5rem 0 0",
          justifyContent: "center",
          alignContent: "center",
          color: "#ffffff",
          borderRadius: "100%",
        }}
      >
        <Stack direction="row" gap={1}>
          <Typography whiteSpace={"nowrap"}>{data}</Typography>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          >
            X
          </Box>
        </Stack>
      </Box>
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const fields = {
      province,
      district,
      tehsil,
    };
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/districtCreate`,
        fields,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setMessage("Done Successfully");
        setShowPopup(true);
        setProvince("");
        setDistrict("");
        setTehsil([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddBoard = async (e) => {
    e.preventDefault();
    const fields = {
      boardName,
      boardAddress,
      session,
    };
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/boardCreate`,
        fields,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        setMessage("Done Successfully");
        setShowPopup(true);
        setBoardAddress("");
        setSession("");
        setBoardName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          marginTop={"10px"}
          flexDirection="column"
          // alignItems="center"
          gap={2}
          // p={2}
          //
        >
          {/* Location Details Section */}

          <h2>District</h2>
          <Box display="flex" flexDirection={"column"}>
            <Box display="flex" alignItems="center" gap={2}>
              <div style={{ display: "flex" }}>
                <TextField
                  label="Enter Province Name"
                  value={province}
                  onChange={handleChange(setProvince)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label=" District Name "
                  value={district}
                  onChange={handleChange(setDistrict)}
                />
              </div>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleOnSubmit}>
                  <TextField
                    inputRef={tagRef}
                    fullWidth
                    // variant="standard"
                    size="medium"
                    sx={{ margin: "1rem 0" }}
                    margin="none"
                    placeholder={tehsil.length < 5 ? "Enter Tehsil" : ""}
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                          {tehsil.map((data, index) => {
                            return (
                              <Tags
                                data={data}
                                handleDelete={handleDelete}
                                key={index}
                              />
                            );
                          })}
                        </Box>
                      ),
                    }}
                  />
                </form>
              </Box>
            </Box>{" "}
          </Box>
          <Button
            variant="contained"
            onClick={handleAdd}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        </Box>
        <hr
          style={{
            width: "90%",
            backgroundColor: "black",
            color: "gray",
            marginTop: "20px",
          }}
        />
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <h2>Board</h2>
          <Box display={"flex"} alignItems="center" gap={2}>
            <TextField
              label="Add Board Name"
              value={boardName}
              onChange={handleChange(setBoardName)}
            />
            <TextField
              label="Add Board Address"
              value={boardAddress}
              onChange={handleChange(setBoardAddress)}
            />
          </Box>
          <Box width={"100%"}>
            <TextField
              label="Add Session"
              value={session}
              onChange={handleChange(setSession)}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleAddBoard}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Board Information
          </Button>
        </Box>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
