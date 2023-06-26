import axios from 'axios';
import { useState } from 'react';

export default function Index() {
  const [data, setData] = useState('');
  const [chartHtml, setChartHtml] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/data', { data: data.split(',') });
      const chartData = response.data.data;
      const chartHtml = renderChart(chartData);
      setChartHtml(chartHtml);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const renderChart = (data) => {
    // Render the chart using your preferred charting library
    // ...

    return chartHtml;
  };

  return (
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={fetchData}>Generate Chart</button>
      <div dangerouslySetInnerHTML={{ __html: chartHtml }} />
    </div>
  );
}
