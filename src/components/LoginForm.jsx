"use client";

import { API_URL } from "@/consts";
import Form from "./Form";

const fields = [
  { key: "username", label: "Username" },
  { key: "password", label: "Password" },
];

export default function LoginForm() {
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Logged in");
        const { access_token } = await res.json();
        localStorage.setItem("authToken", access_token);
        window.location.href = "/chat";
        return;
      }

      alert(
        "Error trying to login, please check username and password and try again"
      );
    } catch {
      alert(
        "Error trying to login, please check username and password and try again"
      );
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        helperText="Criar conta"
        submitText="Login"
        onHelperClick={() => (window.location.href = "/register")}
      />
    </div>
  );
}
