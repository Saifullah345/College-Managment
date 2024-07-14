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

export const SubmissionFeeTable = ({ session }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Box padding={"20px"}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Serial No</StyledTableCell>
              <StyledTableCell>Submission Date</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {session?.map((fee, index) => (
              <TableRow key={fee}>
                <TableCell sx={{ padding: "4px", paddingLeft: "30px" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ padding: "4px", paddingLeft: "30px" }}>
                  {formatDate(fee.createdAt)}
                </TableCell>
                <TableCell sx={{ padding: "4px", paddingLeft: "30px" }}>
                  {fee.totalFee}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
