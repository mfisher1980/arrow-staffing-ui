// 1. Tell Jira to make the sidebar box as long as the content
function setHeight() {
    if (window.AP) {
        AP.resize('100%', '600px'); // Forces it to be 600px tall instead of a tiny box
    }
}

// 2. Load the users
function loadUsers() {
    console.log("Fetching Arrow Schema users...");
    
    AP.request({
        // Updated URL to the most direct Assets AQL endpoint
        url: '/rest/assets/1.0/object/navlist/aql?ql=objectType = "users"',
        type: 'GET',
        success: function(responseText) {
            const data = JSON.parse(responseText);
            const selects = document.querySelectorAll('.user-select');
            
            selects.forEach(select => {
                select.innerHTML = '<option value="">Select User...</option>';
                data.values.forEach(user => {
                    let opt = document.createElement('option');
                    opt.value = user.id;
                    opt.innerHTML = user.name;
                    select.appendChild(opt);
                });
            });
            setHeight(); // Resize after data loads
        },
        error: function(xhr) {
            console.error("Assets Load Failed. Check Jira Allowlist for mfisher1980.github.io");
        }
    });
}

// 3. Add row and auto-resize
document.getElementById('add-row').onclick = () => {
    const tbody = document.getElementById('rows');
    const newRow = document.querySelector('.staff-row').cloneNode(true);
    tbody.appendChild(newRow);
    loadUsers();
};

window.onload = loadUsers;
