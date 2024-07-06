import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddProvinces } from "./AddProvinces.jsx";
import { AddDistrict } from "./AddDistrict.jsx";
import axios from "axios";
import Popup from "../../../components/Popup.js";
import { TehsilTable } from "./TehsilTable.js";
import { Typography } from "@mui/material";
import { AddBoard } from "./AddBoard.js";
import { BoardTable } from "./boardTable.js";
import { AddSession } from "./Session/AddSession.js";
import { AddProgram } from "./Program/AddProgram.jsx";
import { ProgramTable } from "./Program/ProgramTable.jsx";
import { SessionTable } from "./Session/SessionTable.jsx";
import { Institute } from "./Institute/index.jsx";

const categories = ["Tehsil", "Board", "Session", "Program", "Institute"];

const AddAddress = () => {
  const [addProvinces, setAddProvinces] = useState(false);
  const [addDistrict, setAddDistrict] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [districtId, setDistrictId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [viewTehsil, setViewTehsil] = useState([]);
  const [viewBoard, setViewBoard] = useState([]);
  const [active, setActive] = useState("Tehsil");
  const [viewProgram, setViewProgram] = useState([]);
  const [viewSession, setViewSession] = useState([]);

  const Add = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/tehsilCreate`,
        {
          tehsil,
          districtId,
          provinceId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        setLoading(false);
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
      }
    } catch (error) {
      setShowPopup(true);
      setLoading(false);
      setMessage(error?.response?.data?.error);
    }
  };
  const ViewProvinces = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allProvinces`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        // console.log(result);
        setProvinces(result.data);
        // setProvinceId(result.data[0]?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewDistrict = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allDistrict`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        // console.log(result);
        setDistrict(result.data);

        setDistrictId(
          result.data.filter((val) => val.provinceId._id === provinceId)[0]?._id
        );
        console.log(
          result.data.filter((val) => val.provinceId._id === provinceId)[0]?._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewTehsil = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allTehsil`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        // console.log(result);
        setViewTehsil(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewBoard = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allBoard`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      if (result.data) {
        console.log(result);
        setViewBoard(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewProgram = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allProgram`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        console.log(result);
        setViewProgram(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ViewSession = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allSession`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        // console.log(result);
        setViewSession(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ViewProvinces();
    ViewTehsil();
    ViewDistrict();
    ViewBoard();
    ViewProgram();
    ViewSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("loader"), active, provinceId]);

  return (
    <div className="register-form">
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <Box display="flex" flexDirection={"column"}>
          <Box display="flex" marginTop={"10px"} flexDirection="column" gap={2}>
            <h2>General Setting</h2>
            <Box display="flex" gap={10}>
              {categories.map((category) => (
                <Typography
                  key={category}
                  onClick={() => setActive(category)}
                  sx={{
                    fontSize: "18px",
                    fontWeight: active === category ? "600" : "300",
                    textDecoration: active === category ? "underline" : "",
                    textUnderlineOffset: "5px",
                    cursor: "pointer",
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>
            {active === "Tehsil" ? (
              <Box display="flex" flexDirection={"column"} gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box width={"50%"} sx={{ margin: "auto 0" }}>
                    <label>Provinces *</label>
                    <select
                      className="registerInput"
                      value={provinceId}
                      onChange={(event) => {
                        setProvinceId(event.target.value);
                      }}
                      required
                    >
                      <option disabled>Select Provinces</option>
                      {provinces.length > 0 &&
                        provinces?.map((val) => (
                          <option value={val._id}>{val.province}</option>
                        ))}
                    </select>
                  </Box>
                  <Box onClick={() => setAddProvinces(true)}>
                    <AddCircleIcon
                      style={{ marginTop: "1.3rem", cursor: "pointer" }}
                    />
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box width={"50%"} sx={{ margin: "auto 0" }}>
                    <label>District *</label>
                    <select
                      className="registerInput"
                      value={districtId}
                      onChange={(event) => {
                        console.log(event.target.value);
                        setDistrictId(event.target.value);
                      }}
                      required
                    >
                      <option disabled>Select District </option>
                      {district.length > 0 &&
                        district
                          ?.filter((val) => val?.provinceId?._id === provinceId)
                          ?.map((val) => (
                            <option value={val._id}>{val.district}</option>
                          ))}
                    </select>
                  </Box>
                  <Box onClick={() => setAddDistrict(true)}>
                    <AddCircleIcon
                      style={{ marginTop: "1.3rem", cursor: "pointer" }}
                    />
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box width={"50%"} sx={{ margin: "auto 0" }}>
                    <label>Tehsil *</label>
                    <input
                      className="registerInput"
                      type="text"
                      placeholder="Enter Tehsil..."
                      value={tehsil}
                      onChange={(event) => setTehsil(event.target.value)}
                      required
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  onClick={Add}
                  sx={{ mt: 2, width: "50%" }}
                >
                  {loading ? "Loading..." : "Add"}
                </Button>
              </Box>
            ) : active === "Board" ? (
              <AddBoard setMessage={setMessage} setShowPopup={setShowPopup} />
            ) : active === "Session" ? (
              <AddSession setMessage={setMessage} setShowPopup={setShowPopup} />
            ) : active === "Program" ? (
              <AddProgram setMessage={setMessage} setShowPopup={setShowPopup} />
            ) : null}
          </Box>
          {/* <hr
          style={{
            width: "90%",
            backgroundColor: "black",
            color: "gray",
            marginTop: "20px",
          }}
        /> */}
        </Box>
        {active === "Tehsil" ? (
          <TehsilTable
            tehsil={viewTehsil}
            setShowPopup={setShowPopup}
            setMessage={setMessage}
          />
        ) : active === "Board" ? (
          <BoardTable
            board={viewBoard}
            setShowPopup={setShowPopup}
            setMessage={setMessage}
          />
        ) : active === "Program" ? (
          <ProgramTable
            program={viewProgram}
            setShowPopup={setShowPopup}
            setMessage={setMessage}
          />
        ) : active === "Session" ? (
          <SessionTable
            session={viewSession}
            setShowPopup={setShowPopup}
            setMessage={setMessage}
          />
        ) : active === "Institute" ? (
          <Institute setMessage={setMessage} setShowPopup={setShowPopup} />
        ) : null}
      </Box>
      <AddProvinces open={addProvinces} setOpen={setAddProvinces} />
      <AddDistrict open={addDistrict} setOpen={setAddDistrict} />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};
export default AddAddress;
