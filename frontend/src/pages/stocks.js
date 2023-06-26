// import { useEffect, useState } from 'react';
// import fetchStockData from '../../../backend/app';

// const StockDataPage = () => {
//   const [stockData, setStockData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchStockData();
//       setStockData(data || []);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Stock Data</h1>
//       <ul>
//         {stockData.map((stock, index) => (
//           <li key={index}>
//             Symbol: {stock.symbol}, Price: {stock.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StockDataPage;
