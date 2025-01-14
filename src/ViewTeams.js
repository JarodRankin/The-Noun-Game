import { useLocation } from 'react-router-dom';

function ViewTeams() {
    // Accessing the playersList passed as state
    const location = useLocation();
    const playersList = location.state?.playersList || [];

    return (
        <div>
            <h1>View Teams</h1>
            <p>Here are the players:</p>
            {playersList.length > 0 ? (
                <ul>
                    {playersList.map((player, index) => (
                        <li key={index}>Player {index + 1}: {player}</li>
                    ))}
                </ul>
            ) : (
                <p>No players have been added.</p>
            )}
        </div>
    );
}

export default ViewTeams;
