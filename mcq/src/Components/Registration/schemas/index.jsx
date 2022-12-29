import * as Yup from "yup";

export const registrationSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please enter your name."),
  email: Yup.string()
    .email()
    .required("Please enter your email.")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid!"
    ),
  password: Yup.string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character."
    ),
  confirmPassword: Yup.string()
    .required("Please enter your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
  dob: Yup.string().required("Please enter your DOB"),
});
