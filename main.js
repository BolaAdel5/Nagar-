/**
 * Professional Logic for Itqan Riyadh Carpentry Workshop
 */

const siteData = {
    services: [
        {
            id: 1,
            title: "تفصيل الأثاث المودرن",
            description: "ننفذ غرف النوم، غرف المعيشة، وطاولات الطعام بأحدث التصاميم العالمية التي تناسب الفلل والشقق العصرية بالرياض.",
            icon: "armchair"
        },
        {
            id: 2,
            title: "الأبواب والواجهات",
            description: "أبواب سنديان وجوز طبيعي بتصاميم كلاسيكية ومودرن، مع عزل صوتي كامل ودهانات عالية المقاومة.",
            icon: "door-open"
        },
        {
            id: 3,
            title: "الديكورات الخشبية",
            description: "تركيب بديل الخشب، الرفوف الجدارية، البارتشن، وتكسيات الجدران التي تمنح منزلك لمسة دافئة وفخمة.",
            icon: "layers"
        }
    ],
    gallery: [
        {
            src: "https://r2-bucket.flowith.net/f/cedf8cc9ebeabcb5/luxury_modern_bedroom_suite_index_0%401024x1024.jpeg",
            category: "غرف نوم",
            title: "جناح نوم ماستر فاخر"
        },
        {
            src: "https://r2-bucket.flowith.net/f/acac52d2ffab6f23/grand_saudi_entrance_door_index_1%401024x1024.jpeg",
            category: "أبواب",
            title: "مدخل مجلس رسمي"
        },
        {
            src: "https://r2-bucket.flowith.net/f/bbf90f430e534201/modern_living_room_design_index_3%401024x1024.jpeg",
            category: "ديكور جداري",
            title: "تنسيق مجلس عصري"
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    renderServices();
    renderGallery();
    initGSAPAnimations();
    setupMobileMenu();
    setupForm();
    handleNavbarScroll();
    initSmoothScroll();
});

function initIcons() {
    lucide.createIcons();
}

function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = siteData.services.map(service => `
        <div class="service-card p-12 bg-white rounded-[2rem] shadow-premium border border-gray-100 text-right group relative overflow-hidden opacity-0 translate-y-12">
            <div class="service-icon mb-6 text-gold transition-transform duration-500 relative z-10 group-hover:scale-110">
                <i data-lucide="${service.icon}" class="w-14 h-14"></i>
            </div>
            <h3 class="text-2xl font-black mb-4 text-walnut group-hover:text-gold transition-colors relative z-10">${service.title}</h3>
            <p class="text-gray-500 leading-relaxed relative z-10 group-hover:text-walnut/80 transition-colors">${service.description}</p>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/5 rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none"></div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = siteData.gallery.map(item => `
        <div class="gallery-item group relative h-[450px] overflow-hidden rounded-[2rem] shadow-premium opacity-0 translate-y-12">
            <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
            <div class="gallery-overlay absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/20 to-transparent flex flex-col justify-end p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span class="text-gold font-bold text-sm mb-2 tracking-widest">${item.category}</span>
                <h3 class="text-white text-2xl font-black">${item.title}</h3>
                <a href="#contact" class="text-white/70 text-sm mt-4 hover:text-gold transition-colors underline underline-offset-4">اطلب تصميم مشابه</a>
            </div>
        </div>
    `).join('');
}

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const heroTl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
    heroTl.to(".hero-el", { opacity: 1, y: 0, stagger: 0.2, delay: 0.5 });

    const stats = document.querySelectorAll('.counter');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        gsap.to(stat, {
            innerText: target,
            duration: 2.5,
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
            },
            snap: { innerText: 1 },
            stagger: 0.1
        });
    });

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: { trigger: title, start: "top 85%" },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out"
        });
    });

    gsap.to(".service-card", {
        scrollTrigger: {
            trigger: "#services-grid",
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.to(".about-visual", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        opacity: 1,
        x: 0,
        duration: 1.5
    });
    gsap.to(".about-text", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        opacity: 1,
        x: 0,
        duration: 1.5,
        delay: 0.2
    });

    gsap.to(".gallery-item", {
        scrollTrigger: {
            trigger: "#gallery-grid",
            start: "top 75%"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)"
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: targetId,
                    offsetY: 80
                },
                ease: "power4.inOut"
            });
        });
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        gsap.from("#mobile-menu a", {
            x: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4
        });
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.add('hidden'));
    });
}

function handleNavbarScroll() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('py-2', 'shadow-2xl', 'bg-walnut/98');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('py-2', 'shadow-2xl', 'bg-walnut/98');
            nav.classList.add('py-4');
        }
    });
}

function setupForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const phoneInput = form.querySelector('input[name="phone"]');
        const saudiPhoneRegex = new RegExp("^05[0-9]{8}$");
        
        if (!saudiPhoneRegex.test(phoneInput.value)) {
            gsap.to(phoneInput, { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
            alert('يرجى التأكد من كتابة رقم الجوال السعودي بشكل صحيح (05xxxxxxxx)');
            return;
        }

        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i><span>جاري إرسال طلبك...</span>`;
        lucide.createIcons();
        
        setTimeout(() => {
            alert('تم استلام طلبك بنجاح! سيتواصل معك أحد خبراء إتقان الرياض خلال دقائق لمناقشة التفاصيل.');
            form.reset();
            btn.disabled = false;
            btn.innerHTML = originalText;
            lucide.createIcons();
        }, 2000);
    });
}
