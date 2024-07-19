import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { StudentsTable } from "./StudentTable";
import { PromoteStudentsTable } from "./PromoteStudentTable";

const ShowStudents = () => {
  const [activeCategory, setActiveCategory] = useState("All Students");
  const [activeClass, setActiveClass] = useState("All");

  const categories = ["All Students", "Promote Students"];
  const classes = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

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
                  onClick={() => setActiveCategory(category)}
                  sx={{
                    fontSize: "18px",
                    fontWeight: activeCategory === category ? "600" : "300",
                    textDecoration:
                      activeCategory === category ? "underline" : "",
                    textUnderlineOffset: "5px",
                    cursor: "pointer",
                  }}
                >
                  {category}
                </Typography>
              ))}
            </Box>

            <Box display="flex" gap={10} marginTop={"10px"}>
              {classes.map((cls) => (
                <Typography
                  key={cls}
                  onClick={() => setActiveClass(cls)}
                  sx={{
                    fontSize: "16px",
                    fontWeight: activeClass === cls ? "600" : "300",
                    textDecoration: activeClass === cls ? "underline" : "",
                    textUnderlineOffset: "5px",
                    cursor: "pointer",
                  }}
                >
                  {cls}
                </Typography>
              ))}
            </Box>
            {activeCategory === "All Students" ? (
              <StudentsTable activeClass={activeClass} />
            ) : (
              <PromoteStudentsTable activeClass={activeClass} />
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ShowStudents;
