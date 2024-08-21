import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialFeeState } from "../AddFee/constant";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  // TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../../components/styles";
import EditIcon from "@mui/icons-material/Edit";

export const FeeTable = ({ session }) => {
  const fees = [...Object.keys(initialFeeState), "SubTotal"];
  const navigate = useNavigate();

  const calculateTotal = (val) => {
    return Object.keys(initialFeeState).reduce(
      (sum, key) => sum + (Number(val[key]) || 0),
      0
    );
  };

  const formatNumber = (value) => {
    const number = Number(value);
    return number; // Ensure proper formatting
  };

  const calculateGrandTotal = () => {
    return session.reduce((sum, val) => sum + calculateTotal(val), 0);
  };

  const [studentCounts, setStudentCounts] = useState({
    firstYear: 1,
    secondYear: 1,
    thirdYear: 1,
    fourthYear: 1,
  });

  const handleStudentCountChange = (year, value) => {
    setStudentCounts((prevState) => ({
      ...prevState,
      [year]: value,
    }));
  };

  const getFeePerStudent = (val) => {
    return calculateTotal(val);
  };

  const handleEditClick = (id) => {
    navigate(`/Admin/edit/${id}`);
  };

  return (
    <>
      {session.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Class</StyledTableCell>
                {fees.map((fee) => (
                  <StyledTableCell
                    sx={{ textTransform: "capitalize" }}
                    key={fee}
                  >
                    {fee}
                  </StyledTableCell>
                ))}
                <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {session.map((val, index) => (
                <StyledTableRow key={val._id}>
                  <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                    {val?.sclass?.sclassName}
                  </StyledTableCell>
                  {fees.map((fee) => (
                    <StyledTableCell key={fee}>
                      {fee !== "SubTotal"
                        ? formatNumber(val[fee] ?? 0)
                        : formatNumber(calculateTotal(val))}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(val._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <StyledTableCell colSpan={fees.length} align="right">
                  <Typography fontWeight={"600"}>
                    Grand Total: {formatNumber(calculateGrandTotal())}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={2}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={"column"}
                    gap={"10px"}
                  >
                    {["firstYear", "secondYear", "thirdYear", "fourthYear"].map(
                      (year, index) => (
                        <Typography
                          key={year}
                          fontWeight={"600"}
                          margin={"auto"}
                        >
                          {`${index + 1}st Year:`}
                          <input
                            style={{
                              width: "100px",
                              borderRadius: "5px",
                              padding: "3px",
                              outline: "none",
                              border: "none",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                            }}
                            type="tel"
                            placeholder="Students"
                            value={studentCounts[year]}
                            onChange={(e) =>
                              handleStudentCountChange(year, e.target.value)
                            }
                          />{" "}
                          {studentCounts[year]
                            ? formatNumber(getFeePerStudent(session[index])) *
                              studentCounts[year]
                            : ""}
                        </Typography>
                      )
                    )}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
