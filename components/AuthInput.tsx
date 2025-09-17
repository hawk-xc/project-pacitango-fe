'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  withTogglePassword?: boolean;
};
export default function AuthInput({ label, name, type = 'text', placeholder, icon, value, onChange, error, withTogglePassword }: Props) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' && withTogglePassword ? (show ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-[14px] border ${error ? 'border-red-400' : 'border-gray-200'} 
          pl-10 pr-11 text-[15px] focus:ring-2 focus:ring-[#6EA8FF] outline-none`}
        />
        {type === 'password' && withTogglePassword && (
          <button type="button" aria-label="Toggle password" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
