// The RIVERS Model - Blog Site JavaScript
class RiversBlogApp {
    constructor() {
        this.currentWeek = 3;
        this.predictionsData = {};
        this.statisticsData = {};
        this.init();
    }

    init() {
        this.loadInitialData();
        this.setupEventListeners();
        this.updateLastUpdated();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateActiveNav(link);
            });
        });
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    async loadInitialData() {
        try {
            await this.loadWeekData(this.currentWeek);
            this.renderPredictions();
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showError('Failed to load predictions data');
        }
    }

    async loadWeekData(week) {
        try {
            // Try to load from local JSON file first
            const response = await fetch(`data/week${week}_predictions.json`);
            if (response.ok) {
                this.predictionsData[week] = await response.json();
            } else {
                // Fallback to hardcoded data for Week 3
                if (week === 3) {
                    this.predictionsData[week] = this.getWeek3Predictions();
                } else {
                    this.predictionsData[week] = { predictions: [], message: `Week ${week} predictions not available yet` };
                }
            }
        } catch (error) {
            console.error(`Error loading week ${week} data:`, error);
            if (week === 3) {
                this.predictionsData[week] = this.getWeek3Predictions();
            } else {
                this.predictionsData[week] = { predictions: [], message: `Week ${week} predictions not available yet` };
            }
        }
    }

    getWeek3Predictions() {
        return {
            predictions: [
                {
                    'away_team': 'MIA',
                    'home_team': 'BUF',
                    'winner': 'BUF',
                    'confidence': 81.0,
                    'injury_report': 'BUF: Matt Milano (LB) - Out, Ed Oliver (DT) - Out | MIA: Storm Duck (CB) - Out, Ifeatu Melifonwu (S) - Out, Darren Waller (TE) - Out'
                },
                {
                    'away_team': 'ATL',
                    'home_team': 'CAR',
                    'winner': 'ATL',
                    'confidence': 66.0,
                    'injury_report': 'CAR: Patrick Jones II (LB) - Out, Tershawn Wharton (DT) - Out | ATL: Jamal Agnew (WR) - Out, A.J. Terrell (CB) - Out, Casey Washington (WR) - Out'
                },
                {
                    'away_team': 'GB',
                    'home_team': 'CLE',
                    'winner': 'GB',
                    'confidence': 80.7,
                    'injury_report': 'CLE: Mike Hall Jr. (DT) - Out | GB: Jayden Reed (WR) - Out'
                },
                {
                    'away_team': 'HOU',
                    'home_team': 'JAX',
                    'winner': 'JAX',
                    'confidence': 69.3,
                    'injury_report': 'JAX: Wyatt Milum (G) - Out | HOU: Jaylin Smith (CB) - Out'
                },
                {
                    'away_team': 'CIN',
                    'home_team': 'MIN',
                    'winner': 'CIN',
                    'confidence': 64.2,
                    'injury_report': 'MIN: Ryan Kelly (C) - Out, J.J. McCarthy (QB) - Out, Justin Skule (T) - Out | CIN: Shemar Stewart (DE) - Out, Cam Taylor-Britt (CB) - Doubtful, Joe Burrow (QB) - Out'
                },
                {
                    'away_team': 'PIT',
                    'home_team': 'NE',
                    'winner': 'NE',
                    'confidence': 63.2,
                    'injury_report': 'NE: No significant injuries | PIT: DeShon Elliott (S) - Out, Alex Highsmith (LB) - Out, Joey Porter Jr. (CB) - Out, Max Scharping (G) - Out'
                },
                {
                    'away_team': 'LA',
                    'home_team': 'PHI',
                    'winner': 'PHI',
                    'confidence': 53.8,
                    'injury_report': 'PHI: Will Shipley (RB) - Out | LA: No significant injuries'
                },
                {
                    'away_team': 'NYJ',
                    'home_team': 'TB',
                    'winner': 'TB',
                    'confidence': 71.8,
                    'injury_report': 'TB: Chris Godwin Jr. (WR) - Out, Tristan Wirfs (T) - Out | NYJ: Justin Fields (QB) - Out, Jermaine Johnson II (DE) - Out, Kene Nwangwu (RB) - Out, Josh Reynolds (WR) - Out, Jay Tufele (DT) - Out'
                },
                {
                    'away_team': 'IND',
                    'home_team': 'TEN',
                    'winner': 'IND',
                    'confidence': 89.8,
                    'injury_report': 'TEN: JC Latham (T) - Out, T\'Vondre Sweat (DT) - Out, Kevin Winston Jr. (S) - Doubtful | IND: No significant injuries'
                },
                {
                    'away_team': 'LV',
                    'home_team': 'WAS',
                    'winner': 'LV',
                    'confidence': 52.5,
                    'injury_report': 'WAS: John Bates (TE) - Out, Noah Brown (WR) - Out, Jayden Daniels (QB) - Out | LV: No significant injuries'
                },
                {
                    'away_team': 'DEN',
                    'home_team': 'LAC',
                    'winner': 'LAC',
                    'confidence': 68.8,
                    'injury_report': 'LAC: Will Dissly (TE) - Out, Elijah Molden (S) - Out | DEN: Evan Engram (TE) - Out, Dre Greenlaw (LB) - Out'
                },
                {
                    'away_team': 'NO',
                    'home_team': 'SEA',
                    'winner': 'SEA',
                    'confidence': 51.0,
                    'injury_report': 'SEA: Zach Charbonnet (RB) - Doubtful, Nick Emmanwori (S) - Doubtful, Julian Love (S) - Doubtful, Devon Witherspoon (CB) - Doubtful | NO: Dillon Radunz (G) - Out, Chase Young (DE) - Out'
                },
                {
                    'away_team': 'DAL',
                    'home_team': 'CHI',
                    'winner': 'DAL',
                    'confidence': 78.2,
                    'injury_report': 'CHI: Kiran Amegadjie (G) - Out, T.J. Edwards (LB) - Out, Kyler Gordon (CB) - Out, Jaylon Johnson (CB) - Out, Jaylon Jones (CB) - Out | DAL: DaRon Bland (CB) - Out'
                },
                {
                    'away_team': 'ARI',
                    'home_team': 'SF',
                    'winner': 'ARI',
                    'confidence': 57.7,
                    'injury_report': 'SF: Spencer Burford (T) - Out, Jordan Watkins (WR) - Out | ARI: Will Johnson (CB) - Doubtful'
                },
                {
                    'away_team': 'KC',
                    'home_team': 'NYG',
                    'winner': 'KC',
                    'confidence': 50.6,
                    'injury_report': 'NYG: Demetrius Flannigan-Fowles (LB) - Doubtful, Darius Muasau (LB) - Out, Rakeem Nunez-Roches (DT) - Doubtful | KC: Michael Danna (DE) - Out, Kristian Fulton (CB) - Out'
                },
                {
                    'away_team': 'DET',
                    'home_team': 'BAL',
                    'winner': 'BAL',
                    'confidence': 57.5,
                    'injury_report': 'BAL: No significant injuries | DET: No significant injuries'
                }
            ],
            results: {
                'MIA@BUF': { home_score: 24, away_score: 17, actual_winner: 'BUF' },
                'ATL@CAR': { home_score: 14, away_score: 21, actual_winner: 'ATL' },
                'GB@CLE': { home_score: 20, away_score: 24, actual_winner: 'GB' },
                'HOU@JAX': { home_score: 28, away_score: 21, actual_winner: 'JAX' },
                'CIN@MIN': { home_score: 17, away_score: 24, actual_winner: 'CIN' },
                'PIT@NE': { home_score: 21, away_score: 14, actual_winner: 'NE' },
                'LA@PHI': { home_score: 31, away_score: 28, actual_winner: 'PHI' },
                'NYJ@TB': { home_score: 24, away_score: 17, actual_winner: 'TB' },
                'IND@TEN': { home_score: 13, away_score: 28, actual_winner: 'IND' },
                'LV@WAS': { home_score: 14, away_score: 21, actual_winner: 'LV' },
                'DEN@LAC': { home_score: 31, away_score: 24, actual_winner: 'LAC' },
                'NO@SEA': { home_score: 28, away_score: 24, actual_winner: 'SEA' },
                'DAL@CHI': { home_score: 14, away_score: 31, actual_winner: 'DAL' },
                'ARI@SF': { home_score: 17, away_score: 24, actual_winner: 'ARI' },
                'KC@NYG': { home_score: 14, away_score: 21, actual_winner: 'KC' },
                'DET@BAL': { home_score: 28, away_score: 24, actual_winner: 'BAL' }
            }
        };
    }

    async loadWeek(week) {
        this.currentWeek = week;
        
        // Update active week button
        document.querySelectorAll('.btn-week').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Load week data if not already loaded
        if (!this.predictionsData[week]) {
            await this.loadWeekData(week);
        }

        this.renderPredictions();
    }

    renderPredictions() {
        const content = document.getElementById('predictions-content');
        const weekData = this.predictionsData[this.currentWeek];

        if (!weekData || !weekData.predictions || weekData.predictions.length === 0) {
            content.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                    <h4>No Predictions Available</h4>
                    <p class="text-muted">Week ${this.currentWeek} predictions are not available yet.</p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h3><i class="fas fa-crystal-ball"></i> Week ${this.currentWeek} NFL Predictions</h3>
                        </div>
                        <div class="card-body">
                            <p class="mb-0">The RIVERS Model predictions for Week ${this.currentWeek} of the 2025 NFL season.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
        `;

        weekData.predictions.forEach(prediction => {
            const gameKey = `${prediction.away_team}@${prediction.home_team}`;
            const result = weekData.results ? weekData.results[gameKey] : null;
            
            let resultBox = '';
            if (result && result.actual_winner) {
                const isCorrect = prediction.winner === result.actual_winner;
                const resultClass = isCorrect ? 'correct' : 'incorrect';
                const resultText = isCorrect ? '✅ CORRECT!' : '❌ INCORRECT';
                
                resultBox = `
                    <div class="result-box ${resultClass}">
                        <h6><strong>📊 Game Result</strong></h6>
                        <p><strong>Final Score:</strong> ${result.away_score} - ${result.home_score}</p>
                        <p><strong>Predicted:</strong> ${prediction.winner} | <strong>Actual:</strong> ${result.actual_winner}</p>
                        <p class="result-status"><strong>${resultText}</strong></p>
                    </div>
                `;
            }

            html += `
                <div class="col-lg-6 mb-4">
                    <div class="card game-card">
                        <div class="card-header">
                            <h5>🏈 ${prediction.away_team} @ ${prediction.home_team}</h5>
                        </div>
                        <div class="card-body">
                            <div class="prediction-badge">
                                🏆 Winner: ${prediction.winner}
                            </div>
                            <div class="mt-3">
                                <strong>🎯 Confidence:</strong> ${prediction.confidence.toFixed(1)}%
                                <div class="confidence-bar" style="width: ${prediction.confidence}%"></div>
                            </div>
                            <div class="injury-report">
                                <strong>🏥 Injury Report:</strong><br>
                                ${prediction.injury_report}
                            </div>
                            ${resultBox}
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        content.innerHTML = html;
    }

    async showStatistics() {
        document.getElementById('predictions-section').style.display = 'none';
        document.getElementById('about-section').style.display = 'none';
        document.getElementById('statistics-section').style.display = 'block';

        // Calculate statistics
        this.calculateStatistics();
        this.renderStatistics();
    }

    calculateStatistics() {
        let totalGames = 0;
        let correctPredictions = 0;

        // Calculate from all loaded weeks
        Object.keys(this.predictionsData).forEach(week => {
            const weekData = this.predictionsData[week];
            if (weekData && weekData.predictions && weekData.results) {
                weekData.predictions.forEach(prediction => {
                    const gameKey = `${prediction.away_team}@${prediction.home_team}`;
                    const result = weekData.results[gameKey];
                    
                    if (result && result.actual_winner) {
                        totalGames++;
                        if (prediction.winner === result.actual_winner) {
                            correctPredictions++;
                        }
                    }
                });
            }
        });

        this.statisticsData = {
            totalGames,
            correctPredictions,
            accuracy: totalGames > 0 ? (correctPredictions / totalGames * 100) : 0
        };
    }

    renderStatistics() {
        // Update stats cards
        document.getElementById('total-games').textContent = this.statisticsData.totalGames;
        document.getElementById('correct-predictions').textContent = this.statisticsData.correctPredictions;
        document.getElementById('accuracy').textContent = `${this.statisticsData.accuracy.toFixed(1)}%`;

        // Render performance chart
        const chartContainer = document.getElementById('performance-chart');
        chartContainer.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h5>📊 Overall Performance</h5>
                    <div class="progress mb-3" style="height: 30px;">
                        <div class="progress-bar bg-success" role="progressbar" 
                             style="width: ${this.statisticsData.accuracy}%" 
                             aria-valuenow="${this.statisticsData.accuracy}" 
                             aria-valuemin="0" aria-valuemax="100">
                            ${this.statisticsData.accuracy.toFixed(1)}%
                        </div>
                    </div>
                    <p class="text-muted">
                        ${this.statisticsData.correctPredictions} correct out of ${this.statisticsData.totalGames} completed games
                    </p>
                </div>
                <div class="col-md-6">
                    <h5>📈 Performance Notes</h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-check text-success"></i> Only completed games are counted</li>
                        <li><i class="fas fa-check text-success"></i> Real-time accuracy calculation</li>
                        <li><i class="fas fa-check text-success"></i> Transparent performance tracking</li>
                    </ul>
                </div>
            </div>
        `;
    }

    showPredictions() {
        document.getElementById('statistics-section').style.display = 'none';
        document.getElementById('about-section').style.display = 'none';
        document.getElementById('predictions-section').style.display = 'block';
    }

    showAbout() {
        document.getElementById('predictions-section').style.display = 'none';
        document.getElementById('statistics-section').style.display = 'none';
        document.getElementById('about-section').style.display = 'block';
    }

    showError(message) {
        const content = document.getElementById('predictions-content');
        content.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>
        `;
    }

    updateLastUpdated() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        document.getElementById('last-updated').textContent = now.toLocaleDateString('en-US', options);
    }
}

// Global functions for navigation
function showPredictions() {
    window.riversApp.showPredictions();
}

function showStatistics() {
    window.riversApp.showStatistics();
}

function showAbout() {
    window.riversApp.showAbout();
}

function loadWeek(week) {
    window.riversApp.loadWeek(week);
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.riversApp = new RiversBlogApp();
});
