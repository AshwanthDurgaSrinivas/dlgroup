document.addEventListener("DOMContentLoaded", async function () {
    // 1. Load Loader
    try {
        const loaderRes = await fetch("loader.html");
        if (loaderRes.ok) {
            const loaderHtml = await loaderRes.text();
            document.body.insertAdjacentHTML("afterbegin", loaderHtml);
            
            // Remove Loader after delay
            setTimeout(() => {
                const loader = document.getElementById("loader");
                if (loader) loader.classList.add("hidden");
                // Optional: remove it from DOM
                setTimeout(() => {
                    if (loader) loader.remove();
                }, 800);
            }, 1700);
        }
    } catch (e) {
        console.error("Error loading loader component:", e);
    }

    // 2. Load Navbar
    try {
        const navRes = await fetch("navbar.html");
        if (navRes.ok) {
            const navHtml = await navRes.text();
            
            // Insert after Loader (or beginning if loader failed)
            const loaderEl = document.getElementById("loader");
            if (loaderEl) {
                loaderEl.insertAdjacentHTML("afterend", navHtml);
            } else {
                document.body.insertAdjacentHTML("afterbegin", navHtml);
            }

            // Init Navbar Scripts
            initNav();
        }
    } catch (e) {
        console.error("Error loading navbar component:", e);
    }

    // 3. Load Footer
    try {
        const footRes = await fetch("footer.html");
        if (footRes.ok) {
            const footHtml = await footRes.text();
            document.body.insertAdjacentHTML("beforeend", footHtml);
        }
    } catch (e) {
        console.error("Error loading footer component:", e);
    }
});

function initNav() {
    // Sticky nav
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 10);
        }, { passive: true });
    }

    // Hamburger Mobile Menu
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            const open = mobileMenu.classList.toggle("open");
            hamburger.classList.toggle("open", open);
            hamburger.setAttribute("aria-expanded", open);
        });
        mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", false);
        }));
    }
}
