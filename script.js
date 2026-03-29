// 1. Load users from Arrow Schema
function loadUsers() {
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
        }
    });
}

// 2. Add dynamic rows
document.getElementById('add-row').onclick = () => {
    const row = document.querySelector('.staff-row').cloneNode(true);
    document.getElementById('rows').appendChild(row);
};

// 3. Save to Assets (Replace ATTR_ID with your 'Current Load' ID)
document.getElementById('save-btn').onclick = () => {
    const rows = document.querySelectorAll('.staff-row');
    rows.forEach(row => {
        const id = row.querySelector('.user-select').value;
        const val = row.querySelector('.percent-input').value;
        
        if (id) {
            AP.request({
                url: `/rest/assets/1.0/object/${id}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    attributes: [{ objectTypeAttributeId: 'YOUR_ATTR_ID', objectAttributeValues: [{ value: val }] }]
                })
            });
        }
    });
    alert("Staffing updated!");
};

// Start the load
window.onload = loadUsers;
