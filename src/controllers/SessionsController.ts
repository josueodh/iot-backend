import { Response, Request } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = new AuthenticateUserService();

    const { user, token } = await authService.execute({ email, password });

    return response.json({ user, token });
  }
}
export default SessionsController;
