export const signinSchema = {
  body: {
    type: "object",
    required: ["username", "password", "email"],
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 30,
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 128,
      },
      email: {
        type: "string",
        format: "email",
        maxLength: 254,
        minLength: 3,
      },
    },
  },
};

export const loginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 30,
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 128,
      },
    },
  },
};
