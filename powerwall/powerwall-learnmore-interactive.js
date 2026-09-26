// Powerwall Learn More Interactive & Mobile Navigation Script

document.addEventListener('DOMContentLoaded', function() {
  console.log('Powerwall Learn More Interactive Initialized');

  // 1. MOBILE NAVIGATION DRAWER (.mobile-nav-drawer)
  function initMobileNavDrawer() {
    if (!document.getElementById('mobile-nav-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'mobile-nav-drawer';
      drawer.className = 'mobile-nav-drawer';

      const closeSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      const backSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      const chevSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c5e62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      const isSubdir = window.location.pathname.indexOf('/powerwall/') !== -1;
      const imgPrefix = 'Powerwall%20%E2%80%93%20Home%20Battery%20Storage%20_%20Tesla_files/';
      const relPrefix = isSubdir ? '../' : './';

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
            '<li class="mobile-nav-item mobile-nav-item--with-icon"><a href="https://www.tesla.com/teslaaccount" class="mobile-nav-link"><div class="mobile-nav-left"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#171a20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><div class="mobile-nav-text-group"><span class="mobile-nav-title">Account</span></div></div>' + chevSvg + '</a></li>' +
          '</ul>' +
        '</div>' +

        '<div id="mobile-nav-subpanel-vehicles" class="mobile-nav-view mobile-nav-subpanel" style="display:none;">' +
          '<div class="mobile-nav-subpanel-header">' +
            '<button class="mobile-nav-back-btn" id="mobile-nav-vehicles-back-btn">' + backSvg + '<span>Vehicles</span></button>' +
            '<button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button>' +
          '</div>' +
          '<div class="mobile-nav-cards-container">' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-3-Performance-LHD_1_OE.avif" alt="Model 3"></div>' +
              '<div class="mobile-card-name">Model 3</div>' +
              '<div class="mobile-card-actions"><a href="' + relPrefix + 'model3/index.html">Learn</a><a href="' + relPrefix + 'model3/design/index.html">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-Y-2-v3_1_OE.avif" alt="Model Y"></div>' +
              '<div class="mobile-card-name">Model Y</div>' +
              '<div class="mobile-card-actions"><a href="' + relPrefix + 'modely/index.html">Learn</a><a href="' + relPrefix + 'modely/design/index.html">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Cybertruck-1x_1_OE.avif" alt="Cybertruck"></div>' +
              '<div class="mobile-card-name">Cybertruck</div>' +
              '<div class="mobile-card-actions"><a href="' + relPrefix + 'cybertruck/index.html">Learn</a><a href="' + relPrefix + 'cybertruck/design/index.html">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-S-New-NA-TW-KR_1_OE.avif" alt="Model S"></div>' +
              '<div class="mobile-card-name">Model S</div>' +
              '<div class="mobile-card-actions"><a href="https://www.tesla.com/models">Learn</a><a href="https://www.tesla.com/models/design">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Vehicles-Model-X-New_1_OE.avif" alt="Model X"></div>' +
              '<div class="mobile-card-name">Model X</div>' +
              '<div class="mobile-card-actions"><a href="https://www.tesla.com/modelx">Learn</a><a href="https://www.tesla.com/modelx/design">Order</a></div>' +
            '</div>' +
          '</div>' +
          '<div class="mobile-nav-links-list">' +
            '<a href="' + relPrefix + 'inventory/index.html" class="mobile-nav-direct-link">Inventory</a>' +
            '<a href="https://www.tesla.com/used" class="mobile-nav-direct-link">Used Cars</a>' +
            '<a href="' + relPrefix + 'drive/index.html" class="mobile-nav-direct-link">Demo Drive</a>' +
            '<a href="https://www.tesla.com/tradein" class="mobile-nav-direct-link">Trade-in</a>' +
            '<a href="' + relPrefix + 'compare/index.html" class="mobile-nav-direct-link">Compare</a>' +
            '<a href="https://www.tesla.com/fleet" class="mobile-nav-direct-link">Fleet</a>' +
            '<a href="https://www.tesla.com/semi" class="mobile-nav-direct-link">Semi</a>' +
            '<a href="https://www.tesla.com/roadster" class="mobile-nav-direct-link">Roadster</a>' +
          '</div>' +
        '</div>' +

        '<div id="mobile-nav-subpanel-energy" class="mobile-nav-view mobile-nav-subpanel" style="display:none;">' +
          '<div class="mobile-nav-subpanel-header">' +
            '<button class="mobile-nav-back-btn" id="mobile-nav-energy-back-btn">' + backSvg + '<span>Energy</span></button>' +
            '<button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button>' +
          '</div>' +
          '<div class="mobile-nav-cards-container">' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Energy-Solar-Panels_1_OE.avif" alt="Solar Panels"></div>' +
              '<div class="mobile-card-name">Solar Panels</div>' +
              '<div class="mobile-card-actions"><a href="' + relPrefix + 'solarpanels/index.html">Learn</a><a href="' + relPrefix + 'solarpanels/design/index.html">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Energy-Powerwall-US_1_OE.avif" alt="Powerwall"></div>' +
              '<div class="mobile-card-name">Powerwall</div>' +
              '<div class="mobile-card-actions"><a href="./index.html">Learn</a><a href="./design/index.html">Order</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Energy-Megapack_1_OE.avif" alt="Megapack"></div>' +
              '<div class="mobile-card-name">Megapack</div>' +
              '<div class="mobile-card-actions"><a href="https://www.tesla.com/megapack">Learn</a><a href="https://www.tesla.com/megapack/design">Order</a></div>' +
            '</div>' +
          '</div>' +
          '<div class="mobile-nav-links-list">' +
            '<a href="https://www.tesla.com/solar-virtual-consultations" class="mobile-nav-direct-link">Schedule a Consultation</a>' +
            '<a href="https://www.tesla.com/why-solar" class="mobile-nav-direct-link">Why Solar</a>' +
            '<a href="https://www.tesla.com/support/energy/powerwall/learn/incentives" class="mobile-nav-direct-link">Incentives</a>' +
            '<a href="https://www.tesla.com/support/energy" class="mobile-nav-direct-link">Support</a>' +
            '<a href="https://www.tesla.com/commercial" class="mobile-nav-direct-link">Commercial</a>' +
            '<a href="https://www.tesla.com/utilities" class="mobile-nav-direct-link">Utilities</a>' +
          '</div>' +
        '</div>' +

        '<div id="mobile-nav-subpanel-charging" class="mobile-nav-view mobile-nav-subpanel" style="display:none;">' +
          '<div class="mobile-nav-subpanel-header">' +
            '<button class="mobile-nav-back-btn" id="mobile-nav-charging-back-btn">' + backSvg + '<span>Charging</span></button>' +
            '<button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button>' +
          '</div>' +
          '<div class="mobile-nav-cards-container">' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Charging-Home-Charging_1_OE.avif" alt="Home Charging"></div>' +
              '<div class="mobile-card-name">Home Charging</div>' +
              '<div class="mobile-card-actions"><a href="https://www.tesla.com/home-charging">Learn</a><a href="https://shop.tesla.com/category/charging#charging.at-home">Shop</a></div>' +
            '</div>' +
            '<div class="mobile-nav-product-card">' +
              '<div class="mobile-card-img"><img src="' + imgPrefix + 'Mega-Menu-Charging-Supercharging-NA_1_OE.avif" alt="Supercharging"></div>' +
              '<div class="mobile-card-name">Supercharging</div>' +
              '<div class="mobile-card-actions"><a href="https://www.tesla.com/supercharger">Learn</a><a href="https://www.tesla.com/findus">Find</a></div>' +
            '</div>' +
          '</div>' +
          '<div class="mobile-nav-links-list">' +
            '<a href="https://www.tesla.com/help-me-charge" class="mobile-nav-direct-link">Help Me Charge</a>' +
            '<a href="https://www.tesla.com/charging-calculator" class="mobile-nav-direct-link">Charging Calculator</a>' +
            '<a href="https://www.tesla.com/host-a-supercharger" class="mobile-nav-direct-link">Host a Supercharger</a>' +
            '<a href="https://www.tesla.com/commercial-wall-connector" class="mobile-nav-direct-link">Commercial Charging</a>' +
          '</div>' +
        '</div>' +

        '<div id="mobile-nav-subpanel-discover" class="mobile-nav-view mobile-nav-subpanel" style="display:none;">' +
          '<div class="mobile-nav-subpanel-header">' +
            '<button class="mobile-nav-back-btn" id="mobile-nav-discover-back-btn">' + backSvg + '<span>Discover</span></button>' +
            '<button class="mobile-nav-close-btn mobile-nav-close-trigger" aria-label="Close menu">' + closeSvg + '</button>' +
          '</div>' +
          '<div class="mobile-nav-discover-column">' +
            '<div class="mobile-discover-heading">Resources</div>' +
            '<a href="' + relPrefix + 'drive/index.html" class="mobile-discover-item mobile-nav-direct-link">Demo Drive</a>' +
            '<a href="https://www.tesla.com/insurance" class="mobile-discover-item mobile-nav-direct-link">Insurance</a>' +
            '<a href="https://www.tesla.com/current-offers" class="mobile-discover-item mobile-nav-direct-link">Current Offers</a>' +
            '<a href="https://www.tesla.com/learn" class="mobile-discover-item mobile-nav-direct-link">Learn</a>' +
            '<a href="https://www.tesla.com/support/videos" class="mobile-discover-item mobile-nav-direct-link">Video Guides</a>' +
            '<div class="mobile-discover-heading">Location Services</div>' +
            '<a href="https://www.tesla.com/findus" class="mobile-discover-item mobile-nav-direct-link">Find Us</a>' +
            '<a href="https://www.tesla.com/support/certified-installers" class="mobile-discover-item mobile-nav-direct-link">Find a Certified Installer</a>' +
            '<div class="mobile-discover-heading">Company</div>' +
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

      if (vehiclesBackBtn) vehiclesBackBtn.addEventListener('click', resetNavViews);
      if (energyBackBtn) energyBackBtn.addEventListener('click', resetNavViews);
      if (chargingBackBtn) chargingBackBtn.addEventListener('click', resetNavViews);
      if (discoverBackBtn) discoverBackBtn.addEventListener('click', resetNavViews);

      const closeTriggers = drawer.querySelectorAll('.mobile-nav-close-trigger');
      closeTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
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

  // 2. MOBILE BOTTOM STICKY ACTION BAR
  function initMobileActionBar() {
    if (window.innerWidth > 768) return;
    if (document.querySelector('.powerwall-mobile-action-bar')) return;

    const bar = document.createElement('div');
    bar.className = 'powerwall-mobile-action-bar';
    bar.style.display = 'none';

    const isSubdir = window.location.pathname.indexOf('/powerwall/') !== -1;
    const relPrefix = isSubdir ? '../' : './';

    bar.innerHTML = 
      '<button class="powerwall-action-btn-chat" aria-label="Ask a question">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
      '</button>' +
      '<a href="' + relPrefix + 'solarpanels/index.html" class="powerwall-action-btn-order">Order With Solar</a>' +
      '<button class="powerwall-action-btn-top" aria-label="Scroll to top">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>' +
      '</button>';

    document.body.appendChild(bar);

    const chatBtn = bar.querySelector('.powerwall-action-btn-chat');
    const topBtn = bar.querySelector('.powerwall-action-btn-top');

    if (topBtn) {
      topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (chatBtn) {
      chatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const chatModal = document.querySelector('.cua-chat--chat-modal');
        if (chatModal && typeof chatModal.showModal === 'function') {
          chatModal.showModal();
        }
      });
    }

    // Show/hide action bar on scroll
    function updateActionBarVisibility() {
      if (window.innerWidth <= 768) {
        if (window.scrollY > 250) {
          bar.style.display = 'flex';
          const oldChat = document.querySelector('.tcl-sticky-bar');
          if (oldChat) oldChat.style.display = 'none';
        } else {
          bar.style.display = 'none';
          const oldChat = document.querySelector('.tcl-sticky-bar');
          if (oldChat) oldChat.style.display = '';
        }
      } else {
        bar.style.display = 'none';
      }
    }

    window.addEventListener('scroll', updateActionBarVisibility, { passive: true });
    window.addEventListener('resize', updateActionBarVisibility, { passive: true });
    updateActionBarVisibility();
  }

  // 3. TIMELINE CAROUSEL INTERACTION
  function initTimelineCarousel() {
    const timeline = document.getElementById('powerwall-timeline');
    if (!timeline) return;

    const tabs = timeline.querySelectorAll('.tcl-carousel-v2__panel');
    const slides = timeline.querySelectorAll('.tcl-carousel-v2__slide');

    tabs.forEach(function(tab, index) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        tabs.forEach(function(t) {
          t.classList.remove('tds-tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        slides.forEach(function(s) {
          s.classList.remove('tds-tab-panel--active');
        });

        tab.classList.add('tds-tab--active');
        tab.setAttribute('aria-selected', 'true');
        if (slides[index]) {
          slides[index].classList.add('tds-tab-panel--active');
        }
      });
    });
  }

  // 4. VERTICAL CAROUSEL INTERACTION (#pricing_selling)
  function initVerticalCarousel() {
    const vc = document.getElementById('pricing_selling');
    if (!vc) return;

    const navItems = vc.querySelectorAll('.tcl-vertical-carousel-v2__navigation-item');
    const navButtons = vc.querySelectorAll('.tcl-vertical-carousel-v2__navigation-wrapper');
    const mediaWrappers = vc.querySelectorAll('.tcl-vertical-carousel-v2__media-wrapper');

    navButtons.forEach(function(btn, index) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();

        navItems.forEach(function(item) {
          item.classList.remove('tcl-vertical-carousel-v2__navigation-item--active');
        });
        navButtons.forEach(function(b) {
          b.setAttribute('aria-selected', 'false');
          b.setAttribute('tabindex', '-1');
        });
        mediaWrappers.forEach(function(m) {
          m.classList.remove('tcl-vertical-carousel-v2__media-wrapper--active');
        });

        if (navItems[index]) {
          navItems[index].classList.add('tcl-vertical-carousel-v2__navigation-item--active');
        }
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');

        if (mediaWrappers[index]) {
          mediaWrappers[index].classList.add('tcl-vertical-carousel-v2__media-wrapper--active');
        }
      });
    });
  }

  initMobileActionBar();
  initTimelineCarousel();
  initVerticalCarousel();
});
