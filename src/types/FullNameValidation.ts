import type { RegisterOptions } from "react-hook-form";
import type { AuthForm } from "./AuthForm";

const fullNameValidation: RegisterOptions<AuthForm, "fullName"> = {
    required: "This field is required",
    minLength: { value: 5, message: "Must be at least 5 chars" },
    maxLength: { value: 25, message: "Must be less than 25 chars" },
    pattern: { value: /^[A-Za-z\s]+$/, message: "Only English letters are allowed for full name" },
}

export default fullNameValidation;