import { NumericFormat } from 'react-number-format';
import type { NumberFormatValues } from 'react-number-format';

const InputField = ({ label, name, value, otherValue, onValueChange, isPercentage }: {
  label: string;
  name: string;
  value: number;
  otherValue: number;
  onValueChange: (name: string, value: number) => void;
  isPercentage: boolean;
}) => {
  const handleValueChange = (values: NumberFormatValues) => {
    onValueChange(name, parseFloat((values.floatValue || 0).toFixed(4)));
  };

  const diff = value - otherValue;
  const diffDisplay = isPercentage ? (diff * 100).toFixed(2) : Math.floor(diff);

  return (
    <div className="stat-row">
      <label htmlFor={name} className="stat-label">{label}</label>
      <div className="input-wrapper">
        <NumericFormat
          id={name}
          className="stat-input"
          value={isPercentage ? parseFloat((value * 100).toFixed(2)) : value}
          onValueChange={handleValueChange}
          suffix={isPercentage ? ' %' : ''}
          allowNegative={false}
          thousandSeparator={true}
        />
        <span className={`diff ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral'}`}>
          ({diff > 0 ? '+' : ''}{diffDisplay})
        </span>
      </div>
    </div>
  );
};

export default InputField;
