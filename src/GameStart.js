import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Timer from "./Timer";

function GameStart() {
    const [allNouns, setAllNouns] = useState([]);
    const [remainingNouns, setRemainingNouns] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(1);
    const [playerCountTeam1, setPlayerCountTeam1] = useState(0);
    const [playerCountTeam2, setPlayerCountTeam2] = useState(0);
    const [gameStart, setGameStart] = useState(false);
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);
    const [currentNounIndex, setCurrentNounIndex] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    const [remainingTime, setRemainingTime] = useState(60);

    const location = useLocation();
    const allSubmittedNouns = location.state?.allSubmittedNouns || [];
    const team1 = location.state?.team1 || [];
    const team2 = location.state?.team2 || [];

    useEffect(() => {
        const shuffledNouns = [...allSubmittedNouns].sort(() => Math.random() - 0.5);
        setAllNouns(shuffledNouns);
        setRemainingNouns(shuffledNouns);
    }, [allSubmittedNouns]);

    const updateGameStart = () => {
        setGameStart(true);
    };

    const updateScore = () => {
        if (currentTeam === 1) {
            setTeam1Score((prevScore) => prevScore + 1);
        } else {
            setTeam2Score((prevScore) => prevScore + 1);
        }
    };

    const handleCorrectAnswer = () => {
        updateScore();
        const updatedNouns = remainingNouns.filter((_, index) => index !== currentNounIndex);

        if (updatedNouns.length === 0) {
            setCurrentRound((prevRound) => prevRound + 1);
            setRemainingNouns(allNouns);
            setGameStart(false);
        } else {
            setRemainingNouns(updatedNouns);
        }

        setCurrentNounIndex(0);
    };

    const goToNextNoun = () => {
        if (currentNounIndex < remainingNouns.length - 1) {
            setCurrentNounIndex((prevIndex) => prevIndex + 1);
        } else {
            alert("No more nouns left!");
        }
    };

    const switchTurns = useCallback(() => {
        setGameStart(false);

        if (currentTeam === 1) {
            if (playerCountTeam1 < team1.length - 1) {
                setPlayerCountTeam1((prev) => prev + 1);
            } else {
                setPlayerCountTeam1(0);
            }
            setCurrentTeam(2);
        } else {
            if (playerCountTeam2 < team2.length - 1) {
                setPlayerCountTeam2((prev) => prev + 1);
            } else {
                setPlayerCountTeam2(0);
            }
            setCurrentTeam(1);
        }
        setRemainingTime(60);
    }, [currentTeam, playerCountTeam1, playerCountTeam2, team1.length, team2.length]);

    const handleTimeUpdate = (newTime) => {
        setRemainingTime(newTime);
    };

    const roundDescription = [
        "Talk it out, describe the noun with words",
        "One word, only use one word to describe the noun",
        "Act it out, without using words act out the noun",
        "One action, use one action to describe the noun, no moving after you move",
    ];

    return (
        <div>
            {currentRound === 5 ? (
                <p>
                    {team1Score > team2Score
                        ? "Team 1 Wins!"
                        : team2Score > team1Score
                        ? "Team 2 Wins!"
                        : "It's a Tie!"}
                </p>
            ) : (
                <>
                    <p>Team {currentTeam}, You Are Up!</p>
                    {currentTeam === 1 ? (
                        <p>{team1[playerCountTeam1]} It is Your Turn</p>
                    ) : (
                        <p>{team2[playerCountTeam2]} It is Your Turn</p>
                    )}
    
                    {!gameStart ? (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <p>
                                Round {currentRound}: {roundDescription[currentRound - 1]}
                            </p>
                        </div>
                    ) : null}
    
                    {!gameStart ? (
                        <div style={{ marginTop: "50px", justifyContent: "center" }}>
                            <button onClick={updateGameStart} style={{ fontSize: "18px" }}>
                                Begin the Game!
                            </button>
                        </div>
                    ) : null}
    
                    {gameStart && remainingNouns.length > 0 ? (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <p>The current noun is:</p>
                            <h2>{remainingNouns[currentNounIndex]}</h2>
                        </div>
                    ) : null}
    
                    {gameStart && remainingNouns.length > 0 ? (
                        <div style={{ marginTop: "30px", justifyContent: "center" }}>
                            <button onClick={goToNextNoun} style={{ marginRight: "20px", fontSize: "18px" }}>
                                Pass
                            </button>
                            <button onClick={handleCorrectAnswer} style={{ fontSize: "18px" }}>
                                Correct
                            </button>
                        </div>
                    ) : null}
                </>
            )}
    
            <p style={{ textAlign: "center", marginTop: "50px" }}>
                Current Scores:
                <br />
                Team 1: {team1Score}
                <br />
                Team 2: {team2Score}
            </p>
    
            {gameStart ? (
                <Timer
                    initialTime={remainingTime}
                    onTimeUp={switchTurns}
                    onTimeUpdate={handleTimeUpdate}
                />
            ) : null}
        </div>
    );    
}

export default GameStart;
