import React from "react";
import TableTemplate from "../../../components/TableTemplate";
import { columns } from "./constant";

export const TehsilTable = ({ tehsil }) => {
  const rows =
    tehsil &&
    tehsil?.length > 0 &&
    tehsil?.map((val) => {
      return {
        provinces: val?.provinceId?.province,
        district: val?.districtId?.district,
        tehsil: val?.tehsil,
      };
    });
  return (
    <div>
      {rows.length > 0 ? (
        <TableTemplate columns={columns} rows={rows} showAction={false} />
      ) : null}
    </div>
  );
};
