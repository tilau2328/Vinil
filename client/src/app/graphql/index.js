import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { applyMiddleware, applyAfterware } from 'redux';

//const wsClient = new SubscriptionClient('ws://192.168.99.100:8000/subscriptions', { reconnect: true });
const wsClient = new SubscriptionClient('ws://localhost:8000/subscriptions', { reconnect: true });

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/graphql',
  //uri: 'http://192.168.99.100:8000/graphql',
  dataIdFromObject: o => o.id
});

const subscriptionNetworkInterface = addGraphQLSubscriptions(networkInterface, wsClient);

const config = {
  networkInterface: subscriptionNetworkInterface,
  connectToDevTools: true
 };

const client = new ApolloClient(config);

export default client;
