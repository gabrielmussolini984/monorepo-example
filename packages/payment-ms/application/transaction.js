// const { executeRequest } = require('../payment_providers/pagarme');
// const { getClientByKey } = require('./client');
// const Client = require('../domain/client');

// module.exports = {
//   processSubscription: async (transaction) => {
//     if (transaction.gateway.name == 'pagar.me') {
//       const pagarme = {
//         transactionType: 'subscription',
//         endpoint: 'https://api.pagar.me/1/subscriptions',
//         subscriptionRequest: transaction
//       };
//       try {
//         pagarme = await executeRequest(pagarme);

//         // const clientResult = await getClientByKey(transaction.secretKey);
//         // const client = new Client();
//         // client.id = clientResult.id;

//         // pagarme.tr
//       } catch (error) {
//         console.log(error);
//         throw error;
//       }
//     } else {
//       throw 'Gateway não encontrado';
//     }
//   }
// };
