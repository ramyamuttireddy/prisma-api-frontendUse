// import { useForm } from 'react-hook-form'
// import './App.css'
// import axios from 'axios'
// import userStore from './store/user'
import AppRouter from './pages/approuter'

function App() {
//   const {register ,handleSubmit , getValues} =useForm()
//   const {login ,user } = userStore()
  
//  const onSubmit = async(data) => {
//   try {
//     console.log(data)
//     const {email ,password} =getValues()
//     const response = await axios.post("http://localhost:3000/users/login" ,{
//       email,
//       password
//     })
//     console.log(`response` ,JSON.stringify(response.data,null,2));
//     login(response.data)
//   } catch(err) {
//     console.log("error on data")
//     throw err
//   }
//  }

//  console.log(`user` ,JSON.stringify(user,null,2))
  return (
    <>
      <div> 

        
        <AppRouter />

        {/* <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        </div>
       
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
        <input name="email"  {...register("email")} className='border-2 border-black'/>
        <input name="password" {...register("password")} className='border-2 border-black'/>
        <button type='submit' onClick={onSubmit}>Login</button>
        </form> */}
       
      </div>
    </>
  )
}

export default App
