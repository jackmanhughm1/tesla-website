document.addEventListener('DOMContentLoaded', () => {
  console.log('Tesla Solar Panels Configurator & Mobile Navigation Initialized');

  // 1. Average Monthly Electric Bill Slider
  const billSlider = document.getElementById('solar-bill-slider');
  const billDisplay = document.getElementById('solar-bill-display');

  function updateSliderFill() {
    if (!billSlider) return;
    const min = parseFloat(billSlider.min) || 50;
    const max = parseFloat(billSlider.max) || 800;
    const val = parseFloat(billSlider.value) || 220;
    const pct = ((val - min) / (max - min)) * 100;
    billSlider.style.setProperty('--slider-pct', pct + '%');
    if (billDisplay) {
      billDisplay.textContent = `$${val}/mo`;
    }
  }

  if (billSlider) {
    billSlider.addEventListener('input', updateSliderFill);
    updateSliderFill();
  }

  // 2. Pricing & System Summary calculations
  let selectedSizeName = 'Medium';
  let selectedSizeKw = 9.6;
  let selectedSolarPrice = 16400;
  let powerwallCount = 1;
  const powerwallUnitPrice = 8400;

  const solarLabel = document.getElementById('summary-solar-label');
  const solarPrice = document.getElementById('summary-solar-price');
  const pwRow = document.getElementById('summary-pw-row');
  const pwLabel = document.getElementById('summary-pw-label');
  const pwPrice = document.getElementById('summary-pw-price');
  const taxPrice = document.getElementById('summary-tax-price');
  const totalPrice = document.getElementById('summary-total-price');

  function updateSummary() {
    const totalPwPrice = powerwallCount * powerwallUnitPrice;
    const subtotal = selectedSolarPrice + totalPwPrice;
    const taxCredit = Math.round(subtotal * 0.30);
    const finalTotal = subtotal - taxCredit;

    if (solarLabel) solarLabel.textContent = `${selectedSizeName} Solar System (${selectedSizeKw} kW)`;
    if (solarPrice) solarPrice.textContent = `$${selectedSolarPrice.toLocaleString()}`;

    if (pwRow) {
      if (powerwallCount === 0) {
        pwRow.style.display = 'none';
      } else {
        pwRow.style.display = 'flex';
        if (pwLabel) pwLabel.textContent = `${powerwallCount} Powerwall${powerwallCount > 1 ? 's' : ''} 3`;
        if (pwPrice) pwPrice.textContent = `$${totalPwPrice.toLocaleString()}`;
      }
    }

    if (taxPrice) taxPrice.textContent = `-$${taxCredit.toLocaleString()}`;
    if (totalPrice) totalPrice.textContent = `$${finalTotal.toLocaleString()}`;
  }

  // 3. Solar System Size Card Selection
  const sizeCards = document.querySelectorAll('.solar-size-card');
  sizeCards.forEach(card => {
    card.addEventListener('click', () => {
      sizeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedSizeName = card.getAttribute('data-name') || 'Medium';
      selectedSizeKw = parseFloat(card.getAttribute('data-kw')) || 9.6;
      selectedSolarPrice = parseInt(card.getAttribute('data-price'), 10) || 16400;
      updateSummary();
    });
  });

  // 4. Powerwall Stepper
  const pwMinus = document.getElementById('pw-minus');
  const pwPlus = document.getElementById('pw-plus');
  const pwCount = document.getElementById('pw-count');
  const pwSpec = document.querySelector('.pw-card-spec');

  function updatePowerwallStepper() {
    if (pwCount) pwCount.textContent = powerwallCount;
    if (pwSpec) {
      if (powerwallCount === 0) {
        pwSpec.textContent = 'No battery backup';
      } else if (powerwallCount === 1) {
        pwSpec.textContent = '13.5 kWh battery backup';
      } else {
        const totalKwh = (powerwallCount * 13.5).toFixed(1);
        pwSpec.textContent = `${totalKwh} kWh battery backup (${powerwallCount} Powerwalls)`;
      }
    }
    if (pwMinus) {
      pwMinus.style.opacity = powerwallCount === 0 ? '0.4' : '1';
      pwMinus.style.cursor = powerwallCount === 0 ? 'not-allowed' : 'pointer';
    }
    updateSummary();
  }

  if (pwMinus && pwPlus) {
    pwMinus.addEventListener('click', (e) => {
      e.preventDefault();
      if (powerwallCount > 0) {
        powerwallCount--;
        updatePowerwallStepper();
      }
    });

    pwPlus.addEventListener('click', (e) => {
      e.preventDefault();
      if (powerwallCount < 10) {
        powerwallCount++;
        updatePowerwallStepper();
      }
    });

    updatePowerwallStepper();
  }

  updateSummary();

  // 5. MOBILE NAVIGATION DRAWER (.mobile-nav-drawer)
  function initMobileNavDrawer() {
    if (!document.getElementById('mobile-nav-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'mobile-nav-drawer';
      drawer.className = 'mobile-nav-drawer';

      const closeSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      const backSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      const chevSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c5e62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      const isSubdir = window.location.pathname.indexOf('/solarpanels/') !== -1;
      const imgPrefix = isSubdir ? 'Home%20Solar%20Panels%20_files/' : 'Home%20Solar%20Panels%20_files/';
      const relPrefix = isSubdir ? '../' : './';
      const selfLearn = isSubdir ? './index.html' : './solarpanels/index.html';
      const selfOrder = isSubdir ? './design/index.html' : './solarpanels/design/index.html';

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
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-3-Performance-LHD_FIiI.avif" alt="Model 3" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model 3</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'model3/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'model3/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-Y-2-v3_FIiI.avif" alt="Model Y" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model Y</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'modely/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'modely/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Cybertruck-1x_FIiI.avif" alt="Cybertruck" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Cybertruck</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'cybertruck/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'cybertruck/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-FSD_FIiI.avif" alt="Full Self-Driving (Supervised)" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Full Self-Driving<br>(Supervised)</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'fsd/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'drive/index.html" class="mobile-nav-direct-link">Experience</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Inventory-v3_FIiI.avif" alt="Inventory" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Inventory</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/new" class="mobile-nav-direct-link">New</a><a href="https://www.tesla.com/used" class="mobile-nav-direct-link">Certified Pre-Owned</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-S-New-NA-TW-KR_FIiI.avif" alt="Model S" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model S</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/models" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-X-New_FIiI.avif" alt="Model X" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model X</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/modelx" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
            '<div class="mobile-subpanel-divider"></div><div class="mobile-vehicle-offers-wrap"><a href="https://www.tesla.com/current-offers" class="mobile-vehicle-offers-title mobile-nav-direct-link">Current Offers</a></div>' +
          '</div>' +
        '</div>' +
        '<div id="mobile-nav-subpanel-energy" class="mobile-nav-view" style="display: none;">' +
          '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-energy-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Energy</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
          '<div class="mobile-nav-vehicles-list">' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Solar-Panels_FIiI.avif" alt="Solar Panels" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Solar Panels</h3><div class="mobile-vehicle-links"><a href="' + selfLearn + '" class="mobile-nav-direct-link">Learn</a><a href="' + selfOrder + '" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Powerwall-US_FIiI.avif" alt="Powerwall" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Powerwall</h3><div class="mobile-vehicle-links"><a href="' + relPrefix + 'powerwall/index.html" class="mobile-nav-direct-link">Learn</a><a href="' + relPrefix + 'powerwall/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Energy-Megapack_FIiI.avif" alt="Megapack" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Megapack</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/megapack" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
          '</div>' +
        '</div>' +
        '<div id="mobile-nav-subpanel-charging" class="mobile-nav-view" style="display: none;">' +
          '<div class="mobile-nav-subpanel-header"><button id="mobile-nav-charging-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Charging</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div>' +
          '<div class="mobile-nav-vehicles-list">' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging_FIiI.avif" alt="Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/charging" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Home-Charging_FIiI.avif" alt="Home Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Home Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/home-charging" class="mobile-nav-direct-link">Learn</a><a href="https://shop.tesla.com/category/charging#charging.at-home" class="mobile-nav-direct-link">Shop</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharging-NA_FIiI.avif" alt="Supercharging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/findus" class="mobile-nav-direct-link">Find</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Charging-for-Business_FIiI.avif" alt="Wall Connector for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Wall Connector for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/commercial-wall-connector" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/commercial-wall-connector/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharger-For-Business_FIiI.avif" alt="Supercharger for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharger for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/supercharger-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
            '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="' + imgPrefix + 'Mega-Menu-Charging-Semi-Charging-For-Business_FIiI.avif" alt="Semi Charging for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Semi Charging for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/semi-charging-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/semi-charging-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
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
    const menuBtn = e.target.closest('.mobile-menu-btn, #mobile-menu-btn, .mobile-menu-btn-left, #mobile-menu-btn-left, #dx-nav-item--menu, .tds-align--end button');
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

  // 6. Mobile Carousel Initialization Guard
  function initCarouselScroll() {
    if (window.innerWidth >= 600) return;
    const carousels = document.querySelectorAll('#tesla_flex_module_v2_1321 .tcl-freeflow-carousel-container__slides');
    carousels.forEach((carousel) => {
      if (!carousel.dataset.initializedOnce) {
        carousel.dataset.initializedOnce = 'true';
        carousel.scrollLeft = 0;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarouselScroll, { once: true });
  } else {
    initCarouselScroll();
  }
  window.addEventListener('load', initCarouselScroll, { once: true });
});
