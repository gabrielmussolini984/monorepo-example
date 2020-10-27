const axios = require('axios');
const { RabbitmqServer } = require('../config/Rabbitmq-server');

const { Plan, Subscription, Payment, Subscriber } = require('../models');
// const transactionIsOk = require('../services/transaction');

class SubscribeController {
  async index(req, res) {
    try {
      const plan = await Plan.findOne({ where: { id: req.params.id } });
      return res.render('subscribe', {
        plan: plan.toJSON(),
        encriptionKey: process.env.GATEWAY_ENCRYPTION_KEY
      });
    } catch (error) {
      return res.redirect('/');
    }
  }

  async store(req, res) {
    try {
      const {
        plan_id,
        card_hash,
        name,
        email,
        ddd,
        phone_number,
        document_number,
        zip_code,
        street,
        street_number,
        complementary,
        neighborhood,
        city,
        installments,
        payment_method
      } = req.body;
      const plan = await Plan.findOne({ where: { id: plan_id } });

      const reqSubscription = {
        api_key: process.env.API_KEY,
        plan_id: plan.remote_plan_id,
        payment_method,
        secret_key: process.env.SECRET_KEY,
        gateway_name: process.env.GATEWAY,
        card_hash,
        soft_descriptior: 'Sass Store',
        post_back_url: '',
        customer: {
          name,
          email,
          document_number
        }
      };

      const response = await axios.post(process.env.URL_API, reqSubscription);

      if (response.data.status === 'declined') {
        return new Error('Erro na transação');
      }

      const subscriber = await Subscriber.create({
        name,
        email,
        document_number,
        phone_number,
        city,
        street,
        installments,
        street_number,
        complementary,
        neighborhood,
        zip_code,
        ddd,
        number: street_number
      });
      const subscription = await Subscription.create({
        subscriber_id: subscriber.id,
        remote_subscription_id: response.data.remote_subscription_id,
        remote_plan_id: plan.remote_plan_id,
        plan_id: plan.id,
        start_date: response.data.CurrentPeriodStart,
        expires_at: response.data.CurrentPeriodSEnd,
        status: response.data.Status
      });
      await Payment.create({
        transaction_id: response.data.CurrentTransaction.RemoteTransactionID,
        subscription_id: subscription.id,
        gateway: process.env.GATEWAY,
        payment_type: response.data.PaymentMethod,
        card_brand: response.data.CardBrand,
        card_last_digits: response.data.CardLastDigits,
        boleto_url: response.data.CurrentTransaction.BoletoURL,
        boleto_barcode: response.data.CurrentTransaction.BoletoBarcode,
        boleto_expiration_date:
          response.data.CurrentTransaction.BoletoExpirationDate,
        status: response.data.Status,
        total: response.data.CurrentTransaction.Amount,
        installments: response.data.CurrentTransaction.Installments
      });

      if (response.data.paymentMethod === 'credit_card') {
        const server = await new RabbitmqServer(
          'amqp://admin:admin@rabbitmq:5672'
        );
        await server.start();
        await server.publishInExchange(
          'amq.direct',
          'newSubscription',
          JSON.stringify({ ...response.data, subscriber, subscription })
        );
      }

      if (response.data.status === 'unpaid') {
        return res.render('boleto');
      }

      return res.render('success');
    } catch (error) {
      console.log(error);
      return res.render('home');
    }
  }
}

module.exports = new SubscribeController();
