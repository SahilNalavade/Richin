import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Stock() {
  const [stockSymbol, setStockSymbol] = useState('ITC');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [flaskResponse, setFlaskResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const carouselData1 = [
    { title: 'Card 1', description: 'This is card 1', image: '/hdfc.png' },
    { title: 'Card 2', description: 'This is card 2', image: '/sbi.png' },
    { title: 'Card 3', description: 'This is card 3', image: '/bajaj.png' },
    { title: 'Card 4', description: 'This is card 4', image: '/itc.png' },
    { title: 'Card 5', description: 'This is card 5', image: 'path/to/image5.jpg' },
  ];
  const carouselData2 = [
    { title: 'Card 6', description: 'This is card 6', image: 'path/to/image6.jpg' },
    { title: 'Card 7', description: 'This is card 7', image: 'path/to/image7.jpg' },
    { title: 'Card 8', description: 'This is card 8', image: 'path/to/image8.jpg' },
    { title: 'Card 9', description: 'This is card 9', image: 'path/to/image9.jpg' },
    { title: 'Card 10', description: 'This is card 10', image: 'path/to/image10.jpg' },
  ];
  const carouselData3 = [
    { title: 'Card 11', description: 'This is card 11', image: 'path/to/image11.jpg' },
    { title: 'Card 12', description: 'This is card 12', image: 'path/to/image12.jpg' },
    { title: 'Card 13', description: 'This is card 13', image: 'path/to/image13.jpg' },
    { title: 'Card 14', description: 'This is card 14', image: 'path/to/image14.jpg' },
    { title: 'Card 15', description: 'This is card 15', image: 'path/to/image15.jpg' },
  ];
  const carouselData4 = [
    { title: 'Card 16', description: 'This is card 16', image: 'path/to/image16.jpg' },
    { title: 'Card 17', description: 'This is card 17', image: 'path/to/image17.jpg' },
    { title: 'Card 18', description: 'This is card 18', image: 'path/to/image18.jpg' },
    { title: 'Card 19', description: 'This is card 19', image: 'path/to/image19.jpg' },
    { title: 'Card 20', description: 'This is card 20', image: 'path/to/image20.jpg' },
  ];
  const carouselData5 = [
    { title: 'Card 16', description: 'This is card 21', image: 'path/to/image16.jpg' },
    { title: 'Card 17', description: 'This is card 22', image: 'path/to/image17.jpg' },
    { title: 'Card 18', description: 'This is card 23', image: 'path/to/image18.jpg' },
    { title: 'Card 19', description: 'This is card 24', image: 'path/to/image19.jpg' },
    { title: 'Card 20', description: 'This is card 25', image: 'path/to/image20.jpg' },
  ];

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsModalOpen(true);
  }

  const styles = {
    carouselSection: {
      background: '#fff',
      textAlign: 'center',
      maxWidth: '100%',
      margin: '0 auto',
      background: '#fff',
      color: '#000',
    },
    card: {
      width: '300px',
      background: '#fff',
      padding: '20px',
      borderRadius: '3px',
      margin: '10px',
      border: '1px solid #000',
      marginBottom: '20px',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
    cardImage: {
      width: '20%',
      marginBottom: '10px',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalImage: {
      width: '40%',
      marginBottom: '10px',
    },
  };

  // Slick settings
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  useEffect(() => {
    fetchStock();
  }, [stockSymbol]);

  function fetchStock() {
    const API_KEY = '63Z37RP8AY3LBKVF';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_Call)
      .then((response) => response.json())
      .then((data) => {
        const stockChartXValuesFunction = [];
        const stockChartYValuesFunction = [];

        for (let key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);

        // Make API call to Flask server
        const flaskAPIURL = 'http://localhost:5000/infostocks'; // Replace with your Flask API URL
        const requestData = { ticker: stockSymbol };

        fetch(flaskAPIURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((flaskResponse) => {
            setFlaskResponse(flaskResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  function handleInputChange(event) {
    setStockSymbol(event.target.value);
  }

  return (
    <>
     <div style={{ background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', color: '#000' }}>
          <h2>Top Gainers</h2>
          <Slider {...slickSettings}>
            {carouselData1.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '300px',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '3px',
                  margin: '10px',
                  border: '1px solid #000',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                }}
                className="card"
              >
                <img src={item.image} alt="Card Image" style={{ width: '20%', marginBottom: '10px' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div style={{ background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', color: '#000' }}>
          <h2>Top Losers</h2>
          <Slider {...slickSettings}>
            {carouselData2.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '300px',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '3px',
                  margin: '10px',
                  border: '1px solid #000',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                }}
                className="card"
              >
                <img src={item.image} alt="Card Image" style={{ width: '20%', marginBottom: '10px' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div style={{ background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', color: '#000' }}>
          <h2>52 Week High</h2>
          <Slider {...slickSettings}>
            {carouselData3.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '300px',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '3px',
                  margin: '10px',
                  border: '1px solid #000',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                }}
                className="card"
              >
                <img src={item.image} alt="Card Image" style={{ width: '20%', marginBottom: '10px' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div style={{ background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', color: '#000' }}>
          <h2>52 Week Low</h2>
          <Slider {...slickSettings}>
            {carouselData4.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '300px',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '3px',
                  margin: '10px',
                  border: '1px solid #000',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                }}
                className="card"
              >
                <img src={item.image} alt="Card Image" style={{ width: '20%', marginBottom: '10px' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div style={{ background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', background: '#fff', color: '#000' }}>
          <h2>New Listing / IPO</h2>
          <Slider {...slickSettings}>
            {carouselData5.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '300px',
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '3px',
                  margin: '10px',
                  border: '1px solid #000',
                  marginBottom: '20px',
                  boxSizing: 'border-box',
                }}
                className="card"
              >
                <img src={item.image} alt="Card Image" style={{ width: '20%', marginBottom: '10px' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div style={{ background: '#000', textAlign: 'center' }}>
        <h1>Stock Market</h1>
        <div>
          <label htmlFor="symbolInput">Enter a stock symbol:</label>
          <input id="symbolInput" type="text" value={stockSymbol} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              width: 720,
              height: 440,
              title: `${stockSymbol} Stock Price`,
              plot_bgcolor: '#000',
              paper_bgcolor: '#000',
              font: { color: '#fff' },
            }}
          />
        </div>
        {flaskResponse && (
  <div>
    <h3>Flask Response:</h3>
    <pre>{JSON.stringify(flaskResponse, null, 2)}</pre>
  </div>
)}
      </div>
    </>
  );
}
--------------------------
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ChakraProvider,Flex, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel ,Image} from '@chakra-ui/react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Stock() {
  const [stockSymbol, setStockSymbol] = useState('ITC');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [flaskResponse, setFlaskResponse] = useState(null);

  useEffect(() => {
    fetchStock();
  }, [stockSymbol]);

  function fetchStock() {
    const API_KEY = '63Z37RP8AY3LBKVF';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_Call)
      .then((response) => response.json())
      .then((data) => {
        const stockChartXValuesFunction = [];
        const stockChartYValuesFunction = [];

        for (let key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);

        // Make API call to Flask server
        const flaskAPIURL = 'http://localhost:5000/infostocks'; // Replace with your Flask API URL
        const requestData = { ticker: stockSymbol };

        fetch(flaskAPIURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((flaskResponse) => {
            setFlaskResponse(flaskResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  function handleInputChange(event) {
    setStockSymbol(event.target.value);
  }

  return (
    <ChakraProvider>
      <div style={{ background: '#000', textAlign: 'center' }}>
        <h1>Stock Market</h1>
        <Tabs>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
            <Tab>Four</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <Flex justify="center" align="center">
          <Box p="4" m="4" bg="gray.800" color="white">
          <Image src="/itc.png" alt="Stock Image" mt="4" h="px"/>
            <Text fontSize="2xl" fontWeight="bold">
              {stockSymbol}/USDT
            </Text>
            <Text fontSize="xl" mt="2">
              Bitcoin
            </Text>
            <Text fontSize="xl" mt="4">
              53,68,18,949.90
            </Text>
            <Text fontSize="xl" mt="2">
              Volume(USDT)
            </Text>
            <Text fontSize="xl" mt="1">
              26481.35 USDT
            </Text>
            <Text fontSize="xl" mt="1">
              ≈ NA
            </Text>
            <Text fontSize="xl" mt="4">
              0.51%
            </Text>
          </Box>
          <Box p="4" m="4" bg="gray.800" color="white">
            <Text fontSize="2xl" fontWeight="bold">
              {stockSymbol}/USDT
            </Text>
            <Text fontSize="xl" mt="2">
              Bitcoin
            </Text>
            <Text fontSize="xl" mt="4">
              53,68,18,949.90
            </Text>
            <Text fontSize="xl" mt="2">
              Volume(USDT)
            </Text>
            <Text fontSize="xl" mt="1">
              26481.35 USDT
            </Text>
            <Text fontSize="xl" mt="1">
              ≈ NA
            </Text>
            <Text fontSize="xl" mt="4">
              0.51%
            </Text>
          </Box>
          <Box p="4" m="4" bg="gray.800" color="white">
            <Text fontSize="2xl" fontWeight="bold">
              {stockSymbol}/USDT
            </Text>
            <Text fontSize="xl" mt="2">
              Bitcoin
            </Text>
            <Text fontSize="xl" mt="4">
              53,68,18,949.90
            </Text>
            <Text fontSize="xl" mt="2">
              Volume(USDT)
            </Text>
            <Text fontSize="xl" mt="1">
              26481.35 USDT
            </Text>
            <Text fontSize="xl" mt="1">
              ≈ NA
            </Text>
            <Text fontSize="xl" mt="4">
              0.51%
            </Text>
          </Box>
          <Box p="4" m="4" bg="gray.800" color="white">
            <Text fontSize="2xl" fontWeight="bold">
              {stockSymbol}/USDT
            </Text>
            <Text fontSize="xl" mt="2">
              Bitcoin
            </Text>
            <Text fontSize="xl" mt="4">
              53,68,18,949.90
            </Text>
            <Text fontSize="xl" mt="2">
              Volume(USDT)
            </Text>
            <Text fontSize="xl" mt="1">
              26481.35 USDT
            </Text>
            <Text fontSize="xl" mt="1">
              ≈ NA
            </Text>
            <Text fontSize="xl" mt="4">
              0.51%
            </Text>
          </Box>
        </Flex>
            </TabPanel>
            <TabPanel>
              <Box p="4" m="4" bg="gray.800" color="white">
                <Text fontSize="2xl" fontWeight="bold">
                  {stockSymbol}/USDT
                </Text>
                <Text fontSize="xl" mt="2">
                  Bitcoin
                </Text>
                <Text fontSize="xl" mt="4">
                  53,68,18,949.90
                </Text>
                <Text fontSize="xl" mt="2">
                  Volume(USDT)
                </Text>
                <Text fontSize="xl" mt="1">
                  26481.35 USDT
                </Text>
                <Text fontSize="xl" mt="1">
                  ≈ NA
                </Text>
                <Text fontSize="xl" mt="2">
                  0.51%
                </Text>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4" m="4" bg="gray.800" color="white">
                <Text fontSize="2xl" fontWeight="bold">
                  {stockSymbol}/USDT
                </Text>
                <Text fontSize="xl" mt="2">
                  Bitcoin
                </Text>
                <Text fontSize="xl" mt="4">
                  53,68,18,949.90
                </Text>
                <Text fontSize="xl" mt="2">
                  Volume(USDT)
                </Text>
                <Text fontSize="xl" mt="1">
                  26481.35 USDT
                </Text>
                <Text fontSize="xl" mt="1">
                  ≈ NA
                </Text>
                <Text fontSize="xl" mt="2">
                  0.51%
                </Text>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p="4" m="4" bg="gray.800" color="white">
                <Text fontSize="2xl" fontWeight="bold">
                  {stockSymbol}/USDT
                </Text>
                <Text fontSize="xl" mt="2">
                  Bitcoin
                </Text>
                <Text fontSize="xl" mt="4">
                  53,68,18,949.90
                </Text>
                <Text fontSize="xl" mt="2">
                  Volume(USDT)
                </Text>
                <Text fontSize="xl" mt="1">
                  26481.35 USDT
                </Text>
                <Text fontSize="xl" mt="1">
                  ≈ NA
                </Text>
                <Text fontSize="xl" mt="2">
                  0.51%
                </Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div>
          <label htmlFor="symbolInput">Enter a stock symbol:</label>
          <input id="symbolInput" type="text" value={stockSymbol} onChange={handleInputChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
            ]}
            layout={{
              width: 720,
              height: 440,
              plot_bgcolor: '#000',
              paper_bgcolor: '#000',
              font: { color: '#fff' },
            }}
          />
        </div>
        <div>
          {flaskResponse && (
            <div>
              <h2>Flask Response:</h2>
              <pre>{JSON.stringify(flaskResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </ChakraProvider>
  );
}
=====================
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Stock() {
  const [stockSymbol, setStockSymbol] = useState('itc');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [flaskResponse, setFlaskResponse] = useState(null);


  useEffect(() => {
    fetchStock();
  }, [stockSymbol]);

  function fetchStock() {
    const API_KEY = '63Z37RP8AY3LBKVF';
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_Call)
      .then((response) => response.json())
      .then((data) => {
        const stockChartXValuesFunction = [];
        const stockChartYValuesFunction = [];

        for (let key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);

        // Make API call to Flask server
        const flaskAPIURL = 'http://localhost:5000/infostocks'; // Replace with your Flask API URL
        const requestData = { ticker: stockSymbol };

        fetch(flaskAPIURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then((response) => response.json())
          .then((flaskResponse) => {
            setFlaskResponse(flaskResponse);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  function handleInputChange(event) {
    setStockSymbol(event.target.value);
  }

  return (
    <div style={{ background: '#000', textAlign: 'center' }}>
      <h1>Stock Market</h1>
      <div>
        <label htmlFor="symbolInput">Enter a stock symbol:</label>
        <input id="symbolInput" type="text" value={stockSymbol} onChange={handleInputChange} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{
            width: 720,
            height: 440,
            plot_bgcolor: '#000',
            paper_bgcolor: '#000',
            font: { color: '#fff' },
          }}
        />
      </div>
      <div>
        {flaskResponse && (
          <div>
            <h2>Flask Response:</h2>
            <pre>{JSON.stringify(flaskResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
     );
    }