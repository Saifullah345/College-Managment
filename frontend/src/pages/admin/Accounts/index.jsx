import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import TableTemplate from "../../../components/TableTemplate";
import { Box } from "@mui/material";

export const Accounts = () => {
  const { studentsList, loading, response } = useSelector(
    (state) => state.student
  );
  const dispatch = useDispatch();
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  console.log(response);
  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);
  const studentColumns = [
    { id: "date", label: "Date", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 170 },
    { id: "debit", label: "Debit", minWidth: 100 },
    { id: "credit", label: "Credit", minWidth: 170 },
    { id: "netBalance", label: "Net Balance", minWidth: 170 },
  ];
  const studentRows =
    studentsList && studentsList.length > 0
      ? studentsList
          .map((student) => {
            let runningBalance = 0; // Initialize running balance for each student

            return student.feeHistory.map((fee) => {
              runningBalance += fee.paidFee || 0; // Add the paid fee to the running balance

              return {
                date: formatDate(fee?.updatedAt),
                description: `Fee Submission of ${student.name}`,
                debit: fee.debit || 0,
                credit: fee.paidFee || 0,
                netBalance: runningBalance,
              };
            });
          })
          .flat()
      : [];

  return (
    <div className="register-form">
      <h2>Account Statement</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {studentsList.length > 0 ? (
            <Box
              sx={{
                marginTop: "16px",
              }}
            >
              <TableTemplate
                columns={studentColumns}
                rows={studentRows}
                showAction={false}
                header="Class"
              />
            </Box>
          ) : (
            "No Account Statement"
          )}
        </>
      )}
    </div>
  );
};
