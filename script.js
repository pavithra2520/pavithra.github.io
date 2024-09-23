document.addEventListener('DOMContentLoaded', () => {
        const busResultsDiv = document.getElementById('bus-results');
        const upperBerthsContainer = document.getElementById('upper-berths');
        const lowerBerthsContainer = document.getElementById('lower-berths');
        const ticketAmountDisplay = document.getElementById('ticket-amount');
        const ticketDetails = document.getElementById('ticket-details');
        const busList = document.getElementById('bus-list');
        const passengerDetailsSection = document.getElementById('passenger-details-section');
        const paymentSection = document.getElementById('payment-section');
        const ticketInfoSection = document.getElementById('ticket-info-section');
        const continueToPassengerDetailsBtn = document.getElementById('continue-to-passenger-details');
        const showBusesBtn = document.getElementById('show-buses');
        const continueToPaymentBtn = document.getElementById('continue-to-payment');
        const confirmBookingBtn = document.getElementById('confirm-booking');
        const closeTicketInfoBtn = document.getElementById('close-ticket-info');
    
        const seatCountUpper = 6;
        const seatCountLower = 6;
        const ticketPrices = {
            express: 200,
            luxury: 300,
            standard: 150
        };
    
        let selectedBus = null;
        initializeSeats();
    
        // Create upper berth seats
        for (let i = 1; i <= seatCountUpper; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat available';
            seat.textContent = i;
    
            // Check if the seat is already booked in localStorage
            if (localStorage.getItem(`seat-${i}`) === 'booked') {
                seat.classList.remove('available');
                seat.classList.add('booked');
                seat.textContent += ' (Booked)';
            }
    
            seat.addEventListener('click', () => toggleSeatSelection(seat, i));
            upperBerthsContainer.appendChild(seat);
        }
    
        // Create lower berth seats
        for (let i = 1; i <= seatCountLower; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat available';
            seat.textContent = i + seatCountUpper;
    
            // Check if the seat is already booked in localStorage
            if (localStorage.getItem(`seat-${i + seatCountUpper}`) === 'booked') {
                seat.classList.remove('available');
                seat.classList.add('booked');
                seat.textContent += ' (Booked)';
            }
    
            seat.addEventListener('click', () => toggleSeatSelection(seat, i + seatCountUpper));
            lowerBerthsContainer.appendChild(seat);
        }
    
        // Toggle seat selection and update localStorage
        function toggleSeatSelection(seat, seatNumber) {
            if (seat.classList.contains('available')) {
                seat.classList.remove('available');
                seat.classList.add('selected');
                // Mark seat as selected in localStorage
                localStorage.setItem(`seat-${seatNumber}`, 'booked');
            } else if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                seat.classList.add('available');
                // Remove seat booking from localStorage
                localStorage.removeItem(`seat-${seatNumber}`);
            } else if (seat.classList.contains('booked')) {
                alert('This seat is already booked.');
            }
        }
    
        // Function to initialize seats from localStorage
        function initializeSeats() {
            for (let i = 1; i <= seatCountUpper + seatCountLower; i++) {
                if (localStorage.getItem(`seat-${i}`) === 'booked') {
                    const seat = document.querySelector(`.seat[data-seat="${i}"]`);
                    if (seat) {
                        seat.classList.remove('available');
                        seat.classList.add('booked');
                        seat.textContent += ' (Booked)';
                    }
                }
            }
        }
        // Show available buses
        showBusesBtn.addEventListener('click', () => {
            const fromCity = document.getElementById('from-city').value;
            const toCity = document.getElementById('to-city').value;
            const travelDate = document.getElementById('travel-date').value;
    
            // Validation for fields
            if (!fromCity || !toCity || !travelDate) {
                alert('Please fill in all fields: Departure City, Destination City, and Travel Date.');
                return;
            }
    
            const selectedDate = new Date(travelDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            if (selectedDate < today) {
                alert('You can\'t book on past dates. Please select a valid travel date.');
                return;
            }
    
            busList.innerHTML = ''; // Clear previous results
    
            // Simulated bus data
            const buses = [
           
        // September 23, 2024
        { type: 'express', time: '6:00 AM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'luxury', time: '7:00 AM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-23' },
        { type: 'standard', time: '8:00 AM', from: 'Chennai', to: 'Bangalore', date: '2024-09-23' },
        { type: 'luxury', time: '9:00 AM', from: 'Bangalore', to: 'Chennai', date: '2024-09-23' },
        { type: 'standard', time: '11:00 AM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'luxury', time: '1:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'standard', time: '2:00 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-23' },
        { type: 'express', time: '3:00 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-23' },
        { type: 'luxury', time: '4:00 PM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'express', time: '5:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'standard', time: '6:00 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-23' },
        { type: 'luxury', time: '7:30 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-23' },
        { type: 'standard', time: '8:30 PM', from: 'Bangalore', to: 'Chennai', date: '2024-09-23' },
        { type: 'express', time: '9:00 PM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-23' },
        { type: 'luxury', time: '10:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-23' },
        { type: 'express', time: '5:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-23' },
    { type: 'luxury', time: '6:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-23' },
    { type: 'standard', time: '8:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-23'},
    { type: 'express', time: '9:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-23'},
    
        // September 24, 2024
        { type: 'express', time: '6:30 AM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-24' },
        { type: 'luxury', time: '7:30 AM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-24' },
        { type: 'standard', time: '8:30 AM', from: 'Chennai', to: 'Bangalore', date: '2024-09-24' },
        { type: 'luxury', time: '9:30 AM', from: 'Bangalore', to: 'Chennai', date: '2024-09-24' },
        { type: 'express', time: '10:30 AM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-24' },
        { type: 'standard', time: '11:30 AM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-24' },
        { type: 'luxury', time: '1:30 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-24' },
        { type: 'standard', time: '2:30 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-24' },
        { type: 'express', time: '3:30 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-24' },
        { type: 'luxury', time: '4:30 PM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-24' },
        { type: 'express', time: '5:30 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-24' },
        { type: 'standard', time: '6:30 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-24' },
        { type: 'luxury', time: '8:00 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-24' },
        { type: 'standard', time: '9:00 PM', from: 'Bangalore', to: 'Chennai', date: '2024-09-24' },
        { type: 'express', time: '10:00 PM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-24' },
        { type: 'luxury', time: '11:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-24' },
        
        { type: 'express', time: '5:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-24' },
    { type: 'luxury', time: '6:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-24' },
    { type: 'standard', time: '8:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-24'},
    { type: 'express', time: '9:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-24'},
    
        // September 25, 2024
        { type: 'express', time: '6:00 AM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'luxury', time: '7:00 AM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-25' },
        { type: 'standard', time: '8:00 AM', from: 'Chennai', to: 'Bangalore', date: '2024-09-25' },
        { type: 'luxury', time: '9:00 AM', from: 'Bangalore', to: 'Chennai', date: '2024-09-25' },
        { type: 'express', time: '10:00 AM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-25' },
        { type: 'standard', time: '11:00 AM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'luxury', time: '1:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'standard', time: '2:00 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-25' },
        { type: 'express', time: '3:00 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-25' },
        { type: 'luxury', time: '4:00 PM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'express', time: '5:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'standard', time: '6:00 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-25' },
        { type: 'luxury', time: '7:30 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-25' },
        { type: 'standard', time: '8:30 PM', from: 'Bangalore', to: 'Chennai', date: '2024-09-25' },
        { type: 'express', time: '9:00 PM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-25' },
        { type: 'luxury', time: '10:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-25' },
        { type: 'express', time: '5:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-25' },
    { type: 'luxury', time: '6:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-25' },
    { type: 'standard', time: '8:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-25'},
    { type: 'express', time: '9:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-25'},
    
        // September 26, 2024
        { type: 'express', time: '6:15 AM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-26' },
        { type: 'luxury', time: '7:15 AM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-26' },
        { type: 'standard', time: '8:15 AM', from: 'Chennai', to: 'Bangalore', date: '2024-09-26' },
        { type: 'luxury', time: '9:15 AM', from: 'Bangalore', to: 'Chennai', date: '2024-09-26' },
        { type: 'express', time: '10:15 AM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-26' },
        { type: 'standard', time: '11:15 AM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-26' },
        { type: 'luxury', time: '1:15 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-26' },
        { type: 'standard', time: '2:15 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-26' },
        { type: 'express', time: '3:15 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-26' },
        { type: 'luxury', time: '4:15 PM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-26' },
        { type: 'express', time: '5:15 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-26' },
        { type: 'standard', time: '6:15 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-26' },
        { type: 'luxury', time: '7:45 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-26' },
        { type: 'standard', time: '8:45 PM', from: 'Bangalore', to: 'Chennai', date: '2024-09-26' },
        { type: 'express', time: '9:15 PM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-26' },
        { type: 'luxury', time: '10:15 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-26' },
       
        { type: 'express', time: '5:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-26' },
    { type: 'luxury', time: '6:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-26' },
    { type: 'standard', time: '8:00 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-26'},
    { type: 'express', time: '9:30 AM', from: 'Mumbai', to: 'Chennai', date: '2024-09-26'},
    
        // September 27, 2024
        { type: 'express', time: '6:30 AM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-27' },
        { type: 'luxury', time: '7:30 AM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-27' },
        { type: 'standard', time: '8:30 AM', from: 'Chennai', to: 'Bangalore', date: '2024-09-27' },
        { type: 'luxury', time: '9:30 AM', from: 'Bangalore', to: 'Chennai', date: '2024-09-27' },
        { type: 'express', time: '10:30 AM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-27' },
        { type: 'standard', time: '11:30 AM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-27' },
        { type: 'luxury', time: '1:30 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-27' },
        { type: 'standard', time: '2:30 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-27' },
        { type: 'express', time: '3:30 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-27' },
        { type: 'luxury', time: '4:30 PM', from: 'Bangalore', to: 'Hyderabad', date: '2024-09-27' },
        { type: 'express', time: '5:30 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-27' },
        { type: 'standard', time: '6:30 PM', from: 'Hyderabad', to: 'Chennai', date: '2024-09-27' },
        { type: 'luxury', time: '8:00 PM', from: 'Chennai', to: 'Bangalore', date: '2024-09-27' },
        { type: 'standard', time: '9:00 PM', from: 'Bangalore', to: 'Chennai', date: '2024-09-27' },
        { type: 'express', time: '10:00 PM', from: 'Hyderabad', to: 'Bangalore', date: '2024-09-27' },
        { type: 'luxury', time: '11:00 PM', from: 'Chennai', to: 'Hyderabad', date: '2024-09-27' }
    
    
            ];
            
    
          
    
            const availableBuses = buses.filter(bus =>
                bus.from.toLowerCase() === fromCity.toLowerCase() &&
                bus.to.toLowerCase() === toCity.toLowerCase() &&
                bus.date === travelDate
            );
    
            if (availableBuses.length > 0) {
                availableBuses.forEach(bus => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${bus.type.charAt(0).toUpperCase() + bus.type.slice(1)} - ${bus.time}`;
                    listItem.addEventListener('click', () => selectBus(bus));
                    busList.appendChild(listItem);
                });
                busResultsDiv.classList.remove('hidden');
                document.getElementById('initial-info').classList.add('hidden');
            } else {
                busList.innerHTML = '<li>No buses available for the selected route on this date.</li>';
                busResultsDiv.classList.remove('hidden');
            }
        });
    
        // Select a bus
        function selectBus(bus) {
            selectedBus = bus;
            busResultsDiv.classList.add('hidden');
            document.getElementById('seat-selection-section').classList.remove('hidden');
            clearSeatSelection(); // Clear previous seat selections
        }
    
        // Clear seat selection
        function clearSeatSelection() {
            const selectedSeats = document.querySelectorAll('.seat.selected');
            selectedSeats.forEach(seat => {
                seat.classList.remove('selected');
                seat.classList.add('available');
            });
        }
    
        // Continue to passenger details
        continueToPassengerDetailsBtn.addEventListener('click', () => {
            const selectedSeats = document.querySelectorAll('.seat.selected');
            if (selectedSeats.length === 0) {
                alert('Please select at least one seat.');
                return;
            }
    
            passengerDetailsSection.classList.remove('hidden');
            const totalAmount = selectedSeats.length * ticketPrices[selectedBus.type];
            ticketAmountDisplay.textContent = `Total: ₹${totalAmount}`;
            displayPassengerInputs(selectedSeats.length);
            document.getElementById('seat-selection-section').classList.add('hidden');
        });
    
        // Display passenger input fields
        function displayPassengerInputs(seatCount) {
            const passengerInputsDiv = document.getElementById('passenger-inputs');
            passengerInputsDiv.innerHTML = '';
            for (let i = 1; i <= seatCount; i++) {
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.placeholder = `Passenger ${i} Name (Alphabets only)`;
                nameInput.required = true;
                nameInput.pattern = "[A-Za-z ]+";
                nameInput.title = "Please enter a valid name using alphabets only.";
                passengerInputsDiv.appendChild(nameInput);
    
                const ageInput = document.createElement('input');
                ageInput.type = 'number';
                ageInput.placeholder = `Passenger ${i} Age (0 and above)`;
                ageInput.required = true;
                ageInput.min = "0";
                passengerInputsDiv.appendChild(ageInput);
    
                const genderSelect = document.createElement('select');
                genderSelect.required = true;
                genderSelect.innerHTML = `
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                `;
                passengerInputsDiv.appendChild(genderSelect);
    
                // Phone number input
                const phoneNumberInput = document.createElement('input');
                phoneNumberInput.type = 'tel'; // Use 'tel' for phone number
                phoneNumberInput.placeholder = `Passenger ${i} Phone Number`;
                phoneNumberInput.required = true;
                phoneNumberInput.pattern = "[0-9]{10}"; // Example for a 10-digit number
                phoneNumberInput.title = "Please enter a valid 10-digit phone number.";
                passengerInputsDiv.appendChild(phoneNumberInput);
    
                // ID proof number input
                const idProofInput = document.createElement('input');
                idProofInput.type = 'text';
                idProofInput.placeholder = `Passenger ${i} ID Proof Number`;
                idProofInput.required = true;
                passengerInputsDiv.appendChild(idProofInput);
            }
        }
    
        // Continue to payment
    continueToPaymentBtn.addEventListener('click', () => {
        const passengerNames = Array.from(passengerDetailsSection.querySelectorAll('input[type="text"]'));
        const passengerAges = Array.from(passengerDetailsSection.querySelectorAll('input[type="number"]'));
    
        // Validate passenger names
        const allNamesValid = passengerNames.every(input => input.value.trim() !== '');
        // Validate passenger ages (must be a number greater than 0)
        const allAgesValid = passengerAges.every(input => {
            const age = parseInt(input.value);
            return !isNaN(age) && age > 0;
        });
    
        if (!allNamesValid) {
            alert('Please enter all passenger names.');
            return;
        }
    
        if (!allAgesValid) {
            alert('Please enter valid ages for all passengers.');
            return;
        }
    
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }
    
        paymentSection.classList.remove('hidden');
        passengerDetailsSection.classList.add('hidden');
    });
    
    confirmBookingBtn.addEventListener('click', () => {
        const passengerNames = Array.from(passengerDetailsSection.querySelectorAll('input')).map(input => input.value);
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
        // Display ticket details
        ticketDetails.innerHTML = `
            <p>From: ${selectedBus.from}</p>
            <p>To: ${selectedBus.to}</p>
            <p>Date: ${selectedBus.date}</p>
            <p>Bus Type: ${selectedBus.type.charAt(0).toUpperCase() + selectedBus.type.slice(1)}</p>
            <p>Selected Seats: ${Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.textContent).join(', ')}</p>
            <p>Passenger details: ${passengerNames.join(', ')}</p>
            <p>Payment Method: ${paymentMethod}</p>
        `;
        paymentSection.classList.add('hidden'); // Hide payment
        ticketInfoSection.classList.remove('hidden'); // Show ticket info
    });
    
    // Print ticket
    document.getElementById('print-ticket').addEventListener('click', () => {
        const printContents = ticketDetails.innerHTML;
        const newWindow = window.open('', '', 'height=400,width=600');
        newWindow.document.write('<html><head><title>Print Ticket</title></head><body>');
        newWindow.document.write(printContents);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();
        newWindow.onload = function() {
            alert('Ticket printed successfully!');
        };
    });
    
    // Close ticket info section
    document.getElementById('close-ticket').addEventListener('click', () => {
        ticketInfoSection.classList.add('hidden'); // Hide ticket info section
        document.getElementById('booking-form').reset(); // Optionally reset the form
        document.getElementById('initial-info').classList.remove('hidden'); // Show initial info again
    });
    
    // Back button for bus results
    document.getElementById('back-to-initial').addEventListener('click', () => {
        busResultsDiv.classList.add('hidden'); // Hide bus results
        document.getElementById('initial-info').classList.remove('hidden'); // Show initial info again
    });
    
    // Back button for seat selection
    document.getElementById('back-to-bus-results').addEventListener('click', () => {
        document.getElementById('seat-selection-section').classList.add('hidden'); // Hide seat selection
        busResultsDiv.classList.remove('hidden'); // Show bus results
    });
    
    // Back button for passenger details
    document.getElementById('back-to-seat-selection').addEventListener('click', () => {
        passengerDetailsSection.classList.add('hidden'); // Hide passenger details
        document.getElementById('seat-selection-section').classList.remove('hidden'); // Show seat selection
    });
    
    // Back button for payment
    document.getElementById('back-to-passenger-details').addEventListener('click', () => {
        paymentSection.classList.add('hidden'); // Hide payment
        passengerDetailsSection.classList.remove('hidden'); // Show passenger details
    });
    });