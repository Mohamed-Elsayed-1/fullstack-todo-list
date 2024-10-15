export const Register_Form = (watch) => [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: "Username is required",
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters long",
      },
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Invalid email format",
      },
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    },
  },
  {
    name: "passwordConfirm",
    placeholder: "Confirm Password",
    type: "password",
    validation: {
      required: "Please confirm your password",
      validate: (value) =>
        value === watch("password") || "Passwords do not match",
    },
  },
];

export const Login_Form = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Invalid email format",
      },
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    },
  },
];
