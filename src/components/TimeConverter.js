import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

const TimeConverter = () => {
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [convertedTime, setConvertedTime] = useState("");
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    // Fetching supported time zones (if available)
    setTimezones(Intl.supportedValuesOf("timeZone"));
  }, []);

  const convertTime = () => {
    try {
      const date = new Date(time);
      const options = { timeZone: timezone, timeStyle: "short", hour12: false };
      const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
      setConvertedTime(formattedTime);
    } catch (error) {
      console.error("Invalid Date Input");
    }
  };

  return (
    <motion.div 
      className="p-8 bg-gradient-to-br from-green-500 via-green-400 to-teal-400 rounded-2xl shadow-xl w-full max-w-lg mx-auto mt-12 text-center transform transition-all duration-500 ease-in-out"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white flex justify-center items-center gap-3">
        <Globe size={28} className="text-white" /> Timezone Converter
      </h2>

      <div className="mt-6 space-y-6">
        {/* DateTime Input */}
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-4 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none bg-white text-gray-700 shadow-md"
        />

        {/* Timezone Select */}
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full p-4 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-teal-300 focus:outline-none bg-white text-gray-700 shadow-md"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>

        {/* Convert Button */}
        <button
          onClick={convertTime}
          className="w-full bg-teal-600 text-white py-3 rounded-lg mt-4 hover:bg-teal-700 transition duration-300 shadow-lg"
        >
          Convert Time
        </button>

        {/* Converted Time Output */}
        {convertedTime && (
          <p className="mt-6 text-lg font-semibold text-white">
            Converted Time: 
            <span className="text-xl font-bold text-teal-200">{convertedTime}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default TimeConverter;
