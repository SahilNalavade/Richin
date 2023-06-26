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

const PortfolioData = () => {
  const [data, setData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
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
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/portfolio');
      const [jsonData, adata] = await response.json();
      setData(JSON.parse(jsonData));
      setAnalysis(JSON.parse(adata));
      setChartData({
        datasets: [
          {
            data: [analysis?.stocks_percentage, analysis?.crypto_percentage],
            backgroundColor: ['#FF721E', '#90C9FF'],
          },
        ],
        labels: ['Equity', 'Crypto'],
      });
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const analysisWrapperStyles = {
    marginTop:'20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CBE0FF',
    color: '#000',
    padding: '20px',
    marginBottom: '20px',
    margin: '20px',
    maxWidth: '100%',
    margin: '0 auto',

    
  };

  const currentInvestedStyles = {
    display: 'flex',
  };

  const currentStyles = {
    flex: '1',
    color:'#38aa7d',
    padding: '5px',
    textAlign: 'center',
    fontSize: '40px',
    marginRight:'30px',
  };

  const investedStyles = {
    flex: '1',
 
    padding: '5px',
    textAlign: 'center',
    fontSize: '40px',
  };

  const totalPLStyles = {
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '24px',
  };

  const chartStyle = {
    width: '30%',
    height: 'auto',
    margin: '40px',
  };

  return (
    <ChakraProvider>
      <Navbarrrrr />
    <div>
      <div style={analysisWrapperStyles}  >
        <div style={currentInvestedStyles} >
    
          <div >
            <p style={{padding: '10px',
    textAlign: 'center',
    fontSize: '25px',fontWeight:'bold'}}>Current:</p>
            <p style={currentStyles}>{analysis && analysis.total_value}</p>
          </div>
          <div >
          <p style={{padding: '10px',
    textAlign: 'center',
    fontSize: '25px',fontWeight:'bold'}}>Invested:</p>
            <p style={investedStyles}>{analysis && analysis.invested}</p>
          </div>
        </div>
        <div style={totalPLStyles}>
          <p>Total P&amp;L: {analysis && analysis.total_PL}</p>
          <p >Balance: {analysis && analysis.stocks_percentage}</p>
        </div>
      </div>

      {/* <div style={chartStyle}>
        <Doughnut data={chartData} />
      </div> */}

      {data ? (
       <table style={{ border: '1px solid #000', padding: '10px', borderCollapse: 'collapse', width: '100vw',paddingTop:'20px' }}>
       <thead>
         <tr>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#bbdddc', color: '#000' }}>Stock Name</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#ccccff', color: '#000' }}>Quantity</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#bbdddc', color: '#000' }}>Purchase</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#ccccff', color: '#000' }}>UID</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#bbdddc', color: '#000' }}>Stock Value</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#ccccff', color: '#000' }}>PL</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#bbdddc', color: '#000' }}>Total Amount</th>
           <th style={{ border: '1px solid #000', padding: '10px', fontSize: '22px', background: '#ccccff', color: '#000' }}>Percentage</th>
         </tr>
       </thead>
       <tbody>
         {data.map((item, index) => (
           <tr key={index}>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#bbdddc', color: '#000' }}>{item.stock_name}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#e6e6ff', color: '#000' }}>{item.quantity}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#bbdddc', color: '#000' }}>{item.purchase}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#e6e6ff', color: '#000' }}>{item.uid}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#bbdddc', color: '#000' }}>{item.stock_value}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#e6e6ff', color: '#000' }}>{item.PL}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#bbdddc', color: '#000' }}>{item.Total_amount}</td>
             <td style={{ borderTop: '1px solid #fff', padding: '10px', fontSize: '20px', background: '#e6e6ff', color: '#000' }}>{item.percentage}</td>
           </tr>
         ))}
       </tbody>
     </table>
     
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </ChakraProvider>
  );
};

export default PortfolioData;
