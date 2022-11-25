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
  deletePost: {
    url: (id) => `post/${id}`,
    method: "delete",
  },
  updateProfile: {
    url: () => "user/update-profile",
    method: "put",
  },
  likeDisLike: {
    url: () => "post/",
    method: "post",
  },
  upload: {
    url: () => "upload",
    method: "post",
  },
  createComment: {
    url: () => "comment/add",
    method: "post",
  },
  suggestions:{
    url:()=>"user/suggestions",
    method:"post"
  },
  addFriend:{
    url:()=>"user/followFriend",
    method:"post"
  },
  friends:{
    url:()=>"user/friends",
    method:"post"
  }
};
export default apiList;
