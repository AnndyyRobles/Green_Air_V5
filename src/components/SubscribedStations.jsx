import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function SubscribedStations({ stations, onStationSelect }) {
  const [activeStation, setActiveStation] = useState(null);

  const handleStationClick = (station) => {
    setActiveStation(station);
    onStationSelect(station.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-app-card rounded-lg p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-app-text mb-6">
        Subscribed Stations
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 }
        }}
      >
        {stations.map((station) => (
          <SwiperSlide key={station.id}>
            <button
              onClick={() => handleStationClick(station)}
              className={`w-full p-4 rounded-lg transition-colors ${
                activeStation?.id === station.id
                  ? 'bg-app-green text-app-black'
                  : 'bg-app-dark text-app-text hover:bg-opacity-90'
              }`}
            >
              <h3 className="font-semibold mb-2">{station.name}</h3>
              <p className="text-sm opacity-70">{station.city}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}