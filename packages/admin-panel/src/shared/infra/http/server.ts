import { App } from './app';
import { sequelize } from '../sequelize';

const connect = async () => {
  await sequelize.authenticate();
  const { app } = new App();
  const port = process.env.PORT || 3000;
  // eslint-disable-next-line
  app.listen(port, () => console.log('Server Running at port 3000'));
};
connect();
