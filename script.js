// 1. Load users from Arrow Schema on startup
async function loadUsers() {
    AP.request({
        url: '/rest/assets/1.0/object/navlist/aql?ql=objectType = "users"',
        type: 'GET',
        success: function(responseText) {
            const data = JSON.parse(responseText);
            populateDropdowns(data.values);
        },
        error: function(xhr, statusText, errorThrown) {
            console.error("Error fetching users:", errorThrown);
        }
    });
}

// 2. Handle the Save (The 100% vs 50% split)
document.getElementById('save-btn').addEventListener('click', () => {
    const rows = document.querySelectorAll('#rows tr'); // Targets the table rows
    rows.forEach(row => {
        const userId = row.querySelector('.user-select').value;
        const percent = row.querySelector('.percent-input').value;
        
        if (userId && percent) {
            updateAssetLoad(userId, percent);
        }
    });
});

async function updateAssetLoad(id, value) {
    AP.request({
        url: `/rest/assets/1.0/object/${id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            attributes: [{ 
                objectTypeAttributeId: '903', // REPLACE WITH YOUR ID
                objectAttributeValues: [{ value: value }] 
            }]
        }),
        success: function() {
            console.log(`Updated User ${id} to ${value}%`);
        }
    });
}

// Helper to add rows dynamically
document.getElementById('add-row').addEventListener('click', () => {
    const tbody = document.getElementById('rows');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><select class="user-select aui-select"><option>Loading...</option></select></td>
        <td><input type="number" class="percent-input aui-input" value="100"></td>
    `;
    tbody.appendChild(newRow);
    loadUsers(); // Refresh dropdown for the new row
});