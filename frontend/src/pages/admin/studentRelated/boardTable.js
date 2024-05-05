import React from "react";
import TableTemplate from "../../../components/TableTemplate";
import { boardColumns } from "./constant";

export const BoardTable = ({ board }) => {
  const rows =
    board &&
    board?.length > 0 &&
    board?.map((val) => {
      return {
        name: val?.name,
        address: val?.address,
      };
    });
  return (
    <div>
      {rows.length > 0 ? (
        <TableTemplate columns={boardColumns} rows={rows} showAction={false} />
      ) : null}
    </div>
  );
};
