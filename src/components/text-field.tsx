"use client"

import React, { HTMLProps, useRef } from "react";
import { HiX } from "react-icons/hi";

interface TextFieldProps
  extends Omit<HTMLProps<HTMLInputElement>, "onChange" | "defaultValue"> {
  className?: string;
  icon?: JSX.Element;
  onChange?: (v: string) => void;
  onClearField?: () => void;
  value?: string;
}

function TextField({
  className,
  icon,
  onChange,
  onClearField,
  id,
  value,
  ...rest
}: TextFieldProps) {

  const clearField = () => {
    if (onChange) {
      onChange("");
      if (onClearField) onClearField();
    }
  };

  return (
    <div className="relative w-full h-full text-gray-700">
      <div
        className={`flex items-center rounded-lg form-input ${
          rest.disabled && "bg-primaryLightestGrey"
        } ${className || ""}`}
      >
        {icon && <div className="justify-center -mr-px">{icon}</div>}
        <input
          type="text"
          className={`w-full h-6 outline-none ${icon && "px-3"}`}
          id={id}
          name={id}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          value={value || ""}
          {...rest}
        />
        {!rest.disabled && onChange && value && (
          <button
            type="button"
            title="clear field"
            className="cursor-pointer"
            onClick={clearField}
          >
            <HiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TextField;
