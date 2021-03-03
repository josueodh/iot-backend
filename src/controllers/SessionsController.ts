import { Response, Request } from 'express';
import User from 'models/User';
import AuthenticateUserService from 'services/AuthenticateUserService';
import { getRepository } from 'typeorm';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = new AuthenticateUserService();

    const { user, token } = await authService.execute({ email, password });

    return response.json({ user, token });
  }
}
export default SessionsController;
