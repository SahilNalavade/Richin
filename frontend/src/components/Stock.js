import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Stock() {
  const [stockSymbol, setStockSymbol] = useState('itc');
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [flaskResponse, setFlaskResponse] = useState(null);
  const [showModal, setShowModal] = useState(true); // State for showing/hiding the modal

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
            console.log(typeof flaskResponse)
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

  function handleButtonClick() {
    setShowModal(false);
  }

  return (
    <div >
 
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#000',
            backdropFilter: 'blur(5px)', // Apply backdrop filter for background blur effect
          }}
        >
          <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }}>
            <img src="/pop.png" alt="Stock Market" style={{ width: '100%' }} />
            <h1 style={{ fontSize: '24px', textAlign: 'center' }}>Get a hands-on experience through our demo account.</h1>

            {/* <p style={{ fontSize: '24px' }}>
              You have just won <strong>1,00,000</strong>{' '}
              <span role="img" aria-label="coin emoji">
                💰
              </span>{' '}
              Richin Tokens.
            </p> */}
            <p style={{ fontSize: '15px',textAlign: 'center' }}> Click on goals, and create the perfect portfolio for yourself by leveraging our AI</p>
            <p style={{ fontSize: '15px',textAlign: 'center' }}> Use the 10,00,000<span role="img" aria-label="coin emoji">
                💰
              </span> RichIN tokens in your wallet to invest in your goals and start your investing journey. </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
  <button
    onClick={handleButtonClick}
    style={{
      width: '221px',
      height: '48px',
      background: '#2359AD',
      borderRadius: '16px',
      color: '#fff',
      border: 'none',
      marginTop: '20px',
      marginBottom: '20px',
    }}
  >
    Get Started
  </button>
</div>

          </div>
        </div>
      )}

      {!showModal && (
        <div>
           <h2 style={{ color: '#000', fontSize: '25px', alignItems: 'center', width: '100%', textAlign: 'center' }}>
           Stay updated with the market. Get information on over a 1000 different stocks. All you have to do is search.
</h2>

         <div style={{padding:'40px 0px'}}>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
  <input
    placeholder="Enter a stock symbol"
    type="text"
    value={stockSymbol}
    onChange={handleInputChange}
    style={{
      width: '550px',
      height: '55px',
      borderRadius: '40px',
      background: 'grey',
      paddingLeft: '20px'
    }}
  />
</div>


</div>

        </div>
      )}


{!showModal && (
        <div>
          {flaskResponse && (
            <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '10px', borderRadius: '5px',color:'#000' }}>
      <div style={{ flex: 1, margin: '0 5px' }}>
        {/* Content for the first section */}
        <h1 style={{fontSize:'45px'}}>{flaskResponse.longName}</h1>
              <p style={{fontSize:'25px'}}>Sector:{flaskResponse.industry}</p>
              <br />
              <h1 style={{fontSize:'60px'}}>{flaskResponse.currentPrice}</h1>
              <p style={{ fontSize: '30px', color: (flaskResponse.currentPrice - flaskResponse.previousClose) > 0 ? '#38aa7d' : 'red' }}>
  {flaskResponse.currentPrice - flaskResponse.previousClose}
</p>

      </div>
     
      <div style={{ flex: 1, margin: '0 1px' ,marginTop:'60px'}}>
        {/* Content for the third section */}
        <p style={{fontSize:'20px'}}>Day Range : {flaskResponse.dayLow} - {flaskResponse.dayHigh}</p>
              <p style={{fontSize:'20px'}}>52WeekChange : {flaskResponse['52WeekChange']} %</p>
              <p style={{fontSize:'20px'}}>Volume : {flaskResponse.volume}</p>
    
      </div>
    </div>
    <p style={{fontSize:'25px'}}>Long Summary:</p>
    <p style={{fontSize:'15px'}}>{flaskResponse.longBusinessSummary}</p>
             
              
             

    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '20px' }}>Open: {flaskResponse.open}</p>
                  <p style={{ fontSize: '20px' }}>Previous Close: {flaskResponse.previousClose}</p>
                  <p style={{ fontSize: '20px' }}>Volume: {flaskResponse.volume}</p>
                  <p style={{ fontSize: '20px' }}>Current Price: {flaskResponse.currentPrice}</p>
                  <p style={{ fontSize: '20px' }}>Beta: {flaskResponse.beta}</p>
                  <p style={{ fontSize: '20px' }}>High: {flaskResponse.dayHigh}</p>
                  <p style={{ fontSize: '20px' }}>Low: {flaskResponse.dayLow}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '20px' }}>52 Week High: {flaskResponse.fiftyTwoWeekHigh}</p>
                  <p style={{ fontSize: '20px' }}>52 Week Low: {flaskResponse.fiftyTwoWeekLow}</p>
                  <p style={{ fontSize: '20px' }}>TTM EPS: {flaskResponse.trailingEps}</p>
                  <p style={{ fontSize: '20px' }}>TTM PE: {flaskResponse.trailingPE}</p>
                  <p style={{ fontSize: '20px' }}>Market Cap: {flaskResponse.marketCap}</p>
                  <p style={{ fontSize: '20px' }}>Dividend Yield: {flaskResponse.dividendYield} %</p>
                  <p style={{ fontSize: '20px' }}>
                    Average Daily Volume 10 Day: {flaskResponse.averageDailyVolume10Day}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '20px' }}>200 Day Average: {flaskResponse.twoHundredDayAverage}</p>
                  <p style={{ fontSize: '20px' }}>Forward PE: {flaskResponse.forwardPE}</p>
                  <p style={{ fontSize: '20px' }}>Book Value: {flaskResponse.bookValue}</p>
                  <p style={{ fontSize: '20px' }}>
                    Recommendation Key: {flaskResponse.recommendationKey}
                  </p>
                  <p style={{ fontSize: '20px' }}>
                    Regular Market Day High: {flaskResponse.regularMarketDayHigh}
                  </p>
                  <p style={{ fontSize: '20px' }}>
                    Regular Market Day Low: {flaskResponse.regularMarketDayLow}
                  </p>
                </div>
              </div>
            </div>
          )}
        
          
        </div>
        
      )}
      {!showModal && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Plot
            data={[
              {
                x: stockChartXValues,
                y: stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#38aa7d' },
              },
            ]}
            layout={{
              width: 1400,
              height: 440,
              plot_bgcolor: '#fff',
              paper_bgcolor: '#fff',
              font: { color: '#000' },
            }}
          />
        </div>
      )}

     
    </div>
  );
}
