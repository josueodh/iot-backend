import { Request, Response } from "express";
import CreateUsersService from "../services/CreateUserService";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
}
class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    const userReturn = {
      user: {
        name,
        email,
      },
    };
    return response.json(userReturn);
  }
}
export default UsersController;
