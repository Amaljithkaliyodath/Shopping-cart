function removeItem(element) {
    let row = element.closest('tr');
    row.remove();
    updateSummary();
}

function updateQuantity(element, change) {
    let input = element.closest('td').querySelector('input');
    let currentValue = parseInt(input.value);
    let newValue = currentValue + change;
    if (newValue > 0) {
        input.value = newValue;
        updateItemTotal(element.closest('tr'));
    }
}

function updateItemTotal(row) {
    let price = parseFloat(row.querySelector('td:nth-child(3)').textContent.substring(1));
    let quantity = parseInt(row.querySelector('td:nth-child(2) input').value);
    let total = price * quantity;
    row.querySelector('.item-total').textContent = '£' + total.toFixed(2);
    updateSummary();
}

function updateSummary() {
    let items = document.querySelectorAll('#cart-items tr');
    let summaryItems = 0;
    let totalCost = 0;
    items.forEach(item => {
        let quantity = parseInt(item.querySelector('td:nth-child(2) input').value);
        let itemTotal = parseFloat(item.querySelector('.item-total').textContent.substring(1));
        summaryItems += itemTotal;
    });

    let shippingCost = parseFloat(document.getElementById('shipping').value);
    let totalCostElement = document.getElementById('total-cost');
    let summaryItemsElement = document.getElementById('summary-items');
    summaryItemsElement.textContent = '£' + summaryItems.toFixed(2);
    totalCost = summaryItems + shippingCost;
    totalCostElement.textContent = '£' + totalCost.toFixed(2);
}

function showPaymentSection() {
    document.getElementById('payment-section').style.display = 'block';
}

function addItem() {
    let tableBody = document.getElementById('cart-items');
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <div class="d-flex">
                <div class="cart-item-image bg-primary d-flex justify-content-center align-items-center">
                    <h6>Image</h6>
                </div>
                <div class="ml-3">
                    <h5>New Item</h5>
                    <p class="text-muted">Description</p>
                    <button class="btn btn-link text-danger flash p-0" onclick="removeItem(this)">Remove</button>
                </div>
            </div>
        </td>
        <td>
            <div class="d-flex align-items-center">
                <button class="btn btn-dark btn-sm" onclick="updateQuantity(this, -1)">-</button>
                <input type="text" class="form-control text-center mx-2" value="1" style="width: 50px;" readonly>
                <button class="btn btn-dark btn-sm" onclick="updateQuantity(this, 1)">+</button>
            </div>
        </td>
        <td>£50.00</td>
        <td class="item-total">£50.00</td>
    `;
    tableBody.appendChild(newRow);
    updateSummary();
}

document.addEventListener('DOMContentLoaded', function() {
    updateSummary();
});
