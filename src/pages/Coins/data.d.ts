export interface CoinInfoType {
  id: nunmber;
  blockNumber: number;
  transactionIndex: number;
  sources: number[];
  symbol: string;
  slug: string;
  leaseEnd: number;
  subscriptionId: number;
  networkId: number;
  aggregationStrategy: number;
  reportingStrategy: number;
  status: number;
  client: {
    clientType: number;
    connectionInfo: {
      contractAddress: string;
      networkId: number;
    },
  },
  createdTimestamp: Date,
  updatedTimestamp: Date,
  display: boolean,
}