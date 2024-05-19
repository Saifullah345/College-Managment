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

export const FeeTable = ({ session }) => {
  const fees = [...Object.keys(initialFeeState), "Total"];
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
                      {fee !== "Total"
                        ? formatNumber(val[fee] ?? 0)
                        : formatNumber(calculateTotal(val))}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
