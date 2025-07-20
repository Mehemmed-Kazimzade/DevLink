import type { RegisterOptions } from "react-hook-form";
import type { RegisterForm } from "./RegisterForm";
import type { AuthForm } from "./AuthForm";

const passwordValidation: RegisterOptions<AuthForm | RegisterForm, "password"> = {
    required: "This field is required",
    pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, message: 
        "Password must be 8+ chars, with uppercase, lowercase, and a number."}
};

export default passwordValidation;
