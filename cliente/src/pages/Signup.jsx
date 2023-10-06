import {Link} from "react-router-dom"

export const Signup = () => {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <div className="p-5 rounded-md shadow-md">
        <h1 className="my-5 text-3xl font-bold text-center">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input className="px-3 py-2 border" type="text" name="text" id="text" placeholder="username"/>
          <input className="px-3 py-2 border" type="email" name="email" id="email" placeholder="email"/>
          <input className="px-3 py-2 border" type="password" name="password" id="password" placeholder="password"/>

          <button className="py-2.5 mt-3 text-white rounded-md disabled:opacity-80 bg-gray-950 hover:opacity-95">Sign Up</button>
        </form>

        <div className="flex justify-end gap-2 my-5 text-sm">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="font-bold text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
