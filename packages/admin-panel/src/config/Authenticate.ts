import { Request } from 'express';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { container } from 'tsyringe';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '@modules/user/infra/sequelize/repositories/UserRepository';
import { AuthenticateUserService } from '@modules/user/services/AuthenticateUserService';

const UserRepo = new UserRepository();

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
      // if (!user) return done(null, false);
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
        console.log(error);
        return done(null, false, { message: error.message });
      }
    }
  )
);
export default (): void => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const user = await UserRepo.findById({ id });
    done(null, user);
  });
};
