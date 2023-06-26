import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Connect() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [data, setData] = useState([]);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState({});

  const handleNum1Change = (e) => {
    setNum1(parseInt(e.target.value));
  };

  const handleNum2Change = (e) => {
    setNum2(parseInt(e.target.value));
  };

  const handleNum3Change = (e) => {
    setNum3(parseInt(e.target.value));
  };

  const handleNum4Change = (e) => {
    setNum4(parseInt(e.target.value));
  };

  const handleNum5Change = (e) => {
    setNum5(parseInt(e.target.value));
  };
  const handleNum6Change = (e) => {
    setNum6(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to Flask server using Axios
    axios
      .post('http://localhost:5000/members', [
        {
          pv: num1,
          fv: num2,
          r: num3,
          n: num4
        },
        num5,num6
      ])
      .then((response) => {
        const [abcData, portfolioAnalysisData] = response.data;
        setData(JSON.parse(abcData));
        setPortfolioAnalysis(portfolioAnalysisData);
        console.log(data);
        console.log(JSON.parse(abcData));

        console.log(portfolioAnalysisData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number 1:
          <input type="number" value={num1} onChange={handleNum1Change} />
        </label>
        <br />
        <label>
          Number 2:
          <input type="number" value={num2} onChange={handleNum2Change} />
        </label>
        <br />
        <label>
          Number 3:
          <input type="number" value={num3} onChange={handleNum3Change} />
        </label>
        <br />
        <label>
          Number 4:
          <input type="number" value={num4} onChange={handleNum4Change} />
        </label>
        <br />
        <label>
          Number 5:
          <input type="number" value={num5} onChange={handleNum5Change} />
        </label>
        <br />
        <label>
          Number 6:
          <input type="number" value={num6} onChange={handleNum6Change} />
        </label>
        <br />  
        <button type="submit">Submit</button>
      </form>

      {/* Render the data from the Flask API */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      {/* Render the portfolio analysis */}
      <pre>{JSON.stringify(portfolioAnalysis, null, 2)}</pre>

      <div>
      <h1>DataFrame</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>CAGR</th>
            <th>Market Cap</th>
            <th>Period</th>
            <th>Price</th>
            <th>Purchase</th>
            <th>Quantity</th>
            <th>Exp CAGR</th>
            <th>Exp Returns</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Symbol}</td>
              <td>{item.cagr}</td>
              <td>{item.marketCap}</td>
              <td>{item.period}</td>
              <td>{item.price}</td>
              <td>{item.purchase}</td>
              <td>{item.quantity}</td>
              <td>{item.exp_cagr}</td>
              <td>{item.exp_returns}</td>
              <td>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Connect;
/////////////////////
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Connect() {
  const router = useRouter();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNum1Change = (e) => {
    setNum1(parseInt(e.target.value));
  };

  const handleNum2Change = (e) => {
    setNum2(parseInt(e.target.value));
  };

  const handleNum3Change = (e) => {
    setNum3(parseInt(e.target.value));
  };

  const handleNum4Change = (e) => {
    setNum4(parseInt(e.target.value));
  };

  const handleNum5Change = (e) => {
    setNum5(parseInt(e.target.value));
  };

  const handleNum6Change = (e) => {
    setNum6(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send data to Flask server using Axios
    axios
      .post('http://localhost:5000/members', [
        {
          pv: num1,
          fv: num2,
          r: num3,
          n: num4
        },
        num5,num6
      ])
      .then((response) => {
        const [abcData, portfolioAnalysisData] = response.data;

        // Delay the redirect to simulate a loading buffer
        setTimeout(() => {
          setIsLoading(false);
          router.push({
            pathname: '/Idkk',
            query: { data: abcData, portfolioAnalysis: portfolioAnalysisData },
          });
        }, 2000); // Adjust the duration as needed
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="Rlogobg.png" alt="Loading" style={{ width: '100px', height: 'auto' }}/>
            <p>Crunching the numbers... Hold on!</p>
        </div>
      )}

      {!isLoading && (
        <form onSubmit={handleSubmit}>
          <label>
            Number 1:
            <input type="number" value={num1} onChange={handleNum1Change} />
          </label>
          <br />
          <label>
            Number 2:
            <input type="number" value={num2} onChange={handleNum2Change} />
          </label>
          <br />
          <label>
            Number 3:
            <input type="number" value={num3} onChange={handleNum3Change} />
          </label>
          <br />
          <label>
            Number 4:
            <input type="number" value={num4} onChange={handleNum4Change} />
          </label>
          <br />
          <label>
            Number 5:
            <input type="number" value={num5} onChange={handleNum5Change} />
          </label>
          <br />
          <label>
            Number 6:
            <input type="number" value={num6} onChange={handleNum6Change} />
          </label>
          <br />  
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Connect;
 ////////////////////////////////////////////////
 import { useEffect, useState } from 'react';

function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/table');
      const [jsonData, portfolioAnalysis] = await response.json();
      const parsedData = JSON.parse(jsonData);
      setData(parsedData);
      // Handle the portfolioAnalysis data if needed
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>CAGR</th>
            <th>Market Cap</th>
            <th>Period</th>
            <th>Price</th>
            <th>Purchase</th>
            <th>Quantity</th>
            <th>Exp CAGR</th>
            <th>Exp Returns</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Symbol}</td>
              <td>{item.cagr}</td>
              <td>{item.marketCap}</td>
              <td>{item.period}</td>
              <td>{item.price}</td>
              <td>{item.purchase}</td>
              <td>{item.quantity}</td>
              <td>{item.exp_cagr}</td>
              <td>{item.exp_returns}</td>
              <td>{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;
----------------
top 10 gain, loosers, active by volume,52 week high low


////////////////////////////////
import { useEffect, useState } from 'react';

const PortfolioData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/portfolio');
      const [jsonData,analysis] = await response.json();
      setData(JSON.parse(jsonData));
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Quantity</th>
              <th>Purchase</th>
              <th>UID</th>
              <th>Stock Value</th>
              <th>PL</th>
              <th>Total Amount</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.stock_name}>
                <td>{item.stock_name}</td>
                <td>{item.quantity}</td>
                <td>{item.purchase}</td>
                <td>{item.uid}</td>
                <td>{item.stock_value}</td>
                <td>{item.PL}</td>
                <td>{item.Total_amount}</td>
                <td>{item.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PortfolioData;
