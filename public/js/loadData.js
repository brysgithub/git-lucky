async function loadData() {
    const response = await fetch(`/api/statistics/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log(data);

    const winLossBarEl = document.querySelector('#winLossBar');
    const winsTextEl = document.querySelector('#winsText');
    const lossesTextEl = document.querySelector('#lossesText');
    
    winLossBarEl.value = data.total_losses;
    winLossBarEl.max = data.total_wins + data.total_losses;
    winsTextEl.textContent = data.total_wins;
    lossesTextEl.textContent = data.total_losses;

    if (data.total_losses === 0 && data.total_wins === 0) {
        winLossBarEl.value = 1;
        winLossBarEl.max = 2;
    }
}

loadData();