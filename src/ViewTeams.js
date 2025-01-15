import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewTeams() {
    const location = useLocation();
    const playersList = location.state?.playersList || [];
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const hasRandomized = useRef(false);

    const navigate = useNavigate();

    const randomizeTeams = () => {
        if (hasRandomized.current) return;
        
        const newPlayerNames = [...playersList]
            .sort(() => Math.random() - 0.5);

        console.log(newPlayerNames);

        const team1Players = newPlayerNames.filter((_, index) => index % 2 === 0);
        const team2Players = newPlayerNames.filter((_, index) => index % 2 !== 0);

        setTeam1(team1Players);
        setTeam2(team2Players);

        console.log(team1);

        hasRandomized.current = true;
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const submitTotalNouns = (selectedTotal) => {
        navigate('/submitNouns', { state: { selectedTotal, team1, team2 } });
    }

    useEffect(() => {
        randomizeTeams();
    }, [playersList]);

    return (
        <div>
            <h1>View Teams:</h1>
            {team1.length > 0 && team2.length > 0 ? (
                <div>
                    <p>Team 1:</p>
                    <ul>
                        {team1.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                    <p>Team 2:</p>
                    <ul>
                        {team2.map((player, index) => (
                            <li key={index}>{player}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No players have been added.</p>
            )}
            <div style={{ marginBottom: '50px', fontSize: '18px' }}>
                <button onClick={reloadPage}>Randomize Teams</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                    onClick={() => submitTotalNouns(playersList.length * 3)}
                    style={{ fontSize: '18px' }}>
                    Play with {playersList.length * 3} Nouns
                </button>
                <button 
                    onClick={() => submitTotalNouns(playersList.length * 6)}
                    style={{ fontSize: '18px' }}>
                    Play with {playersList.length * 6} Nouns
                </button>
            </div>
        </div>
    );
}

export default ViewTeams;
