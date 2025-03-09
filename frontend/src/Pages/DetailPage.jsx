import {useState, useEffect, useRef} from "react";
import {fetchData} from "../utils/fetchData.js";
import {Link, useParams} from "react-router-dom"

const DetailPage = () => {
    const hasMounted = useRef();
    const [data, setData] = useState({});
    const {id} = useParams()

    useEffect(() => {
        if(!hasMounted.current){
            hasMounted.current = true;
            return
        }

        const getDetailData = async () => {
            const result = await fetchData(`${import.meta.env.VITE_API_URL}movies/${id}`);
            setData(result);
        }

        getDetailData()

        return () => {}
    }, []);

    return(
        <div>
            <Link to={"/"}>Home</Link>
            <h2>Movie details</h2>
            {!!Object.keys(data).length &&
                Object.entries(data).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}: </strong> {value}
                    </p>
                ))
            }
        </div>
    )
}

export default DetailPage;