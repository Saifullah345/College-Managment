export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F3F4F8",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export const columns = [
  { id: "provinces", label: "Provinces", minWidth: 170 },
  { id: "district", label: "District", minWidth: 100 },
  { id: "tehsil", label: "Tehsil", minWidth: 170 },
];
export const boardColumns = [
  { id: "name", label: "Board Name", minWidth: 170 },
  { id: "address", label: "Board Address", minWidth: 100 },
];
