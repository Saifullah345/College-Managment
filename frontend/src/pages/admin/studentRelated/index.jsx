import { Card, CardContent, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import ShowStudents from "./ShowStudents";
import { AddStudent } from "./AddStudent";

export const Student = () => {
  const [active, setActive] = useState("");
  return (
    <>
      {active === "List of All Students" ? (
        <ShowStudents />
      ) : active === "New Admission" ? (
        <AddStudent setActive={setActive} />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
            // padding: "20px",
            borderRadius: "10px",
            height: "50%",
            marginTop: "10%",
          }}
        >
          <div className="flex justify-between">
            <Card
              className="menu-card"
              sx={{ cursor: "pointer" }}
              onClick={() => setActive("New Admission")}
            >
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  New Admission
                </Typography>
              </CardContent>
            </Card>
            <Card
              className="menu-card"
              sx={{ cursor: "pointer" }}
              onClick={() => setActive("List of All Students")}
            >
              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  List of All Students
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      )}
    </>
  );
};
