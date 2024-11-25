import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStationAlerts } from '../utils/api';

export default function StationAlerts({ stationId }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (stationId) {
      getStationAlerts(stationId).then(setAlerts);
    }
  }, [stationId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-app-card rounded-lg p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-app-text mb-6">Station Alerts</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-app-text">
          <thead>
            <tr className="border-b border-app-dark">
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Pollutant</th>
              <th className="py-3 text-left">Value</th>
              <th className="py-3 text-left">Alert Level</th>
              <th className="py-3 text-left">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b border-app-dark">
                <td className="py-3">{new Date(alert.date).toLocaleDateString()}</td>
                <td className="py-3">{alert.pollutant}</td>
                <td className="py-3">{alert.value}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      alert.level === 'High'
                        ? 'bg-red-500'
                        : alert.level === 'Medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    } text-white`}
                  >
                    {alert.level}
                  </span>
                </td>
                <td className="py-3">{alert.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}