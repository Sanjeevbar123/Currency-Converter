import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FaExchangeAlt } from 'react-icons/fa';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      setCurrencies(Object.keys(response.data.rates));
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const convertCurrency = async () => {
      if (fromCurrency && toCurrency) {
        const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        setConvertedAmount(amount * rate);
      }
    };
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="App container mt-5">
      <h2 className="text-center mb-4">Currency Converter</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="form-group text-center">
            <label className="font-weight-bold">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control text-center"
            />
          </div>
          <div className="form-group text-center">
            <label className="font-weight-bold">From Currency</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="form-control text-center"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center my-3">
            <FaExchangeAlt size={30} className="text-primary" />
          </div>

          <div className="form-group text-center">
            <label className="font-weight-bold">To Currency</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="form-control text-center"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <h4 className="mt-3">
            Converted Amount: <strong>{convertedAmount.toFixed(2)} {toCurrency}</strong>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default App;
