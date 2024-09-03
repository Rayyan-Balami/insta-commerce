export const getENV = (key) => {
  return String(import.meta.env[`VITE_${key}`]);
};


