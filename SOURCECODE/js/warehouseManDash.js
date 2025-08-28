// Navigation functions for dashboard summary boxes
function navigateToStockMovements() {
    window.location.href = 'warehouseStkMove.html';
}

function navigateToInventory() {
    window.location.href = 'warehouseInvtry.html';
}

// Add click event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects and visual feedback
    const summaryBoxes = document.querySelectorAll('.summary-box');
    
    summaryBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        box.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        box.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
});
