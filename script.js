// 1. Force the sidebar to be 800px tall immediately
if (window.AP) {
    AP.resize('100%', '800px');
}

function loadUsers() {
    console.log("Using AP.request to bypass CSP...");
    
    // We MUST use AP.request. A standard 'fetch' or '$.ajax' will trigger the CSP block you see.
    AP.request({
        url: '/rest/assets/1.0/object/navlist/aql?ql=objectType = "Users"',
        type: 'GET',
        success: function(responseText) {
            const data = JSON.parse(responseText);
            const select = document.querySelector('.user-select');
            
            select.innerHTML = '<option value="">Select User...</option>';
            
            if (data.values && data.values.length > 0) {
                data.values.forEach(user => {
                    let opt = document.createElement('option');
                    opt.value = user.id;
                    opt.innerHTML = user.label; 
                    select.appendChild(opt);
                });
            } else {
                select.innerHTML = '<option>No Users in Schema</option>';
            }
        },
        error: function(xhr) {
            // If this fails, it's a permission issue inside Assets, not a CSP issue
            console.error("Asset fetch failed via Bridge", xhr);
            document.querySelector('.user-select').innerHTML = '<option>Bridge Error</option>';
        }
    });
}

// 2. Ensure we wait for the Jira 'Handshake'
if (window.AP) {
    AP.events.on('joined', function() {
        loadUsers();
    });
} else {
    // Fallback for if you are viewing the GitHub page directly
    window.onload = loadUsers;
}
