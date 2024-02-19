// scroll to buy tickets section
function scrollToBuyTickets() {
    const buyTickets = document.getElementById("buy-Tickets");
    if (buyTickets) {
        buyTickets.scrollIntoView({ behavior: "smooth" });
    }
}
// Apply coupon logic
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim().toLowerCase();
    const applyCouponButton = document.getElementById('apply-coupon-button');

    const totalPriceElement = document.getElementById('total-price');
    const grandTotalPriceElement = document.getElementById('grand-total-price');
    const totalSeatsElement = document.getElementById('total-seat');
    const totalSeats = parseInt(totalSeatsElement.innerText);
    let discountPercentage = 0;

    if (totalSeats >= 4) {
        // Apply discount only if 4 or more seats are selected
        if (couponCode === 'new15') {
            discountPercentage = 15;
        } else if (couponCode === 'couple20') {
            discountPercentage = 20;
        }

        // Check if a valid coupon code was entered
        if (discountPercentage > 0) {
            // Hide coupon input field and apply button
            couponInput.style.display = 'none';
            applyCouponButton.style.display = 'none';
        }
    }

    const totalPrice = parseInt(totalPriceElement.innerText);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const grandTotal = totalPrice - discountAmount;

    grandTotalPriceElement.innerText = grandTotal.toString();
}

// Handle seat button click
function handleButtonClick(event) {
    const clickedElement = event.target;
    const classValue = "Economy"; // You can modify this dynamically if needed
    const price = 550;

    if (clickedElement.tagName === 'KBD' && !clickedElement.classList.contains('selected')) {
        const selectedSeats = document.querySelectorAll('.kbd.selected');
        if (selectedSeats.length >= 4) {
            alert('You can only buy up to 4 tickets.');
            return;
        }

        setBackgroundColor(clickedElement.id);
        clickedElement.classList.add('selected'); // Mark the seat as selected

        const currentScoreElement = document.getElementById('seat-left');
        const currentScoreText = currentScoreElement.innerText;
        const newScore = parseInt(currentScoreText) - 1;
        currentScoreElement.innerText = newScore.toString();

        const totalSeatsElement = document.getElementById('total-seat');
        const currentSeats = parseInt(totalSeatsElement.innerText);
        const finalSeats = currentSeats + 1;
        totalSeatsElement.innerText = finalSeats;

        const seatInfo = document.getElementById('selected-seat-info');
        const seatId = clickedElement.id;
        const seatDetails = document.createElement('div');
        seatDetails.innerHTML = `
            <div class="flex mb-4 gap-10">
                <div class="w-1/3">${seatId}</div>
                <div class="w-1/3">${classValue}</div>
                <div class="w-1/3">${price}</div>
            </div>
        `;
        seatInfo.appendChild(seatDetails);

        const totalPriceElement = document.getElementById('total-price');
        const currentTotalPrice = parseInt(totalPriceElement.innerText);
        const newTotalPrice = currentTotalPrice + price;
        totalPriceElement.innerText = newTotalPrice.toString();

        const applyCouponButton = document.getElementById('apply-coupon-button');
        applyCouponButton.addEventListener('click', applyCoupon);

        const grandTotalPriceElement = document.getElementById('grand-total-price');
        const grandTotalPrice = parseInt(grandTotalPriceElement.innerText);

        if (finalSeats == 4) {
            const newGrandTotalPrice = grandTotalPrice + price;
            grandTotalPriceElement.innerText = newGrandTotalPrice.toString();
        } else {
            grandTotalPriceElement.innerText = newTotalPrice.toString();
        }
    }
}

// Placeholder for form validation logic
function validateForm() {
    const passengerName = document.getElementById('passengerName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();

    // Your form validation logic goes here
    // For example, you can check if required fields are filled, validate email/phone, etc.
    if (passengerName === '' || phoneNumber === '' || email === '') {
        alert('Please fill in all required fields.');
        return false;
    }

    // Add more validation logic as needed

    return true;
}

// Function to show the popup
function showPopup() {
    // Open the popup window
    window.open('popup.html', 'Popup', 'width=500,height=400');
}

// Function to handle form submission
function handleFormSubmission() {
    // Your form validation logic goes here
    if (validateForm()) {
        // If form is valid, show the popup
        showPopup();
    } else {
        // Handle invalid form case (e.g., display error messages)
        console.log('Form validation failed!');
    }
}

// Add event listener to the form submit button
const submitButton = document.getElementById('submit-button');
if (submitButton) {
    submitButton.addEventListener('click', handleFormSubmission);
}
// Add an event listener to the "Continue" button
// Add an event listener to the "Continue" button in popup.html
// Add an event listener to the "Continue" button
const continueButton = document.getElementById('continueButton');
if (continueButton) {
    continueButton.addEventListener('click', redirectToIndexAndClosePopup);
}


// Function to redirect to index.html and close the popup
function redirectToIndexAndClosePopup() {
    // Navigate to index.html using window.opener
    window.opener.location.href = 'index.html';
    
    // Close the current popup window
    window.close();
}





// Add event listeners to seat buttons
const kbdElements = document.querySelectorAll('.kbd');
kbdElements.forEach(kbdElement => {
    kbdElement.addEventListener('click', handleButtonClick);
});