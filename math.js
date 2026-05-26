const KNOCKOUT_TEAMS = [
    // Favorites – 4 correct answers per goal
    {
        name: "Spain",
        iso: "es",
        strength: 98,
        correctAnswersPerGoal: 4,
        oddsGrouping: "Favorites",
    },
    {
        name: "France",
        iso: "fr",
        strength: 96,
        correctAnswersPerGoal: 4,
        oddsGrouping: "Favorites",
    },
    {
        name: "England",
        iso: "gb-eng",
        strength: 94,
        correctAnswersPerGoal: 4,
        oddsGrouping: "Favorites",
    },
    {
        name: "Brazil",
        iso: "br",
        strength: 92,
        correctAnswersPerGoal: 4,
        oddsGrouping: "Favorites",
    },

    // Contenders – 6 correct answers per goal
    {
        name: "Argentina",
        iso: "ar",
        strength: 90,
        correctAnswersPerGoal: 6,
        oddsGrouping: "Contenders",
    },
    {
        name: "Portugal",
        iso: "pt",
        strength: 88,
        correctAnswersPerGoal: 6,
        oddsGrouping: "Contenders",
    },
    {
        name: "Germany",
        iso: "de",
        strength: 86,
        correctAnswersPerGoal: 6,
        oddsGrouping: "Contenders",
    },
    {
        name: "Netherlands",
        iso: "nl",
        strength: 84,
        correctAnswersPerGoal: 6,
        oddsGrouping: "Contenders",
    },

    // Dark Horses – 8 correct answers per goal
    {
        name: "Belgium",
        iso: "be",
        strength: 80,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Colombia",
        iso: "co",
        strength: 78,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Morocco",
        iso: "ma",
        strength: 76,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Uruguay",
        iso: "uy",
        strength: 74,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "USA",
        iso: "us",
        strength: 70,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Switzerland",
        iso: "ch",
        strength: 68,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Japan",
        iso: "jp",
        strength: 66,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Ecuador",
        iso: "ec",
        strength: 64,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Croatia",
        iso: "hr",
        strength: 62,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Mexico",
        iso: "mx",
        strength: 60,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Senegal",
        iso: "sn",
        strength: 58,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },
    {
        name: "Turkey",
        iso: "tr",
        strength: 56,
        correctAnswersPerGoal: 8,
        oddsGrouping: "Dark Horses",
    },

    // Underdogs – 12 correct answers per goal
    {
        name: "Sweden",
        iso: "se",
        strength: 54,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Austria",
        iso: "at",
        strength: 52,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Scotland",
        iso: "gb-sct",
        strength: 50,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Canada",
        iso: "ca",
        strength: 48,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Czech Republic",
        iso: "cz",
        strength: 46,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Ivory Coast",
        iso: "ci",
        strength: 44,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Ghana",
        iso: "gh",
        strength: 42,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Egypt",
        iso: "eg",
        strength: 40,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Paraguay",
        iso: "py",
        strength: 38,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Algeria",
        iso: "dz",
        strength: 36,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "South Korea",
        iso: "kr",
        strength: 34,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
    {
        name: "Australia",
        iso: "au",
        strength: 32,
        correctAnswersPerGoal: 12,
        oddsGrouping: "Underdogs",
    },
];

const ROUNDS = [
    "Round of 32",
    "Round of 16",
    "Quarter Finals",
    "Semi Finals",
    "Final",
];

let gameState = {
    playerTeam: null,
    tournament: null,
    currentRound: 0,
    gameActive: false,
    timerInterval: null,
    cpuScoreInterval: null,
    currentMatch: null,
};

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildTournament(playerTeam) {
    let otherTeams = KNOCKOUT_TEAMS.filter((t) => t.name !== playerTeam.name);
    const allTeams = [playerTeam, ...otherTeams.slice(0, 31)];
    const shuffledAll = shuffleArray([...allTeams]);
    let round32 = [];
    for (let i = 0; i < shuffledAll.length; i += 2) {
        round32.push({
            home: shuffledAll[i],
            away: shuffledAll[i + 1],
            homeScore: null,
            awayScore: null,
            winner: null,
        });
    }
    return { rounds: [round32, [], [], [], []] };
}

function simulateMatch(teamA, teamB) {
    const strengthDiff = teamA.strength - teamB.strength;
    let probA = 0.5 + strengthDiff / 200;
    probA = Math.min(0.9, Math.max(0.1, probA));
    const teamAWins = Math.random() < probA;
    const winner = teamAWins ? teamA : teamB;
    const loserGoals = Math.floor(Math.random() * 3);
    const winnerGoals = Math.floor(Math.random() * 4) + 1 + loserGoals;
    const scoreA = teamAWins ? winnerGoals : loserGoals;
    const scoreB = teamAWins ? loserGoals : winnerGoals;
    return { homeScore: scoreA, awayScore: scoreB, winner };
}

function simulateRoundMatches(roundMatches) {
    for (let match of roundMatches) {
        if (!match.winner) {
            const isPlayerMatch =
                match.home.name === gameState.playerTeam.name ||
                match.away.name === gameState.playerTeam.name;
            if (!isPlayerMatch) {
                const { homeScore, awayScore, winner } = simulateMatch(
                    match.home,
                    match.away
                );
                match.homeScore = homeScore;
                match.awayScore = awayScore;
                match.winner = winner;
            }
        }
    }
}

function getFlagHTML(team) {
    return `<span class="fi fi-${team.iso}"></span>`;
}
function getTeamDisplay(team) {
    return `${getFlagHTML(team)} ${team.name}`;
}

const MATCH_COUNTS = [16, 8, 4, 2, 1];

function displayBracket() {
    const container = document.getElementById("bracketContainer");
    if (!container) return;
    container.innerHTML = "";

    const bracketWrapper = document.createElement("div");
    bracketWrapper.className = "bracket";

    const roundsData = gameState.tournament.rounds;
    if (!roundsData) return;

    for (let r = 0; r < 5; r++) {
        const roundDiv = document.createElement("div");
        roundDiv.className = "round";

        const header = document.createElement("h3");
        header.innerText = ROUNDS[r];
        roundDiv.appendChild(header);

        const matchesContainer = document.createElement("div");
        matchesContainer.classList.add("matches-container");

        const matches = roundsData[r] || [];
        const matchCount = MATCH_COUNTS[r];

        if (matches.length === 0) {
            for (let i = 0; i < matchCount; i++) {
                const placeholder = document.createElement("div");
                placeholder.className = "match";
                placeholder.innerHTML = `<div class="match-teams">TBD</div><div class="match-result">—</div>`;
                matchesContainer.appendChild(placeholder);
            }
        } else {
            for (let match of matches) {
                const matchDiv = document.createElement("div");
                matchDiv.className = "match";
                const isPlayerMatch =
                    match.home.name === gameState.playerTeam.name ||
                    match.away.name === gameState.playerTeam.name;
                if (isPlayerMatch) matchDiv.classList.add("player-match");

                const homeDisplay = `<span class="team-name-with-flag">${getFlagHTML(
                    match.home
                )} ${match.home.name}</span>`;
                const awayDisplay = `<span class="team-name-with-flag">${getFlagHTML(
                    match.away
                )} ${match.away.name}</span>`;
                const scoreHtml = match.winner
                    ? `<div class="match-result">${match.homeScore} – ${match.awayScore}</div>`
                    : `<div class="match-result">⚽ Not played</div>`;

                matchDiv.innerHTML = `<div class="match-teams">${homeDisplay} vs ${awayDisplay}</div>${scoreHtml}`;
                matchesContainer.appendChild(matchDiv);
            }
        }
        roundDiv.appendChild(matchesContainer);
        bracketWrapper.appendChild(roundDiv);

        const matchHeight = 35; // height of a single match card
        const gap = 6; // gap between matches

        let margin = 0;

        if (r > 0) {
            margin =
                (matchHeight * 2 ** r + gap * (2 ** r - 1)) / 2 -
                Math.floor(matchHeight / 2);
        }

        matchesContainer.style.margin = `${margin}px 0px`;
    }
    container.appendChild(bracketWrapper);

    const currentMatches = roundsData[gameState.currentRound];
    const playBtn = document.getElementById("nextMatchBtn");
    if (currentMatches && currentMatches.length) {
        const playerMatch = currentMatches.find(
            (m) =>
                (m.home.name === gameState.playerTeam.name ||
                    m.away.name === gameState.playerTeam.name) &&
                !m.winner
        );
        if (playerMatch && playBtn) {
            playBtn.style.display = "block";
            playBtn.onclick = () => {
                playBtn.style.display = "none";
                startMatch(playerMatch);
            };
        } else if (playBtn) playBtn.style.display = "none";
    } else if (playBtn) playBtn.style.display = "none";
}

function startMatch(match) {
    gameState.currentMatch = match;
    const isPlayerHome = match.home.name === gameState.playerTeam.name;
    const opponent = isPlayerHome ? match.away : match.home;
    showScreen("gameScreen");
    resetGameUI();
    playMatch(match, opponent, isPlayerHome);
}

function resetGameUI() {
    document.getElementById("playerScore").innerText = "0";
    document.getElementById("cpuScore").innerText = "0";
    document.getElementById("goalsScored").innerText = "0";
    document.getElementById("correctAnswers").innerText = "0";
    document.getElementById("misses").innerText = "0";
    document.getElementById("streak").innerText = "0";
    document.getElementById("timer").innerText = "0'";
    document.getElementById("timer").style.color = "#00ff00";
    document.getElementById("result").innerHTML = "";
    const bar = document.getElementById("goalProgress");
    if (bar) {
        bar.style.width = "0%";
        bar.textContent = "0/0";
    }
    const input = document.querySelector("#gameScreen input");
    if (input) {
        input.disabled = false;
        input.value = "";
    }
    document
        .querySelectorAll(".game .btn-primary")
        .forEach((btn) => btn.remove());
}

function playMatch(match, opponent, playerIsHome) {
    if (gameState.timerInterval) clearTimeout(gameState.timerInterval);
    if (gameState.cpuScoreInterval) clearInterval(gameState.cpuScoreInterval);

    let playerScore = 0,
        cpuScore = 0,
        correctAnswers = 0,
        misses = 0,
        streak = 0,
        answersForGoal = 0;
    const answersNeeded = gameState.playerTeam.correctAnswersPerGoal;
    let shootingTowardsRight = playerIsHome;
    let gameActive = true;
    let penaltyActive = false;
    let penaltyTimeout = null;

    const playerScoreEl = document.getElementById("playerScore");
    const cpuScoreEl = document.getElementById("cpuScore");
    const goalsScoredEl = document.getElementById("goalsScored");
    const correctAnswersEl = document.getElementById("correctAnswers");
    const missesEl = document.getElementById("misses");
    const streakEl = document.getElementById("streak");
    const resultEl = document.getElementById("result");
    const equationEl = document.getElementById("equation");
    const inputField = document.querySelector("#gameScreen input");
    const timerEl = document.getElementById("timer");
    const goalsInfoEl = document.getElementById("goalsPerCorrect");

    document.getElementById("playerTeamName").innerHTML = getTeamDisplay(
        gameState.playerTeam
    );
    document.getElementById("cpuTeamName").innerHTML = getTeamDisplay(opponent);
    document.getElementById("matchInfo").innerHTML = `${
        ROUNDS[gameState.currentRound]
    }: ${match.home.name} vs ${match.away.name}`;
    goalsInfoEl.innerHTML = `${answersNeeded} correct answer${
        answersNeeded > 1 ? "s" : ""
    } = 1 GOAL`;

    function updateProgressBar(current, needed) {
        const bar = document.getElementById("goalProgress");
        if (bar) {
            const percent = (current / needed) * 100;
            bar.style.width = percent + "%";
            bar.textContent = `${current}/${needed}`;
            bar.style.background =
                percent >= 75
                    ? "#00ff00"
                    : percent >= 50
                    ? "#FFD700"
                    : "#FFA500";
        }
    }
    updateProgressBar(0, answersNeeded);

    function getCPUGoalProb(team) {
        if (team.strength >= 90) return 0.025;
        if (team.strength >= 85) return 0.02;
        if (team.strength >= 80) return 0.017;
        if (team.strength >= 70) return 0.014;
        if (team.strength >= 60) return 0.011;
        if (team.strength >= 50) return 0.008;
        return 0.006;
    }
    const cpuProb = getCPUGoalProb(opponent);
    let lastCpuGoalMinute = -1;

    gameState.cpuScoreInterval = setInterval(() => {
        if (!gameActive) return;
        const minute = parseInt(timerEl.innerText) || 0;
        if (Math.random() < cpuProb && minute > lastCpuGoalMinute) {
            cpuScore++;
            cpuScoreEl.innerText = cpuScore;
            lastCpuGoalMinute = minute;
            resultEl.innerHTML = `⚽ ${opponent.name} SCORES! ⚽`;
            resultEl.style.color = "#ff6600";
            setTimeout(() => {
                if (gameActive && resultEl.innerHTML.includes("SCORES"))
                    resultEl.innerHTML = "";
            }, 2000);
        }
    }, 1000);

    function generateEquation() {
        const op = Math.floor(Math.random() * 3);
        let first, second, answer;
        if (op === 0) {
            first = Math.floor(Math.random() * 100);
            second = Math.floor(Math.random() * 100);
            equationEl.innerText = `${first} + ${second}`;
            answer = first + second;
        } else if (op === 1) {
            first = Math.floor(Math.random() * 100);
            second = Math.floor(Math.random() * 100);
            if (first < second) {
                [first, second] = [second, first];
            }
            equationEl.innerText = `${first} − ${second}`;
            answer = first - second;
        } else {
            first = Math.floor(Math.random() * 12) + 1;
            second = Math.floor(Math.random() * 12) + 1;
            equationEl.innerText = `${first} × ${second}`;
            answer = first * second;
        }
        window.correctAnswer = answer;
    }
    generateEquation();

    const newInput = inputField.cloneNode(true);
    inputField.parentNode.replaceChild(newInput, inputField);
    newInput.value = "";
    newInput.disabled = false;
    newInput.focus();

    function startPenalty() {
        if (penaltyTimeout) clearTimeout(penaltyTimeout);
        penaltyActive = true;
        newInput.disabled = true;
        let penaltySeconds = 2;
        resultEl.innerHTML = `⏱️ PENALTY! ${penaltySeconds} second${
            penaltySeconds !== 1 ? "s" : ""
        }... ⏱️`;
        resultEl.style.color = "#ffa500";
        const penaltyInterval = setInterval(() => {
            if (!penaltyActive) {
                clearInterval(penaltyInterval);
                return;
            }
            penaltySeconds--;
            if (penaltySeconds <= 0) {
                clearInterval(penaltyInterval);
                penaltyActive = false;
                newInput.disabled = false;
                newInput.focus();
                resultEl.innerHTML = "✅ Penalty over. Try again!";
                resultEl.style.color = "#90EE90";
                setTimeout(() => {
                    if (
                        gameActive &&
                        resultEl.innerHTML.includes("Penalty over")
                    )
                        resultEl.innerHTML = "";
                }, 1500);
            } else {
                resultEl.innerHTML = `⏱️ PENALTY! ${penaltySeconds} second${
                    penaltySeconds !== 1 ? "s" : ""
                }... ⏱️`;
            }
        }, 1000);
        penaltyTimeout = setTimeout(() => {
            clearInterval(penaltyInterval);
        }, 2000);
    }

    newInput.addEventListener("change", function answerHandler(e) {
        if (!gameActive) return;
        if (penaltyActive) {
            e.target.value = "";
            return;
        }
        const userAnswer = parseInt(e.target.value);
        if (isNaN(userAnswer)) return;
        if (userAnswer === window.correctAnswer) {
            correctAnswers++;
            streak++;
            answersForGoal++;
            correctAnswersEl.innerText = correctAnswers;
            streakEl.innerText = streak;
            updateProgressBar(answersForGoal, answersNeeded);
            if (answersForGoal >= answersNeeded) {
                playerScore++;
                answersForGoal = 0;
                playerScoreEl.innerText = playerScore;
                goalsScoredEl.innerText = playerScore;

                const ball = document.getElementById("soccer-ball");
                const container = document.querySelector(".field-container");
                if (ball && container) {
                    const playingAreaLeft = 5;
                    const playingAreaRight = 95;
                    const playingAreaWidth = playingAreaRight - playingAreaLeft;
                    const totalYards = 120;
                    const yardsPerPercent = totalYards / playingAreaWidth;

                    let startXpercent;
                    if (shootingTowardsRight) {
                        if (Math.random() < 0.8) {
                            startXpercent =
                                playingAreaLeft +
                                60 +
                                Math.random() * (playingAreaWidth - 60);
                        } else {
                            startXpercent =
                                playingAreaLeft + Math.random() * 60;
                        }
                        startXpercent = Math.min(
                            startXpercent,
                            playingAreaRight
                        );
                        const distanceYards = Math.round(
                            (playingAreaRight - startXpercent) * yardsPerPercent
                        );
                        resultEl.innerHTML = `⚽ GOAL! ⚽<br>Shot from ${distanceYards} yards!`;
                        const goalXpercent = playingAreaRight - 2;
                        setTimeout(() => {
                            ball.style.left = `${goalXpercent}%`;
                            ball.style.top = "50%";
                        }, 30);
                    } else {
                        if (Math.random() < 0.8) {
                            startXpercent =
                                playingAreaLeft + Math.random() * 30;
                        } else {
                            startXpercent =
                                playingAreaLeft +
                                30 +
                                Math.random() * (playingAreaWidth - 30);
                        }
                        startXpercent = Math.max(
                            startXpercent,
                            playingAreaLeft
                        );
                        const distanceYards = Math.round(
                            (startXpercent - playingAreaLeft) * yardsPerPercent
                        );
                        resultEl.innerHTML = `⚽ GOAL! ⚽<br>Shot from ${distanceYards} yards!`;
                        const goalXpercent = playingAreaLeft + 2;
                        setTimeout(() => {
                            ball.style.left = `${goalXpercent}%`;
                            ball.style.top = "50%";
                        }, 30);
                    }
                    const startYpercent = 30 + Math.random() * 40;
                    ball.style.left = `${startXpercent}%`;
                    ball.style.top = `${startYpercent}%`;
                    ball.style.display = "block";
                    ball.style.animation = "goalFlash 0.6s ease";
                    setTimeout(() => {
                        ball.style.display = "none";
                        ball.style.animation = "";
                    }, 500);
                } else {
                    resultEl.innerHTML = `⚽ GOAL! ⚽`;
                }

                updateProgressBar(0, answersNeeded);
                setTimeout(() => {
                    if (gameActive && resultEl.innerHTML.includes("GOAL"))
                        resultEl.innerHTML = "";
                }, 2000);
            } else {
                resultEl.innerHTML = "✅ Correct!";
                resultEl.style.color = "#90EE90";
                setTimeout(() => {
                    if (gameActive && resultEl.innerHTML.includes("Correct"))
                        resultEl.innerHTML = "";
                }, 800);
            }
        } else {
            misses++;
            streak = 0;
            missesEl.innerText = misses;
            streakEl.innerText = "0";
            startPenalty();
        }
        e.target.value = "";
        generateEquation();
        setTimeout(() => {
            if (!penaltyActive) newInput.focus();
        }, 10);
    });

    const keyHandler = (e) => {
        if (
            document.activeElement !== newInput &&
            gameActive &&
            !penaltyActive &&
            document.activeElement?.tagName !== "BUTTON"
        ) {
            newInput.focus();
        }
    };
    window.addEventListener("keydown", keyHandler);

    let minute = 0;
    function tick() {
        if (!gameActive) return;
        if (minute <= 90) {
            timerEl.innerText = `${minute}'`;
            if (minute === 45) {
                shootingTowardsRight = !shootingTowardsRight;
                const resultEl = document.getElementById("result");
                resultEl.innerHTML = "Halftime!";
                setTimeout(() => {
                    resultEl.innerHTML = "";
                }, 2000);
            }
            if (minute >= 85) {
                timerEl.style.color = "red";
            } else {
                timerEl.style.color = "#00ff00";
                timerEl.style.animation = "";
            }
            minute++;
            gameState.timerInterval = setTimeout(tick, 1000);
        } else {
            endMatch(
                playerScore,
                cpuScore,
                match,
                opponent,
                playerIsHome,
                newInput,
                keyHandler
            );
        }
    }
    tick();

    function endMatch(pScore, cScore, matchObj, opp, isHome, inputEl, keyHdl) {
        gameActive = false;
        clearTimeout(gameState.timerInterval);
        clearInterval(gameState.cpuScoreInterval);
        if (penaltyTimeout) clearTimeout(penaltyTimeout);
        window.removeEventListener("keydown", keyHdl);
        inputEl.disabled = true;

        matchObj.homeScore = isHome ? pScore : cScore;
        matchObj.awayScore = isHome ? cScore : pScore;
        const playerWon = pScore > cScore;
        matchObj.winner = playerWon ? gameState.playerTeam : opp;

        const resultDiv = document.getElementById("result");
        const isFinal = gameState.currentRound === 4;
        document
            .querySelectorAll(".game .btn-primary")
            .forEach((btn) => btn.remove());

        if (playerWon && !isFinal) {
            resultDiv.innerHTML = `You won! ${pScore} - ${cScore}<br>Click to view bracket and continue!`;
            resultDiv.style.color = "#FFD700";
            const nextBtn = document.createElement("button");
            nextBtn.className = "btn-primary";
            nextBtn.innerText = "→ View Bracket →";
            nextBtn.onclick = () => {
                nextBtn.remove();
                advanceToNextRound();
            };
            document.querySelector(".game").appendChild(nextBtn);
        } else if (playerWon && isFinal) {
            resultDiv.innerHTML = `🏆 YOU ARE WORLD CUP CHAMPIONS! 🏆<br>${pScore} - ${cScore}`;
            resultDiv.style.color = "#FFD700";
            resultDiv.style.fontSize = "1.2em";
            const replayBtn = document.createElement("button");
            replayBtn.className = "btn-primary";
            replayBtn.innerText = "🏆 Play Again 🏆";
            replayBtn.onclick = () => {
                resetGame();
                showScreen("homeScreen");
            };
            document.querySelector(".game").appendChild(replayBtn);
        } else {
            resultDiv.innerHTML = `DEFEAT! ${pScore} - ${cScore}<br>Tournament over. Press Home to try again.`;
            resultDiv.style.color = "#ff0000";
            const homeBtn = document.createElement("button");
            homeBtn.className = "btn-primary";
            homeBtn.innerText = "Back to Home";
            homeBtn.onclick = () => {
                resetGame();
                showScreen("homeScreen");
            };
            document.querySelector(".game").appendChild(homeBtn);
        }
    }
}

function advanceToNextRound() {
    console.log(
        "advanceToNextRound called, currentRound:",
        gameState.currentRound
    );
    const prevMatches = gameState.tournament.rounds[gameState.currentRound];
    if (!prevMatches) {
        console.error("No previous matches found");
        resetGame();
        showScreen("homeScreen");
        return;
    }
    const winners = prevMatches.map((m) => m.winner);
    console.log("Winners count:", winners.length);
    if (winners.length < 2) {
        console.error("Not enough winners");
        resetGame();
        showScreen("homeScreen");
        return;
    }
    let nextMatches = [];
    for (let i = 0; i < winners.length; i += 2) {
        nextMatches.push({
            home: winners[i],
            away: winners[i + 1],
            homeScore: null,
            awayScore: null,
            winner: null,
        });
    }
    gameState.currentRound++;
    gameState.tournament.rounds[gameState.currentRound] = nextMatches;
    simulateRoundMatches(nextMatches);
    showScreen("bracketScreen");
    displayBracket();
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((s) => {
        s.classList.remove("active");
        s.style.display = "none";
    });
    const target = document.getElementById(screenId);
    target.classList.add("active");
    target.style.display = "block";
}

function resetGame() {
    if (gameState.timerInterval) clearTimeout(gameState.timerInterval);
    if (gameState.cpuScoreInterval) clearInterval(gameState.cpuScoreInterval);

    gameState.playerTeam = null;
    gameState.tournament = null;
    gameState.currentRound = 0;
    gameState.currentMatch = null;
    gameState.gameActive = false;

    resetGameUI();

    const nextBtn = document.getElementById("nextMatchBtn");
    if (nextBtn) nextBtn.style.display = "none";
    document
        .querySelectorAll(".game .btn-primary, .next-match-btn")
        .forEach((btn) => btn.remove());

    const input = document.querySelector("#gameScreen input");
    if (input) {
        input.disabled = false;
        input.value = "";
    }

    const resultDiv = document.getElementById("result");
    if (resultDiv) resultDiv.innerHTML = "";
    const equationDiv = document.getElementById("equation");
    if (equationDiv) equationDiv.innerText = "0 + 0";
}

function displayTeams() {
    const container = document.getElementById("teamsContainer");
    container.innerHTML = "";
    const groups = {
        Favorites: [],
        Contenders: [],
        "Dark Horses": [],
        Underdogs: [],
    };
    KNOCKOUT_TEAMS.forEach((team) => {
        if (team.oddsGrouping === "Favorites") groups["Favorites"].push(team);
        else if (team.oddsGrouping === "Contenders")
            groups["Contenders"].push(team);
        else if (team.oddsGrouping === "Dark Horses")
            groups["Dark Horses"].push(team);
        else groups["Underdogs"].push(team);
    });
    for (const [groupName, teams] of Object.entries(groups)) {
        if (teams.length === 0) continue;
        const groupDiv = document.createElement("div");
        groupDiv.className = "group-section";
        const title = document.createElement("h3");
        title.className = "group-title";
        title.innerText = groupName;
        groupDiv.appendChild(title);
        const teamsContainer = document.createElement("div");
        teamsContainer.className = "group-teams";
        teams.forEach((team) => {
            const card = document.createElement("div");
            card.className = "team-card";
            card.innerHTML = `<div class="team-flag-icon"><span class="fi fi-${team.iso}" style="font-size: 36px;"></span></div><div class="team-name">${team.name}</div>`;
            card.onclick = () => {
                document
                    .querySelectorAll(".team-card")
                    .forEach((c) => c.classList.remove("selected"));
                card.classList.add("selected");
                gameState.playerTeam = team;
                document.getElementById("confirmTeamBtn").disabled = false;
            };
            teamsContainer.appendChild(card);
        });
        groupDiv.appendChild(teamsContainer);
        container.appendChild(groupDiv);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").onclick = () => {
        showScreen("teamSelectScreen");
        displayTeams();
    };
    document.getElementById("confirmTeamBtn").onclick = () => {
        if (gameState.playerTeam) {
            gameState.tournament = buildTournament(gameState.playerTeam);
            gameState.currentRound = 0;
            simulateRoundMatches(gameState.tournament.rounds[0]);
            showScreen("bracketScreen");
            displayBracket();
        }
    };
});
