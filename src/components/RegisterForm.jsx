"use client";

import { API_URL } from "@/consts";
import Form from "./Form";

const fields = [
  { key: "username", label: "Username" },
  { key: "password", label: "Senha", type: "password" },
  { key: "confirmPassword", label: "Confirmar Senha", type: "password" },
];

export default function RegisterForm() {
  const handleSubmit = async (data) => {
    if (!data.username?.trim() || !data.password?.trim()) {
      alert("Username e Senha são obrigatórios");
      return;
    }
    if (data.password?.trim() !== data.confirmPassword?.trim()) {
      alert("As senha devem ser iguais");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Conta criada");
        window.location.href = "/";
        return;
      }
      const { detail } = await res.json();
      alert(
        detail || "Erro na criação, verifique as informações e tente novamente"
      );
    } catch {
      alert("Erro na criação, verifique as informações e tente novamente");
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      helperText="Ir para login"
      onHelperClick={() => (window.location.href = "/")}
      submitText="Salvar"
    />
  );
}
