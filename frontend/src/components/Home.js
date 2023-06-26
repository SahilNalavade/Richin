import homeStore from '@/stores/homeStore'
import React from 'react'
import styles from '../styles/Home.module.scss'
import Header from '@/components/Header'
import Link from 'next/link'
import ListItem from '@/components/ListItem'

export default function Home() {
  const store = homeStore()

  React.useEffect(() => {
    store.fetchCoins()
  }, [])

  return (
    <div className={`${styles.container} ${styles.darkBackground}`}>
     

      <header className={styles.headersearch}>
      <h2 style={{color:'#fff',fontSize:'25px', width:'100%'}}>New to Crypto. We got you covered search for over a 100 different cryptos and stay updated with all the prices</h2>
        <div className={styles.width}>
          
          <div className={styles.homesearchinput}>
            <input
              placeholder='Search for a coins'
              type="text"
              className={styles.input}
              value={store.query}
              onChange={store.setQuery}
            />
          </div>
        </div>
      </header>
      <div className={styles.homecryptos}>
        <div className={styles.width}>
          <h2> {store.searched ? 'Search Results' : 'Trending Coins'}</h2>
          <div className={styles.homecryptoslist}>
            {store.coins.map((coin) => (
              <ListItem key={coin.id} coin={coin} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
