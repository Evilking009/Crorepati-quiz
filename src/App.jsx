import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Trivia from './components/Trivia';
import { data, moneyPyramid as moneyPyramidRaw } from './myData';
import Timer from './components/Timer';
import Start from './components/Start';

const App = () => {

    // useMemo Hook
    const moneyPyramid = useMemo(() => moneyPyramidRaw, []);

    const [username, setUsername] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("Rs. 0");

    useEffect(() => {
        questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
    }, [moneyPyramid, questionNumber]);

    return (
        <div className='app'>
            {username ? (
                <>
                    <div className="main">
                        <div className="usernameText">{stop ? username : `Welcome ${username}`}</div>
                        {stop ? <h1 className='endText'>You earned: {earned}</h1> : (
                            <>
                                <div className="top">
                                    <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} /></div>
                                </div>
                                <div className="bottom">
                                    <Trivia
                                        data={data}
                                        setStop={setStop}
                                        questionNumber={questionNumber}
                                        setQuestionNumber={setQuestionNumber}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                    <div className="pyramid">
                        <div className="moneyList">
                            {moneyPyramid.map(item => (
                                <li className={`moneyListItem ${questionNumber === item.id && 'active'}`} key={item.id}>
                                    <span className="moneyListItemNumber">{item.id}</span>
                                    <span className="moneyListItemAmount">{item.amount}</span>
                                </li>
                            ))}
                        </div>
                    </div>
                </>
            ) : <Start setUsername={setUsername} />}
        </div>
    )
}

export default App