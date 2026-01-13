import { useParams } from "react-router-dom"
import SearchUsers from "../components/SearchUsers"
import SearchPosts from "../components/SearchPosts"

const SearchResults = () => {
  const {blob} = useParams<string>()
  return (
    <div className="div">
      <h1>Search Results</h1>
      <SearchUsers blob={blob?blob:""}/>
      <SearchPosts blob={blob?blob:""}/>
    </div>
  )
}
export default SearchResults