// 1. Force the sidebar to be 600px tall (No more tiny scroll box!)
if (window.AP) {
    AP.resize('100%', '600px'); 
}

// 2. Fetch the data using a broader AQL
AP.request({
    // Changed "users" to "Users" and added a console log for debugging
    url: '/rest/assets/1.0/object/navlist/aql?ql=objectType = "Users"', 
    type: 'GET',
    success: function(responseText) {
        const data = JSON.parse(responseText);
        const select = document.querySelector('.user-select');
        
        console.log("Assets Data Received:", data); // Check this in your browser console (F12)

        if (!data.values || data.values.length === 0) {
            select.innerHTML = '<option>No Users Found in Schema</option>';
        } else {
            select.innerHTML = '<option value="">Select User...</option>';
            data.values.forEach(user => {
                let opt = document.createElement('option');
                opt.value = user.id;
                // 'label' is the name of the object in Assets
                opt.innerHTML = user.label; 
                select.appendChild(opt);
            });
        }
    },
    error: function(xhr) {
        document.querySelector('.user-select').innerHTML = '<option>Access Denied</option>';
    }
});

// 3. Add row and auto-resize
document.getElementById('add-row').onclick = () => {
    const tbody = document.getElementById('rows');
    const newRow = document.querySelector('.staff-row').cloneNode(true);
    tbody.appendChild(newRow);
    loadUsers();
};

window.onload = loadUsers;
