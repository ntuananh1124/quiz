import { Link } from "react-router-dom";
import './Topic.scss';
import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicServices";

export default function Topic() {
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getTopics();
            setTopic(result);
            // console.log(result);
        }
        fetchApi(); 
    }, [])
    return (
        <>
            <div className="topic">
                <table className="topic__table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Topic Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {topic.length > 0 && topic.map((item,index) =>
                                <>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={"/quiz/" + item.id}>Show All...</Link>
                                        </td>
                                    </tr>
                                </>)
                            }
                    </tbody>
                </table>
            </div>
        </>
    )
}