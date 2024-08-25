// auth.js
export const isAuthenticated = () => {
  // check token
  const token = localStorage.getItem('authToken');
  return token !== null;
};
