import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameRules from './GameRules';
import CreateTeams from './CreateTeams';
import ViewTeams from './ViewTeams';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>The Noun Game</h1>
                <h2>Also known as the person, place, thing game</h2>
                <button onClick={() => (window.location.href = '/gameRules')}>Start a Game</button>
              </>
            }
          />
          <Route path="/gameRules" element={<GameRules />} />
          <Route path="/createTeams" element={<CreateTeams />} />
          <Route path="/viewTeams" element={<ViewTeams />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
