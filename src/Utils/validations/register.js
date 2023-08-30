import * as yup from "yup";

const validationRegister = yup.object().shape({
  username: yup.string().required("name is required"),
  password: yup
    .string()
    .min(8, "password must be at least 8 char")
    .required("password is required"),
  mobile: yup.string().min(9).required(),
});

export default validationRegister;