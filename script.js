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
    const mainDropdownItems = document.querySelectorAll(".menu-item:not(.dropdown)");
    mainDropdownItems.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains('submenu-item')) { // Check if the clicked item is a submenu item
                handleSubmenuItemClicked(item);
            } else {
                updateDropdownToggleContent(item.textContent); // Update dropdown toggle content with selected item
                dropdownMenu.style.display = 'none'; // Hide the dropdown menu after selection
            }
        });
    });

    // Add event listener for mouse enter on main dropdown items
    const mainDropdownParentItems = document.querySelectorAll(".dropdown");
    mainDropdownParentItems.forEach(parentItem => {
        const submenu = parentItem.querySelector('.submenu');
        parentItem.addEventListener("mouseenter", () => {
            submenu.style.display = 'block'; // Show submenu on mouse enter
        });
        parentItem.addEventListener("mouseleave", () => {
            submenu.style.display = 'none'; // Hide submenu on mouse leave
        });
    });

    // Add event listener for click on submenu items
    const submenuItems = document.querySelectorAll(".submenu-item");
    submenuItems.forEach(subitem => {
        subitem.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            handleSubmenuItemClicked(subitem);
        });
    });

    // Add event listener for click on the order button
    const orderButton = document.querySelector('button[type="submit"]');
    const orderMessage = document.getElementById("order-message");
    const modalOverlay = document.querySelector('.modal-overlay');

    orderButton.addEventListener("click", function() {       
        // Check if all required input fields are filled except for the Comments/Instructions field
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
        let allFieldsFilled = true;

        inputFields.forEach(input => {
            if (input.value.trim() === '' && input.name !== "comments") {
                allFieldsFilled = false;
            }
        });

        // Display the message if all required fields are filled
        if (allFieldsFilled) {
            orderMessage.style.display = 'block';
            modalOverlay.style.display = 'flex'; // Show the modal overlay
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