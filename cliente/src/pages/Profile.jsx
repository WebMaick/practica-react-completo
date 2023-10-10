import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice";

export const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [files, setFiles] = useState(undefined);
  const imageRef = useRef(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const [formValues, handleInput] = useForm({
    fullname: currentUser.fullname,
    email: currentUser.email,
    password: currentUser.password,
  });
  const { fullname, email } = formValues;

  console.log(files);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validar campos

    // console.log(formValues);
    try {
      const res = await fetch(`/api/user/update/${currentUser.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (data.ok === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.message));
    } finally {
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }
  };

  // Funcion para eliminar
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.ok === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  // FUncion para salir de la sesion
  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.ok === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(signoutUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg p-5 mx-auto mt-3 shadow-md">
      <h2 className="my-3 text-3xl text-center">Profile</h2>

      <form className="grid gap-y-3" onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          id="image"
          ref={imageRef}
          hidden
          accept="image/*"
          onChange={(e) => setFiles(e.target.files[0])}
        />
        <img
          src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?size=626&ext=jpg"
          alt="imagen-avatar"
          width={"70px"}
          height={"70px"}
          className="mx-auto my-4 rounded-full cursor-pointer"
          onClick={() => imageRef.current.click()}
        />
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="username"
          className="py-1.5 px-2"
          value={fullname}
          onChange={handleInput}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="py-1.5 px-2"
          value={email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="py-1.5 px-2"
        />

        <button className="w-full py-2 mt-4 text-white rounded-md bg-gray-950">
          {loading ? "Cargando..." : "UPDATE"}
        </button>
      </form>

      <div className="flex justify-between my-3 text-sm font-semibold text-gray-950">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>

        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      {updateSuccess && (
        <span className="p-2 text-white bg-green-700 rounded-md">
          Usuario actualizado correctamente
        </span>
      )}

      <p className="italic font-semibold text-red-500">{error ? error : ""}</p>
    </div>
  );
};
