import 'reflect-metadata';
import { resolve, join } from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
// import paginateHelper from 'express-handlebars-paginate';
// import cors from 'cors';
// import helmet from 'helmet';
import flash from 'connect-flash';
import localAuth from '@config/Authenticate';
import { getTenant } from '@modules/tenant/infra/middlewares/getTenant';
import { AppError } from '../../errors/MainError';
import { globalVars } from './middlewares/globalVariables';
import '@shared/container';
import routes from './routes';

localAuth();

export class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middleware();
  }

  middleware(): void {
    // this.app.use(helmet());
    // this.app.use(cors());

    this.app.set('views', join(__dirname, '..', '..', '..', 'views'));
    this.app.engine('handlebars', handlebars());
    this.app.set('view engine', 'handlebars');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.static(resolve(__dirname, '..', '..', '..', 'public'))
    );
    this.app.use(
      session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(flash());

    this.app.use(getTenant);
    this.app.use(globalVars);

    this.app.use(routes);

    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).render('errors/404', {
          layout: 'mainLogin',
          tenant: req.tenant
        });
      }
      // eslint-disable-next-line
      console.log(err);
      return res.status(500).render('errors/500', {
        layout: 'mainLogin',
        tenant: req.tenant
      });
    });
  }
}
