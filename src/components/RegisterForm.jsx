"use client";

import { API_URL } from "@/consts";
import Form from "./Form";

const fields = [
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
  { key: "confirmPassword", label: "Confirm Password" },
];

export default function RegisterForm() {
  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Account created");
        window.location.href = "/";
        return;
      }

      alert(
        "Error creating account, please check username and password and try again"
      );
    } catch {
      alert(
        "Error creating account, please check username and password and try again"
      );
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      helperText="Ir para login"
      onHelperClick={() => (window.location.href = "/")}
    />
  );
}
