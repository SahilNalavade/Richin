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
    { title: 'HDFC', description: 'This is card 1', image: '/hdfc.png' },
    { title: 'SBI', description: 'This is card 2', image: '/sbi.png' },
    { title: 'Bajaj', description: 'This is card 3', image: '/bajaj.png' },
    { title: 'ITC', description: 'This is card 4', image: '/itc.png' },
    { title: 'India Sucrose', description: 'This is card 5', image: '/is.jpg' },
  ];
  const carouselData2 = [
    { title: 'Wipro', description: '-1.97%', image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAwCAMAAAAcuhVsAAAA7VBMVEX///81GlUvDlFqXH50b6ceAEc0GFQ1VJMTAEEyFVO+JmowEVHk4udeTnUpAE2KgZgsCE/29fd/dJD1fyo0mLMYAETHxM5wa6WYkqXt6+8+KVxtYYCyrbva196hnKy5AFtzwE9+xF8bka6g04woS4+hrMe7tsMAADlHM2JVRW1jVXnVh6S8FGPdnrX0dQD/zS7/yQDi8dz0+vLb6u+v0d3L4ehnrMGHu8yNmrtQaZ5sfqu/xdcSQIlLO2bR0OFlX5+Oiradmb7FRnzKXonlvszv2eL6ybD5tI771cH3mFv+7+b/9dv/2XD84tP/8c38UowAAAAEj0lEQVRYheVXaXPbNhAFaAEmTQo8bMokJdGxotKkospHnCZNLDtpmqNJ2v//c7oLAhRJSx1LspUP3fGMAHCxD/v2AEzI08nl8+eXT2h+lVw9Oz19diWH/ssd4l4irnT4ejQavdoZLvp7ioOXo6Ojo5G/M2CIr6T5WuJu4PBwuBX+K4m7doj9rhkm8TbAv0F8X6+9K2KUiv42uOT69QYsd21KLb4VrpL4ze9v3z1Y2xWUepPHgB2P98c3bx6q7uch85xHwH073ge5eXiSZtmjFN8Nwu6Pf3kMWzvG9R9CQFtJ8VyGLHNBdPR6ONFqAxgH8CUOYBDhSlp+dtxcWPOgpxVjXM6IHxVJ0k0V5mAvESLvZzXcRl71TCFYpL4UQghT26MwseDXOYNBgSsTGIQkNYXFue2Fc3VcB024jiFsy/LmcikVzAAly2C0htyoI5NTK1cGGKfUUC1iGEK7cKVZSu0uLu0ZlNMoBCUptjlU26DQ3NzGNTGQikzrUMsMlkehb1BqliePBGqyMixYtuGwjUu5oNwWwkDD3Iw1LhyechC5eYJ2UEsehS0HzrANllGBvagnj0wSi1oJuYcLYzZJ0z7DsVFoXAAVglohkoWNFbS6UVQwtBgOluH6QLQt9w9ZSd+kQXMb18glOXEXnQp7FS4bgKsOEBTj1CuDP0yQIq+e2M6tumPQmiQs8ECfq0mkaW7hWok2UtgqGSRuWKU37rRz7RXQphmUxjp3x3fvpYlMqHQQHNKD85L1XNPcwmWL8jHRS4WrdFHmlj4xSg8+GlV3j+86IMedkmj4slcG2vQhzTC9FzS38lksGEOHkRvENaqL0vcWBYICjnCqJx+OOxL4Fid40Zk+mRhoHs8H9bGguYlbDkpxvVJH1lGVtHHjFJDcNqS2jk2nlOMPOBkABst8qEsMhGS7RnMLt1gXt7sSFwPlBYDOQ19a4xRTW0RLcOs8w9kqnhe4PpR2Ldroh3WP53c6UDyBdJCbMbIGhk7nRiuvqr43NLHYSRuXzO16dmcN9+t5VRLNLa2NmY9/Ojfa/Uo/8VDP03VUw00FvosUszG4WzsrGS7qqCSaVo+osltWNLf7huXJ08mOQGWHbuH62JxtKrUyQzpBanJ7u3i7zO0aklM2dVOXYLtPcpYEQS47YPnsauGSFPuIxWi/z6WpBeltSaWL6naQdVkrwRbP2LM8T3ZyS/jLcMmeNMcNeXnQ0CWrxAmxL8/VbMDqNLfvwYDpK84TDlmKS/qhpZVsczUs5Ahe+OqpQPwQZmdVFPDeZ4XGFcQ18YK3hTnx9cFAoXnZDWjoSaUwr5Hsv/jj458NvV6aplF1awxgllbf4ggkrXB9eOcUeV64w4ZCRprSC4qkroR60+nB9OTFf7i/QhTupvJxegBy8mnXuCcIezD99f+C+7N4/nTyc/KKxPfq6IlxP3/5usGuGq56IK8pf80OZ1+2wJ2EjJ2tj/t1dnh4OPu2OW4MssY/4N9//PiOv58l7t+b464nVxfn5+c4+CZxdwVL/gHcC+XwbLZVYq0l6O+FGu+MZBQd32XyLwn6ZTyxjiOLAAAAAElFTkSuQmCC' },
    { title: 'TCS', description: '-1.29%', image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIABsAdwMBEQACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAABgQFBwIB/8QALRAAAQMDAgMHBAMAAAAAAAAAAQACAwQFEQYSITFhExQVIkFxkQdRgdEycrH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQQFAwYC/8QAKREAAgIBAwMCBgMAAAAAAAAAAAECAwQREiEFEzFBsRQyUWFxoSLB8P/aAAwDAQACEQMRAD8AubRqy20ElQy41Za44IAY53HjnkPZef6NvrU3a3o3wb+V02+5RdUStprlSVNDHXRTtNNI3c2Q8AR+VuTurhDfJ6IxZ0WQsdTX8kYbtS2lr9rqsN6ljsfOFUj1PFk9FP3O66fkNaqJso6iGWATxysdERkPB4Y91dU4uO5PgqyhKMtrXJr5dQ2qF+ySqDeu04+cKjHqmJKW1T9yzHByJLVRNnG9sjGvjcHMcMgg8CFfTTWqKrTT0Z6UkBAEAQBAEAQBAEBzr6b0NJW+JurKWGctlbtMsYdjn91XprSWmh6XrV1lfb2Sa49DJq3OvmrRYqdxp7dQszK2Hy7sY4DHLmBwVSeMsi/W3lLwv7/L9jlWli4XxMuZy8alUbFajB2JoYdn9ePzzVx4tDWm1GR8Zkbt296ktruU2O02y12dhaaiq8sYJJdg5x1y4tXSOJCePOpLjR/s749vdyVbc/ye9L3ay3eLw64UkcNeCQ6OZv8AM9D9+izcLBorqVcopv6/UvZ+NlY8u9XLWH29C2ijZFG2ONoaxgAa0cgAtRJJaIwpScnq/J6UkBAEAQBAEAQBAEBzrQdfR2ervFNcaiOne2Xh2rsZwSCpjB+h6LrEJXQqsgtVoa606hpKXW1Xcm7xQVMjo3PLeWcHd8jPskqXXLn1OvaeV09VR+ePp/vsdJddrc2n7w6uphFjO/tRhNGec7Nmu3a9SFfcaa/6ugus0rYLPa8Bk0x2h8h5c+uD7BWUnCDivLLU6+zVtfzMy/qBS2ee3i5U88Da8Ob2b4XjMnH1x85VbtNvwXelZV0J9p8wf6KnTVTPV2GhqKrJmkhBcT69fyoM7NrjXkThDwmbNCqEAQBAEAQBAEAQERrWz299ZBUOpm9rM4CRwcRu98FfcW14Nvp2RY6pVt8I31NYbV4Kyi7jEacjeWEZ82OeeeeqhybfJmrItru3xloyQg09anXMQupcx78be0f+19KTRs25NsqtzfP4RaVVjtctpNufRRd0b5hEBgAj14cc9VEZyUtUzAlZKUtzfJFWXTlpfdmxPpA5gcfKZHY/1d5zloWlfZCOsWdIY1rGhrQA0DAA9AqpTbberPqEBAEAQBAEAQBAEB//2Q==' },
    { title: 'BPCL', description: '-055%', image: 'data:image/png;base64,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' },
    { title: 'ONGC', description: '-0.41%', image: 'data:image/png;base64,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' },
    { title: 'Hero Motocorp', description: '-0.39%', image: 'data:image/png;base64,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' },
  ];
  const carouselData3 = [
    { title: 'AIAENG', description: 'This is card 11', image: 'https://www.drvijaymalik.com/wp-content/uploads/2021/03/AIA-Engineering-Ltd-logo.png' },
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