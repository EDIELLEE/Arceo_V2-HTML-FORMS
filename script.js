document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector("#dropdown .menu");

    function updateDropdownToggleContent(content) 
    {
        dropdownToggle.textContent = content;
    }

    dropdownToggle.addEventListener("mouseenter", () => 
    {
        dropdownMenu.style.display = 'block';
    });

    dropdownToggle.addEventListener("mouseleave", () => 
    {
        dropdownMenu.style.display = 'none';
    });

    dropdownMenu.addEventListener("mouseenter", () => 
    {
        dropdownMenu.style.display = 'block';
    });

    dropdownMenu.addEventListener("mouseleave", () => 
    {
        dropdownMenu.style.display = 'none';
    });

    function handleSubmenuItemClicked(item) 
    {
        updateDropdownToggleContent(`${item.parentNode.previousElementSibling.textContent} - ${item.textContent}`); 
        dropdownMenu.style.display = 'none'; 

        const otherSubmenus = document.querySelectorAll('.submenu');
        otherSubmenus.forEach(submenu => {
            if (submenu !== item.parentNode) 
            {
                submenu.style.display = 'none';
            }
        });
    }

    const allDropdownItems = document.querySelectorAll(".menu-item");
    allDropdownItems.forEach(item => 
        {
        item.addEventListener("click", () => {
            if (item.classList.contains('submenu-item')) 
            { 
                handleSubmenuItemClicked(item);
            } 
            else 
            {
                updateDropdownToggleContent(item.textContent); 
                dropdownMenu.style.display = 'none'; 
                
                const warningMessage = document.querySelector('.warning-message');
                if (warningMessage) {
                    warningMessage.parentNode.removeChild(warningMessage);
                }
            }
        });
    });

    const orderButton = document.querySelector('button[type="submit"]');
    const orderMessage = document.getElementById("order-message");
    const modalOverlay = document.querySelector('.modal-overlay');

    orderButton.addEventListener("click", function() 
    {       
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
        let allFieldsFilled = true;
    
        inputFields.forEach(input => 
            {
            if (input.value.trim() === '' && input.name !== "comments") 
            {
                allFieldsFilled = false;
            }
        });
    
        const dropdownSelected = dropdownToggle.textContent.trim() !== "Menu";
    
        if (allFieldsFilled && dropdownSelected) 
        {
            orderMessage.style.display = 'block';
            modalOverlay.style.display = 'flex'; 
        } 
        else 
        {
            let warningMessage = document.querySelector('.warning-message');
            if (!dropdownSelected) 
            {
                if (!warningMessage) 
                {
                    warningMessage = document.createElement('span');
                    warningMessage.classList.add('warning-message');
                    warningMessage.textContent = 'Please select an option from the dropdown.';
                    dropdownToggle.parentNode.appendChild(warningMessage);
                }
            } 
            else 
            {
                if (warningMessage) {
                    warningMessage.parentNode.removeChild(warningMessage);
                }
            }
        }
    });

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', () => 
    {
        const warningMessage = document.querySelector('.warning-message');
        if (warningMessage) 
        {
            warningMessage.parentNode.removeChild(warningMessage);
        }
    });

    const cancelButton = document.querySelector(".cancel-button");
    cancelButton.addEventListener("click", () => 
    {
        const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');

        inputFields.forEach(input => 
            {
            input.value = "";
        });

        const radioButtons = document.querySelectorAll('input[type="radio"]');

        radioButtons.forEach(radio => 
            {
            radio.checked = false;
        });

        updateDropdownToggleContent("Menu");

        orderMessage.style.display = 'none';
    });
});
