document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = 'example.com';  // Use a known working domain for verification
    const apiKey = 'coSl6pEMCtCQIdJqTAvWpTUNpCARyHbf';
    const url = `https://api.securitytrails.com/v1/domain/${query}?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
        }
        const data = await response.json();
        displayVerificationResults(data);
    } catch (error) {
        console.error('Error verifying API key:', error);
        displayError(error.message);
    }
});

function displayVerificationResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';
    if (data) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>Verification Successful</h3>
            <p>Domain: example.com</p>
            <p>Response: ${JSON.stringify(data, null, 2)}</p>
        `;
        resultsDiv.appendChild(resultItem);
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

function displayError(errorMessage) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';
    const errorItem = document.createElement('div');
    errorItem.className = 'result-item';
    errorItem.style.color = 'red';
    errorItem.innerHTML = `<p>Error: ${errorMessage}</p>`;
    resultsDiv.appendChild(errorItem);
}
