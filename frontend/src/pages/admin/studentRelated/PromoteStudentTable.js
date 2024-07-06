import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { Paper } from "@mui/material";
import { BlackButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popup from "../../../components/Popup";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import axios from "axios";
import { useState } from "react";

export const PromoteStudentsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error } = useSelector(
    (state) => state.student
  );
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
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

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "fatherName", label: "Father Name", minWidth: 170 },
    { id: "sclassName", label: "Class", minWidth: 170 },
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
        id: student._id,
        fatherName: student.fatherName,
        sclassName: student.sclassName.sclassName,
      };
    });
  const StudentButtonHaver = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedId, setSelectedId] = React.useState(
      row.sclassName?._id || sclassesList[0]?._id || ""
    );

    const handleMenuItemClick = async (event, id) => {
      setSelectedId(id);
      await Update(row.id, id);
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
          <Button>Select Class</Button>
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
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {Array.isArray(studentsList) && studentsList.length > 0 && (
            <TableTemplate
              buttonHaver={StudentButtonHaver}
              columns={studentColumns}
              rows={studentRows}
              showAction={true}
              header="Class"
            />
          )}

          <SpeedDialTemplate actions={actions} />
        </Paper>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};
