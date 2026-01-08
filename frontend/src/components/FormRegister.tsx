const FormRegister = () => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    console.log(name,value)
  }
  return (
    <div className="w-full">
      <h1>Register</h1>
      <form className="w-full flex flex-col justify-baseline gap-4">
        <label htmlFor="name">name</label><input type="text" name="name" value="" onChange={handleChange} placeholder="name" required></input>
        <label htmlFor="username">username</label><input type="text" name="username" value="" onChange={handleChange} placeholder="username" required></input>
        <label htmlFor="email">email</label><input type="email" name="email" value="" onChange={handleChange} placeholder="email" required></input>
        <label htmlFor="dob">dob</label><input type="date" name="dob" value="" onChange={handleChange} placeholder="dob" required></input>
        <label htmlFor="password">password</label><input type="password" name="password" value="" onChange={handleChange} placeholder="password" required></input>
      </form>
    </div>
  )
}
export default FormRegister