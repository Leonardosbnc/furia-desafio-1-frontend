"use client";

import { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";

export default function Form({
  fields,
  onSubmit,
  helperText,
  onHelperClick,
  submitText,
}) {
  const [data, setData] = useState({});

  return (
    <div className="flex flex-col space-y-3 justify-center items-center">
      {fields.map((field) => {
        return (
          <FormField
            key={field.key}
            label={field.label}
            setValue={(v) => setData((prev) => ({ ...prev, [field.key]: v }))}
            value={data[field.key] || ""}
          />
        );
      })}

      {helperText && (
        <div className="flex">
          <span
            className="flex underline text-sm cursor-pointer"
            onClick={onHelperClick}
          >
            {helperText}
          </span>
        </div>
      )}
      <Button onClick={() => onSubmit(data)}>{submitText}</Button>
    </div>
  );
}
