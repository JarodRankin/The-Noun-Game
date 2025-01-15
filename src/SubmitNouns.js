import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SubmitNouns() {
    const [playerAnswers, setPlayerAnswers] = useState([]);
    const [allNouns, setAllNouns] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(1);
    const [playerCount, setPlayerCount] = useState(0);

    const location = useLocation();
    const totalNouns = location.state?.selectedTotal || 0;
    const team1 = location.state?.team1 || [];
    const team2 = location.state?.team2 || [];
    
    const totalPlayers = team1.length + team2.length;

    const navigate = useNavigate();

    const updatePlayerAnswers = (index, event) => {
        const updatedList = [...playerAnswers];
        updatedList[index] = event.target.value;
        setPlayerAnswers(updatedList);
    }

    const updateAllNouns = () => {
        const updatedList = [...allNouns];
        playerAnswers.forEach(answer => {
            const firstEmptyIndex = updatedList.indexOf('');
            if(firstEmptyIndex !== -1) {
                updatedList[firstEmptyIndex] = answer;
            }
        });
        
        setAllNouns(updatedList);
        
        setPlayerAnswers(new Array(playerAnswers.length).fill(''));

        const currentPlayer = playerCount;
        if(currentTeam === 1) {
            if(team1.length === currentPlayer + 1) {
                setCurrentTeam(2);
                setPlayerCount(0);
            } else {
                setPlayerCount(currentPlayer + 1);
            }
        } else {
            if(team2.length === currentPlayer + 1) {
                const allSubmittedNouns = updatedList;
                navigate('/gameStart', { state: { allSubmittedNouns } });
            } else {
                setPlayerCount(currentPlayer + 1);
            }
        }
    }

    useEffect(() => {
        if (totalPlayers > 0) {
            const answersPerPlayer = Math.floor(totalNouns / totalPlayers);
            setPlayerAnswers(Array.from({ length: answersPerPlayer }, () => ''));
            setAllNouns(Array.from({ length: totalNouns }, () => ''));
        }
    }, [totalNouns, team1, team2]);

    return (
        <div>
            <p>Team {currentTeam}, You Are Up!</p>
            {
                currentTeam === 1 
                    ? <p>{team1[playerCount]} It is Your Turn</p> 
                    : <p>{team2[playerCount]} It is Your Turn</p>
            }
            {
                playerAnswers.map((_, index) => {
                    let label = '';
                    if (
                        (playerAnswers.length === 6 && (index === 0 || index === 1)) ||
                        (playerAnswers.length === 3 && index === 0)
                    ) {
                        label = 'Enter a Person';
                    } else if (
                        (playerAnswers.length === 6 && (index === 2 || index === 3)) ||
                        (playerAnswers.length === 3 && index === 1)
                    ) {
                        label = 'Enter a Place';
                    } else if (
                        (playerAnswers.length === 6 && (index === 4 || index === 5)) ||
                        (playerAnswers.length === 3 && index === 2)
                    ) {
                        label = 'Enter a Thing';
                    }

                    return (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            {label && <p>{label}</p>}
                            <input
                                type="text"
                                value={playerAnswers[index]}
                                onChange={(event) => updatePlayerAnswers(index, event)}
                                style={{
                                    width: '300px',
                                    height: '30px',
                                    fontSize: '16px',
                                }}
                            />
                        </div>
                    );
                })
            }
            <div style={{ marginTop: '50px', justifyContent: 'center' }}>
                <button
                    disabled={!playerAnswers.every(answer => answer !== '')}
                    onClick={updateAllNouns}
                    style={{ fontSize: '18px' }}>
                    Submit Answers
                </button>
            </div>
        </div>
    );
}

export default SubmitNouns;
