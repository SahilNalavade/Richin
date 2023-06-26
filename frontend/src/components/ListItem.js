import React from 'react'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'

export default function ListItem({coin} ) {
  return (
 
        <div className={styles.homecrypto} >
            
          <Link href={`/Coins/${coin.id}`}>
          <span className={styles.homecryptosimage}><img className={styles.image} src={coin.image} /></span>
            <span className={styles.homecryptosname}>{coin.name}</span>
            {coin.priceBtc && (<span className={styles.homecryptosiprices}>
                <span className={styles.homecryptobtc}>
                    <img src="/bitcoin.webp" />
                    {coin.priceBtc} BTC</span>
                <span className={styles.homecryptousd}>{coin.priceUsd} USD</span>
                </span>)}
          </Link>
        </div>
  )
}
