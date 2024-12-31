async function signIn() {
    try {
        // Send a request to the backend to log the user's IP and time
        const response = await fetch('/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        alert(data.message);
        updateStatistics();
    } catch (error) {
        console.error('Error signing in:', error);
    }
}

async function updateStatistics() {
    try {
        const response = await fetch('/statistics');
        const data = await response.json();
        const statsDiv = document.getElementById('statistics');
        statsDiv.innerHTML = `<h3>签到统计</h3><ul>${data
            .map(record => `<li>IP: ${record.ip}, 时间: ${record.time}</li>`)
            .join('')}</ul>`;
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}
