const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      statusDiv.textContent = 'Sending...';

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      };

      try {
        const response = await fetch('/.netlify/functions/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          statusDiv.textContent = '✅ Message sent successfully!';
          form.reset();
        } else {
          statusDiv.textContent = '❌ Failed to send message.';
        }
      } catch (error) {
        console.error(error);
        statusDiv.textContent = '❌ Error sending message.';
      }
    });