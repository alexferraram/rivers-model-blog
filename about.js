// About page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdated();
});

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
