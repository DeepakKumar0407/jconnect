import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="div">
        <h1>Page not found...</h1>
        <p>Go back to home <Link to='/home'>Click here</Link></p>
    </div>
  )
}
export default PageNotFound