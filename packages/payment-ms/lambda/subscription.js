const axios = require('axios');

module.exports.subscription = async (event) => {
  const {
    api_key,
    plan_id,
    payment_method,
    customer,
    card_hash = '',
    post_back_url = '',
    soft_descriptior
  } = JSON.parse(event.body);
  try {
    const url = 'https://api.pagar.me/1/subscriptions';
    const params = {
      api_key,
      plan_id,
      payment_method,
      customer,
      card_hash,
      post_back_url,
      soft_descriptior
    };
    const response = await axios.post(url, params);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data
      })
    };
  } catch (error) {
    console.log(error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 500,
        message: `Internal server error `
      })
    };
  }
};
