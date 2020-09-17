import { App } from './app';
import { sequelize } from '../sequelize';

const connect = async () => {
  await sequelize.authenticate();
  const { app } = new App();
  const port = process.env.PORT || 3000;
  // eslint-disable-next-line
  app.listen(port, () => console.log('Serveszr Runnig st por 3000'));
};
connect();
