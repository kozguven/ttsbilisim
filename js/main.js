// TTS Bilişim - Ana JavaScript Dosyası

// Mobil menü açma/kapama işlevselliği
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll başlık küçültme efekti
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('header-shrink');
            } else {
                header.classList.remove('header-shrink');
            }
        });
    }

    // Swiper Banner Slider İnitializasyonu
    const bannerSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // Testimonial Slider İnitializasyonu
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4000,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Animasyonlu Görünüm Efekti
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // SSS Akordiyon
    const faqButtons = document.querySelectorAll('.faq-btn');
    if (faqButtons.length > 0) {
        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                const faqContent = this.nextElementSibling;
                
                // Diğer açık içerikleri kapat
                document.querySelectorAll('.faq-content.block').forEach(openContent => {
                    if (openContent !== faqContent) {
                        openContent.classList.remove('block');
                        openContent.classList.add('hidden');
                        openContent.previousElementSibling.querySelector('i').classList.remove('fa-minus');
                        openContent.previousElementSibling.querySelector('i').classList.add('fa-plus');
                    }
                });
                
                // Tıklanan içeriği aç/kapat
                faqContent.classList.toggle('hidden');
                faqContent.classList.toggle('block');
                
                const icon = this.querySelector('i');
                if (faqContent.classList.contains('block')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // İletişim Formu Doğrulaması
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Form alanlarını doğrula
            if (!name.value.trim()) {
                showError(name, 'İsim alanı boş bırakılamaz');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'E-posta alanı boş bırakılamaz');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Geçerli bir e-posta adresi giriniz');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Mesaj alanı boş bırakılamaz');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (isValid) {
                // Form başarılı bir şekilde gönderildi
                const successMessage = document.getElementById('form-success');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                    
                    // 5 saniye sonra başarı mesajını gizle
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }
            }
        });
    }
    
    // Yardımcı Fonksiyonlar
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        if (!formControl.querySelector('.error-message')) {
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            formControl.appendChild(errorElement);
        }
        
        input.classList.add('border-red-500');
        errorElement.textContent = message;
    }
    
    function clearError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.classList.remove('border-red-500');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
