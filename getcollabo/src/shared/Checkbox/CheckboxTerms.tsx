import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface CheckboxTermsProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxTerms: FC<CheckboxTermsProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="w-5 h-5 bg-white rounded focus:ring-action-primary text-primary-500 border-primary border-neutral-500 dark:bg-neutral-700 dark:checked:bg-primary-500 focus:ring-primary-500"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-2.5 sm:ml-3.5 flex flex-col flex-1 justify-center"
        >
          <span
            className={`text-xs text-neutral-900 dark:text-neutral-100 ${
              !!subLabel ? "-mt-0.5" : ""
            }`}
          >
            By checking this box, you confirm that you agree to the <Link to="/terms" className="underline text text-primary-6000 hover:text-primary-700">terms and conditions</Link> and have read our <Link to="/privacy" className="underline text text-primary-6000 hover:text-primary-700">privacy policy</Link>.
          </span>
          {subLabel && (
            <p className="mt-0.5 text-neutral-500 dark:text-neutral-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default CheckboxTerms;
