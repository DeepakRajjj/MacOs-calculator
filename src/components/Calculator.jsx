import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import ConfettiExplosion from 'react-confetti-explosion';
import ToggleButton from './ToggleButton'; // Import the new ToggleButton component
import '../css/Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [isExploding, setIsExploding] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isSecondFunction, setIsSecondFunction] = useState(false);
  const [isRadians, setIsRadians] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleClick = (label) => {
    if (label === '=') {
      evaluate();
    } else if (label === 'C') {
      setDisplay('');
      setResult('');
    } else if (label === 'mc') {
      setMemory(0);
    } else if (label === 'm+') {
      setMemory((prevMemory) => prevMemory + parseFloat(display || '0'));
    } else if (label === 'm-') {
      setMemory((prevMemory) => prevMemory - parseFloat(display || '0'));
    } else if (label === 'mr') {
      setDisplay(memory.toString());
    } else if (label === '+/-') {
      setDisplay((prevDisplay) => (-parseFloat(prevDisplay)).toString());
    } else if (label === '%') {
      setDisplay((prevDisplay) => (parseFloat(prevDisplay) / 100).toString());
    } else if (label === '2nd') {
      setIsSecondFunction((prev) => !prev);
    } else if (label === 'Rad') {
      setIsRadians((prev) => !prev);
    } else if (label === 'Rand') {
      setDisplay(Math.floor(Math.random() * 100) + 1);
    } else if (label === 'x²') {
      setDisplay((prevDisplay) => Math.pow(parseFloat(prevDisplay), 2).toString());
    } else if (label === 'x³') {
      setDisplay((prevDisplay) => Math.pow(parseFloat(prevDisplay), 3).toString());
    } else if (label === 'xʸ') {
      setDisplay((prevDisplay) => prevDisplay + '^');
    } else if (label === 'eˣ') {
      setDisplay((prevDisplay) => Math.exp(parseFloat(prevDisplay)).toString());
    } else if (label === '10ˣ') {
      setDisplay((prevDisplay) => Math.pow(10, parseFloat(prevDisplay)).toString());
    } else if (label === '¹/x') {
      setDisplay((prevDisplay) => (1 / parseFloat(prevDisplay)).toString());
    } else if (label === '²√x') {
      setDisplay((prevDisplay) => Math.sqrt(parseFloat(prevDisplay)).toString());
    } else if (label === '³√x') {
      setDisplay((prevDisplay) => Math.cbrt(parseFloat(prevDisplay)).toString());
    } else if (label === 'ʸ√x') {
      setDisplay((prevDisplay) => prevDisplay + '√');
    } else if (label === 'ln') {
      setDisplay((prevDisplay) => Math.log(parseFloat(prevDisplay)).toString());
    } else if (label === 'log₁₀') {
      setDisplay((prevDisplay) => Math.log10(parseFloat(prevDisplay)).toString());
    } else if (label === 'x!') {
      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
      setDisplay(factorial(parseFloat(display)).toString());
    } else if (label === 'sin') {
      setDisplay((prevDisplay) => (isRadians ? Math.sin(parseFloat(prevDisplay)) : Math.sin(parseFloat(prevDisplay) * (Math.PI / 180))).toString());
    } else if (label === 'cos') {
      setDisplay((prevDisplay) => (isRadians ? Math.cos(parseFloat(prevDisplay)) : Math.cos(parseFloat(prevDisplay) * (Math.PI / 180))).toString());
    } else if (label === 'tan') {
      setDisplay((prevDisplay) => (isRadians ? Math.tan(parseFloat(prevDisplay)) : Math.tan(parseFloat(prevDisplay) * (Math.PI / 180))).toString());
    } else if (label === 'sinh') {
      setDisplay((prevDisplay) => Math.sinh(parseFloat(prevDisplay)).toString());
    } else if (label === 'cosh') {
      setDisplay((prevDisplay) => Math.cosh(parseFloat(prevDisplay)).toString());
    } else if (label === 'tanh') {
      setDisplay((prevDisplay) => Math.tanh(parseFloat(prevDisplay)).toString());
    } else if (label === 'π') {
      setDisplay((prevDisplay) => prevDisplay + Math.PI.toString());
    } else if (label === 'e') {
      setDisplay((prevDisplay) => prevDisplay + Math.E.toString());
    } else if (label === 'EE') {
      setDisplay((prevDisplay) => prevDisplay + 'e');
    } else {
      setDisplay((prev) => prev + label);
    }
  };

  const evaluate = () => {
    try {
      if (/2\s*[\+\-\*\/]\s*6|6\s*[\+\-\*\/]\s*2/.test(display)) {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 2000);
      }

      let expression = display.replace('×', '*').replace('÷', '/');

      expression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log₁₀/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/²√x/g, 'Math.sqrt')
        .replace(/³√x/g, 'Math.cbrt')
        .replace(/ʸ√x/g, 'Math.pow')
        .replace(/eˣ/g, 'Math.exp')
        .replace(/10ˣ/g, 'Math.pow(10,')
        .replace(/x²/g, 'Math.pow')
        .replace(/x³/g, 'Math.pow')
        .replace(/xʸ/g, 'Math.pow')
        .replace(/x!/g, 'factorial');

      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

      const evaluatedResult = eval(expression);
      setDisplay(evaluatedResult.toString());
      setResult(evaluatedResult.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const buttons = [
    ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷'],
    ['2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'],
    ['¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
    ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
    ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
  ];

  return (
    <div className={`calculator ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {isExploding && <ConfettiExplosion />}
      <ToggleButton isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      <Display value={display} />
      {buttons.map((row, i) => (
        <div key={i} className="button-row">
          {row.map((label) => (
            <Button 
              key={label} 
              label={label} 
              onClick={() => handleClick(label)} 
              className={`button ${['÷', '×', '-', '+', '='].includes(label) ? 'operator' : ''} ${label === '0' ? 'zero' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calculator;
