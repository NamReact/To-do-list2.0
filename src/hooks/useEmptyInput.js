export const useEmptyInput = password => {
  const re = /^\s*$/;
  return re.test(String(password));
};
