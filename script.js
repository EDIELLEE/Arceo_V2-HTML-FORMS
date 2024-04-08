document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector("#dropdown .menu");

    // Function to update dropdown toggle content
    function updateDropdownToggleContent(content) {
        dropdownToggle.textContent = content;
    }

    // Add event listener for mouse enter on dropdown toggle
    dropdownToggle.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = 'block';
    });

    // Add event listener for mouse leave on dropdown toggle
    dropdownToggle.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = 'none';
    });

    // Add event listener for mouse enter on dropdown menu
    dropdownMenu.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = 'block';
    });

    // Add event listener for mouse leave on dropdown menu
    dropdownMenu.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = 'none';
    });

    // Function to handle submenu item click
    function handleSubmenuItemClicked(item) {
        updateDropdownToggleContent(`${item.parentNode.previousElementSibling.textContent} - ${item.textContent}`); // Update dropdown toggle content with selected submenu item
        dropdownMenu.style.display = 'none'; // Hide the dropdown menu after selection

        // Hide other submenus
        const otherSubmenus = document.querySelectorAll('.submenu');
        otherSubmenus.forEach(submenu => {
            if (submenu !== item.parentNode) {
                submenu.style.display = 'none';
            }
        });
    }

    // Add event listener for click on main dropdown items
    const allDropdownItems = document.querySelectorAll(".menu-item");
    allDropdownItems.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains('submenu-item')) { // Check if the clicked item is a submenu item
                handleSubmenuItemClicked(item);
            } else {
                updateDropdownToggleContent(item.textContent); // Update dropdown toggle content with selected item
                dropdownMenu.style.display = 'none'; // Hide the dropdown menu after selection
                
                // Remove the warning message if it exists
                const warningMessage = document.querySelector('.warning-message');
                if (warningMessage) {
                    warningMessage.parentNode.removeChild(warningMessage);
                }
            }
        });
    });

    // Add event listener for click on the order button
    const orderButton = document.querySelector('button[type="submit"]');
    const orderMessage = document.getElementById("order-message");
    const modalOverlay = document.querySelector('.modal-overlay');

    orderButton.addEventListener("click", function() {       
        // Check if all required input fields are filled including dropdown selection
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
        let allFieldsFilled = true;
    
        inputFields.forEach(input => {
            if (input.value.trim() === '' && input.name !== "comments") {
                allFieldsFilled = false;
            }
        });
    
        // Check if dropdown selection is made
        const dropdownSelected = dropdownToggle.textContent.trim() !== "Menu";
    
        // Display the message if all required fields are filled
        if (allFieldsFilled && dropdownSelected) {
            orderMessage.style.display = 'block';
            modalOverlay.style.display = 'flex'; // Show the modal overlay
        } else {
            // Show a warning message if dropdown is not selected
            let warningMessage = document.querySelector('.warning-message');
            if (!dropdownSelected) {
                if (!warningMessage) {
                    warningMessage = document.createElement('span');
                    warningMessage.classList.add('warning-message');
                    warningMessage.textContent = 'Please select an option from the dropdown.';
                    dropdownToggle.parentNode.appendChild(warningMessage);
                }
            } else {
                // Remove warning message if dropdown is selected
                if (warningMessage) {
                    warningMessage.parentNode.removeChild(warningMessage);
                }
            }
        }
    });

    // Add event listener for click on the clear button
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', () => {
        // Remove the warning message if it exists
        const warningMessage = document.querySelector('.warning-message');
        if (warningMessage) {
            warningMessage.parentNode.removeChild(warningMessage);
        }
    });

    const cancelButton = document.querySelector(".cancel-button");
    cancelButton.addEventListener("click", () => {
        // Get all input fields within the form
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');

        // Loop through each input field and set its value to an empty string
        inputFields.forEach(input => {
            input.value = "";
        });

        // Get all radio buttons within the form
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        // Loop through each radio button and uncheck it
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        // Reset the dropdown to its default state ("Menu")
        updateDropdownToggleContent("Menu");

        // Hide the message
        orderMessage.style.display = 'none';
    });
});