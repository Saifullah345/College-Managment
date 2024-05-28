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
    console.log("Value object:", val); // Log the value object to check its content
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
  const [calculateValue, setCalculateValue] = useState(200);
  const [calculateSecondValue, setCalculateSecondValue] = useState(200);
  return (
    <>
      {fees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Fees</StyledTableCell>
                {session.map((val) => (
                  <StyledTableCell>{val.sclass.sclassName}</StyledTableCell>
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
                    <Typography
                      fontWeight={"600"}
                      margin={"auto"}
                      className="flex"
                    >
                      1st Year:
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
                        value={calculateValue}
                        onChange={(e) => setCalculateValue(e.target.value)}
                        name=""
                        id=""
                      />{" "}
                      {calculateValue === 0 ? "" : 200 * calculateValue}
                    </Typography>
                    <Typography
                      fontWeight={"600"}
                      margin={"auto"}
                      className="flex"
                    >
                      2nd Year:
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
                        value={calculateSecondValue}
                        onChange={(e) =>
                          setCalculateSecondValue(e.target.value)
                        }
                        name=""
                        id=""
                      />{" "}
                      {calculateSecondValue === 0
                        ? ""
                        : 200 * calculateSecondValue}
                    </Typography>
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
