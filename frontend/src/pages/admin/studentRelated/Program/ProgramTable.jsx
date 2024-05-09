import React from "react";
import { columns } from "./constant";
import TableTemplate from "../../../../components/TableTemplate";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export const ProgramTable = ({ program, setShowPopup, setMessage }) => {
  const rows =
    program &&
    program?.length > 0 &&
    program?.map((val) => {
      return {
        program: val?.program,
        id: val?._id,
      };
    });
  const deleteHandler = async (deleteID, address) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/${address}/${deleteID}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data) {
        console.log(result);
        setShowPopup(true);
        sessionStorage.setItem("loader", !sessionStorage.getItem("loader"));
        setMessage("Done Successfully");
      }
    } catch (error) {
      console.log(error);
      setShowPopup(true);
      setMessage(error?.response?.data?.error);
    }
  };

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <IconButton
        onClick={() => {
          console.log(row);
          deleteHandler(row.id, "deleteProgram");
        }}
      >
        <DeleteIcon color="error" />
      </IconButton>
    );
  };
  return (
    <div>
      {rows.length > 0 ? (
        <TableTemplate
          columns={columns}
          rows={rows}
          buttonHaver={SubjectsButtonHaver}
        />
      ) : null}
    </div>
  );
};
