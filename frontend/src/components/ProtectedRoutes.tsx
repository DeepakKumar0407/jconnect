import { Link, Navigate, useNavigate} from "react-router-dom"

const ProtectedRoutes = ({children}:{children:React.ReactNode}) => {
    const jwt = localStorage.getItem('jwt_token')
    const navigate = useNavigate()
    if(!jwt){
      navigate('/login')
    }
  return (
    jwt?(children):(
      <div>You must be logged in
        <Navigate to="/login"/>
        <Link to="/login">Login</Link>
      </div>
    )
  )
}
export default ProtectedRoutes