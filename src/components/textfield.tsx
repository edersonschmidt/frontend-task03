"use client"

import React, { HTMLProps } from "react"

import { HiX } from "react-icons/hi"

interface TextFieldProps
  extends Omit<HTMLProps<HTMLInputElement>, "onChange" | "defaultValue"> {
  className?: string
  icon?: JSX.Element
  onChange?: (v: string) => void
  onClearField?: () => void
  value?: string
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
      onChange("")
      if (onClearField) onClearField()
    }
  }

  return (
    <div className="relative h-full w-full text-gray-700">
      <div
        className={`form-input flex items-center rounded-lg ${
          rest.disabled && "bg-primaryLightestGrey"
        } ${className || ""}`}
      >
        {icon && <div className="-mr-px justify-center">{icon}</div>}
        <input
          type="text"
          className={`h-6 w-full outline-none ${icon && "px-3"}`}
          id={id}
          name={id}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value)
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
            <HiX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TextField
