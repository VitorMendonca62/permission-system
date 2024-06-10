export const errorInServer = (err: any) => {
  return {
    error: true,
    status: 500,
    msg: 'Erro no servidor.',
    data: err,
  };
};
