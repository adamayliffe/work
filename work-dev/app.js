// dashboard.js

async function fetchCallData() {
    // Replace with your phone system API endpoint and credentials
    const response = await fetch('https://api.phone-system.com/calls', {
        headers: {
            'Authorization': 'bearer YOUR_API_TOKEN'
        }
    });
    const data = await response.json();
    return data;
}

async function fetchMissedCallsData() {
    // Replace with your phone system API endpoint and credentials for missed calls
    const response = await fetch('https://api.phone-system.com/missedCalls', {
        headers: {
            'Authorization': 'bearer YOUR_API_TOKEN'
        }
    });
    const data = await response.json();
    return data.totalMissedCalls;
}

function updateAgentTable(data) {
    const tableBody = document.querySelector('#agentTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(agent => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const extensionCell = document.createElement('td');
        const callCountCell = document.createElement('td');

        nameCell.textContent = agent.name;
        extensionCell.textContent = agent.extension;
        callCountCell.textContent = agent.calls;

        row.appendChild(nameCell);
        row.appendChild(extensionCell);
        row.appendChild(callCountCell);
        tableBody.appendChild(row);
    });
}

function updateMissedCallsBox(missedCalls) {
    document.querySelector('#missedCallsBox').innerText = `Missed Calls: ${missedCalls}`;
}

async function loadDashboardData() {
    const callData = await fetchCallData();
    const missedCalls = await fetchMissedCallsData();

    updateAgentTable(callData.agents);
    updateMissedCallsBox(missedCalls);
}

// Load dashboard data initially
loadDashboardData();

// Optionally, refresh data every minute
setInterval(loadDashboardData, 60000);
