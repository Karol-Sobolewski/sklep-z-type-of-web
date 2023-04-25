export const validateCreditCartData = (value: string) => {
    if (value.length !== 5) {
        return `Wprowadź dane w formacie MM/YY`
    };
    const [month, year] = value.split("/");
    if (Number(month) > 12) {
      return `Niepoprawny miesiąc`;
    }
    if (Number(year) < new Date().getFullYear() % 100) {
      return `Niepoprawny rok`;
    }
    return true;
  }