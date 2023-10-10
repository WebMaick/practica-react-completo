import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
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

  return (
    <div className="max-w-lg mx-auto mt-3 shadow-md p-5">
      <h2 className="text-center text-3xl my-3">Profile</h2>

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
          className="rounded-full mx-auto my-4 cursor-pointer"
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

        <button className="bg-gray-950 text-white py-2 w-full rounded-md mt-4">
          {loading ? "Cargando..." : "UPDATE"}
        </button>
      </form>

      <div className="flex justify-between text-sm text-gray-950 font-semibold my-3">
        <span onClick={handleDeleteUser} className="cursor-pointer">
          Delete account
        </span>
        <span>Sign out</span>
      </div>

      {updateSuccess && (
        <span className="bg-green-700 text-white p-2 rounded-md">
          Usuario actualizado correctamente
        </span>
      )}

      <p className="text-red-500 italic font-semibold">{error ? error : ""}</p>
    </div>
  );
};
