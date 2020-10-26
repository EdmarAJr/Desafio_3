import React from "react";

export function FormularioLogin({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [mostrarErros, setMostrarErros] = React.useState(false);

  return (
    <form
      className="login"
      onSubmit={(event) => {
        event.preventDefault();
        setMostrarErros(true);

        const validado = email && senha;
        if (validado && onSubmit) {
          onSubmit({ email, senha });
        }
      }}
    >
      <label>
        Email{" "}
        <input
          className={mostrarErros && !email ? "invalido" : ""}
          type="email"
          value={email}
          onInput={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Senha{" "}
        <input
          className={mostrarErros && !senha ? "invalido" : ""}
          type="password"
          value={senha}
          onInput={(event) => setSenha(event.target.value)}
        />
      </label>
      <button>Logar</button>
    </form>
  );
}
