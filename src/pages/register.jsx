import { useForm } from "react-hook-form"
import { axiosInstance } from "../client/api"
import userStore from "../store/user"

const Register =() => {
    const  {register , getValues , handleSubmit} = useForm()
const {login , logOut} = userStore()
 
const onSubmit = async() => {
 try {
    const {email ,password ,name ,image} = getValues()
    const response = await axiosInstance.post("/users/create" ,{
      email,
      password,
      name,
      image
    })
    console.log("logging")
    console.log(response.data);
    login(response.data.user ,response.data.token)
    
 } catch (error) {
   console.log("error on fecting Data" , error) 
 }
}
  return (
    <div>
        <div>
      <button onClick={logOut}>Logout</button>
      <form action="" className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
        <input {...register("name")} placeholder="Name" className="border-black border-2"/>
        <input {...register("email")} placeholder="Email" className="border-black border-2"/>
        <input {...register("password")} placeholder="Password" className="border-black border-2"/>
        <input {...register("image")} placeholder="Image" className="border-black border-2"/>
        
        </div>

        <input type="submit" className="border-black border-2 bg-green-500 p-2" />
        
      </form>
    </div>
      
    </div>
  )
}
export default Register;