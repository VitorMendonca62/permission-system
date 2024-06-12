export const errorInServer = (err: any) => {
  return {
    error: true,
    status: 500,
    msg: 'Erro no servidor.',
    data: err,
  };
};

export const transformInNumber = (numbers: string[]) => {
  return numbers.map((number) => {
    const numberOrNaN = Number(number);
    if (!isNaN(numberOrNaN)) {
      return numberOrNaN;
    }
    return NaN;
  });
};
