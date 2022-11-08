const apiList = {
  // Authentication APIs
  register: {
    url: () => "auth/register",
    method: "post",
  },
  login: {
    url: () => "auth/login",
    method: "post",
  },
  verifyEmailOTP: {
    url: () => "auth/verify-email",
    method: "put",
  },
  resendEmailOTP: {
    url: () => "auth/send-email-otp",
    method: "put",
  },
};
export default apiList;
