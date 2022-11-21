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
  resetPassword: {
    url: () => "auth/reset-password",
    method: "put",
  },
  verifyResetPassword: {
    url: () => "auth/verify-reset-password",
    method: "put",
  },
  resetOTPpassword: {
    url: () => "auth/reset-otp-password",
    method: "put",
  },
  createPost: {
    url: () => "post/create",
    method: "post",
  },
  findAllPost: {
    url: () => "post/findAll",
    method: "post",
  },
  deletePost:{
    url:(id)=>`post/${id}`,
    method:"delete"
  }
};
export default apiList;
