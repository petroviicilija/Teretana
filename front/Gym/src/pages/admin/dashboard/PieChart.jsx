import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function PieChart({ femaleCount, maleCount }) {

  const data = {
    labels: ['Females', 'Males'],
    datasets: [
      {
        label: 'Count',
        data: [femaleCount, maleCount],
        backgroundColor: [
          '#ffb300',
          '#3a3a3a'
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  };

  return (
    <Pie data={data} options={options} />
  );
}