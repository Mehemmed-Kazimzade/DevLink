import type { RegisterOptions } from "react-hook-form";
import type { RegisterForm } from "./RegisterForm";
import type { AuthForm } from "./AuthForm";

const emailValidation: RegisterOptions<AuthForm | RegisterForm, "email"> = {
    required: "This field is required",
    minLength: {value: 10, message: "Email must be 10 chars at least"},
    validate: value => value.includes("@") || "Email must include @ symbol"
}

export default emailValidation