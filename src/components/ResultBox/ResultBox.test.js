import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  const formatValue = (value) => {
    const formattedValue = parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return formattedValue
  };

  const testCasesPLNtoUSD = [
    { amount: '100.00', convertedAmount:'28.57' },
    { amount: '28.00', convertedAmount:'8.00' },
    { amount: '333.00', convertedAmount:'95.14' },
    { amount: '1220.00', convertedAmount:'348.57' },
    { amount: '88.00', convertedAmount:'25.14' },
    { amount: '10000.00', convertedAmount:'2857.14' },
  ];

  const testCasesUSDtoPLN = [
    { amount: '1.00', convertedAmount:'3.50' },
    { amount: '123.00', convertedAmount:'430.50' },
    { amount: '2222.00', convertedAmount:'7777.00' },
    { amount: '10000.00', convertedAmount:'35000.00' },
    { amount: '55.00', convertedAmount:'192.50' },
    { amount: '323.00', convertedAmount:'1130.50' },
  ];

  const testTheSameCurrency = [
    { amount: '5.00' },
    { amount: '10.00' },
    { amount: '100.00' },
    { amount: '2000.00' },
    { amount: '60000.00' },
    { amount: '123.00' },
  ];

  const testNegativeValues = [
    { amount: '-1.00', from: 'PLN', to: 'USD' },
    { amount: '-10.00', from: 'USD', to: 'PLN' },
    { amount: '-1000.00', from: 'PLN', to: 'PLN' },
    { amount: '-10000.00', from: 'USD', to: 'USD' },
    { amount: '-2.00', from: 'PLN', to: 'USD' },
    { amount: '-16.00', from: 'USD', to: 'PLN' },
    { amount: '-256.00', from: 'PLN', to: 'PLN' },
    { amount: '-65536.00', from: 'USD', to: 'USD' },
  ];

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    for(const testObj of testCasesPLNtoUSD) {
      render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`PLN ${formatValue(testObj.amount)} = $${formatValue(testObj.convertedAmount)}`);
      cleanup();
    };
  });
  it('should render proper info about conversion when USD -> PLN', () => {
    for(const testObj of testCasesUSDtoPLN) {
      render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`$${formatValue(testObj.amount)} = PLN ${formatValue(testObj.convertedAmount)}`);
      cleanup();
    };
  });
  it('should render proper info about conversion when USD -> USD', () => {
    for(const testObj of testTheSameCurrency) {
      render(<ResultBox from="USD" to="USD" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`$${formatValue(testObj.amount)} = $${formatValue(testObj.amount)}`);
      cleanup();
    };
  });
  it('should render proper info about conversion when PLN -> PLN', () => {
    for(const testObj of testTheSameCurrency) {
      render(<ResultBox from="PLN" to="PLN" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`PLN ${formatValue(testObj.amount)} = PLN ${formatValue(testObj.amount)}`);
      cleanup();
    };
  });
  it('should render "Wrong value..." when value is negative', () => {
    for(const testObj of testNegativeValues) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`Wrong value...`);
      cleanup();
    };
  });
});