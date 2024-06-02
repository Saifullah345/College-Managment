import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
// import { deleteUser } from "../../../redux/userRelated/userHandle";
import { Paper, Box } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { BlackButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popup from "../../../components/Popup";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import axios from "axios";

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );
  const { sclassesList } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    dispatch(getAllSclasses("Sclass"));
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);

    // dispatch(deleteUser(deleteID, address))
    //     .then(() => {
    //         dispatch(getAllStudents(currentUser._id));
    //     })
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "fatherName", label: "Father Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
    // { id: "sclassName", label: "Class", minWidth: 170 },
    { id: "provinces", label: "Province", minWidth: 170 },
    { id: "address", label: "Address", minWidth: 170 },
  ];

  const Update = async (classId, sclassName) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/studentClass/${classId}`,
        {
          sclassName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(result);
      if (result.data) {
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
        dispatch(getAllStudents(currentUser._id));
      }
    } catch (error) {
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };
  const studentRows =
    studentsList &&
    studentsList.length > 0 &&
    studentsList.map((student) => {
      return {
        name: student.name,
        fatherName: student.fatherName,
        rollNum: student.rollNumber,
        sclassName: student.sclassName,
        id: student._id,
        provinces: student.provinces || "",
        address: student.tehsil,
      };
    });
  const StudentButtonHaver = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    console.log(row);
    const [selectedId, setSelectedId] = React.useState(
      row.sclassName?._id || sclassesList[0]?._id || ""
    );

    const handleClick = () => {
      console.info(`You clicked ${selectedId}`);
    };

    const handleMenuItemClick = async (event, id) => {
      setSelectedId(id);
      await Update(row.id, id);

      // Update the row object with the new class
      row.sclassName = sclassesList.find((sclass) => sclass._id === id);

      setOpen(false);
    };
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    const selectedClass = sclassesList?.find(
      (sclass) => sclass._id === selectedId
    );

    return (
      <>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleClick}>{selectedClass?.sclassName}</Button>
          <BlackButton
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {sclassesList.map((option) => (
                      <MenuItem
                        key={option.id}
                        disabled={option.disabled}
                        selected={option._id === selectedId}
                        onClick={(event) => {
                          handleMenuItemClick(event, option._id);
                        }}
                      >
                        {option.sclassName}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Student",
      action: () => navigate("/Admin/addstudents"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Students",
      action: () => deleteHandler(currentUser._id, "Students"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/addstudents")}
              >
                Add Students
              </GreenButton>
              <SpeedDialTemplate actions={actions} />
            </Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(studentsList) && studentsList.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                  // showAction={false}
                />
              )}

              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowStudents;
