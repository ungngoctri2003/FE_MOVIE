// PasswordServices.js
import { baseServices } from "./baseServices";

class PasswordServices extends baseServices {
  constructor() {
    super();
  }

  forgotPassword = (email) => {
    return this.post(`/users/forgotPassword`, { email });
  };

  resetPassword = (resetToken, newPassword) => {
    return this.put(`/users/resetPassword/${resetToken}`, { newPassword });
  };
}

export const passwordServices = new PasswordServices();
