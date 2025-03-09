import {useState, useEffect, useRef} from "react";
import {fetchData} from "../utils/fetchData.js";
import {Link} from "react-router-dom"

const SearchPage = () => {
    const inputRef = useRef();
    const hasMounted = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }

        if (!query) return

        const getSearchData = async () => {
            const result = await fetchData(`${import.meta.env.VITE_API_URL}?s=${query}`);
            setSearchResult(result);
        }

        getSearchData()

        return () => {}
    }, [query]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!inputRef.current?.value) return;

        setQuery(encodeURIComponent(inputRef.current.value))
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={inputRef} type="text" placeholder={"Search for a movie"}/>
                <input type="submit" value="Submit"/>
            </form>

            {!!searchResult.length && (
                <ul>
                    {searchResult.map((item, index) => (
                        <li key={index}>
                            <h2>
                                <Link to={`movies/${item.id}`}>
                                    {item.title}
                                </Link>
                            </h2>
                            <p>Year: {item.year}</p>
                            <img src={item.poster} alt=""/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchPage;