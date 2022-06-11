// import logo from '../assets/logo.svg';
import React, { useState, useEffect} from 'react';
import styles from './index.less';
import {
  CoinInfoType,
} from './data';
import Coin from '../../components/Coin';
import http from '../../utils/request';

interface Props {
  title: String;
}

const Coins = ({
  title
}:Props) => {
  // const [loading, setLoading] = useState(false);
  const [list, setList] = useState <CoinInfoType[]>([]);

  useEffect(() => {
    // setLoading(true);
    http.get('/api/getCoinList').then((res: {
      data: CoinInfoType[],
    }) => {
      setList(res.data);
    }).catch(error => {
      console.log('error', error);
    }).finally(() => {
      // setLoading(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
      >
        <div className={styles.titleWrapper}>
          <div
            className={styles.listTitle}
          >
            <span className={styles.icon}>icon</span>
            <span className={styles.text}>{ title }</span>
          </div>
        </div>
        <div className={styles.list}>
          {
            list.map(it => {
              const { id, symbol, status, createdTimestamp, leaseEnd, blockNumber } = it;
              const props = {id, symbol, status, createdTimestamp, leaseEnd, blockNumber};
              return <Coin key={it.id} { ...props } />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Coins;
