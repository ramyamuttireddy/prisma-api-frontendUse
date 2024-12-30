import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import userStore from "../store/user";
import { useNavigate } from "react-router-dom";
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";

const schema = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1),
  })
);

const Login = () => {
  const { register, getValues, handleSubmit, formState } = useForm({
    resolver: vineResolver(schema),
  });
  const { login, logOut, user } = userStore();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("logging");
      console.log(response.data);
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (error) {
      console.log("error on fecting Data", error);
    }
  };
  console.log(formState.errors);
  return (
    <div className="max-w-sm mx-auto p-5">
      {user && (
        <button
          onClick={logOut}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mb-5"
        >
          Logout
        </button>
      )}

      <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
        />
      </form>
    </div>
  );
};
export default Login;
