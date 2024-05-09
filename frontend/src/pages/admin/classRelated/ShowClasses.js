import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Container,
} from "@mui/material"; // Import necessary components
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard"; // Import AddCardIcon
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate"; // Import SpeedDialTemplate

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  // const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    // setMessage("Sorry the delete function has been disabled for now.");
    // setShowPopup(true);
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllSclasses(adminID, "Sclass"));
    });
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <Grid container spacing={3}>
                  {sclassesList.map((sclass) => (
                    <Grid key={sclass._id} item xs={12} sm={6} md={4}>
                      <Card style={{ width: "18rem" }}>
                        {" "}
                        {/* Adjust card size here */}
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {sclass.sclassName}
                          </Typography>
                          <Typography variant="h5" component="div">
                            {sclass.sclassNameUrdu}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <BlueButton
                            onClick={() =>
                              navigate("/Admin/classes/class/" + sclass._id)
                            }
                          >
                            View
                          </BlueButton>
                          <IconButton
                            onClick={() => deleteHandler(sclass._id, "Sclass")}
                            color="secondary"
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup
        // message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Container>
  );
};

export default ShowClasses;
