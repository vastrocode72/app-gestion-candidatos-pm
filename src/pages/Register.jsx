import { Link } from "react-router-dom";
import { end_points } from "../services/api";
import { useState, useEffect } from "react";
import { redirectAlert } from "../helpers/alerts";

const Register = () => {
  const [users, setUsers] = useState([]);
  function getUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function findUser(email, username) {
    let auth = users.find(
      (item) => username == item.username || email == item.email,
    );
    return auth;
  }

  function createUser(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    let registro = findUser(data.email, data.username);
    if (registro) {
      redirectAlert(
        "Error de registro",
        "El correo o usuario ya existe en la base de datos",
        "/register",
        "error",
      );
    } else {
      fetch(end_points.users, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => {
          redirectAlert(
            "Usuario Registrado",
            "Será redireccionado al login para que haga el inicio de sesión",
            "/login",
            "success",
          );
        });
    }
  }

  return (
    <div className="form-login-container">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight text-blue-900">
              Registro
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Crea una cuenta para acceder al tablero.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Inicio
          </Link>
        </div>

        <form onSubmit={createUser} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Nombre completo
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Jaime Zapata"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              placeholder="jaimezapata"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">Correo</label>
            <input
              type="email"
              name="email"
              placeholder="correo@dominio.com"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">Rol</label>
            <select
              name="role"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            >
              <option value="admin">admin</option>
              <option value="recruiter">recruiter</option>
              <option value="viewer">viewer</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-600">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-blue-700/20 focus:ring-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
            <span className="text-sm text-slate-600">
              Acepto términos y condiciones
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <p className="text-sm text-slate-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-700 hover:underline"
              >
                Ir a login
              </Link>
            </p>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
