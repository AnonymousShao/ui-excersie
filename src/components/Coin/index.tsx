import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import styles from './index.less';
import http from '../../utils/request';
import { toThousands } from '../../utils/utils';

enum coinState{
  Active,
  Terminated,
  Suspended,
}

interface Props {
  id: number;
  symbol: string;
  status: number;
  createdTimestamp: Date;
  leaseEnd: number;
  blockNumber: number;
  unit?: string;
}

const Coin = ({
  id,
  symbol,
  status,
  unit = '$',
  createdTimestamp,
  leaseEnd,
  blockNumber,
}:Props) => {
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState<number>(0.00);
  const [logo, setLogo] = useState<string>('');
  // expiry date = ${createdTimestamp} + 3s * (${leaseEnd} - ${blockNumber})

  useEffect(() => {
    if(id){
      let getNumber = 0;
      http.post('/api/getCoinPrice', { id }).then((res: {
        data: {
          price: number;
        }
      }) => {
        if(!getNumber){
          getNumber += 1;
        } else {
          setLoading(false);
        }
        setPrice(() => res.data.price);
      });
  
      http.post('/api/getCoinLogo', { id })
      .then((res: {
        data: {
          src: string;
        }
      }) => {
        if(!getNumber){
          getNumber += 1;
        } else {
          setLoading(false);
        }
        setLogo(() => res.data.src);
      });
    }
  }, [id]);

  const expiryDate = useMemo(() => {
    if(createdTimestamp && leaseEnd && blockNumber){
      const duration = (leaseEnd - blockNumber) * 3;
      const time = dayjs(createdTimestamp).add(duration, 's');
      return time.format('DD/MMM/YYYY HH:mm');
    }
  }, [createdTimestamp, leaseEnd, blockNumber]);
  
  return (
    <div
      className={`
        ${styles.coinContainer}
        ${loading ? styles.loading : ''}
      `}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.name}>
            <span className={styles.text}>
              { symbol || '--' }
            </span>
          </span>
          <span
            className={styles.stateWrapper}
          >
            <span className={styles.bgLeft}></span>
            <span className={`
              ${styles.bgRight}
              ${styles[coinState[status].toLocaleLowerCase()]}
            `}>
              <span className={styles.stateIcon}>
                <span className={styles.outer}>
                  <span className={styles.middle}>
                    <span className={styles.inner}>
                    </span>
                  </span>
                </span>
              </span>
              <span className={styles.text}>
                { coinState[status] }
              </span>
            </span>
          </span>
        </div>
        <div className={styles.bottom}>
          <div className={styles.coinIconWrapper}>
            <span className={styles.border}>
              <span className={styles.icon}>
                <img alt='' src={logo} className={styles.img} />
              </span>
            </span>
          </div>
          <div className={styles.profile}>
            <div className={styles.amount}>
              <span className={styles.text}>
               {`${unit} ${toThousands(price) || '0'}`}
              </span>
            </div>
            <div className={styles.time}>
              <span className={styles.text}>
                { `End: ${expiryDate}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;
