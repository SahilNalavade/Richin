import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(Tooltip, Title, ArcElement, Legend);

function TablePage() {
  const [data, setData] = useState([]);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [10, 20],
        backgroundColor: ['#D8706C', '#9F3D39', '#4B1513'],
      },
    ],
    labels: ['Equity', 'Crypto'],
  });

  useEffect(() => {
    fetchData();
  }, []);


  const chartStyle = {
    width: '25%',
    height: '25%',
    margin:'0% 0% 5% 7%',
  };

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/table');
      const [jsonData, portfolioAnalysis] = await response.json();
      const parsedData = JSON.parse(jsonData);
      setData(parsedData);
      setPortfolioAnalysis(portfolioAnalysis);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%' }}>Your Basket</h1>
        <button
          style={{
            marginRight: '20%',
            marginTop: '2%',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Invest
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' ,margin:'40px 100px',marginBottom:'2%'}}>
      
      <div style={{ width: '20%', border: '1px solid white',background:'#101010', padding: '10px',fontSize:'20px' ,padding:'30px 10px'}}>
      {portfolioAnalysis && (
        <div>
          <h2>Equity</h2>
          <p>Crypto Percentage: {portfolioAnalysis.stocks_percentage}</p>
        
        </div>
      )}
      </div>
      <div style={{ width: '20%', border: '1px solid white',background:'#101010', padding: '10px' ,fontSize:'20px',padding:'30px 10px'}}>
      {portfolioAnalysis && (
        <div>
          <h2>Crypto</h2>
          <p>Crypto Percentage: {portfolioAnalysis.crypto_percentage}</p>
          
        </div>
      )}
      </div>
      <div style={{ width: '50%', border: '1px solid white',background:'#101010', padding: '10px' ,fontSize:'20px',padding:'30px 10px'}}>
      {portfolioAnalysis && (
        <div>
          <p>Total amount Invested: {portfolioAnalysis.total_purchase}</p>
          <p>Total expected return: {portfolioAnalysis.total_expected_return}</p>
          <p>Expected return on total equity: {portfolioAnalysis.stocks_expected_return}</p> 
          <p>Expected return on total crypto: {portfolioAnalysis.crypto_expected_return}</p> 
          <p>Total change: { portfolioAnalysis.total_expected_return - portfolioAnalysis.total_purchase }</p>   
        </div>
      )}
      </div>
    </div>

    <div className="App" style={chartStyle}>
        <Doughnut data={chartData} />
      </div>

    </div>
  );
}

export default TablePage;
