document.addEventListener('DOMContentLoaded', function() {
    console.log("Model 3 Learn More Interactive Controller Initialized.");

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

            // Sync all tab lists in the carousel (for tab switch carousels or dot carousels)
            const allTabLists = carousel.querySelectorAll('.tds-tab-list, .tcl-carousel-banner__tabs');
            allTabLists.forEach((list) => {
                const listTabs = list.querySelectorAll('.tds-tab, .tcl-carousel-banner__tab');
                listTabs.forEach((tab, tIdx) => {
                    if (tIdx === currentIndex) {
                        tab.setAttribute('aria-selected', 'true');
                        tab.setAttribute('tabindex', '0');
                        tab.classList.add('tds-tab--active', 'is-active', 'tds-tab--selected');
                    } else {
                        tab.setAttribute('aria-selected', 'false');
                        tab.setAttribute('tabindex', '-1');
                        tab.classList.remove('tds-tab--active', 'is-active', 'tds-tab--selected');
                    }
                });
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

        // Attach click listener to each tab across all tab lists
        const allTabLists = carousel.querySelectorAll('.tds-tab-list, .tcl-carousel-banner__tabs');
        allTabLists.forEach((list) => {
            const listTabs = list.querySelectorAll('.tds-tab, .tcl-carousel-banner__tab');
            listTabs.forEach((tab, tIdx) => {
                tab.style.cursor = 'pointer';
                tab.style.pointerEvents = 'auto';
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateStackedCarousel(tIdx);
                });
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
    });

    // 3. MOBILE NAVIGATION DRAWER (.mobile-nav-drawer)
    function initMobileNavDrawer() {
        if (!document.getElementById('mobile-nav-drawer')) {
            const drawer = document.createElement('div');
            drawer.id = 'mobile-nav-drawer';
            drawer.className = 'mobile-nav-drawer';

            const closeSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            const backSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
            const chevSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c5e62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

            const isInsideModel3 = window.location.pathname.indexOf('/model3/') !== -1;
            const imgPrefix = isInsideModel3 ? 'Model 3 learn more_files/' : 'model3/Model 3 learn more_files/';
            const relPrefix = isInsideModel3 ? '../' : './';
            const selfLearn = isInsideModel3 ? './index.html' : './model3/index.html';
            const selfOrder = isInsideModel3 ? './design/index.html' : './model3/design/index.html';

            drawer.innerHTML = 
              '<div id="mobile-nav-main-view" class="mobile-nav-view">' +
                '<div class="mobile-nav-header"><button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<ul class="mobile-nav-list">' +
                  '<li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-vehicles-trigger" class="mobile-nav-link"><span>Vehicles</span>' + chevSvg + '</a></li>' +
                  '<li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-energy-trigger" class="mobile-nav-link"><span>Energy</span>' + chevSvg + '</a></li>' +
                  '<li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-charging-trigger" class="mobile-nav-link"><span>Charging</span>' + chevSvg + '</a></li>' +
                  '<li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-discover-trigger" class="mobile-nav-link"><span>Discover</span>' + chevSvg + '</a></li>' +
                  '<li class="mobile-nav-item"><a href="https://shop.tesla.com/" class="mobile-nav-link"><span>Shop</span></a></li>' +
                  '<li class="mobile-nav-item"><a href="https://www.tesla.com/support" class="mobile-nav-link"><span>Support</span></a></li>' +
                  '<li class="mobile-nav-item mobile-nav-item--with-icon"><a href="javascript:void(0);" class="mobile-nav-link"><div class="mobile-nav-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><div class="mobile-nav-text-group"><span class="mobile-nav-title">United States</span><span class="mobile-nav-subtitle">English</span></div></div>' + chevSvg + '</a></li>' +
                  '<li class="mobile-nav-item mobile-nav-item--with-icon"><a href="https://www.tesla.com/teslaaccount" class="mobile-nav-link"><div class="mobile-nav-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="mobile-nav-title">Account</span></div></a></li>' +
                '</ul>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-vehicles" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-vehicles-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Vehicles</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-nav-vehicles-list">' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-3-Performance-LHD_oD_F.avif" alt="Model 3" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model 3</h3><div class="mobile-vehicle-links"><a href="' + selfLearn + '" class="mobile-nav-direct-link">Learn</a><a href="' + selfOrder + '" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-Y-2-v3_oD_F.avif" alt="Model Y" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model Y</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'modely/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'modely/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Cybertruck-1x_oD_F.avif" alt="Cybertruck" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Cybertruck</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'cybertruck/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'cybertruck/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-FSD_oD_F.avif" alt="Full Self-Driving (Supervised)" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Full Self-Driving<br>(Supervised)</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'fsd/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'drive/index.html" class="mobile-nav-direct-link">Experience</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Inventory-v3_oD_F.avif" alt="Inventory" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Inventory</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/new" class="mobile-nav-direct-link">New</a><a href="https://www.tesla.com/used" class="mobile-nav-direct-link">Certified Pre-Owned</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-S-New-NA-TW-KR_oD_F.avif" alt="Model S" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model S</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/models" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-X-New_oD_F.avif" alt="Model X" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model X</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/modelx" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-subpanel-divider"></div><div class="mobile-vehicle-offers-wrap"><a href="https://www.tesla.com/current-offers" class="mobile-vehicle-offers-title mobile-nav-direct-link">Current Offers</a></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-energy" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-energy-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Energy</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-nav-vehicles-list">' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Solar-Panels_oD_F.avif" alt="Solar Panels" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Solar Panels</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'solarpanels/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'solarpanels/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Powerwall-US_oD_F.avif" alt="Powerwall" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Powerwall</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'powerwall/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'powerwall/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Megapack_oD_F.avif" alt="Megapack" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Megapack</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/megapack" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-charging" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-charging-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Charging</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-nav-vehicles-list">' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging_oD_F.avif" alt="Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/charging" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Home-Charging_oD_F.avif" alt="Home Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Home Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/home-charging" class="mobile-nav-direct-link">Learn</a><a href="https://shop.tesla.com/category/charging#charging.at-home" class="mobile-nav-direct-link">Shop</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharging-NA_oD_F.avif" alt="Supercharging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/findus" class="mobile-nav-direct-link">Find</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging-for-Business_oD_F.avif" alt="Wall Connector for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Wall Connector for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/commercial-wall-connector" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/commercial-wall-connector/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharger-For-Business_oD_F.avif" alt="Supercharger for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharger for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/supercharger-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Semi-Charging-For-Business_oD_F.avif" alt="Semi Charging for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Semi Charging for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/semi-charging-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/semi-charging-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-discover" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-discover-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Discover</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-discover-list">' +
                  '<a href="' + relPrefix + 'drive/index.html" class="mobile-discover-item mobile-nav-direct-link">Demo Drive</a>' +
                  '<a href="https://www.tesla.com/insurance" class="mobile-discover-item mobile-nav-direct-link">Insurance</a>' +
                  '<a href="https://www.tesla.com/current-offers" class="mobile-discover-item mobile-nav-direct-link">Current Offers</a>' +
                  '<a href="https://www.tesla.com/learn" class="mobile-discover-item mobile-nav-direct-link">Learn</a>' +
                  '<a href="https://www.tesla.com/support/videos" class="mobile-discover-item mobile-nav-direct-link">Video Guides</a>' +
                  '<a href="https://www.tesla.com/customer-stories" class="mobile-discover-item mobile-nav-direct-link">Customer Stories</a>' +
                  '<a href="https://www.tesla.com/events" class="mobile-discover-item mobile-nav-direct-link">Events</a>' +
                  '<a href="https://www.tesla.com/safety" class="mobile-discover-item mobile-nav-direct-link">Safety</a>' +
                  '<a href="https://www.tesla.com/findus" class="mobile-discover-item mobile-nav-direct-link">Find Us</a>' +
                  '<a href="https://www.tesla.com/support/collision-support" class="mobile-discover-item mobile-nav-direct-link">Find a Collision Center</a>' +
                  '<a href="https://www.tesla.com/support/certified-installers" class="mobile-discover-item mobile-nav-direct-link">Find a Certified Installer</a>' +
                  '<a href="https://www.tesla.com/about" class="mobile-discover-item mobile-nav-direct-link">About</a>' +
                  '<a href="https://www.tesla.com/careers" class="mobile-discover-item mobile-nav-direct-link">Careers</a>' +
                  '<a href="https://ir.tesla.com" class="mobile-discover-item mobile-nav-direct-link">Investor Relations</a>' +
                '</div>' +
              '</div>';

            document.body.appendChild(drawer);

            const mainView = document.getElementById('mobile-nav-main-view');
            const vehiclesSubpanel = document.getElementById('mobile-nav-subpanel-vehicles');
            const energySubpanel = document.getElementById('mobile-nav-subpanel-energy');
            const chargingSubpanel = document.getElementById('mobile-nav-subpanel-charging');
            const discoverSubpanel = document.getElementById('mobile-nav-subpanel-discover');
            const vehiclesTrigger = document.getElementById('mobile-nav-vehicles-trigger');
            const energyTrigger = document.getElementById('mobile-nav-energy-trigger');
            const chargingTrigger = document.getElementById('mobile-nav-charging-trigger');
            const discoverTrigger = document.getElementById('mobile-nav-discover-trigger');
            const vehiclesBackBtn = document.getElementById('mobile-nav-vehicles-back-btn');
            const energyBackBtn = document.getElementById('mobile-nav-energy-back-btn');
            const chargingBackBtn = document.getElementById('mobile-nav-charging-back-btn');
            const discoverBackBtn = document.getElementById('mobile-nav-discover-back-btn');

            const resetNavViews = function() {
                if (mainView) mainView.style.display = 'flex';
                if (vehiclesSubpanel) vehiclesSubpanel.style.display = 'none';
                if (energySubpanel) energySubpanel.style.display = 'none';
                if (chargingSubpanel) chargingSubpanel.style.display = 'none';
                if (discoverSubpanel) discoverSubpanel.style.display = 'none';
            };

            if (vehiclesTrigger) {
                vehiclesTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mainView && vehiclesSubpanel) {
                        mainView.style.display = 'none';
                        if (energySubpanel) energySubpanel.style.display = 'none';
                        if (chargingSubpanel) chargingSubpanel.style.display = 'none';
                        if (discoverSubpanel) discoverSubpanel.style.display = 'none';
                        vehiclesSubpanel.style.display = 'flex';
                    }
                });
            }

            if (energyTrigger) {
                energyTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mainView && energySubpanel) {
                        mainView.style.display = 'none';
                        if (vehiclesSubpanel) vehiclesSubpanel.style.display = 'none';
                        if (chargingSubpanel) chargingSubpanel.style.display = 'none';
                        if (discoverSubpanel) discoverSubpanel.style.display = 'none';
                        energySubpanel.style.display = 'flex';
                    }
                });
            }

            if (chargingTrigger) {
                chargingTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mainView && chargingSubpanel) {
                        mainView.style.display = 'none';
                        if (vehiclesSubpanel) vehiclesSubpanel.style.display = 'none';
                        if (energySubpanel) energySubpanel.style.display = 'none';
                        if (discoverSubpanel) discoverSubpanel.style.display = 'none';
                        chargingSubpanel.style.display = 'flex';
                    }
                });
            }

            if (discoverTrigger) {
                discoverTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mainView && discoverSubpanel) {
                        mainView.style.display = 'none';
                        if (vehiclesSubpanel) vehiclesSubpanel.style.display = 'none';
                        if (energySubpanel) energySubpanel.style.display = 'none';
                        if (chargingSubpanel) chargingSubpanel.style.display = 'none';
                        discoverSubpanel.style.display = 'flex';
                    }
                });
            }

            if (vehiclesBackBtn) {
                vehiclesBackBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    resetNavViews();
                });
            }

            if (energyBackBtn) {
                energyBackBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    resetNavViews();
                });
            }

            if (chargingBackBtn) {
                chargingBackBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    resetNavViews();
                });
            }

            if (discoverBackBtn) {
                discoverBackBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    resetNavViews();
                });
            }

            drawer.querySelectorAll('.mobile-nav-close-trigger').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    drawer.classList.remove('open');
                    document.body.classList.remove('mobile-nav-open');
                    setTimeout(resetNavViews, 300);
                });
            });

            drawer.querySelectorAll('.mobile-nav-direct-link').forEach(function(link) {
                link.addEventListener('click', function() {
                    drawer.classList.remove('open');
                    document.body.classList.remove('mobile-nav-open');
                    setTimeout(resetNavViews, 300);
                });
            });

            window.resetNavViews = resetNavViews;
        }
    }

    // Pre-initialize drawer on load
    initMobileNavDrawer();

    // Attach global click listener for menu button
    document.addEventListener('click', function(e) {
        const menuBtn = e.target.closest('.mobile-menu-btn, #mobile-menu-btn, .mobile-menu-btn-left, #mobile-menu-btn-left, #dx-nav-item--menu');
        if (menuBtn) {
            e.preventDefault();
            e.stopPropagation();
            initMobileNavDrawer();
            if (typeof window.resetNavViews === 'function') {
                window.resetNavViews();
            }
            const navDrawer = document.getElementById('mobile-nav-drawer');
            if (navDrawer) {
                navDrawer.classList.add('open');
                document.body.classList.add('mobile-nav-open');
            }
        }
    });

    console.log("Model 3 Learn More Interactive Carousels & Mobile Navigation Ready.");
});
