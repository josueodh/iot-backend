import { Response, Request } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = new AuthenticateUserService();

    const { user, token } = await authService.execute({ email, password });

    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
    return response.json(tokenReturn);
  }
}
export default SessionsController;
