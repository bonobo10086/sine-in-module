const users = [];
let currentUsername = '';

function login() {
    const usernameInput = document.getElementById('username').value.trim();
    if (usernameInput) {
        currentUsername = usernameInput;
        alert(`登录成功！欢迎，${currentUsername}！`);
    } else {
        alert('请先输入用户名！');
    }
}

async function signIn() {
    if (!currentUsername) {
        alert('请先登录后再签到！');
        return;
    }

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const user = {
            username: currentUsername,
            ip: data.ip,
            time: new Date().toLocaleString()
        };
        users.push(user);
        alert(`签到成功！用户名: ${user.username}, IP: ${user.ip}`);
        updateStatistics();
    } catch (error) {
        console.error('获取IP失败:', error);
        alert('签到失败，请稍后重试。');
    }
}

function toggleStatistics() {
    const statsDiv = document.getElementById('statistics');
    statsDiv.style.display = statsDiv.style.display === 'block' ? 'none' : 'block';
    updateStatistics();
}

function updateStatistics() {
    const statsList = document.getElementById('statisticsList');
    statsList.innerHTML = users
        .map(user => `<li>用户名: ${user.username} | IP: ${user.ip} | 时间: ${user.time}</li>`)
        .join('');
}
