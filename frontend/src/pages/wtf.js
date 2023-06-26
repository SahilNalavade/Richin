  import React, { useState, useEffect } from 'react';

  function Connect() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [num3, setNum3] = useState(0);
    const [num4, setNum4] = useState(0);
    const [num5, setNum5] = useState(0);
    const [data, setData] = useState([]);
    const [sum, setSum] = useState(0); // State to hold the summation

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

    useEffect(() => {
      const interval = setInterval(() => {
        setNum1((prevNum1) => prevNum1 + 1);
        setNum2((prevNum2) => prevNum2 + 1);
        setNum3((prevNum3) => prevNum3 + 1);
        setNum4((prevNum4) => prevNum4 + 1);
        setNum5((prevNum5) => prevNum5 + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      handleSubmit(); // Submit the form after each increment
    }, [num1, num2, num3, num4, num5]);

    const handleSubmit = () => {
      // Send data to the Flask application
      fetch("http://localhost:5000/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1,
          num2,
          num3,
          num4,
          num5,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error: " + res.status);
          }
        })
        .then((data) => {
          const result = data.result; // Access the 'result' value
          setSum(result); // Update the state with the summation
          setData(data); // Update the state with the received data
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <div>
        {/* Form to input five numbers */}
        <form>
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
        </form>

        {/* Render the data from the Flask API */}
        <pre>{JSON.stringify(data, null, 2)}</pre>

        {/* Render the summation */}
        <p>Sum: {sum}</p>
      </div>
    );
  }

  export default Connect;
