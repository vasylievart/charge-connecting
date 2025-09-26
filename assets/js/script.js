document.addEventListener('DOMContentLoaded', function() {
  const priceForm = document.getElementById('price-form');
  const priceResult = document.getElementById('price-result');
  
  // Add input event listeners for real-time updates
  const inputs = ['locker-type', 'charging-type', 'shelves'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', updatePrice);
      element.addEventListener('input', updatePrice);
    }
  });
  
  // Form submission handler
  priceForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    const type = document.getElementById('locker-type').value;
    const charging = document.getElementById('charging-type').value;
    const shelves = parseInt(document.getElementById('shelves').value) || 1;
    
    console.log('Form values:', type, charging, shelves);
    
    let basePrice = 200;
    if (type === 'token') basePrice += 100;
    if (charging === 'wireless') basePrice += 50;
    
    const totalPrice = basePrice * shelves;
    
    // Fixed syntax error - proper template literal
    priceResult.textContent = `Total Price: €${totalPrice}`;
    
    // Optional: Show alert or use a better notification system
    alert(`Price calculated for: ${type}, ${charging}, ${shelves} shelves. Total: €${totalPrice}`);
  });
  
  // Touch-friendly button handling
  const submitButton = document.querySelector('#price-form button[type="submit"]');
  if (submitButton) {
    // Handle both click and touch events without conflicts
    submitButton.addEventListener('click', function(e) {
      // Prevent double submission
      if (e.detail === 1) { // Only trigger on first click
        priceForm.dispatchEvent(new Event('submit'));
      }
    });
    
    // Touch event for mobile - prevent default scrolling
    submitButton.addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, { passive: false });
    
    submitButton.addEventListener('touchend', function(e) {
      e.preventDefault();
      // Trigger the click event to maintain consistency
      submitButton.click();
    }, { passive: false });
  }
  
  // Real-time price calculation function
  function updatePrice() {
    const type = document.getElementById('locker-type').value;
    const charging = document.getElementById('charging-type').value;
    const shelves = parseInt(document.getElementById('shelves').value) || 1;
    
    let basePrice = 200;
    if (type === 'token') basePrice += 100;
    if (charging === 'wireless') basePrice += 50;
    
    const totalPrice = basePrice * shelves;
    priceResult.textContent = `Total Price: €${totalPrice}`;
  }
  
  // Initial price calculation
  updatePrice();
});
  
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Message sent! We will reply via email soon.');
});

