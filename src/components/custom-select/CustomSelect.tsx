import { IconSelector, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import './CustomSelect.css';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  clearable?: boolean;
  name: string;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  clearable = false,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="select-label">
        {label}
      </label>

      <div className={`select-wrapper ${focused ? 'focused' : ''}`}>
        <select
          name={name}
          className="custom-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        >
          {value === '' && <option value="" style={{ display: 'none' }} disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="select-option">
              {opt.label}
            </option>
          ))}
        </select>

        {clearable && value ? (
          <IconX
            size={16}
            className="select-icon clear-icon"
            onClick={() => onChange('')}
            role="button"
          />
        ) : (
          <IconSelector size={16} className="select-icon" />
        )}
      </div>
    </div >
  );
};

export default CustomSelect;
