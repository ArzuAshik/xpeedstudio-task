import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const timerRef = useRef(null);
    const history = useHistory();
    const [remainingTime, setRemainingTime] = useState(5);
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setRemainingTime(currentState => currentState - 1);
        }, 1000);
    }, []);
    
    if(remainingTime < 0){
        clearInterval(timerRef.current);
        history.push("/");
    }
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page Not Found!</h2>
            <p>Redirecting to The Home Page in <span>{remainingTime}</span> Seconds.</p>
        </div>
    );
};

export default NotFound;