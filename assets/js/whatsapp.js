const phoneNumber = "34678901234"; // Manager's number, international format without '+'
const prefilledMessage = "Hello, I would like to inquire about your charging lockers.";
const encodedMessage = encodeURIComponent(prefilledMessage);

const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
console.log(whatsappLink);