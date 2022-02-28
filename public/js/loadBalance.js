async function loadData() {
    try {
        const response = await fetch(`/api/users/balance`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const balance = await response.json();

        document.querySelector('#userBalanceText').textContent = balance;
    } catch (err) {
        console.log(err);
    }
}

loadData();