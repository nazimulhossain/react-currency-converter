import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('INR');
  const [output, setOutput] = useState(0);


  useEffect(() => {
  
    const fetchCurrency = async () => {
      try{
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currencyFrom}&to=${currencyTo}`
        );
        if(!res.ok) throw new Error("Something wrong with data fetching");
        const data = await res.json();
        setOutput(data.rates[currencyTo]);
      }
      catch(err){
        console.log(err);
      }

     
    }
   
    if(currencyFrom === currencyTo) {
      setOutput(input);
      return;
    }

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
        onChange={(e) => setInput(Number(e.target.value))}
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
      <p style={{fontWeight:'bold'}}>{input!=='' ? output : ''} {currencyTo}</p>
    </div>
  );
}

export default App;
