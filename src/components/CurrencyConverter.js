import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, DollarSign, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available currencies
  useEffect(() => {
    axios
      .get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_API_KEY}/codes`)
      .then((res) => setCurrencies(res.data.supported_codes.map((code) => code[0])))
      .catch((err) => setError("Failed to fetch currency list"));
  }, []);

  // Convert currency
  const convertCurrency = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_CURRENCY_API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`)
      .then((res) => setConvertedAmount(res.data.conversion_result))
      .catch((err) => setError("Conversion failed. Try again."))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div
      className="card p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <h2 className="flex justify-center items-center gap-2 text-xl font-bold text-gray-800">
        <DollarSign size={28} className="text-green-500" /> Currency Converter
      </h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Input Section */}
      <div className="space-y-4 mt-6">
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field w-full border border-gray-300 rounded-md p-2"
            placeholder="Amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="input-field border border-gray-300 rounded-md p-2"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Arrow Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mx-auto text-gray-500 flex justify-center"
        >
          <ArrowRight size={28} />
        </motion.div>

        {/* Output Section */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={convertedAmount || ""}
            readOnly
            className="input-field w-full border border-gray-300 rounded-md p-2"
            placeholder="Converted"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="input-field border border-gray-300 rounded-md p-2"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <motion.button
        onClick={convertCurrency}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? <RefreshCw className="animate-spin" size={20} /> : "Convert"}
      </motion.button>
    </motion.div>
  );
};

export default CurrencyConverter;
