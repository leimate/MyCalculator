// Event listeners for buttons
document.getElementById('calculate-button').addEventListener('click', calculateSubnet);
document.getElementById('clear-button').addEventListener('click', clearFields);

// Main function to calculate subnet details
function calculateSubnet() {
    const ip = document.getElementById('ip').value;
    const cidr = parseInt(document.getElementById('cidr').value);

    // Validate IP and CIDR input
    if (!validateIP(ip) || cidr < 0 || cidr > 32) {
        alert('Please enter a valid IP address and CIDR value.');
        return;
    }

    const [networkAddress, broadcastAddress, usableHosts] = calculateSubnetDetails(ip, cidr);
    
    displayResults(networkAddress, broadcastAddress, usableHosts);
}

// Clear input fields and results
function clearFields() {
    document.getElementById('ip').value = '';
    document.getElementById('cidr').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('results').style.display = 'none';
}

// Validate IP address format
function validateIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}

// Calculate subnet details based on IP and CIDR
function calculateSubnetDetails(ip, cidr) {
    const octets = ip.split('.').map(Number);
    const subnetMask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const networkAddress = `${octets[0] & (subnetMask >>> 24)}.${octets[1] & (subnetMask >>> 16 & 0xFF)}.${octets[2] & (subnetMask >>> 8 & 0xFF)}.${octets[3] & (subnetMask & 0xFF)}`;
    const broadcastAddress = `${(octets[0] & (subnetMask >>> 24)) | (~subnetMask >>> 24 & 0xFF)}.${(octets[1] & (subnetMask >>> 16 & 0xFF)) | (~subnetMask >>> 16 & 0xFF)}.${(octets[2] & (subnetMask >>> 8 & 0xFF)) | (~subnetMask >>> 8 & 0xFF)}.${(octets[3] & (subnetMask & 0xFF)) | (~subnetMask & 0xFF)}`;
    const usableHosts = Math.pow(2, 32 - cidr) - 2; // Exclude network and broadcast addresses

    return [networkAddress, broadcastAddress, usableHosts];
}

// Display calculated results on the page
function displayResults(networkAddress, broadcastAddress, usableHosts) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <p>Network Address: ${networkAddress}</p>
        <p>Broadcast Address: ${broadcastAddress}</p>
        <p>Usable Hosts: ${usableHosts}</p>
    `;
    results.style.display = 'block'; // Show results when populated
}

// Clear results function
function clearResults() {
    const results = document.getElementById('results');
    results.innerHTML = '';
    results.style.display = 'none'; // Hide results when cleared
}


// IPv6

// Event listeners for buttons
document.getElementById('calculate-button-v6').addEventListener('click', calculateSubnetV6);
document.getElementById('clear-button-v6').addEventListener('click', clearFieldsV6);

// Main function to calculate IPv6 subnet details
function calculateSubnetV6() {
    const ipv6 = document.getElementById('ipv6').value;
    const cidr6 = parseInt(document.getElementById('cidr6').value);

    if (!validateIPv6(ipv6) || cidr6 < 0 || cidr6 > 128) {
        alert('Please enter a valid IPv6 address and CIDR value.');
        return;
    }

    const [networkAddressV6, usableHostsV6] = calculateSubnetDetailsV6(ipv6, cidr6);
    displayResultsV6(networkAddressV6, usableHostsV6);
}

// Clear input fields and results for IPv6
function clearFieldsV6() {
    document.getElementById('ipv6').value = '';
    document.getElementById('cidr6').value = '';
    document.getElementById('results-v6').innerHTML = '';
    document.getElementById('results-v6').style.display = 'none';
}

// Example validate function for IPv6 (implement this)
function validateIPv6(ipv6) {
    const regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]{0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]{0,1}[0-9]))|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]{0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]{0,1}[0-9])))))/;
    return regex.test(ipv6);
}

// Example calculation for IPv6 (implement this)
function calculateSubnetDetailsV6(ipv6, cidr) {
    // Add your logic for calculating network address and usable hosts for IPv6
    const networkAddressV6 = ipv6; // Placeholder; implement real logic
    const usableHostsV6 = Math.pow(2, 128 - cidr) - 2; // Exclude network and broadcast addresses

    return [networkAddressV6, usableHostsV6];
}

// Display calculated results for IPv6
function displayResultsV6(networkAddressV6, usableHostsV6) {
    const resultsV6 = document.getElementById('results-v6');
    resultsV6.innerHTML = `
        <p>Network Address: ${networkAddressV6}</p>
        <p>Usable Hosts: ${usableHostsV6}</p>
    `;
    resultsV6.style.display = 'block'; // Show results when populated
}

// Function to include external HTML into div placeholders
function includeHTML() {
    const header = document.getElementById('header-container');
    const footer = document.getElementById('footer-container');

    // Load header.html
    fetch('header.html')
        .then(response => response.text())
        .then(data => header.innerHTML = data)
        .catch(err => console.log('Error loading header:', err));

    // Load footer.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data)
        .catch(err => console.log('Error loading footer:', err));
}

// Call function to include the header and footer
window.onload = includeHTML;
