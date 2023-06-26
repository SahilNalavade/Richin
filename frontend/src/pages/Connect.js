import { useState } from 'react';

function Connect() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the sum of all numbers
    const sum = num1 + num2 + num3 + num4 + num5;
    setSum(sum);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Richin: 2 din me paisa double</h1>

      {/* Form to input numbers */}
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'right' }}>
            Present Value:
            <input type="number" value={num1} onChange={handleNum1Change} />
          </label>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'right' }}>
            Future Value:
            <input type="number" value={num2} onChange={handleNum2Change} />
          </label>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'right' }}>
            Risk:
            <input type="number" value={num3} onChange={handleNum3Change} />
          </label>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'right' }}>
            Number of years:
            <input type="number" value={num4} onChange={handleNum4Change} />
          </label>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginLeft: '10px', marginRight: '10px', textAlign: 'right' }}>
            Amount:
            <input type="number" value={num5} onChange={handleNum5Change} />
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }} type="submit">Calculate</button>
        </div>
      </form>

      {/* Render the summation */}
      <p style={{ fontSize: '18px', marginTop: '20px' }}>Calculation: {sum}</p>
    </div>
  );
}

export default Connect;
