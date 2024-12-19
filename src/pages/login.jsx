import { useForm } from "react-hook-form"
import { axiosInstance } from "../client/api"
import userStore from "../store/user"
import { useNavigate } from "react-router-dom"
import vine from "@vinejs/vine"
import { vineResolver } from "@hookform/resolvers/vine"

const schema = vine.compile(
  vine.object({
    email:vine.string().email().minLength(1),
    password:vine.string().minLength(1)
  })
)

export default function Login() {
const  {register , getValues , handleSubmit,formState} = useForm({
  resolver:vineResolver(schema)
})
const {login , logOut ,user} = userStore()
 const navigate = useNavigate()

const onSubmit = async() => {
 try {
    const {email ,password} = getValues()
    const response = await axiosInstance.post("/auth/login" ,{
      email,
      password
    })
    console.log("logging")
    console.log(response.data);
    login(response.data.user ,response.data.token)
    navigate("/")
 } catch (error) {
   console.log("error on fecting Data" , error) 
 }
}
console.log(formState.errors)
  return (
    <div>
      {user && <button onClick={logOut}>Logout</button>}
      <form action="" className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
        <input {...register("email")}  className="border-black border-2"/>
        <input {...register("password")} className="border-black border-2"/>
        
        </div>

        <input type="submit" className="border-black border-2 bg-green-500 p-2" />
        
      </form>
    </div>
  )
}
