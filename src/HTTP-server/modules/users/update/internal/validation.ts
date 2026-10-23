export const emailSchema = {
  body: {
    type: "object",
    required: ["email"],
    properties: {
      newEmail: {
        type: "string",
        format: "email",
        maxLength: 254,
        minLength: 3,
      },
    },
  },
};

export const newAndCurrentPasswordSchema = {
  body: {
    type: "object",
    required: ["newPassword", "currentPassword"],
    properties: {
      newPassword: {
        type: "string",
        minLength: 8,
        maxLength: 128,
      },
      currentPassword: {
        type: "string",
        minLength: 8,
        maxLength: 128,
      },
    },
  },
};

export const newPasswordSchema = {
  body: {
    type: "object",
    required: ["newPassword"],
    properties: {
      newPassword: {
        type: "string",
        minLength: 8,
        maxLength: 128,
      },
    },
  },
};

export const usernameSchema = {
  body: {
    type: "object",
    required: ["username"],
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 30,
      },
    },
  },
};
