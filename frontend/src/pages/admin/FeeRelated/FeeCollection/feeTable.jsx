import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../../../../components/styles";
import { initialFeeState } from "./constant";

const FeeTable = ({ session }) => {
  const fees = [...Object.keys(initialFeeState), "SubTotal"];
  const formatNumber = (value) => {
    const number = Number(value);
    return number;
  };
  const calculateTotal = (val) => {
    return Object.keys(initialFeeState).reduce(
      (sum, key) => sum + (Number(val[key]) || 0),
      0
    );
  };

  return (
    <Box padding={"20px"}>
      {fees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Serial No</StyledTableCell>
                <StyledTableCell>Fees</StyledTableCell>
                {session.map((val) => (
                  <StyledTableCell key={val._id}>
                    {val?.sclass?.sclassName}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee, index) => (
                <TableRow key={fee}>
                  <TableCell sx={{ padding: "4px", paddingLeft: "30px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: "4px" }} className="capitalize">
                    {fee}: {initialFeeState[fee]}
                  </TableCell>
                  {session.map((val) => (
                    <TableCell
                      key={val._id + fee}
                      sx={{ padding: "4px", paddingLeft: "20px" }}
                      className="capitalize"
                    >
                      {fee !== "SubTotal"
                        ? formatNumber(val[fee] ?? 0)
                        : formatNumber(calculateTotal(val))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </Box>
  );
};

export default FeeTable;
