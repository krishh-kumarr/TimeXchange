import CurrencyConverter from "./components/CurrencyConverter";
import TimeConverter from "./components/TimeConverter";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 flex flex-col items-center justify-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Currency & Time Converter
          </span>
        </h1>

        <div className="space-y-10">
          {/* Currency Converter Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <CurrencyConverter />
          </motion.div>

          {/* Time Converter Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TimeConverter />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
