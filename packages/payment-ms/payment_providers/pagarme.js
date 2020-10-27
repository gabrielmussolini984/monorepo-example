// const { v4: uuidv4 } = require('uuid');
// const axios = require('axios');
// const prepareRequest = (pagarme) => {
//   if (pagarme.transactionType == "subscription") {
//     const requestJson = pagarme.subscriptionRequest;
//     return requestJson;
//   }
//   const requestJson = pagarme.transactionRequest;
//   return requestJson;
// }

// const executeRequest = async (pagarme) => {
//   const data = prepareRequest(pagarme);
//   console.log(data);

//   const config = {
//     method: 'POST',
//     url: pagarme.endpoint,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };
//   try {
//     const response = await axios(config);
//     console.log("Response: ",response);

//     // Gerar um uuid
//     pagarme.subscriptionResponse = uuidv4();
//     pagarme.provider = "pagar.me";

//     return pagarme;
//   } catch (error) {
//     console.log(error);
//     throw "Indisponibilidade de serviço";
//   }
// }

// module.exports = {
//   executeRequest
// }
