function loadUsers() {
    // Uses the Atlassian Bridge to fetch users from your Arrow schema
    AP.request({
        url: '/rest/assets/1.0/object/navlist/aql?ql=objectType = "users"',
        type: 'GET',
        success: function(responseText) {
            const data = JSON.parse(responseText);
            const dropdowns = document.querySelectorAll('.user-select');
            
            dropdowns.forEach(select => {
                select.innerHTML = '<option value="">Select User...</option>';
                data.values.forEach(user => {
                    let opt = document.createElement('option');
                    opt.value = user.id;
                    opt.innerHTML = user.name;
                    select.appendChild(opt);
                });
            });
        },
        error: function(xhr) {
            console.error("Jira security blocked the request. Check your Allowlist settings.");
        }
    });
}

// Add a new row when the button is clicked
document.getElementById('add-row').onclick = () => {
    const tbody = document.getElementById('rows');
    const newRow = document.querySelector('.staff-row').cloneNode(true);
    tbody.appendChild(newRow);
    loadUsers(); // Refresh the dropdowns for the new row
};

// Start the load process
window.onload = loadUsers;
