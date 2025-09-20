// Statistics page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadStatisticsData();
    updateLastUpdated();
});

async function loadStatisticsData() {
    try {
        // Load Week 3 data
        const response = await fetch('data/week3_predictions.json');
        const data = await response.json();
        
        // Calculate statistics
        const stats = calculateStatistics(data);
        
        // Update the page
        updateStatisticsDisplay(stats);
        populateGamesTable(data);
        
    } catch (error) {
        console.error('Error loading statistics:', error);
        showError('Failed to load statistics data');
    }
}

function calculateStatistics(data) {
    let totalGames = 0;
    let correctPredictions = 0;
    
    data.predictions.forEach(prediction => {
        const gameKey = `${prediction.away_team}@${prediction.home_team}`;
        const result = data.results[gameKey];
        
        if (result && result.actual_winner) {
            totalGames++;
            if (prediction.winner === result.actual_winner) {
                correctPredictions++;
            }
        }
    });
    
    const accuracy = totalGames > 0 ? (correctPredictions / totalGames * 100) : 0;
    
    return {
        totalGames,
        correctPredictions,
        accuracy
    };
}

function updateStatisticsDisplay(stats) {
    // Update stat cards
    document.getElementById('total-games').textContent = stats.totalGames;
    document.getElementById('correct-predictions').textContent = stats.correctPredictions;
    document.getElementById('accuracy').textContent = `${stats.accuracy.toFixed(1)}%`;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${stats.accuracy}%`;
    progressBar.setAttribute('aria-valuenow', stats.accuracy);
    progressBar.textContent = `${stats.accuracy.toFixed(1)}%`;
    
    // Update progress text
    const progressText = document.querySelector('.progress + p');
    progressText.textContent = `${stats.correctPredictions} correct out of ${stats.totalGames} completed games`;
}

function populateGamesTable(data) {
    const tbody = document.getElementById('games-table');
    tbody.innerHTML = '';
    
    data.predictions.forEach(prediction => {
        const gameKey = `${prediction.away_team}@${prediction.home_team}`;
        const result = data.results[gameKey];
        
        if (result && result.actual_winner) {
            const isCorrect = prediction.winner === result.actual_winner;
            const resultBadge = isCorrect ? '✅ Correct' : '❌ Incorrect';
            const resultClass = isCorrect ? 'text-success' : 'text-danger';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Week 3</td>
                <td>🏈 ${prediction.away_team} @ ${prediction.home_team}</td>
                <td>${result.away_score} - ${result.home_score}</td>
                <td>${prediction.winner}</td>
                <td>${result.actual_winner}</td>
                <td class="${resultClass}"><strong>${resultBadge}</strong></td>
            `;
            tbody.appendChild(row);
        }
    });
}

function showError(message) {
    const container = document.querySelector('.container');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i> ${message}
    `;
    container.insertBefore(alertDiv, container.firstChild);
}

function updateLastUpdated() {
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
