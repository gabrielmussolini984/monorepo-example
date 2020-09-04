import { Request } from 'express';
import { User } from '@modules/user/infra/sequelize/entities/User';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '@modules/user/infra/sequelize/repositories/UserRepository';
import { ComparePasswordService } from '@modules/user/services/ComparePasswordService';

const UserRepo = new UserRepository();
export default (): void => {
  passport.use(
    'local',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req: Request, email: string, password: string, done) => {
        const tenant_id = req.tenant?.id || '';
        const user = await UserRepo.findByEmail({
          email,
          tenant_id,
        });
        if (!user) return done(null, false);
        const comparePassword = new ComparePasswordService();
        if (!(await comparePassword.execute({ user, password })))
          return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      },
    ),
  );

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const user = await UserRepo.findById({ id });
    done(null, user);
  });
};
