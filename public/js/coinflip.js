const coinflip = async (event) => {
  event.preventDefault();

  const radioButtons = document.querySelectorAll('input[name="answer"]');

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
    result = 1;
  } else {
    console.log('YOU LOSE');
    result = -1;
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

  const response = await fetch(`/api/statistics/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
});

  // Play spinner animation
  // Display the result to the user
};

document.querySelector('#start').addEventListener('click', coinflip);
