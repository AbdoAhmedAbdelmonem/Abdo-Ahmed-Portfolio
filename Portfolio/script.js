        document.addEventListener('DOMContentLoaded', function() {
            // Hide intro after 3 seconds
            setTimeout(function() {
                const intro = document.getElementById('introOverlay');
                intro.style.opacity = '0';

                // Remove intro from DOM after fade out completes
                setTimeout(function() {
                    intro.remove();
                }, 1500);
            }, 3000);

            // Mobile Menu Toggle
            const menuToggle = document.getElementById('menuToggle');
            const mobileNav = document.getElementById('mobileNav');

            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');

                // Toggle body overflow when menu is open
                if (mobileNav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Navigation
            const navItems = document.querySelectorAll('.nav-item');
            const sections = document.querySelectorAll('section');

            function setActiveSection(sectionId) {
                // Remove active class from all nav items and sections
                navItems.forEach(nav => nav.classList.remove('active'));
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                });

                // Add active class to clicked nav item
                document.querySelectorAll(`.nav-item[data-section="${sectionId}"]`).forEach(item => {
                    item.classList.add('active');
                });

                // Show corresponding section with animation
                const activeSection = document.getElementById(sectionId);
                activeSection.classList.add('active');

                // Trigger reflow to restart animation
                void activeSection.offsetWidth;

                activeSection.style.opacity = '1';
                activeSection.style.transform = 'translateY(0)';

                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const sectionId = item.getAttribute('data-section');
                    setActiveSection(sectionId);

                    // Add ripple effect to the clicked nav item
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple-effect');
                    item.appendChild(ripple);

                    // Remove ripple after animation completes
                    setTimeout(() => {
                        ripple.remove();
                    }, 1000);
                });
            });

            // Set home as default active section
            setActiveSection('home');

            // Form submission
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Message sent to the future! (This is a demo)');
                    contactForm.reset();
                });
            }
        });