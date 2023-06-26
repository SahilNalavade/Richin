import React, { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#D8706C', '#9F3D39', '#4B1513'],
      },
    ],
    labels: ['Equity', 'Crypto', 'Funds'],
  });

  useEffect(() => {
    // Fetch data and update chartData state
    // const fetchData = () =>  {
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //     .then((response) => response.json())
    //     .then((res) => {
    //       console.log("Response:", res);
    //       const labels = [];
    //       const data = [];
    //       for (const item of res) {
    //         labels.push(item.name);
    //         data.push(item.id);
    //       }
    //       setChartData({
    //         datasets: [
    //           {
    //             data: data,
    //             backgroundColor: ['red', 'blue', 'yellow'],
    //           },
    //         ],
    //         labels: labels,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("Error:", error);
    //     });
    // }
    // fetchData();
  }, []);

  const chartStyle = {
    width: '25%',
    height: '25%',
  };

  const cardStyle = {
    position: 'relative',
    width: '300px',
    height: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  };

  const contentStyle = {
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#333333',
    lineHeight: '1.4',
  };

  return (
    <>
    <br />
    <img src="/Card2.png" alt="Card Image" style={{width:'auto' ,height:'110px', marginLeft:'50px'}} />
      {/* <div className="card" style={cardStyle}>
        <img src="/Card.png" alt="Card Image" style={imageStyle} />
        <div style={contentStyle}>
          <h3 style={titleStyle}>Card Title</h3>
          <p style={descriptionStyle}>Card description goes here.</p>
        </div>
      </div> */}
      <br />
      <div className="App" style={chartStyle}>
        <Doughnut data={chartData} />
      </div>
    </>
  );
};

export default Chart;
