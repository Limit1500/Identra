export const EmailTemplates = {
  verifyEmail: (verificationUrl: string) => ({
    subject: "Verify your Identra email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Welcome to Identra!</p>
      <p>To finish setting up your account, verify your email address.</p>
      <a href="${verificationUrl}">Verify email</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you didn't create an account, you can ignore this email.</p>
      <p>The Identra Team</p>
    `,
  }),

  resetPassword: (resetUrl: string) => ({
    subject: "Reset your Identra password",
    html: `
      <h1>Reset your password</h1>
      <p>We received a request to reset the password for your Identra account.</p>
      <p>Click the link below to choose a new password:</p>
      <a href="${resetUrl}">Reset password</a>
      <p>This link expires in 15 minutes.</p>
      <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
      <p>The Identra Team</p>
    `,
  }),
};
