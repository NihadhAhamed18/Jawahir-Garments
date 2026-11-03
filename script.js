
/* ==========================================
   JAWAHIR GARMENTS
   WHOLESALE POS - APPLICATION ENGINE
   STAGE 1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // INITIALIZE ICONS
    function refreshIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    refreshIcons();


    // DATE DISPLAY
    function updateDate() {

        const dateElement = document.getElementById("todayDate");

        if (!dateElement) return;

        dateElement.textContent = new Date().toLocaleDateString(
            "en-LK",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }

    updateDate();


    // THEME MANAGEMENT
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("jawahir-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    function updateThemeIcon() {

        const darkMode = document.body.classList.contains("dark");

        themeIcon.setAttribute(
            "data-lucide",
            darkMode ? "sun" : "moon"
        );

        themeToggle.title = darkMode
            ? "Switch to light mode"
            : "Switch to dark mode";

        refreshIcons();
    }

    updateThemeIcon();

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const currentTheme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("jawahir-theme", currentTheme);

        updateThemeIcon();

    });


    // PAGE NAVIGATION

    const navLinks = document.querySelectorAll(".nav-link[data-page]");
    const pages = document.querySelectorAll(".page");

    const pageInformation = {

        dashboard: {
            title: "Business Overview",
            breadcrumb: "OVERVIEW"
        },

        billing: {
            title: "Wholesale Billing",
            breadcrumb: "BILLING"
        },

        products: {
            title: "Products & Stock",
            breadcrumb: "INVENTORY"
        },

        customers: {
            title: "Customers",
            breadcrumb: "CUSTOMERS"
        },

        suppliers: {
            title: "Suppliers",
            breadcrumb: "SUPPLIERS"
        },

        purchases: {
            title: "Purchases",
            breadcrumb: "PURCHASES"
        },

        sales: {
            title: "Sales History",
            breadcrumb: "SALES"
        },

        payments: {
            title: "Payments & Credit",
            breadcrumb: "PAYMENTS"
        },

        reports: {
            title: "Reports & Analytics",
            breadcrumb: "REPORTS"
        },

        settings: {
            title: "Store Settings",
            breadcrumb: "SETTINGS"
        }

    };


    function navigateTo(pageName) {

        const targetPage = document.getElementById(pageName);

        if (!targetPage || !pageInformation[pageName]) {
            return;
        }

        // Hide all pages
        pages.forEach(page => {
            page.classList.remove("active");
        });

        // Show selected page
        targetPage.classList.add("active");

        // Update navigation
        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === pageName
            );

        });

        // Update page heading
        document.getElementById("pageTitle").textContent =
            pageInformation[pageName].title;

        document.getElementById("breadcrumb").textContent =
            pageInformation[pageName].breadcrumb;

        // Close mobile navigation
        closeMobileMenu();

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Update browser history without reloading
        history.replaceState(
            { page: pageName },
            "",
            "#" + pageName
        );

    }


    // SIDEBAR NAVIGATION
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigateTo(link.dataset.page);

        });

    });


    // QUICK ACTIONS
    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            navigateTo(button.dataset.go);

        });

    });


    // MOBILE MENU
    const sidebar = document.getElementById("sidebar");

    const overlay = document.getElementById("overlay");

    const menuToggle = document.getElementById("menuToggle");

    const closeSidebar = document.getElementById("closeSidebar");


    function openMobileMenu() {

        sidebar.classList.add("open");

        overlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeMobileMenu() {

        sidebar.classList.remove("open");

        overlay.classList.remove("show");

        document.body.style.overflow = "";

    }


    menuToggle.addEventListener("click", openMobileMenu);

    closeSidebar.addEventListener("click", closeMobileMenu);

    overlay.addEventListener("click", closeMobileMenu);


    // ESCAPE KEY CLOSES MOBILE MENU
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    // INITIAL PAGE
    const requestedPage = window.location.hash.replace("#", "");

    if (requestedPage && pageInformation[requestedPage]) {
        navigateTo(requestedPage);
    } else {
        navigateTo("dashboard");
    }


    console.log(
        "Jawahir Garments Wholesale POS initialized successfully."
    );

    console.log(
        "Stage 1: Premium dashboard is ready."
    );

});
