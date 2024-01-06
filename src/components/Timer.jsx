import { useEffect, useState } from "react"
import wrong from '../sounds/wrong.mp3';
import useSound from "use-sound";

const Timer = ({ setStop, questionNumber, }) => {

    const [timer, setTimer] = useState(30);
    const [endSound] = useSound(wrong);

    useEffect(() => {
        if (timer === 0) {
            endSound();
            return setStop(true);
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [setStop, timer, endSound]);

    useEffect(() => {
        setTimer(30);
    }, [questionNumber]);

    return timer;
}

export default Timer