const Mock = require('mockjs');

const url = `GET /api/getCoinList`;

const list = [];

for (let i = 0; i < 10; i++) {
  let newObject = {
    id: Mock.Random.increment(1),
    'blockNumber|10000000-99999999': 12297450,
    'transactionIndex|1-128': 6,
    sources: [0, 1, 2, 3],
    symbol: 'eth',
    slug: 'ethereum',
    'leaseEnd|10000000-99999999': 12297450,
    subscriptionId: 7,
    networkId: 0,
    aggregationStrategy: 1,
    reportingStrategy: 0,
    'status|0-2': 0,
    client: {
      clientType: 0,
      connectionInfo: {
        contractAddress: '0x0F9dfd6043965B02e74D01188c13936fBE71D688',
        networkId: 0,
      },
    },
    createdTimestamp: '2021-09-12T08:36:26.555',
    updatedTimestamp: '2021-09-12T08:39:16.526',
    display: true,
  }
  list.push(newObject)
}
const data = Mock.mock(list);
module.exports = {
  [url](req, res) {
    res.status(200).json(data);
  }
}
