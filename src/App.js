import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState(10);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('INR');
  const [output, setOutput] = useState(0);

  // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  useEffect(() => {
    console.log('Hello from Effect');
    const fetchCurrency = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${currencyFrom}&to=${currencyTo}`
      );
      const data = await res.json();
      setOutput((output) => Object.values(data.rates)[0]);
    };

    if (input > 0) {
      fetchCurrency();
    }
  }, [input, currencyFrom, currencyTo]);
  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      &nbsp;&nbsp;
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}

export default App;
