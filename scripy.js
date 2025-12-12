document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donationForm');
    const successMessage = document.getElementById('successMessage');
    const newRegistrationBtn = document.getElementById('newRegistration');

    // Set min date for DOB (18 years ago)
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    document.getElementById('dob').max = minAgeDate.toISOString().split('T')[0];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            contact: document.getElementById('contact').value,
            weight: document.getElementById('weight').value,
            city: document.getElementById('city').value
        };

        // Basic validation
        if (parseFloat(formData.weight) < 45) {
            alert('Minimum weight required is 45 kg for blood donation.');
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Log data (in real app, send to server)
            console.log('Donor Data:', formData);
        }, 1000);
    });

    newRegistrationBtn.addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        successMessage.classList.add('hidden');
        document.getElementById('dob').max = minAgeDate.toISOString().split('T')[0];
    });
});
