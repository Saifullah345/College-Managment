import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  //   TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import Popup from "../../../components/Popup";

const SendMessage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/Students`
        );
        const studentsWithWhatsApp = result.data.filter(
          (student) => student.whatsAppNumber
        );
        setStudents(studentsWithWhatsApp);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  const handleSendMessage = async () => {
    if (!selectedStudent || !message) return;
    setLoading(true);
    const body = {
      messaging_product: "whatsapp",
      to: "92" + selectedStudent.whatsAppNumber,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    };
    const header = {
      headers: {
        Authorization: `Bearer EAAFLRRH91usBO3SfChteCoffN6KyhbiMVSKFCKU4qQjz3DZCdYojNqCkCB90e11keumqieUPiUN3xwGeO8S4Ttcw2t6tXzakpZCdfcVuIhjBGLdorPoxefv3D4bZCzcaZCnveWFTX8suLOIzK92YNxyR4XIWrLAvkJUYang7czWMXnrXJJ1L3YCGknZAUFCXVCqLsAwsz5Bf4Ka7DoZCgZD`,
        Accept: "application/json",
      },
    };
    try {
      await axios.post(
        `https://graph.facebook.com/v20.0/389764397549445/messages`,
        body,
        header
      );
      setShowPopup(true);
      setMessage("Done Successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <Box display="flex" marginTop={"10px"} flexDirection="column" gap={2}>
        <h2>Message</h2>
      </Box>
      <Box width={"50%"} marginTop={"10px"}>
        <FormControl fullWidth>
          <InputLabel id="student-label">Select Student</InputLabel>
          <Select
            labelId="student-label"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
        /> */}
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          color="primary"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send Message"}
        </Button>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default SendMessage;
