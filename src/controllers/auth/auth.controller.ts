import { catchAsync } from '@/utils/catch-async.utils';
import { RequestHandler } from 'express';
import { UserRegistration, UserLogin } from '@/types/user.types';
import AuthService from '@/services/auth.service';
import StatusCode from '@/constants/status-code.constants';
import { UserResource } from '@/resources/user.resource';

export class AuthController {
  login: RequestHandler = catchAsync(async (req, res) => {
    const user: UserLogin = req.body;

    const userLoged = await AuthService.login(user);

    res.status(StatusCode.OK).json({
      message: 'User logged in successfully',
      data: UserResource.toJSON(userLoged.user),
      token: userLoged.token,
    });
  });

  register: RequestHandler = catchAsync(async (req, res) => {
    const user: UserRegistration = req.body;

    const newUser = await AuthService.register(user);

    res.status(StatusCode.CREATED).json({
      message: 'User created successfully',
      data: UserResource.toJSON(newUser),
    });
  });

  me: RequestHandler = catchAsync(async (req, res) => {
    const user = await AuthService.me(req.userId);

    res.status(StatusCode.OK).json({
      message: 'User found successfully',
      data: UserResource.toJSON(user),
    });
  });
}

export default new AuthController();
