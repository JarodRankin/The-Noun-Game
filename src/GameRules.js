import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTeams from './CreateTeams';

function GameRules() {
    return (
      <div>
        <h1>Welcome to the Noun Game!</h1>
        <p>Here are the rules of the game.</p>
        <ol>
            <li>You must have at least 4 players to play.</li>
            <li>Each player will submit a person, a place, and a thing.</li>
            <li>There must be at least 36 nouns in the game so depending on the amount of players you may be asked to submit more than one.</li>
            <li>Teams will be assigned at random.</li>
            <li>There are 3 rounds, Round 1: talk it out, Round 2: one word, Round 3: act it out, Round 4: one action.</li>
        </ol>
        <h3>Round 1:</h3>
        <ol>
            <li>Each player will take turns describing the noun presented to them to their teammates.</li>
            <li>Players will have a minute to get as many nouns correct as the can.</li>
            <li>After the minute is over a member from the other team will have a turn.</li>
            <li>Once all nouns are found the round is over.</li>
        </ol>
        <h3>Round 2:</h3>
        <p>The same rules from round 1 still apply, with the timing and the scoring.</p>
        <ol>
            <li>This round players can only say one word to describe the noun.</li>
        </ol>
        <h3>Round 3:</h3>
        <p>The same rules from round 1 still apply, with the timing and the scoring.</p>
        <ol>
            <li>This round players must act out the noun, similar to charades, no talking or mouthing words is allowed.</li>
        </ol>
        <h3>Round 4:</h3>
        <p>The same rules from round 1 still apply, with the timing and the scoring.</p>
        <ol>
            <li>This round players can only preform one action to describe the noun, they must stop moving once their one action has been completed.</li>
        </ol>
        <h3>Other Rules:</h3>
        <ol>
            <li>If all nouns run out and there is still time remaining on your turn, it will carry over to the next round.</li>
            <li>If a player is stuck they can skip, and receive a new noun.</li>
        </ol>
        <button onClick={() => (window.location.href = '/createTeams')}>Start a Game</button>
      </div>
    );
  }
  
  export default GameRules;
  