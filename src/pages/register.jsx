import { useForm } from "react-hook-form";
import { axiosInstance } from "../client/api";
import userStore from "../store/user";

const Register = () => {
  const { register, getValues, handleSubmit } = useForm();
  const { login, logOut } = userStore();

  const onSubmit = async () => {
    try {
      const { email, password, name, image } = getValues();
      const response = await axiosInstance.post("/users/create", {
        email,
        password,
        name,
        image,
      });
      console.log("logging");
      console.log(response.data);
      login(response.data.user, response.data.token);
    } catch (error) {
      console.log("error on fecting Data", error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={logOut}
          className="w-full py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              {...register("name")}
              placeholder="Name"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("password")}
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("image")}
              placeholder="Image URL"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          />
        </form>
      </div>
    </div>
  );
};
export default Register;
