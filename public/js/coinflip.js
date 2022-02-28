const coinflip = async (event) => {
  event.preventDefault();

  const radioButtons = document.querySelectorAll('input[name="answer"]');
  const amount = document.querySelector('#amount').value;
  let selectedFlip;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedFlip = radioButton.value;
      break;
    }
  }

  let flip = Math.floor(Math.random() * 2);

  console.log(`${flip}`);
  if (flip === 0) {
    flip = 'Tails';
  } else {
    flip = 'Heads';
  }

  let result;

  if (flip === selectedFlip) {
    console.log('WINNER');
    result = amount;
  } else {
    console.log('YOU LOSE');
    result = amount * -1;
  }

  const response = await fetch(`/api/transactions/`, {
    method: 'POST',
    body: JSON.stringify({ result }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('GOOD');
  } else {
    alert(response.statusText);
  }
  
  const updateResponse = await fetch(`/api/statistics/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await updateResponse.json();

  const winLossBarEl = document.querySelector('#winLossBar');
  const winsTextEl = document.querySelector('#winsText');
  const lossesTextEl = document.querySelector('#lossesText');

  winLossBarEl.value = data.losses;
  winLossBarEl.max = data.wins + data.losses;
  winsTextEl.textContent = data.wins;
  lossesTextEl.textContent = data.losses;
  
  // Play spinner animation
  // Display the result to the user
};

document.querySelector('#start').addEventListener('click', coinflip);
