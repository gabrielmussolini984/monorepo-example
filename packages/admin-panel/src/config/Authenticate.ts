import { Request } from 'express';
import { container } from 'tsyringe';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '@modules/user/infra/sequelize/entities/User';
import { UserRepository } from '@modules/user/infra/sequelize/repositories/UserRepository';
import { AuthenticateUserService } from '@modules/user/services/AuthenticateUserService';

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findById({ id });
  done(null, user);
});

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req: Request, email: string, password: string, done) => {
      try {
        const authenticateUserService = container.resolve(
          AuthenticateUserService
        );

        const userSuccessLogin = await authenticateUserService.execute({
          email,
          password,
          tenant_id: req.tenant.id
        });
        return done(null, userSuccessLogin);
      } catch (error) {
        return done(null, false, { message: error.message });
      }
    }
  )
);
