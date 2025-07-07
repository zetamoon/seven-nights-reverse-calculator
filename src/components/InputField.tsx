import { useRef, useEffect } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (values: NumberFormatValues) => {
    onValueChange(name, parseFloat((values.floatValue || 0).toFixed(4)));
  };

  useEffect(() => {
    // When the input is cleared and becomes 0, move the cursor to the end.
    if (value === 0 && document.activeElement === inputRef.current) {
      const input = inputRef.current;
      if (input) {
        // Use setTimeout to defer the cursor placement until after the re-render.
        setTimeout(() => {
          const suffix = isPercentage ? ' %' : '';
          const position = input.value.length - (suffix ? suffix.length : 0);
          input.setSelectionRange(position, position);
        }, 0);
      }
    }
  }, [value, isPercentage]);

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
          getInputRef={inputRef}
          onClick={(e) => {
            const target = e.target as HTMLInputElement;
            const suffix = isPercentage ? ' %' : '';
            const position = target.value.length - (suffix ? suffix.length : 0);
            target.setSelectionRange(position, position);
          }}
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
