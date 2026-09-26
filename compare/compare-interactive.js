document.addEventListener('DOMContentLoaded', function() {
    console.log("Compare Models Interactive Controller Initialized.");

    // Detect path depth prefix
    var pathParts = window.location.pathname.split('/').filter(Boolean);
    var isFile = window.location.pathname.endsWith('.html') || window.location.pathname.endsWith('.htm');
    var depth = isFile ? Math.max(0, pathParts.length - 1) : pathParts.length;

    var prefix = './';
    if (depth === 1) prefix = '../';
    else if (depth >= 2) prefix = '../../';

    var assetPrefix = 'Compare Models _files/';

    // Ensure mobile menu button is always present
    function ensureMobileMenuButton() {
        var existingBtn = document.getElementById('mobile-menu-btn');
        if (!existingBtn) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'mobile-menu-btn';
            btn.className = 'mobile-menu-btn';
            btn.textContent = 'Menu';
            document.documentElement.appendChild(btn);
        } else if (existingBtn.parentElement !== document.documentElement) {
            document.documentElement.appendChild(existingBtn);
        }
    }
    ensureMobileMenuButton();
    setInterval(ensureMobileMenuButton, 1000);

    // Vehicle Specifications Database
    const vehicleSpecs = {
        'model3': {
            name: 'Model 3',
            price: '$38,990',
            range: '341 mi',
            acceleration: '2.9 s (0-60 mph)',
            topSpeed: '163 mph',
            seating: '5 Seats',
            cargo: '21 cu ft',
            drive: 'Rear-Wheel Drive / All-Wheel Drive',
            weight: '3,862 lbs',
            img: assetPrefix + 'Mega-Menu-Vehicles-Model-3-Performance-LHD.png',
            orderUrl: prefix + 'model3/design/index.html',
            learnUrl: prefix + 'model3/index.html'
        },
        'modely': {
            name: 'Model Y',
            price: '$44,990',
            range: '320 mi',
            acceleration: '3.5 s (0-60 mph)',
            topSpeed: '155 mph',
            seating: '7 Seats',
            cargo: '76 cu ft',
            drive: 'Rear-Wheel Drive / All-Wheel Drive',
            weight: '4,156 lbs',
            img: assetPrefix + 'Mega-Menu-Vehicles-Model-Y-2-v3.jpg',
            orderUrl: prefix + 'modely/design/index.html',
            learnUrl: prefix + 'modely/index.html'
        },
        'cybertruck': {
            name: 'Cybertruck',
            price: '$79,990',
            range: '318 mi',
            acceleration: '2.6 s (0-60 mph)',
            topSpeed: '130 mph',
            seating: '5 Seats',
            cargo: '121 cu ft',
            towing: '11,000 lbs',
            drive: 'All-Wheel Drive',
            weight: '6,603 lbs',
            img: assetPrefix + 'Mega-Menu-Vehicles-Cybertruck-1x.png',
            orderUrl: prefix + 'cybertruck/design/index.html',
            learnUrl: prefix + 'cybertruck/index.html'
        },
        'models': {
            name: 'Model S',
            price: '$74,990',
            range: '402 mi',
            acceleration: '1.99 s (0-60 mph)',
            topSpeed: '200 mph',
            seating: '5 Seats',
            cargo: '28 cu ft',
            drive: 'All-Wheel Drive',
            weight: '4,561 lbs',
            img: assetPrefix + 'Mega-Menu-Vehicles-Model-S-New-NA-TW-KR.png',
            orderUrl: prefix + 'model3/design/index.html',
            learnUrl: prefix + 'modely/index.html'
        },
        'modelx': {
            name: 'Model X',
            price: '$79,990',
            range: '335 mi',
            acceleration: '2.5 s (0-60 mph)',
            topSpeed: '163 mph',
            seating: '7 Seats',
            cargo: '88 cu ft',
            towing: '5,000 lbs',
            drive: 'All-Wheel Drive',
            weight: '5,148 lbs',
            img: assetPrefix + 'Mega-Menu-Vehicles-Model-X-New.png',
            orderUrl: prefix + 'modely/design/index.html',
            learnUrl: prefix + 'modely/index.html'
        }
    };

    // Dropdown / Selectors Logic
    const selectElements = document.querySelectorAll('select[data-id^="vehicle-select"], select.tds-select');
    selectElements.forEach(select => {
        select.style.cursor = 'pointer';
        select.addEventListener('change', function() {
            const selectedVal = select.value.toLowerCase();
            const specData = vehicleSpecs[selectedVal];
            if (specData) {
                const parentCol = select.closest('.compare-column, .tcl-compare-column') || select.parentElement;
                if (parentCol) {
                    const priceEl = parentCol.querySelector('[data-id="price"], .compare-price');
                    const rangeEl = parentCol.querySelector('[data-id="range"], .compare-range');
                    const accelEl = parentCol.querySelector('[data-id="acceleration"], .compare-accel');
                    const imgEl = parentCol.querySelector('img');
                    const orderBtn = parentCol.querySelector('a.tds-btn--primary, a[href*="design"]');
                    const learnBtn = parentCol.querySelector('a.tds-btn--secondary');

                    if (priceEl) priceEl.textContent = specData.price;
                    if (rangeEl) rangeEl.textContent = specData.range;
                    if (accelEl) accelEl.textContent = specData.acceleration;
                    if (imgEl && specData.img) imgEl.src = specData.img;
                    if (orderBtn && specData.orderUrl) orderBtn.href = specData.orderUrl;
                    if (learnBtn && specData.learnUrl) learnBtn.href = specData.learnUrl;
                }
            }
        });
    });

    // Ensure all Order CTAs point to local Design Studios
    const orderBtns = document.querySelectorAll('a.tds-btn');
    orderBtns.forEach(btn => {
        const txt = (btn.textContent || '').trim().toLowerCase();
        if (txt.includes('order')) {
            const href = btn.getAttribute('href') || '';
            if (href.includes('m3') || href.includes('model3')) {
                btn.href = prefix + 'model3/design/index.html';
            } else if (href.includes('my') || href.includes('modely')) {
                btn.href = prefix + 'modely/design/index.html';
            } else if (href.includes('ct') || href.includes('cybertruck')) {
                btn.href = prefix + 'cybertruck/design/index.html';
            }
        }
    });

    // MOBILE NAVIGATION DRAWER (.mobile-nav-drawer)
    function initMobileNavDrawer() {
        if (!document.getElementById('mobile-nav-drawer')) {
            const drawer = document.createElement('div');
            drawer.id = 'mobile-nav-drawer';
            drawer.className = 'mobile-nav-drawer';

            const closeSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            const backSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
            const chevSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c5e62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

            var imgPrefix = prefix + 'Compare Models _files/';

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
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-3-Performance-LHD.png" alt="Model 3" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model 3</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'model3/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'model3/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-Y-2-v3.jpg" alt="Model Y" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model Y</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'modely/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'modely/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Cybertruck-1x.png" alt="Cybertruck" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Cybertruck</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'cybertruck/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'cybertruck/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-FSD.jpg" alt="Full Self-Driving (Supervised)" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Full Self-Driving<br>(Supervised)</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'fsd/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'drive/index.html" class="mobile-nav-direct-link">Experience</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Inventory-v3.png" alt="Inventory" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Inventory</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'inventory/index.html" class="mobile-nav-direct-link">New</a><a href="' + prefix + 'inventory/index.html" class="mobile-nav-direct-link">Certified Pre-Owned</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-S-New-NA-TW-KR.png" alt="Model S" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model S</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/models" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-X-New.png" alt="Model X" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model X</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/modelx" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-subpanel-divider"></div><div class="mobile-vehicle-offers-wrap"><a href="https://www.tesla.com/current-offers" class="mobile-vehicle-offers-title mobile-nav-direct-link">Current Offers</a></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-energy" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-energy-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Energy</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-nav-vehicles-list">' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Solar-Panels.png" alt="Solar Panels" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Solar Panels</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'solarpanels/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'solarpanels/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Powerwall-US.png" alt="Powerwall" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Powerwall</h3><div class="mobile-vehicle-links"><a href="' + prefix + 'powerwall/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + prefix + 'powerwall/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Megapack.png" alt="Megapack" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Megapack</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/megapack" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-charging" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-charging-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Charging</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-nav-vehicles-list">' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging.png" alt="Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/charging" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Home-Charging.png" alt="Home Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Home Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/home-charging" class="mobile-nav-direct-link">Learn</a><a href="https://shop.tesla.com/category/charging#charging.at-home" class="mobile-nav-direct-link">Shop</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharging-NA.png" alt="Supercharging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/findus" class="mobile-nav-direct-link">Find</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging-for-Business.png" alt="Wall Connector for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Wall Connector for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/commercial-wall-connector" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/commercial-wall-connector/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharger-For-Business.png" alt="Supercharger for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharger for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/supercharger-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                  '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Semi-Charging-For-Business.jpg" alt="Semi Charging for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Semi Charging for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/semi-charging-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/semi-charging-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
                '</div>' +
              '</div>' +
              '<div id="mobile-nav-subpanel-discover" class="mobile-nav-view" style="display: none;">' +
                '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-discover-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Discover</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
                '<div class="mobile-discover-list">' +
                  '<a href="' + prefix + 'drive/index.html" class="mobile-discover-item mobile-nav-direct-link">Demo Drive</a>' +
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

    // Attach global click listener for menu and close buttons
    document.addEventListener('click', function(e) {
        const closeBtn = e.target.closest('.mobile-nav-close-trigger, .mobile-nav-close-btn');
        if (closeBtn) {
            e.preventDefault();
            e.stopPropagation();
            const drawer = document.getElementById('mobile-nav-drawer');
            if (drawer) {
                drawer.classList.remove('open');
            }
            document.body.classList.remove('mobile-nav-open');
            document.documentElement.classList.remove('mobile-nav-open');
            if (typeof window.resetNavViews === 'function') {
                setTimeout(window.resetNavViews, 300);
            }
            return;
        }

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
                document.documentElement.classList.add('mobile-nav-open');
            }
        }
    });

    console.log("Compare Models Mobile Navigation & Controllers Ready.");
});
