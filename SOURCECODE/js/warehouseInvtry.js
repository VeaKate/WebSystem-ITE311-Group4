document.addEventListener('DOMContentLoaded', function() {
    const filterDropdown = document.querySelector('.filter-dropdown');
    const filterBtn = document.querySelector('.filter-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownItems = document.querySelectorAll('.dropdown-content a');

    // Toggle dropdown when button is clicked
    filterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isVisible = dropdownContent.style.display === 'block';
        
        if (isVisible) {
            dropdownContent.style.display = 'none';
            filterDropdown.classList.remove('active');
        } else {
            dropdownContent.style.display = 'block';
            filterDropdown.classList.add('active');
        }
    });

    // Handle dropdown item selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryText = this.textContent;
            filterBtn.innerHTML = `${categoryText} <span class="dropdown-arrow">&#9660;</span>`;
            dropdownContent.style.display = 'none';
            filterDropdown.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!filterDropdown.contains(e.target)) {
            dropdownContent.style.display = 'none';
            filterDropdown.classList.remove('active');
        }
    });

    // Modal functionality
    const addItemBtn = document.querySelector('.add-item-btn');
    const modal = document.getElementById('addItemModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.querySelector('.btn-cancel');
    const addItemForm = document.getElementById('addItemForm');

    // Open modal
    addItemBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal functions
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        addItemForm.reset(); // Clear form
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Notification functionality
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        // Set message and type
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.remove('hidden');
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            hideNotification();
        }, 4000);
    }

    function hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('slide-out');
        
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('slide-out');
        }, 300);
    }

    // Close notification manually
    document.getElementById('closeNotification').addEventListener('click', hideNotification);

    // Form submission
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const itemData = {
            name: formData.get('itemName'),
            sku: formData.get('itemSKU'),
            category: formData.get('itemCategory'),
            quantity: parseInt(formData.get('itemQuantity')),
            threshold: parseInt(formData.get('itemThreshold')),
            price: parseFloat(formData.get('itemPrice')),
            expiry: formData.get('itemExpiry')
        };

        // Validate threshold logic
        if (itemData.threshold >= itemData.quantity && itemData.quantity > 0) {
            if (!confirm('Warning: Current quantity is at or below the threshold. This item will be marked as Low Stock. Continue?')) {
                return;
            }
        }

        // Add item to table (you can modify this to send to server)
        addItemToTable(itemData);
        
        // Close modal
        closeModal();
        
        // Show success notification
        const status = getStockStatus(itemData.quantity, itemData.threshold);
        showNotification(`Item "${itemData.name}" added successfully! Status: ${status.text}`, 'success');
    });

    // Function to determine stock status
    function getStockStatus(quantity, threshold) {
        if (quantity === 0) {
            return { class: 'out-stock', text: 'Out of Stock' };
        } else if (quantity <= threshold) {
            return { class: 'low-stock', text: 'Low Stock' };
        } else {
            return { class: 'in-stock', text: 'In Stock' };
        }
    }

    // Function to add item to table
    function addItemToTable(itemData) {
        const tbody = document.querySelector('.inventory-table tbody');
        const newRow = document.createElement('tr');
        
        // Determine status based on quantity and threshold
        const status = getStockStatus(itemData.quantity, itemData.threshold);

        newRow.innerHTML = `
            <td>${itemData.name}</td>
            <td>${itemData.sku}</td>
            <td>${getCategoryDisplayName(itemData.category)}</td>
            <td>${itemData.quantity}</td>
            <td>₱${itemData.price.toFixed(2)}</td>
            <td><span class="badge ${status.class}">${status.text}</span></td>
            <td>${itemData.expiry || ''}</td>
            <td>
                <span class="action-icon">&#9998;</span>
                <span class="action-icon">&#128465;</span>
            </td>
        `;
        
        tbody.appendChild(newRow);
    }

    // Helper function to get category display name
    function getCategoryDisplayName(category) {
        const categoryMap = {
            'raw-materials': 'Raw Materials',
            'finishing-materials': 'Finishing Materials',
            'MEP': 'MEP Supplies',
            'tools-equipment': 'Construction Tools & Equipment',
            'consumables': 'Consumables'
        };
        return categoryMap[category] || category;
    }

    // Edit modal functionality
    const editModal = document.getElementById('editItemModal');
    const closeEditBtn = document.querySelector('.close-edit');
    const cancelEditBtn = document.querySelector('.btn-cancel-edit');
    const editItemForm = document.getElementById('editItemForm');
    let currentEditRow = null;

    // Edit modal functions
    function openEditModal(row) {
        currentEditRow = row;
        const cells = row.querySelectorAll('td');
        
        // Populate form with current data
        document.getElementById('editItemName').value = cells[0].textContent;
        document.getElementById('editItemSKU').value = cells[1].textContent;
        document.getElementById('editItemCategory').value = getCategoryValue(cells[2].textContent);
        document.getElementById('editItemQuantity').value = cells[3].textContent;
        document.getElementById('editItemPrice').value = cells[4].textContent.replace('₱', '').replace(',', '');
        document.getElementById('editItemExpiry').value = cells[6].textContent;
        
        editModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        editItemForm.reset();
        currentEditRow = null;
    }

    // Helper function to get category value from display name
    function getCategoryValue(displayName) {
        const categoryMap = {
            'Raw Materials': 'raw-materials',
            'Finishing Materials': 'finishing-materials',
            'MEP Supplies': 'MEP',
            'Construction Tools & Equipment': 'tools-equipment',
            'Consumables': 'consumables',
            'Automotive': 'automotive' // For existing data
        };
        return categoryMap[displayName] || displayName.toLowerCase().replace(/\s+/g, '-');
    }

    // Event listeners for edit modal
    closeEditBtn.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);

    // Close edit modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Handle edit form submission
    editItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentEditRow) return;
        
        // Get form data
        const formData = new FormData(this);
        const itemData = {
            name: formData.get('itemName'),
            sku: formData.get('itemSKU'),
            category: formData.get('itemCategory'),
            quantity: parseInt(formData.get('itemQuantity')),
            threshold: parseInt(formData.get('itemThreshold')),
            price: parseFloat(formData.get('itemPrice')),
            expiry: formData.get('itemExpiry')
        };

        // Validate threshold logic
        if (itemData.threshold >= itemData.quantity && itemData.quantity > 0) {
            if (!confirm('Warning: Current quantity is at or below the threshold. This item will be marked as Low Stock. Continue?')) {
                return;
            }
        }

        // Update the row
        updateTableRow(currentEditRow, itemData);
        
        // Close modal
        closeEditModal();
        
        // Show success notification
        const status = getStockStatus(itemData.quantity, itemData.threshold);
        showNotification(`Item "${itemData.name}" updated successfully! Status: ${status.text}`, 'success');
    });

    // Function to update table row
    function updateTableRow(row, itemData) {
        const cells = row.querySelectorAll('td');
        const status = getStockStatus(itemData.quantity, itemData.threshold);
        
        cells[0].textContent = itemData.name;
        cells[1].textContent = itemData.sku;
        cells[2].textContent = getCategoryDisplayName(itemData.category);
        cells[3].textContent = itemData.quantity;
        cells[4].textContent = `₱${itemData.price.toFixed(2)}`;
        cells[5].innerHTML = `<span class="badge ${status.class}">${status.text}</span>`;
        cells[6].textContent = itemData.expiry || '';
    }

    // Delete confirmation modal functionality
    const deleteModal = document.getElementById('deleteConfirmModal');
    const closeDeleteBtn = document.querySelector('.close-delete');
    const cancelDeleteBtn = document.querySelector('.btn-cancel-delete');
    const confirmDeleteBtn = document.querySelector('.btn-confirm-delete');
    let currentDeleteRow = null;

    // Function to open delete confirmation modal
    function openDeleteModal(row) {
        currentDeleteRow = row;
        const cells = row.querySelectorAll('td');
        const itemName = cells[0].textContent;
        const itemSKU = cells[1].textContent;
        
        // Populate modal with item details
        document.getElementById('deleteItemName').textContent = itemName;
        document.getElementById('deleteItemSKU').textContent = itemSKU;
        
        deleteModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Function to close delete modal
    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentDeleteRow = null;
    }

    // Event listeners for delete modal
    closeDeleteBtn.addEventListener('click', closeDeleteModal);
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    // Close delete modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });

    // Confirm delete button
    confirmDeleteBtn.addEventListener('click', function() {
        if (currentDeleteRow) {
            const cells = currentDeleteRow.querySelectorAll('td');
            const itemName = cells[0].textContent;
            const itemSKU = cells[1].textContent;
            
            // Remove the row from the table
            currentDeleteRow.remove();
            
            // Close modal
            closeDeleteModal();
            
            // Show success notification
            showNotification(`Item "${itemName}" (SKU: ${itemSKU}) deleted successfully!`, 'success');
        }
    });

    // Event delegation for edit and delete icons
    document.querySelector('.inventory-table tbody').addEventListener('click', function(e) {
        if (e.target.classList.contains('action-icon') && e.target.textContent.includes('✎')) {
            const row = e.target.closest('tr');
            openEditModal(row);
        } else if (e.target.classList.contains('action-icon') && e.target.textContent.includes('🗑')) {
            const row = e.target.closest('tr');
            openDeleteModal(row);
        }
    });

    // Function to delete item (updated to use modal)
    function deleteItem(row) {
        openDeleteModal(row);
    }
});
