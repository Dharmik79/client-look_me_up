const apiList = {
  // Authentication APIs
  register: {
    url: () => "auth/register",
    method: "post"
  },
  login: {
    url: () => "auth/login",
    method: "post"
  },
};
export default apiList;