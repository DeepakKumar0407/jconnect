import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormSearch = () => {
    const [search,setSearch] = useState('')
    const navigate = useNavigate()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    navigate(`/search/${search}`)
}
  return (
    <div>
        <form onSubmit={handleSubmit} className="flex justify-baseline">
            <input type="text" name="search" value={search} onChange={handleChange} placeholder="search" className="w-1/2 md:w-fit md:text-xl lg:text-2xl" required></input>
            <button><MagnifyingGlassCircleIcon className="icon"/></button>
        </form>
    </div>
  )
}
export default FormSearch