import React from "react";
import { initialFeeState } from "../AddFee/constant";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../../../components/styles";

export const FeeTable = ({ session, setShowPopup, setMessage }) => {
  const fees = Object.keys(initialFeeState);

  // const deleteHandler = async (deleteID, address) => {
  //   try {
  //     const result = await axios.delete(
  //       `${process.env.REACT_APP_BASE_URL}/${address}/${deleteID}`,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     if (result.data) {
  //       // console.log(result);
  //       setShowPopup(true);
  //       sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
  //       setMessage("Done Successfully");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setShowPopup(true);
  //     setMessage(error?.response?.data?.error);
  //   }
  // };

  // const SubjectsButtonHaver = ({ row }) => {
  //   return (
  //     <IconButton
  //       onClick={() => {
  //         console.log(row);
  //         deleteHandler(row.id, "deleteSession");
  //       }}
  //     >
  //       <DeleteIcon color="error" />
  //     </IconButton>
  //   );
  // };
  return (
    <>
      {fees.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Fees</StyledTableCell>
                <StyledTableCell>{session?.sclass?.sclassName}</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee}>
                  <StyledTableCell className="capitalize">
                    {fee}: {initialFeeState[fee]}
                  </StyledTableCell>
                  <StyledTableCell className="capitalize">
                    {session[fee]}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
