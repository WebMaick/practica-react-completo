import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formValues, handleInput] = useForm(initialState);
  const { email, password } = formValues;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validamos el formulario

    try {
      // Envio de formulario
      setError(true);
      setIsLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data);
      if (data.ok) {
        navigate("/");
      } else {
        setErrorMessage(data.message);
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <div className="p-5 rounded-md shadow-md">
        <h1 className="my-5 text-3xl font-bold text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoComplete="off"
            onChange={handleInput}
            value={email}
            className="px-3 py-2 border"
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <input
            onChange={handleInput}
            value={password}
            className="px-3 py-2 border"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />

          {error && (
            <div className="py-1 text-sm text-center text-white bg-red-500">
              {errorMessage}
            </div>
          )}

          <button
            disabled={isLoading}
            className="py-2.5 mt-3 text-white rounded-md disabled:opacity-80 bg-gray-950 hover:opacity-95"
          >
            {isLoading ? "Cargando..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-end gap-2 my-5 text-sm">
          <p>Dont Have an account?</p>
          <Link to="/signup">
            <span className="font-bold text-blue-700">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
