import axios from 'axios';

const paymentSubscriptionApi = axios.create({
  baseURL: 'https://sfqtvxhs70.execute-api.us-east-2.amazonaws.com/'
});

export { paymentSubscriptionApi };
