const FormPost = () => {
  return (
    <div>
      <form className="w-full">
      <textarea>Make a post</textarea>
      <label htmlFor="image">I</label><input type="file"></input>
      <label htmlFor="video">V</label><input type="file"></input>
      </form>
    </div>
  )
}
export default FormPost