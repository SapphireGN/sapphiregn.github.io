// Scroll to section smoothly
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Staff Application Modal
const applyModal = document.getElementById('applyModal');
const discordModal = document.getElementById('discordModal');

function openApplyModal() {
    applyModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeApplyModal() {
    applyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openDiscordModal(e) {
    if (e && e.type === 'click' && e.target.href) {
        return; // Allow normal link behavior
    }
    discordModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDiscordModal() {
    discordModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitApplication(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    
    alert(`Thank you, ${name}! Your application for ${position} has been submitted. We'll contact you at ${email} soon!`);
    closeApplyModal();
    
    // Reset form
    e.target.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == applyModal) {
        closeApplyModal();
    }
    if (event.target == discordModal) {
        closeDiscordModal();
    }
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.game-card, .staff-card, .announcement-card, .feature-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// Smooth navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 0 30px rgba(30, 144, 255, 0.4)';
    } else {
        nav.style.boxShadow = '0 0 20px rgba(30, 144, 255, 0.3)';
    }
});
