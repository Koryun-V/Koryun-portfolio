let openedAtTop = false;
let openedScrollY = 0;

function toggleMenu(open = null) {
    const nav = document.getElementById("navLinks");
    const toggle = document.getElementById("menuToggle");
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const backdrop = document.getElementById("backdrop");

    const shouldOpen = open === null ? !nav.classList.contains("open") : open;

    if (shouldOpen) {
        openedScrollY = window.scrollY;

        backdrop.classList.add("show");
        document.body.style.overflowY = 'hidden';

        nav.classList.add("open");
        toggle.classList.add("open");


        if (window.scrollY < headerHeight) {
            window.scrollTo({
                top: headerHeight,
                behavior: 'smooth'
            });
        }
    } else {
        backdrop.classList.remove("show");
        document.body.style.removeProperty('overflow');

        nav.classList.remove("open");
        toggle.classList.remove("open");

        window.scrollTo({
            top: openedScrollY,
            behavior: 'smooth'
        });
    }
}


const sections = document.querySelectorAll("header, section");
const navLinks = document.querySelectorAll("nav .nav-links a");
const currentLabel = document.getElementById("currentSection");

navLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
});
document.getElementById("backdrop").addEventListener("click", () => {
    toggleMenu(false);
});

function setActiveLink(id) {
    navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("active", isActive);
        if (isActive && currentLabel) {
            currentLabel.textContent = a.textContent;
        }
    });
}

let lastSection = null;

function updateActiveSection() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight) {
        if (lastSection !== "contacts") {
            setActiveLink("contacts");
            history.replaceState(null, "", "#contacts");
            lastSection = "contacts";
        }
        return;
    }

    let current = "home";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (scrollTop >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    if (current !== lastSection) {
        setActiveLink(current);
        history.replaceState(null, "", `#${current}`);
        lastSection = current;
    }
}


document.body.addEventListener("click", (e) => {
    const nav = document.getElementById("navLinks");
    const toggle = document.getElementById("menuToggle");
    const isOpen = nav.classList.contains("open");

    // Եթե մենյուն բաց է, և սեղմված էլեմենտը ՈՉ navLinks-ի մեջ է, ՈՉ menuToggle-ի վրա
    if (isOpen && !nav.contains(e.target) && !toggle.contains(e.target)) {
        toggleMenu(false);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    setActiveLink("home");
});

window.addEventListener("scroll", updateActiveSection);

// 📌 Mobile/Desktop mail & telegram link-եր
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

const emailLink = document.getElementById('email-link');
const telegramLink = document.getElementById('telegram-link');

if (isMobile()) {
    emailLink.href = "mailto:koryun.vardanyan.2002@gmail.com";
    emailLink.removeAttribute('target');
    emailLink.removeAttribute('rel');

    telegramLink.href = "https://t.me/koryun_developer";
    telegramLink.removeAttribute('target');
    telegramLink.removeAttribute('rel');
} else {
    emailLink.href = "https://mail.google.com/mail/?view=cm&fs=1&to=koryun.vardanyan.2002@gmail.com";
    emailLink.target = "_blank";
    emailLink.rel = "noopener noreferrer";

    telegramLink.href = "https://t.me/koryun_developer";
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener noreferrer";
}
