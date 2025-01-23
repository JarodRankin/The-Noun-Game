import React, { useState, useEffect, useRef } from "react";

const Timer = ({ initialTime = 60, onTimeUp, onTimeUpdate }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef(null);
    const hasCalledOnTimeUp = useRef(false);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);

                    if (!hasCalledOnTimeUp.current) {
                        hasCalledOnTimeUp.current = true;
                        if (onTimeUp) onTimeUp();
                    }

                    return 0;
                }
                const newTime = prevTime - 1;
                if (onTimeUpdate) onTimeUpdate(newTime);
                return newTime;
            });
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [onTimeUp, onTimeUpdate]);

    useEffect(() => {
        hasCalledOnTimeUp.current = false;
    }, [initialTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div>
            <h1>Time Left: {formatTime(timeLeft)}</h1>
        </div>
    );
};

export default Timer;
