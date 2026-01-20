import { Link } from "react-router-dom"

const ProtectedRoutes = ({children}:{children:any}) => {
    const jwt = localStorage.getItem('jwt_token')
  return (
    jwt?(children):(
      <div>You must be logged in
        <Link to="/login">Login</Link>
      </div>
    )
  )
}
export default ProtectedRoutes