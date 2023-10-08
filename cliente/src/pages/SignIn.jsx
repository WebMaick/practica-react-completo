import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const initialState = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formValues, handleInput] = useForm(initialState);
  const { email, password } = formValues;
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validamos el formulario

    try {
      // Envio de formulario
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data);
      if (!data.ok) {
        return dispatch(signInFailure(data.message));
        // setError(true);
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err.message));
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
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="py-2.5 mt-3 text-white rounded-md disabled:opacity-80 bg-gray-950 hover:opacity-95"
          >
            {loading ? "Cargando..." : "Sign In"}
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
