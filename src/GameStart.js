import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GameStart() {

    const location = useLocation();
    const allSubmittedNouns = location.state?.allSubmittedNouns || [];
    console.log(allSubmittedNouns)

    return (
        <div>
            <p>{allSubmittedNouns} {allSubmittedNouns.length}</p>
        </div>
    );
}

export default GameStart;
