import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AirQualityChart({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e3e7'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e2e3e7'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#e2e3e7'
        }
      }
    }
  };

  return (
    <div className="bg-app-card p-4 rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Calidad del Aire - Últimos 7 días</h3>
      <Line options={options} data={data} />
    </div>
  );
}