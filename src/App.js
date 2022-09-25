import React, {useState, useEffect, useRef} from 'react';
import {Block} from './Block';
import './index.scss';

function App() {
	const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState('CZK');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((response) => response.json())
      .then((json) => {
        ratesRef.current = json.rates;
				onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(2));
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setToPrice(value);
		setFromPrice(result.toFixed(2));
  };

	useEffect(() => {
		onChangeFromPrice(fromPrice)
	}, [fromCurrency]);

	useEffect(() => {
		onChangeToPrice(toPrice)
	}, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
