import { PieChart } from 'react-minimal-pie-chart';

function MyChart({ clientList }) {
  return (
    <PieChart
      data={clientList}
      label={({ dataEntry }) =>
        Math.round(dataEntry.percentage * 100) / 100 + '%'
      }
      labelStyle={() => ({ fontSize: '0.25em' })}
      radius={35}
      labelPosition={110}
      style={{ height: '661px' }}
    />
  );
}
export default MyChart;
