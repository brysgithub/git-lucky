const coinflip = async (event) => {
  event.preventDefault();

  const answer = document.querySelector('#answer');
  const radioButtons = document.querySelectorAll('input[name="answer"]');
  const amount = document.querySelector('#amount').value;
  let selectedFlip;
  
  if (!(amount == false) && Number.isInteger(amount)) {
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
      answer.textContent = ('WINNER WINNER WINNER');
      result = amount;
    } else {
      answer.textContent = ('YOU LOSE');
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
    
    const updateBalance = await fetch(`/api/users/balance`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const balance = await updateBalance.json();

    document.querySelector('#userBalanceText').textContent = balance; 
    
    // Play spinner animation
    // Display the result to the user
  } else {
    answer.textContent = ('That is not a valid amount');
  }
};

document.querySelector('#start').addEventListener('click', coinflip);
