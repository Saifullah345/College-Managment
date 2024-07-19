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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { GreenButton } from "../../../components/buttonStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Popup from "../../../components/Popup";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import CircularWithValueLabel from "../../../components/CircularProgressbarWithLabel";
import SchoolIcon from "@mui/icons-material/School";

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, sclassStudents, loading, error, getresponse } =
    useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);
  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses("Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllSclasses(adminID, "Sclass"));
    });
  };

  console.log(sclassesList);

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
        marginTop: "20px",
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
                  {sclassesList.map((sclass) => {
                    // Extract class-specific student data
                    const classStudents = sclassStudents.find(
                      (s) => s._id.toString() === sclass._id.toString()
                    ) || {
                      totalStudents: sclass.totalStudents | 0,
                      averageFemale: sclass.averageFemale | 0,
                      averageMale: sclass.averageMale | 0,
                    };

                    return (
                      <Grid key={sclass._id} item xs={12} sm={6} md={4}>
                        <Card
                          style={{
                            width: "18rem",
                            borderRadius: "20px",
                          }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              gap={"10px"}
                              padding={"10px"}
                            >
                              <Typography
                                variant="h6"
                                fontWeight={"bold"}
                                component="div"
                              >
                                {sclass.sclassName}
                              </Typography>
                              <Typography variant="h6" component="div">
                                {sclass.sclassNameUrdu}
                              </Typography>
                            </Box>
                            <CardActions
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                flexDirection: "column",
                                marginBottom: "0px",
                                paddingBottom: "0px",
                                paddingRight: "0px",
                              }}
                            >
                              <Box display={"flex"}>
                                <IconButton
                                  onClick={() =>
                                    navigate(
                                      "/Admin/classes/class/" + sclass._id
                                    )
                                  }
                                  color="secondary"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    deleteHandler(sclass._id, "Sclass")
                                  }
                                  color="secondary"
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Box>
                              <SchoolIcon sx={{ fontSize: "50px" }} />
                            </CardActions>
                          </Box>
                          <CardContent>
                            <Typography
                              variant="span"
                              fontSize={"15px"}
                              component="div"
                            >
                              {classStudents.totalStudents} Students
                            </Typography>
                            <Box
                              sx={{
                                position: "relative",
                                display: "inline-flex",
                                gap: "30px",
                                marginTop: "10px",
                              }}
                            >
                              <CircularWithValueLabel
                                value={classStudents.averageMale}
                                label={"Boys"}
                              />
                              <CircularWithValueLabel
                                value={classStudents.averageFemale}
                                label={"Girls"}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ShowClasses;
