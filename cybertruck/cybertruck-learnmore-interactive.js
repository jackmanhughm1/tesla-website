document.addEventListener('DOMContentLoaded', function() {
    console.log("Cybertruck Learn More Interactive Controller Initialized.");

    // 1. STACKED / HERO FLEX MODULE CAROUSELS (.tcl-flex-module-carousel)
    const stackedCarousels = document.querySelectorAll('.tcl-flex-module-carousel, .tcl-carousel-banner');

    stackedCarousels.forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll('.tcl-flex-module-carousel__slide, .tcl-carousel-banner__slide'));
        if (slides.length === 0) return;

        const prevBtn = carousel.querySelector('.tcl-carousel__nav--inline-start, [aria-label="Previous Slide"], [data-id="gallery-prev-button"]');
        const nextBtn = carousel.querySelector('.tcl-carousel__nav--inline-end, [aria-label="Next Slide"], [data-id="gallery-next-button"]');
        const dots = Array.from(carousel.querySelectorAll('.tds-tab[role="tab"], .tcl-carousel-banner__tab'));
        const dotList = carousel.querySelector('.tds-tab-list--dots, .tcl-carousel-banner__tabs');

        let currentIndex = slides.findIndex(s => s.classList.contains('tcl-flex-module-carousel__slide--active') || s.classList.contains('tds-tab-panel--active'));
        if (currentIndex === -1) currentIndex = 0;

        function updateStackedCarousel(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.add('tcl-flex-module-carousel__slide--active', 'tds-tab-panel--active');
                    slide.style.opacity = '1';
                    slide.style.visibility = 'visible';
                    slide.style.zIndex = '2';
                    slide.style.display = 'block';
                } else {
                    slide.classList.remove('tcl-flex-module-carousel__slide--active', 'tds-tab-panel--active');
                    slide.style.opacity = '0';
                    slide.style.visibility = 'hidden';
                    slide.style.zIndex = '1';
                    slide.style.display = 'none';
                }
            });

            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.setAttribute('aria-selected', 'true');
                    dot.setAttribute('tabindex', '0');
                    dot.classList.add('tds-tab--active', 'is-active');
                } else {
                    dot.setAttribute('aria-selected', 'false');
                    dot.setAttribute('tabindex', '-1');
                    dot.classList.remove('tds-tab--active', 'is-active');
                }
            });

            if (dotList && dots[currentIndex]) {
                const activeDot = dots[currentIndex];
                const leftPos = activeDot.offsetLeft || (currentIndex * 24);
                dotList.style.setProperty('--tds-animate-backdrop-left', leftPos + 'px');
            }
        }

        if (prevBtn) {
            prevBtn.style.cursor = 'pointer';
            prevBtn.style.pointerEvents = 'auto';
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateStackedCarousel(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                updateStackedCarousel(currentIndex + 1);
            });
        }

        dots.forEach((dot, i) => {
            dot.style.cursor = 'pointer';
            dot.style.pointerEvents = 'auto';
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                updateStackedCarousel(i);
            });
        });

        // Initialize carousel state
        updateStackedCarousel(currentIndex);
    });

    // 2. FREEFLOW CAROUSELS (.tcl-freeflow-carousel__container)
    const freeflowCarousels = document.querySelectorAll('.tcl-freeflow-carousel__container, .tcl-freeflow-carousel');

    freeflowCarousels.forEach((container) => {
        const slidesTrack = container.querySelector('.tcl-freeflow-carousel-container__slides, .tcl-freeflow-carousel');
        const slides = Array.from(container.querySelectorAll('.tcl-freeflow-carousel-container__slide-container, .tcl-freeflow-carousel-slide'));
        const prevBtn = container.querySelector('.tcl-carousel__nav--inline-start, [aria-label="Previous Slide"], [data-control="previous"]');
        const nextBtn = container.querySelector('.tcl-carousel__nav--inline-end, [aria-label="Next Slide"], [data-control="next"]');
        const indicators = Array.from(container.querySelectorAll('.tds-carousel-indicator, .tds-tab'));

        if (slides.length === 0) return;

        let currentIndex = 0;

        function updateFreeflowCarousel(index) {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.add('tcl-freeflow-carousel-container__slide-container--active');
                    slide.setAttribute('aria-selected', 'true');
                    slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    slide.classList.remove('tcl-freeflow-carousel-container__slide-container--active');
                    slide.setAttribute('aria-selected', 'false');
                }
            });

            indicators.forEach((ind, i) => {
                if (i === currentIndex) {
                    ind.setAttribute('data-active', 'true');
                    ind.setAttribute('aria-selected', 'true');
                    ind.classList.add('is-active', 'tds-tab--active');
                } else {
                    ind.setAttribute('data-active', 'false');
                    ind.setAttribute('aria-selected', 'false');
                    ind.classList.remove('is-active', 'tds-tab--active');
                }
            });
        }

        if (prevBtn) {
            prevBtn.style.cursor = 'pointer';
            prevBtn.style.pointerEvents = 'auto';
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (slidesTrack) {
                    slidesTrack.scrollBy({ left: -400, behavior: 'smooth' });
                }
                updateFreeflowCarousel(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (slidesTrack) {
                    slidesTrack.scrollBy({ left: 400, behavior: 'smooth' });
                }
                updateFreeflowCarousel(currentIndex + 1);
            });
        }

        indicators.forEach((ind, i) => {
            ind.style.cursor = 'pointer';
            ind.style.pointerEvents = 'auto';
            ind.addEventListener('click', (e) => {
                e.preventDefault();
                updateFreeflowCarousel(i);
            });
        });

        // Universal Pointer & Touch Drag Scroll Support for Freeflow Carousel
        if (slidesTrack) {
            let isPointerDown = false;
            let startX = 0;
            let initialScrollLeft = 0;

            slidesTrack.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.tcl-video__controls')) return;
                isPointerDown = true;
                startX = e.pageX;
                initialScrollLeft = slidesTrack.scrollLeft;
                slidesTrack.setPointerCapture(e.pointerId);
                slidesTrack.style.scrollBehavior = 'auto';
                slidesTrack.style.cursor = 'grabbing';
            });

            slidesTrack.addEventListener('pointermove', (e) => {
                if (!isPointerDown) return;
                e.preventDefault();
                const deltaX = e.pageX - startX;
                slidesTrack.scrollLeft = initialScrollLeft - deltaX;
            });

            const stopDrag = (e) => {
                if (!isPointerDown) return;
                isPointerDown = false;
                try {
                    slidesTrack.releasePointerCapture(e.pointerId);
                } catch (err) {}
                slidesTrack.style.cursor = '';
                slidesTrack.style.scrollBehavior = '';
            };

            slidesTrack.addEventListener('pointerup', stopDrag);
            slidesTrack.addEventListener('pointercancel', stopDrag);
        }
    });

    // 3. Play / Pause Video Controls Toggle
    const playSvg = `<svg class="tds-icon tds-icon-play-filled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19.057 13.62 6.815 20.747c-1.248.72-2.808-.18-2.808-1.62V4.874c0-1.44 1.56-2.34 2.808-1.62l12.242 7.125c1.247.72 1.247 2.521 0 3.242z"></path></svg>`;
    const pauseSvg = `<svg class="tds-icon tds-icon-pause-filled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;

    const videoContainers = document.querySelectorAll('.tcl-react-video, .tds-video-player, .tcl-freeflow-carousel__slide-media');
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const controlBtn = container.querySelector('.tcl-video__controls');
        if (!video || !controlBtn) return;

        controlBtn.style.cursor = 'pointer';
        controlBtn.style.pointerEvents = 'auto';

        controlBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (video.paused) {
                video.play();
                controlBtn.innerHTML = pauseSvg;
                controlBtn.setAttribute('aria-label', 'Pause video');
            } else {
                video.pause();
                controlBtn.innerHTML = playSvg;
                controlBtn.setAttribute('aria-label', 'Play video');
            }
        });

        video.addEventListener('play', () => {
            controlBtn.innerHTML = pauseSvg;
            controlBtn.setAttribute('aria-label', 'Pause video');
        });

        video.addEventListener('pause', () => {
            controlBtn.innerHTML = playSvg;
            controlBtn.setAttribute('aria-label', 'Play video');
        });
    });

    // 4. Ensure Robust HTML5 Video Autoplay, Looping & Viewport Playback
    function setupVideoAutoplay(video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.loop = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');

        function attemptPlay() {
            if (video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay blocked prior to user interaction; will resume on first touch
                    });
                }
            }
        }

        attemptPlay();
        video.addEventListener('loadeddata', attemptPlay);
        video.addEventListener('canplay', attemptPlay);
        video.addEventListener('canplaythrough', attemptPlay);
        video.addEventListener('pause', () => {
            // Keep controls button in sync
            const parentMedia = video.closest('.tcl-react-video, .tds-video-player, .tcl-freeflow-carousel__slide-media');
            const controlBtn = parentMedia ? parentMedia.querySelector('.tcl-video__controls') : null;
            if (controlBtn && video.paused) {
                controlBtn.innerHTML = playSvg;
                controlBtn.setAttribute('aria-label', 'Play video');
            }
        });
        video.addEventListener('play', () => {
            const parentMedia = video.closest('.tcl-react-video, .tds-video-player, .tcl-freeflow-carousel__slide-media');
            const controlBtn = parentMedia ? parentMedia.querySelector('.tcl-video__controls') : null;
            if (controlBtn) {
                controlBtn.innerHTML = pauseSvg;
                controlBtn.setAttribute('aria-label', 'Pause video');
            }
        });
    }

    const allVideos = Array.from(document.querySelectorAll('video'));
    allVideos.forEach(setupVideoAutoplay);

    // Viewport IntersectionObserver to trigger autoplay as videos become visible
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.paused) {
                        video.play().catch(() => {});
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '100px' });

        allVideos.forEach(v => videoObserver.observe(v));
    }

    // Freeflow Carousel Track Scroll Listener for Horizontal Autoplay Trigger
    freeflowCarousels.forEach((container) => {
        const slidesTrack = container.querySelector('.tcl-freeflow-carousel-container__slides, .tcl-freeflow-carousel');
        if (!slidesTrack) return;

        let scrollTicking = false;
        slidesTrack.addEventListener('scroll', () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    const trackRect = slidesTrack.getBoundingClientRect();
                    const slideVideos = slidesTrack.querySelectorAll('video');
                    slideVideos.forEach(v => {
                        const vRect = v.getBoundingClientRect();
                        // If video is inside the visible horizontal bounds of the track
                        if (vRect.right > trackRect.left && vRect.left < trackRect.right) {
                            if (v.paused) {
                                v.play().catch(() => {});
                            }
                        }
                    });
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    });

    // Global Gesture Handler to Unblock Mobile Browser Autoplay on First Interaction
    const unlockAutoplay = () => {
        allVideos.forEach(v => {
            if (v.paused) {
                v.play().catch(() => {});
            }
        });
        ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, unlockAutoplay, { capture: true, passive: true });
        });
    };

    ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAutoplay, { capture: true, passive: true, once: true });
    });

    // 5. Cybertruck Mobile Sticky Bottom Bar Controller
    let bottomBar = document.getElementById('cybertruck-mobile-bottom-bar');
    if (!bottomBar) {
        bottomBar = document.createElement('div');
        bottomBar.className = 'cybertruck-mobile-bottom-bar';
        bottomBar.id = 'cybertruck-mobile-bottom-bar';
        bottomBar.innerHTML = `
            <a href="./design/index.html" class="cybertruck-mobile-bottom-order-btn">Order Now</a>
            <button type="button" class="cybertruck-mobile-bottom-up-btn" aria-label="Scroll to top">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 8.295l-6.364 6.364 1.414 1.414L12 11.123l4.95 4.95 1.414-1.414z"/>
                </svg>
            </button>
        `;
        document.body.appendChild(bottomBar);

        const upBtn = bottomBar.querySelector('.cybertruck-mobile-bottom-up-btn');
        if (upBtn) {
            upBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    function handleScroll() {
        if (window.innerWidth <= 768) {
            var endHero = document.getElementById('tesla_flex_module_808');
            if (endHero) {
                var rect = endHero.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
                    bottomBar.classList.remove('is-visible');
                    return;
                }
            }
            if (window.scrollY > 200) {
                bottomBar.classList.add('is-visible');
            } else {
                bottomBar.classList.remove('is-visible');
            }
        } else {
            bottomBar.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    console.log("Cybertruck Learn More Interactive Carousels & Video Autoplay Ready.");
});

