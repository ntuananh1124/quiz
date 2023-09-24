// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { getHistory } from '../../services/historyServices';
import { getCookie } from '../../helpers/cookie';
import { useNavigate } from 'react-router';
import { getTopics } from '../../services/topicServices';
import { Link } from "react-router-dom";
import './History.scss';

export default function History() {
    const [dataHistory, setDataHistory] = useState([]);
    const userId = getCookie("id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const userHistoryData = await getHistory(userId);
            const topic = await getTopics();
            
            let newData = []
            for (let i = 0; i < userHistoryData.length; i++) {
                newData.push({
                    ...topic.find(item => item.id === userHistoryData[i].topicId),
                    ...userHistoryData[i]
                })
            }
            setDataHistory(newData.reverse());
        };
        fetchApi()
    }, [])

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Your History</h2>
            { dataHistory.length > 0 ? (<>
                <div className="history">
                    <table className="history__table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Topic Name</th>
                                <th>Details</th>
                                <th>Do Again</th>
                            </tr>
                        </thead>
                        <tbody>
                                {dataHistory.length > 0 && dataHistory.map((item,index) =>
                                    <>
                                        <tr>
                                            <td>{item.topicId}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className='show-btn'>
                                                    <Link to={"/result/" + item.id}>Show Details...</Link>
                                                </button>
                                            </td>
                                            <td>
                                                <button className='do-again-btn'>
                                                    <Link to={"/quiz/" + item.topicId}>Do Again !</Link>
                                                </button>
                                            </td>
                                        </tr>
                                    </>)
                                }
                        </tbody>
                    </table>
                </div>
            </>) : (<>
                <div className='content'>
                    <h2>You haven't done anything yet !</h2>
                    <button onClick={() => {navigate("/topic")}} className='btn'>Lam BT</button>
                </div>
            </>) }
        </>
    )
}