import { catchAsync } from '@/utils/catch-async.utils';
import { RequestHandler } from 'express';
import { UserRegistration } from '@/types/user.types';
import AuthService from '@/services/auth.service';
import StatusCode from '@/constants/status-code.constants';
import { UserResource } from '@/resources/user.resource';

export class AuthController {
  register: RequestHandler = catchAsync(async (req, res) => {
    const user: UserRegistration = req.body;

    const newUser = await AuthService.register(user);

    res.status(StatusCode.CREATED).json({
      message: 'User created successfully',
      data: UserResource.toJSON(newUser),
    });
  });
}

export default new AuthController();
