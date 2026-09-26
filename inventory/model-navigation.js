document.addEventListener('DOMContentLoaded', () => {
  console.log('Tesla Model Navigation Script Initialized');

  // Bind click listeners to all Model radio inputs in left panel
  const modelRadios = document.querySelectorAll('input[name="Model"]');

  modelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = e.target.value;
      console.log('User selected model:', val);

      if (val === 'ms') {
        if (!window.location.pathname.endsWith('models.html')) {
          window.location.href = 'models.html';
        }
      } else if (val === 'm3') {
        if (!window.location.pathname.endsWith('model3.html')) {
          window.location.href = 'model3.html';
        }
      } else if (val === 'mx') {
        if (!window.location.pathname.endsWith('modelx.html')) {
          window.location.href = 'modelx.html';
        }
      } else if (val === 'my') {
        if (!window.location.pathname.endsWith('modely.html')) {
          window.location.href = 'modely.html';
        }
      } else if (val === 'ct') {
        if (!window.location.pathname.endsWith('cybertruck.html')) {
          window.location.href = 'cybertruck.html';
        }
      }
    });
  });

  // Ensure correct radio button is checked based on active page URL
  const pathname = window.location.pathname;
  if (pathname.endsWith('model3.html')) {
    const m3Radio = document.querySelector('input[value="m3"]') || document.querySelector('input[title="Model 3"]');
    if (m3Radio) m3Radio.checked = true;
  } else if (pathname.endsWith('models.html')) {
    const msRadio = document.querySelector('input[value="ms"]') || document.querySelector('input[title="Model S"]');
    if (msRadio) msRadio.checked = true;
  } else if (pathname.endsWith('modelx.html')) {
    const mxRadio = document.querySelector('input[value="mx"]') || document.querySelector('input[title="Model X"]');
    if (mxRadio) mxRadio.checked = true;
  } else if (pathname.endsWith('modely.html')) {
    const myRadio = document.querySelector('input[value="my"]') || document.querySelector('input[title="Model Y"]');
    if (myRadio) myRadio.checked = true;
  } else if (pathname.endsWith('cybertruck.html')) {
    const ctRadio = document.querySelector('input[value="ct"]') || document.querySelector('input[title="Cybertruck"]');
    if (ctRadio) ctRadio.checked = true;
  }

  // --- Mobile Navigation Drawer for Inventory Page ---
  function initMobileNavDrawer() {
    if (!window.location.pathname.includes('inventory')) return;
    if (!document.getElementById('mobile-nav-drawer')) {
      var drawer = document.createElement('div');
      drawer.id = 'mobile-nav-drawer';
      drawer.className = 'mobile-nav-drawer';

      var closeSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      var backSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      var chevSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c5e62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      drawer.innerHTML = '<div id="mobile-nav-main-view" class="mobile-nav-view"><div class="mobile-nav-header"><button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div><ul class="mobile-nav-list"><li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-vehicles-trigger" class="mobile-nav-link"><span>Vehicles</span>' + chevSvg + '</a></li><li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-energy-trigger" class="mobile-nav-link"><span>Energy</span>' + chevSvg + '</a></li><li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-charging-trigger" class="mobile-nav-link"><span>Charging</span>' + chevSvg + '</a></li><li class="mobile-nav-item"><a href="javascript:void(0);" id="mobile-nav-discover-trigger" class="mobile-nav-link"><span>Discover</span>' + chevSvg + '</a></li><li class="mobile-nav-item"><a href="https://shop.tesla.com/" class="mobile-nav-link"><span>Shop</span></a></li><li class="mobile-nav-item"><a href="https://www.tesla.com/support" class="mobile-nav-link"><span>Support</span></a></li><li class="mobile-nav-item mobile-nav-item--with-icon"><a href="javascript:void(0);" class="mobile-nav-link"><div class="mobile-nav-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg><div class="mobile-nav-text-group"><span class="mobile-nav-title">United States</span><span class="mobile-nav-subtitle">English</span></div></div>' + chevSvg + '</a></li><li class="mobile-nav-item mobile-nav-item--with-icon"><a href="https://www.tesla.com/teslaaccount" class="mobile-nav-link"><div class="mobile-nav-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span class="mobile-nav-title">Account</span></div></a></li></ul></div>' +
        '<div id="mobile-nav-subpanel-vehicles" class="mobile-nav-view" style="display: none;"><div class="mobile-nav-subpanel-header"><button id="mobile-nav-vehicles-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Vehicles</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div><div class="mobile-nav-vehicles-list">' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Model-3-Performance-LHD_jlWC.avif" alt="Model 3" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model 3</h3><div class="mobile-vehicle-links"><a href="../model3/index.html" class="mobile-nav-direct-link">Learn</a><a href="../model3/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Model-Y-2-v3_jlWC.avif" alt="Model Y" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model Y</h3><div class="mobile-vehicle-links"><a href="../modely/index.html" class="mobile-nav-direct-link">Learn</a><a href="../modely/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Cybertruck-1x_jlWC.avif" alt="Cybertruck" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Cybertruck</h3><div class="mobile-vehicle-links"><a href="../cybertruck/index.html" class="mobile-nav-direct-link">Learn</a><a href="../cybertruck/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-FSD_jlWC.avif" alt="Full Self-Driving (Supervised)" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Full Self-Driving<br>(Supervised)</h3><div class="mobile-vehicle-links"><a href="../fsd/index.html" class="mobile-nav-direct-link">Learn</a><a href="../drive/index.html" class="mobile-nav-direct-link">Experience</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Inventory-v3_jlWC.avif" alt="Inventory" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Inventory</h3><div class="mobile-vehicle-links"><a href="../inventory/index.html" class="mobile-nav-direct-link">New</a><a href="../inventory/index.html" class="mobile-nav-direct-link">Certified Pre-Owned</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Model-S-New-NA-TW-KR_jlWC.avif" alt="Model S" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model S</h3><div class="mobile-vehicle-links"><a href="../models.html" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Vehicles-Model-X-New_jlWC.avif" alt="Model X" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Model X</h3><div class="mobile-vehicle-links"><a href="../modelx.html" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
        '<div class="mobile-subpanel-divider"></div><div class="mobile-vehicle-offers-wrap"><a href="https://www.tesla.com/current-offers" class="mobile-vehicle-offers-title mobile-nav-direct-link">Current Offers</a></div></div></div>' +
        '<div id="mobile-nav-subpanel-energy" class="mobile-nav-view" style="display: none;"><div class="mobile-nav-subpanel-header"><button id="mobile-nav-energy-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Energy</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div><div class="mobile-nav-vehicles-list">' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Energy-Solar-Panels_jlWC.avif" alt="Solar Panels" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Solar Panels</h3><div class="mobile-vehicle-links"><a href="../solarpanels/index.html" class="mobile-nav-direct-link">Learn</a><a href="../solarpanels/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Energy-Powerwall-US_jlWC.avif" alt="Powerwall" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Powerwall</h3><div class="mobile-vehicle-links"><a href="../powerwall/index.html" class="mobile-nav-direct-link">Learn</a><a href="../powerwall/design/index.html" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Energy-Megapack_jlWC.avif" alt="Megapack" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Megapack</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/megapack" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
        '</div></div>' +
        '<div id="mobile-nav-subpanel-charging" class="mobile-nav-view" style="display: none;"><div class="mobile-nav-subpanel-header"><button id="mobile-nav-charging-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Charging</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div><div class="mobile-nav-vehicles-list">' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Charging_jlWC.avif" alt="Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/charging" class="mobile-nav-direct-link">Learn</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Home-Charging_jlWC.avif" alt="Home Charging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Home Charging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/home-charging" class="mobile-nav-direct-link">Learn</a><a href="https://shop.tesla.com/category/charging#charging.at-home" class="mobile-nav-direct-link">Shop</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Supercharging-NA_jlWC.avif" alt="Supercharging" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharging</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/findus" class="mobile-nav-direct-link">Find</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Charging-for-Business_jlWC.avif" alt="Wall Connector for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Wall Connector for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/commercial-wall-connector" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/commercial-wall-connector/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Supercharger-For-Business_jlWC.avif" alt="Supercharger for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Supercharger for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/supercharger-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/supercharger-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '<div class="mobile-vehicle-card"><div class="mobile-vehicle-img-wrap"><img src="Model%20s_files/Mega-Menu-Charging-Semi-Charging-For-Business_jlWC.avif" alt="Semi Charging for Business" /></div><div class="mobile-vehicle-info"><h3 class="mobile-vehicle-title">Semi Charging for<br>Business</h3><div class="mobile-vehicle-links"><a href="https://www.tesla.com/semi-charging-for-business" class="mobile-nav-direct-link">Learn</a><a href="https://www.tesla.com/semi-charging-for-business/get" class="mobile-nav-direct-link">Order</a></div></div></div>' +
        '</div></div>' +
        '<div id="mobile-nav-subpanel-discover" class="mobile-nav-view" style="display: none;"><div class="mobile-nav-subpanel-header"><button id="mobile-nav-discover-back-btn" class="mobile-nav-back-btn" aria-label="Back to menu">' + backSvg + '</button><span class="mobile-nav-subpanel-title">Discover</span><button class="mobile-nav-close-btn mobile-nav-subpanel-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button></div><div class="mobile-discover-list">' +
        '<a href="../drive/index.html" class="mobile-discover-item mobile-nav-direct-link">Demo Drive</a>' +
        '<a href="https://www.tesla.com/insurance" class="mobile-discover-item mobile-nav-direct-link">Insurance</a>' +
        '<a href="https://www.tesla.com/offers" class="mobile-discover-item mobile-nav-direct-link">Current Offers</a>' +
        '<a href="https://www.tesla.com/learn" class="mobile-discover-item mobile-nav-direct-link">Learn</a>' +
        '<a href="https://www.tesla.com/video" class="mobile-discover-item mobile-nav-direct-link">Video Guides</a>' +
        '<a href="https://www.tesla.com/customer-stories" class="mobile-discover-item mobile-nav-direct-link">Customer Stories</a>' +
        '<a href="https://www.tesla.com/events" class="mobile-discover-item mobile-nav-direct-link">Events</a>' +
        '<a href="https://www.tesla.com/safety" class="mobile-discover-item mobile-nav-direct-link">Safety</a>' +
        '<a href="https://www.tesla.com/findus" class="mobile-discover-item mobile-nav-direct-link">Find Us</a>' +
        '<a href="https://www.tesla.com/collision" class="mobile-discover-item mobile-nav-direct-link">Find a Collision Center</a>' +
        '<a href="https://www.tesla.com/certified-installer" class="mobile-discover-item mobile-nav-direct-link">Find a Certified Installer</a>' +
        '<a href="https://www.tesla.com/about" class="mobile-discover-item mobile-nav-direct-link">About</a>' +
        '<a href="https://www.tesla.com/careers" class="mobile-discover-item mobile-nav-direct-link">Careers</a>' +
        '<a href="https://ir.tesla.com" class="mobile-discover-item mobile-nav-direct-link">Investor Relations</a>' +
        '</div></div>';

      document.body.appendChild(drawer);

      var mainView = document.getElementById('mobile-nav-main-view');
      var vehiclesSubpanel = document.getElementById('mobile-nav-subpanel-vehicles');
      var energySubpanel = document.getElementById('mobile-nav-subpanel-energy');
      var chargingSubpanel = document.getElementById('mobile-nav-subpanel-charging');
      var discoverSubpanel = document.getElementById('mobile-nav-subpanel-discover');
      var vehiclesTrigger = document.getElementById('mobile-nav-vehicles-trigger');
      var energyTrigger = document.getElementById('mobile-nav-energy-trigger');
      var chargingTrigger = document.getElementById('mobile-nav-charging-trigger');
      var discoverTrigger = document.getElementById('mobile-nav-discover-trigger');
      var vehiclesBackBtn = document.getElementById('mobile-nav-vehicles-back-btn');
      var energyBackBtn = document.getElementById('mobile-nav-energy-back-btn');
      var chargingBackBtn = document.getElementById('mobile-nav-charging-back-btn');
      var discoverBackBtn = document.getElementById('mobile-nav-discover-back-btn');

      var resetNavViews = function() {
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
            vehiclesSubpanel.style.display = 'flex';
            if (energySubpanel) energySubpanel.style.display = 'none';
            if (chargingSubpanel) chargingSubpanel.style.display = 'none';
            if (discoverSubpanel) discoverSubpanel.style.display = 'none';
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
            energySubpanel.style.display = 'flex';
            if (chargingSubpanel) chargingSubpanel.style.display = 'none';
            if (discoverSubpanel) discoverSubpanel.style.display = 'none';
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
            chargingSubpanel.style.display = 'flex';
            if (discoverSubpanel) discoverSubpanel.style.display = 'none';
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
});
