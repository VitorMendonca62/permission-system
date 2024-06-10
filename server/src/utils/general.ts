export const errorInServer = () => {
  return {
    error: true,
    status: 500,
    msg: 'Erro no servidor.',
    data: {},
  };
};
