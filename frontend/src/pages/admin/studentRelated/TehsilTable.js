import React from "react";
import TableTemplate from "../../../components/TableTemplate";
import { columns } from "./constant";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const TehsilTable = ({ tehsil, setShowPopup, setMessage }) => {
  const rows =
    tehsil &&
    tehsil?.length > 0 &&
    tehsil?.map((val) => {
      return {
        provinces: val?.provinceId?.province,
        district: val?.districtId?.district,
        tehsil: val?.tehsil,
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
          deleteHandler(row.id, "deleteTehsil");
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
          showAction={true}
          buttonHaver={SubjectsButtonHaver}
        />
      ) : null}
    </div>
  );
};
