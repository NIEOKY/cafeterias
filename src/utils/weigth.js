const calculateWeigth = (personal) => {
  if (personal === '0 a 5 personas') {
    return 1;
  }
  if (personal === '6 a 10 personas') {
    return 2;
  }
  return 0;
};

export default calculateWeigth;
