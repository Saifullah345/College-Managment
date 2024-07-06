import React, { useState } from "react";
import { initialFeeState } from "../AddFee/constant";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../../components/styles";

export const FeeTable = ({ session }) => {
  const fees = [...Object.keys(initialFeeState), "SubTotal"];

  const calculateTotal = (val) => {
    return Object.keys(initialFeeState).reduce(
      (sum, key) => sum + (Number(val[key]) || 0),
      0
    );
  };

  const formatNumber = (value) => {
    const number = Number(value);
    return number;
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

  return (
    <>
      {fees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Fees</StyledTableCell>
                {session.map((val) => (
                  <StyledTableCell key={val._id}>
                    {val.sclass.sclassName}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee}>
                  <StyledTableCell className="capitalize">
                    {fee}: {initialFeeState[fee]}
                  </StyledTableCell>
                  {session.map((val) => (
                    <StyledTableCell key={val._id + fee} className="capitalize">
                      {fee !== "SubTotal"
                        ? formatNumber(val[fee] ?? 0)
                        : formatNumber(calculateTotal(val))}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <StyledTableRow>
                <StyledTableCell>
                  <Box
                    display={"flex"}
                    justifyContent={"start"}
                    flexDirection={"column"}
                    gap={"10px"}
                  >
                    {["firstYear", "secondYear", "thirdYear", "fourthYear"].map(
                      (year, index) => (
                        <Typography
                          key={year}
                          fontWeight={"600"}
                          margin={"auto"}
                          className="flex"
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
                <StyledTableCell colSpan={session.length + 1} align="right">
                  <Typography fontWeight={"600"}>
                    Grand Total: {formatNumber(calculateGrandTotal())}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
