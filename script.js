// 1. Force the sidebar to be 800px tall so it's not a tiny scroll box
function resizeSidebar() {
    if (window.AP && AP.resize) {
        AP.resize('100%', '800px'); 
    }
}

// 2. Load the Arrow Assets
function loadUsers() {
    // AP.request bypasses the need for an Allowlist
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
                select.innerHTML = '<option>No objects in Users type</option>';
            }
            resizeSidebar();
        },
        error: function(xhr) {
            console.error("Asset fetch failed", xhr);
            document.querySelector('.user-select').innerHTML = '<option>Auth Error</option>';
        }
    });
}

// 3. The Handshake
if (window.AP) {
    AP.events.on('joined', function() {
        resizeSidebar();
        loadUsers();
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
