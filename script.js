// loading untuk awalan screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});

// agar scrolling navbar menjadi smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// animasi scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in'); // agar animasi bisa diulang
    }
  });
}, observerOptions);

// observasi element untuk animasi
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-card, .testi-card, .step, .about-content, .journey-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Menu Modal Functionality
const modal = document.getElementById('menu-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close');

// Menu data
const menuData = {
    'mie-ayam': {
        name: 'Mie Ayam',
        price: 'Rp. 15.500',
        description: 'Mie ayam dengan kuah kaldu ayam yang gurih, ditambah sayuran segar dan ayam suwir yang lembut. Disajikan dengan bumbu rahasia yang membuat cita rasa semakin nikmat.',
        ingredients: ['Mie kuning', 'Ayam suwir', 'Sayuran segar', 'Kuah kaldu ayam', 'Bumbu rahasia'],
        image: 'img/mie ayam menu.png'
    },
    'baso-aci': {
        name: 'Baso Aci',
        price: 'Rp. 13.000',
        description: 'Baso aci dengan tekstur kenyal, disajikan dengan kuah pedas yang menggugah selera. Cocok untuk pecinta makanan pedas.',
        ingredients: ['Baso aci', 'Kuah pedas', 'Sayuran', 'Bumbu pedas'],
        image: 'img/Boci.png'
    },
    'es-teler': {
        name: 'Es Teler',
        price: 'Rp. 14.000',
        description: 'Es teler segar dengan campuran buah-buahan dan santan yang manis dan menyegarkan. Cocok untuk menghilangkan dahaga.',
        ingredients: ['Buah-buahan segar', 'Santan', 'Es serut', 'Gula merah'],
        image: 'img/es teler.png'
    }
};

// Open modal when menu card is clicked
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', function() {
        const menuType = this.getAttribute('data-menu');
        const menu = menuData[menuType];
        
        if (menu) {
            modalContent.innerHTML = `
                <div class="modal-menu">
                    <img src="${menu.image}" alt="${menu.name}" class="modal-image">
                    <h2>${menu.name}</h2>
                    <p class="modal-price">${menu.price}</p>
                    <p class="modal-description">${menu.description}</p>
                    <button class="modal-order-btn" onclick="orderMenu('${menuType}')">
                        <i class="fas fa-shopping-cart"></i> Pesan Sekarang
                    </button>
                </div>
            `;
            modal.style.display = 'block';
        }
    });
});

// penutup modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// fungsi untuk order
function orderMenu(menuType) {
    const menu = menuData[menuType];
    const message = `Halo! Saya ingin memesan ${menu.name} seharga ${menu.price}. Terima kasih!`;
    
    // membuka whatshap
    const whatsappUrl = `https://wa.me/6289638323195?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// fungsi untuk kontak kita
function callPhone() {
    window.location.href = 'tel:089638323195';
}

function openWhatsApp() {
    const message = 'Halo! Saya ingin bertanya tentang menu dan jam operasional. Terima kasih!';
    const whatsappUrl = `https://wa.me/6289638323195?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// animasi untuk perjalanan
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// animasi untuk timeline
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year');
            const yearElement = document.createElement('div');
            yearElement.className = 'year-counter';
            yearElement.textContent = year;
            entry.target.appendChild(yearElement);
            
            // animasi untuk counter
            setTimeout(() => {
                animateCounter(yearElement, parseInt(year), 1500);
            }, 500);
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.step').forEach(step => {
    timelineObserver.observe(step);
});

// Parallax effect for header image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const headerImg = document.querySelector('.floating-image');
    if (headerImg) {
        const rate = scrolled * -0.5;
        headerImg.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to social media icons
document.querySelectorAll('.fr img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add typing effect to header text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('.animate-text');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        setTimeout(() => {
            typeWriter(headerTitle, originalText, 150);
        }, 1000);
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}


// ========== NAVBAR TOGGLE (REPLACE THIS CODE) ==========
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    this.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && e.target !== navToggle) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
  
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== navToggle) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
} 

// Toggle Sidebar Menu Mobile
// Pastikan ini setelah DOMContentLoaded

document.addEventListener('DOMContentLoaded', function() {
  const navMenu = document.querySelector('#nav-menu ul');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
});

var lokasi = [-6.431239386642382, 106.88241639306283];
  var map = L.map('map').setView(lokasi, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(lokasi).addTo(map)
    .bindPopup('Lokasi Kami: Dapur Bunda Iseh')
    .openPopup();

