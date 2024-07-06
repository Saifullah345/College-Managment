export const formatCNIC = (value) => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format with dashes
  const cnic =
    digits.slice(0, 5) +
    (digits.length > 5 ? "-" : "") +
    digits.slice(5, 12) +
    (digits.length > 12 ? "-" : "") +
    digits.slice(12, 13);

  return cnic;
};
