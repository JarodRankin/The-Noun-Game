import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTeams() {
    const [playerCount, setPlayerCount] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [validSubmit, setValidSubmit] = useState(true);
    const [playersList, setPlayersList] = useState([]);
    const [isValidNames, setIsValidNames] = useState(true);

    const navigate = useNavigate();

    const checkIfNumber = (event) => {
        const inputVal = event.target.value;
        const regex = /^[0-9]*$/;
        
        if(regex.test(inputVal)){
            setPlayerCount(inputVal);
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const handleSubmit = () => {
        if(playerCount >= 4 && playerCount <= 12) {
            setValidSubmit(true);
            setPlayersList(Array.from({ length: playerCount }, () => ''));
        } else {
            setValidSubmit(false);
        }
    }

    const updatePlayerName = (index, event) => {
        const updatedList = [...playersList];
        updatedList[index] = event.target.value;
        setPlayersList(updatedList);
    }

    const checkPlayerNames = () => {
        const isComplete = playersList.every(name => name !== '');
        if(isComplete){
            setIsValidNames(true);
            navigate('/viewTeams', { state: { playersList } });
        } else {
            setIsValidNames(false);
        }
    }

    return (
      <div>
        <h1>Lets make the teams!</h1>
        <p>How many people will be playing?</p>
        <input 
            name="playerCount"
            type='text'
            value={playerCount}
            onChange={checkIfNumber}
            placeholder='Enter the number of players'
            style={{
                width: '300px',
                height: '40px',
                fontSize: '18px',
                borderColor: isValid ? 'black' : 'red',
                outline: isValid ? 'none' : '1px solid red',
                marginBottom: '20px',
            }}
        ></input>
        {
            !isValid ? 
                <p style={{ color: 'red', marginTop: '5px' }}>
                    Only number characters are allowed!
                </p>
                : null
        }
        <button
            disabled={!isValid}
            onClick={handleSubmit}>
            Submit player total
        </button>
        {
            !validSubmit ? 
                <p style={{ color: 'red', marginTop: '5px' }}>
                    The minimum number of players is 4 and the maximum is 12.
                </p>
                : null
        }
        {
            validSubmit && playersList.length >= 4 ? <div style={{ marginTop: '20px' }}>
                {playersList.map((_, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <p>Player {index+1}'s Name:</p>
                    <input
                    type="text"
                    onChange={(event) => updatePlayerName(index, event)}
                    style={{
                        width: '300px',
                        height: '30px',
                        fontSize: '16px',
                    }}
                    />
                </div>
                ))}
            </div> : null
        }
        {
            validSubmit && playersList.length >= 4 ?
            <button
                onClick={checkPlayerNames}>
                Submit Player Names
            </button> : null
        }
        {
            !isValidNames ?
                <p style={{ color: 'red', marginTop: '5px' }}>
                    You can not have empty names.
                </p>
                : null
        }
      </div>
    );
  }
  
  export default CreateTeams;
  