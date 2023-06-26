import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Navbarrrrr from '@/components/Navbarrrrr'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Heading,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function TablePage() {
  const [data, setData] = useState([]);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#D8706C', '#9F3D39'],
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

      if (portfolioAnalysis) {
        const { stocks_percentage, crypto_percentage } = portfolioAnalysis;
        setChartData({
          datasets: [
            {
              data: [stocks_percentage, crypto_percentage],
              backgroundColor: ['#D8706C', '#9F3D39'],
            },
          ],
          labels: ['Equity', 'Crypto'],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <ChakraProvider>
      <Navbarrrrr />
    <div style={{background:'#fff' ,color:'#000'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Heading style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%' }}>Your Basket</Heading>
        <a href="/Ik" style={{
      marginRight: '20%',
      marginTop: '2%',
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#FFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}>
  
    Invest

</a>

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' ,margin:'40px 100px',marginBottom:'2%',color:'#000'}}>
      <div style={{ width: '30%', border: '1px solid white', background: '#bbdddc', padding: '10px', fontSize: '18px', padding: '30px 10px', borderRadius: '40px', textAlign: 'center', position: 'relative',lineHeight:'45px' }}>
  {portfolioAnalysis && (
    <div>
      <h2>Portfolio Analysis</h2>
      <p><span style={{ fontWeight: 'bold' }}>Total Investment: </span>{portfolioAnalysis.total_purchase}</p>
      <p><span style={{ fontWeight: 'bold' }}>Number of Years: </span>{portfolioAnalysis.years}</p>
      <p><span style={{ fontWeight: 'bold' }}>Expected return: </span>{portfolioAnalysis.total_expected_return}</p>
    </div>
  )}
  <img src="/target.png" alt="Image" style={{ position: 'absolute', bottom: 0, right: 0,width:'100px' }} />
</div>

<div style={{ width: '30%', height: '300px', border: '1px solid white', background: '#26d017', padding: '10px', fontSize: '20px', padding: '30px 10px', textAlign: 'center', borderRadius: '40px', position: 'relative' ,lineHeight:'45px'}}>
  {portfolioAnalysis && (
    <div>
      <h2>Equity</h2>
      <p>The Stocks We selected for your portfolio</p>
      <p>{portfolioAnalysis.stocks_percentage}%</p>
    </div>
  )}
 <img src="/rupee.png" alt="Image" style={{ position: 'absolute', bottom: 15, right: 15,width:'80px' }} />
</div>

<div style={{ width: '30%', border: '1px solid white', background: '#fee0a6', padding: '10px', fontSize: '20px', padding: '30px 10px', borderRadius: '40px', textAlign: 'center', position: 'relative',lineHeight:'45px' }}>
  {portfolioAnalysis && (
    <div>
      <h2>Crypto</h2>
      <p>The Crypto We selected for your portfolio</p>
      <p>{portfolioAnalysis.crypto_percentage}%</p>
    </div>
  )}
  <img src="/crypto.png" alt="Image" style={{ position: 'absolute', bottom: 15, right: 15,width:'80px' }} />
</div>

    </div>
<div>
    <div className="App" style={chartStyle}><div style={{background:'#101010' ,width:'500px', padding:'20px',borderRadius:'50px' ,color:'#fff'}}>
    <h1>Portfolio Allocation:</h1>
        <Doughnut data={chartData} />
      </div>
      </div>
      </div>
      <h1 style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%', marginBottom: '2%',backgroundImage: 'linear-gradient( 	#c3f53c,#00c805)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#fff'}}>Equity</h1>
    <table style={{ border: '1px solid #000', padding: '10px', borderCollapse: 'collapse' , width: '100vw'}}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #000', padding: '10px',fontSize:'22px',background:'#bbdddc' }}>Symbol</th>
      <th style={{ border: '1px solid #000', padding: '10px',fontSize:'22px' ,background:'#ccccff'}}>Quantity</th>
      <th style={{ border: '1px solid #000', padding: '10px',fontSize:'22px' ,background:'#bbdddc' }}>Price</th>
      <th style={{ border: '1px solid #000', padding: '10px',fontSize:'22px' ,background:'#ccccff'}}>Amount Invested</th>
      <th style={{ border: '1px solid #000', padding: '10px',fontSize:'22px',background:'#bbdddc'  }}>Exp Returns</th>
      <th style={{ border: '1px solid #000', padding: '10px ',fontSize:'22px' ,background:'#ccccff'}}>Percentage</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px' ,background:'#bbdddc' }}>{item.Symbol}</td>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px' ,background:'#e6e6ff'}}>{item.quantity}</td>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px' ,background:'#bbdddc'  }}>{item.price}</td>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px',background:'#e6e6ff' }}>{item.purchase}</td>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px' ,background:'#bbdddc' }}>{item.exp_returns}</td>
        <td style={{ borderTop: '1px solid #fff', padding: '40px',fontSize:'20px' ,background:'#e6e6ff' }}>{item.percentage}</td>
      </tr>
    ))}
  </tbody>
</table>
{/* <h1 style={{alignSelf: 'flex-start', marginLeft: '5%', marginTop: '2%', marginBottom: '2%',backgroundImage: 'linear-gradient( 	#00FFFF,#007bff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#fff'}}>Crypto</h1> */}

    </div>
    </ChakraProvider>
  );
}

export default TablePage;
