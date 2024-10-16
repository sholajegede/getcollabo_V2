import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
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
            className={`text-sm text-neutral-900 dark:text-neutral-100 ${
              !!subLabel ? "-mt-0.5" : ""
            }`}
          >
            {label}
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

export default Checkbox;
