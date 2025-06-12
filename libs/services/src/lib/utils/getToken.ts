import Cookies from 'js-cookie';

export const getToken = async () => {
  const token = Cookies.get('UBT_USER_TOKEN');
  return token;
};
