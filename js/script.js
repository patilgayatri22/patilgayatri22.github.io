// --- 1. Mobile Menu Toggle ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// --- 2. Active Nav Link on Scroll (Scroll Spy) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = "";
    const scrollY = window.pageYOffset;

    // Check if we are at the very bottom of the page
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
        current = "awards"; // Highlight Awards at the bottom
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') == `#${current}`) {
            link.classList.add('active');
        }
    });
});

// --- 3. Neural Network Background Animation ---
const canvas = document.getElementById('canvas-container');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const numParticles = (width * height) / 9000;
    for (let i = 0; i < numParticles; i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                ctx.beginPath();
                const opacity = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles(); animateParticles();
window.addEventListener('resize', initParticles);

// --- 4. Typewriter Effect ---
const roles = ["AI Engineer", "ML Engineer", "Data Engineer", "Data Scientist", "Data Analyst", "Tech Enthusiast"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeSpeed = 100, eraseSpeed = 50, newTextDelay = 2000;
const typeWriterElement = document.getElementById('typewriter-text');

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true; setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? eraseSpeed : typeSpeed);
    }
}
document.addEventListener('DOMContentLoaded', type);