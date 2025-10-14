import React, { useState } from 'react';
import { simulatorContent } from '../data/siteData';
import '../styles/Simulator.css';

const Simulator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculation placeholder: amount * rate
    const calculated = parseFloat(amount) * parseFloat(rate);
    setResult(isNaN(calculated) ? 'Lỗi tính toán' : calculated);
  };

  return (
    <main className="main-page main-page-simple">
      <div className="grid-container">
        <div className="grid-x grid-padding-x align-center">
          <div className="small-12 medium-10 large-8 cell">
            <h1 className="section-title">{simulatorContent.title}</h1>
            <p className="gt-block">{simulatorContent.description}</p>
            <form onSubmit={handleSubmit}>
              <label>Số lượng:</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <label>Tỷ giá:</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} required />
              <button type="submit" className="button">Mô phỏng</button>
            </form>
            {result && <p className="gt-block">Kết quả: {result}</p>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Simulator;