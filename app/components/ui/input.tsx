import React, { cloneElement, forwardRef } from "react";

import { tw } from "~/utils";

export const handle = { i18n: ["common", "operations"] };

type HTMLInputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  icon?: React.ReactElement<{ className?: string }>;
  type?: HTMLInputTypes;
  error?: string | null;
  conditionLabel?: string;
  withPreview?: boolean;
};

export function Label({
  label,
  icon,
  required,
  name,
}: {
  name: InputProps["name"];
  label: InputProps["label"];
} & Pick<InputProps, "icon" | "required">) {
  return (
    <div className="flex items-center">
      <div className="mr-2 inline-flex space-x-1">
        {icon ? cloneElement(icon, { className: "h-5 w-5 stroke-2" }) : null}
        <label htmlFor={name} className="text-sm font-medium text-slate-400">
          {label}
        </label>
      </div>
      {required ? (
        <span
          className="text-xs font-light italic text-red-500"
          id={`${name}-required`}
        >
          Requis
        </span>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    placeholder,
    type = "text",
    icon,
    required,
    error,
    autoComplete = "off",
    defaultValue,
    className,
    disabled,
    ...inputProps
  },
  ref
) {
  return (
    <div className="space-y-1">
      {label ? (
        <Label name={name} label={label} icon={icon} required={required} />
      ) : null}
      <input
        ref={ref}
        type={type}
        name={name}
        id={name}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        autoCorrect="off"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={tw(
          "w-full",
          "focus:border-fp-light rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-transparent",
          "bg-white text-base  font-medium placeholder:text-slate-400",
          error && "border-red-400",
          disabled && "cursor-default bg-gray-100",
          className
        )}
        {...inputProps}
      />
      {error ? <InputError>{error}</InputError> : null}
    </div>
  );
});

export function TextArea({
  name,
  label,
  placeholder,
  icon,
  required,
  disabled,
  className,
  error,
  counter,
  ...textAreaProps
}: React.HTMLProps<HTMLTextAreaElement> &
  Pick<InputProps, "icon" | "error"> & { counter?: number }) {
  return (
    <div className="space-y-1">
      <Label name={name} label={label} icon={icon} required={required} />

      <textarea
        name={name}
        id={name}
        required={required}
        className={tw(
          "w-full",
          "rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-transparent",
          "bg-white text-base font-bold placeholder:text-gray-300",
          error && "border-red-400",
          disabled && "cursor-default bg-gray-100",
          className
        )}
        placeholder={placeholder}
        {...textAreaProps}
      />
      {counter ? (
        <div className="justify-self-end text-sm text-gray-500">
          <span className={tw(counter > 280 && "font-semibold text-red-500")}>
            {counter}
          </span>{" "}
          / 280
        </div>
      ) : null}
      {error ? <InputError>{error}</InputError> : null}
    </div>
  );
}

type SelectInputOption<T> = {
  value: T;
  label: string;
};

export function SelectInput<T extends string | number>({
  name,
  label,
  icon,
  required,
  disabled,
  options,
  defaultValue,
  className,
  error,
  placeholder,
  onChange,
}: React.HTMLProps<HTMLSelectElement> &
  Pick<InputProps, "icon" | "error"> & {
    options: ReadonlyArray<SelectInputOption<T>>;
    defaultValue?: T;
  }) {
  return (
    <div className="space-y-1">
      {label ? (
        <Label name={name} label={label} icon={icon} required={required} />
      ) : null}

      <select
        id={name}
        name={name}
        className={tw(
          "w-full",
          "focus:border-fp-light rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-transparent",
          "text-fp-400 bg-white text-base font-medium placeholder:text-slate-400",
          error && "border-red-400",
          disabled && "cursor-default bg-gray-100",
          className
        )}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error ? <InputError>{error}</InputError> : null}
    </div>
  );
}

export function InputError({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-red-500">{children}</p>;
}
