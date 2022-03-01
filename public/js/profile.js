/* eslint-disable quotes */
async function loadStats() {

  // render wins and losses
  const response = await fetch(`/api/statistics/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const stats = await response.json();

  const winsTextEl = document.querySelector('#winsText');
  const lossesTextEl = document.querySelector('#lossesText');

  winsTextEl.textContent = stats.total_wins;
  lossesTextEl.textContent = stats.total_losses;
}

loadStats();