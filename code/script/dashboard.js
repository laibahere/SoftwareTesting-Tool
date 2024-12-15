document.addEventListener('DOMContentLoaded', function () {
    // Get all sidebar links and page content sections
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const pageContents = document.querySelectorAll('.page-content');

    // Function to hide all pages and show the clicked page
    function showPage(pageId) {
        // Hide all pages
        pageContents.forEach(page => {
            page.style.display = 'none';
        });

        // Show the selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
        }
    }

    // Set the default page to show (initially dashboard)
    showPage('dashboard');

    // Add event listeners to all sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent default anchor behavior

            // Get the target page from the data-page attribute
            const pageId = link.getAttribute('data-page');

            // Show the selected page
            showPage(pageId);

            // Set the clicked link as active
            sidebarLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Optional: Toggle sidebar visibility for mobile view
    const menuButton = document.getElementById('menu-bar');
    const sidebar = document.querySelector('aside');
    const closeButton = document.getElementById('close-btn');

    // Open sidebar when menu button is clicked
    menuButton.addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    });

    // Close sidebar when close button is clicked
    closeButton.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });

    // Theme toggler functionality (Light/Dark mode)
    const lightModeIcon = document.getElementById('light-mode-icon');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const body = document.body;

    lightModeIcon.addEventListener('click', function () {
        body.classList.remove('dark-theme-variables');
        lightModeIcon.classList.add('active');
        darkModeIcon.classList.remove('active');
    });

    darkModeIcon.addEventListener('click', function () {
        body.classList.add('dark-theme-variables');
        lightModeIcon.classList.remove('active');
        darkModeIcon.classList.add('active');
    });
});
