const FormLogin = () => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    console.log(name,value)
  }
  return (
      <div className="w-full">
      <h1>Login</h1>
      <form className="w-full flex flex-col justify-baseline gap-4">
        <label htmlFor="email">email</label><input type="email" name="email" value="" onChange={handleChange} placeholder="email" required></input>
        <label htmlFor="password">password</label><input type="password" name="password" value="" onChange={handleChange} placeholder="password" required></input>
      </form>
    </div>
  )
}
export default FormLogin