"use client";

import { API_URL } from "@/consts";
import Form from "./Form";
import { useRouter } from "next/navigation";
import { showToast } from "@/toast-helper";

const fields = [
  { key: "username", label: "Username" },
  { key: "password", label: "Senha", type: "password" },
  { key: "confirmPassword", label: "Confirmar Senha", type: "password" },
];

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    if (!data.username?.trim() || !data.password?.trim()) {
      showToast("error", "Username e Senha são obrigatórios");
      return;
    }
    if (data.password?.trim() !== data.confirmPassword?.trim()) {
      showToast("error", "As senha devem ser iguais");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        showToast("success", "Conta criada");
        router.push("/");
        return;
      }
      const { detail } = await res.json();
      showToast(
        "error",
        detail || "Erro na criação, verifique as informações e tente novamente"
      );
    } catch {
      showToast(
        "error",
        "Erro na criação, verifique as informações e tente novamente"
      );
    }
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      helperText="Ir para login"
      onHelperClick={() => router.push("/")}
      submitText="Salvar"
    />
  );
}
