document.getElementById('price-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('locker-type').value;
  const charging = document.getElementById('charging-type').value;
  const shelves = parseInt(document.getElementById('shelves').value);

  let basePrice = 200;
  if (type === 'card') basePrice += 100;
  if (charging === 'wireless') basePrice += 50;
  
  const totalPrice = basePrice * shelves;
  document.getElementById('price-result').textContent = `Total Price: €${totalPrice}`;
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Message sent! We will reply via email soon.');
});

