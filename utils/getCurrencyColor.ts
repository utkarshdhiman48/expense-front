const getCurrencyColor = (balance: string | number) => {
  if (balance == 0) return '#aaa';
  return Number(balance) > 0 ? '#51ea8f' : 'red';
};

export default getCurrencyColor;
