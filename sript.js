document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    const apiKey = '87C3gGnnJGYT84yQBrRTjLoQj0G0w352';  // Replace with your actual API key
    const url = `https://api.securitytrails.com/v1/domain/${query}?apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';

    if (data) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>${data.hostname || 'No hostname available'}</h3>
            <p>IP: ${data.ip || 'No IP available'}</p>
            <p>Registrar: ${data.registrar || 'No registrar available'}</p>
            <p>Updated: ${data.updated || 'No update date available'}</p>
        `;
        resultsDiv.appendChild(resultItem);
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

