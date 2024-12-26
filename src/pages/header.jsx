
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-center bg-pink-200 gap-4 p-4 mb-3'>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
export default  Header;