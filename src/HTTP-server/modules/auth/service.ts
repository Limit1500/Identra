import argon2 from "argon2";
import UserDatabaseService from "../../../database/users/service";
import AppError from "../../error/types";

class AuthService {
  static async login(username: string, password: string) {
    const passwordHash = await argon2.hash(password);

    const user = await UserDatabaseService.getUserByUsername(username);

    if (!user) {
      throw new AppError(400, "User not found");
    }

    const { password: hashedPassword } = user;

    const passwordMatches = await argon2.verify(hashedPassword, password);

    if (passwordMatches === false) {
      throw new AppError(401, "Wrong password");
    }

    return user;
  }

  static async signin(username: string, password: string, email: string) {
    const passwordHash = await argon2.hash(password);

    const usernameExists = (await UserDatabaseService.getUserByUsername(
      username,
    ))
      ? true
      : false;

    const emailExists = (await UserDatabaseService.getUserByEmail(email))
      ? true
      : false;

    if (usernameExists) {
      throw new AppError(400, "Username already exists");
    } else if (emailExists) {
      throw new AppError(400, "Email already exists");
    }

    await UserDatabaseService.createUser(username, passwordHash, email);
  }
}

export default AuthService;
