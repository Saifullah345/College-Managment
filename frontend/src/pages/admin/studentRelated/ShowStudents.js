import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { StudentsTable } from "./StudentTable";
import { PromoteStudentsTable } from "./PromoteStudentTable";

const ShowStudents = () => {
  const [active, setActive] = useState("All Students");

  const categories = ["All Students", "Promote Students"];

  return (
    <div className="register-form">
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <Box display="flex" flexDirection={"column"}>
          <Box display="flex" marginTop={"10px"} flexDirection="column" gap={2}>
            <h2>Students</h2>
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
            {active === "All Students" ? (
              <StudentsTable />
            ) : (
              <PromoteStudentsTable />
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ShowStudents;
