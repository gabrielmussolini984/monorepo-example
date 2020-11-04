import 'reflect-metadata';
import { resolve, join } from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import _handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
// import paginateHelper from 'express-handlebars-paginate';
// import cors from 'cors';
// import helmet from 'helmet';
import '@shared/container';
import { getTenant } from '@modules/tenant/infra/middlewares/getTenant';
import { SubscriptionConsumers } from '@modules/subscription/infra/consumes/';
import { globalVars } from './middlewares/globalVariables';
import '@config/Authenticate';
import { AppError } from '../../errors/MainError';
import routes from './routes';

import { RabbitmqServer } from '../../../config/rabbitmq-server';

export class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middleware();
    this.consumers();
  }

  middleware(): void {
    // this.app.use(helmet());
    // this.app.use(cors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.static(resolve(__dirname, '..', '..', '..', 'public'))
    );
    this.app.set('views', join(__dirname, '..', '..', '..', 'views'));
    this.app.engine(
      'handlebars',
      handlebars({
        handlebars: allowInsecurePrototypeAccess(_handlebars)
      })
    );
    this.app.set('view engine', 'handlebars');
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

  async consumers(): Promise<void> {
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    await server.consume('express', (message) => {
      const subscriptionConsumers = new SubscriptionConsumers();
      subscriptionConsumers.store(JSON.parse(message.content.toString()));
    });
  }
}
