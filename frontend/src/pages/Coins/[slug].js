import showStore from '../../stores/showStore'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Show() {
    const store = showStore()
    const router = useRouter()
    const {slug}=router.query
    React.useEffect(() => {
        if (slug){store.fetchData(slug)
        }
        
    },[slug])

    if (!store.data) return <></>;

  return (
    <div>
        <Header />
        <header className={styles.showheader}>
  {store.data && (
    <>
      <img src={store.data.image.large} />
      <h2> {store.data.name} ({store.data.symbol})</h2>
    </>
  )}
</header>
<div className={styles.width}>
<div className={styles.showgraph}>
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart
          data={store.graphData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
</div>
</div>  

<div className={styles.showdetails}>
<div className={styles.width}>
    <h2>Details</h2>

    <div className={styles.showdetailsrow}>
            <h3>Market cap rank</h3>
            <span>{store.data.market_cap_rank}</span>
        </div>

        <div className={styles.showdetailsrow}>
            <h3>24h high</h3>
            <span>${store.data.market_data.high_24h.usd}</span>
        </div>

        <div className={styles.showdetailsrow}>
            <h3>24h low</h3>
            <span>${store.data.market_data.low_24h.usd}</span>
        </div>

        <div className={styles.showdetailsrow}>
            <h3>Circulating supply</h3>
            <span>${store.data.market_data.circulating_supply}</span>
        </div>

        <div className={styles.showdetailsrow}>
            <h3>Current price</h3>
            <span>${store.data.market_data.current_price.usd}</span>
        </div>

        <div className={styles.showdetailsrow}>
            <h3>1 year change</h3>
            <span>${store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
        </div>
    </div>
</div>
</div>
        
  )
}
