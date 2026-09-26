document.addEventListener('DOMContentLoaded', () => {
  console.log('Tesla Solar Panels Configurator Initialized');

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

  // 5. Mobile Menu Button
  const menuBtn = document.getElementById('mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const drawer = document.getElementById('mobile-nav-drawer') || document.querySelector('.mobile-nav-drawer');
      if (drawer) {
        drawer.classList.toggle('active');
      }
    });
  }

  // 6. Solar Panel Order Confirmation Modal
  const orderBtn = document.getElementById('solar-summary-order-btn');
  const modalOverlay = document.getElementById('solar-order-modal-overlay');

  function openSolarOrderModal(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
    
    const address = document.getElementById('solar-address-input')?.value || '123 Tesla Way, Palo Alto, CA 94304';
    const name = document.getElementById('solar-name-input')?.value || 'Elon Musk';
    const phone = document.getElementById('solar-phone-input')?.value || '(555) 123-4567';
    const bill = document.getElementById('solar-bill-display')?.textContent || '$220/mo';
    const system = `${selectedSizeName} Solar System (${selectedSizeKw} kW)`;
    const pwText = powerwallCount === 0 ? 'None' : `${powerwallCount} Powerwall${powerwallCount > 1 ? 's' : ''} 3`;
    const price = totalPrice?.textContent || '$17,360';

    const detailsContainer = document.getElementById('solar-confirmation-details');
    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div style="margin-bottom:6px;"><strong>Customer Name:</strong> ${name}</div>
        <div style="margin-bottom:6px;"><strong>Phone Number:</strong> ${phone}</div>
        <div style="margin-bottom:6px;"><strong>Installation Address:</strong> ${address}</div>
        <div style="margin-bottom:6px;"><strong>Solar System:</strong> ${system}</div>
        <div style="margin-bottom:6px;"><strong>Powerwall Storage:</strong> ${pwText}</div>
        <div style="margin-bottom:6px;"><strong>Est. Monthly Electric Bill:</strong> ${bill}</div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #d0d1d2;font-size:15px;font-weight:700;color:#171a20;">
          <strong>Est. Price After Incentives:</strong> <span style="color:#137333;">${price}</span>
        </div>
      `;
    }

    const overlay = document.getElementById('solar-order-modal-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    return false;
  }

  function closeSolarOrderModal(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    const overlay = document.getElementById('solar-order-modal-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
    return false;
  }

  window.openSolarOrderModal = openSolarOrderModal;
  window.closeSolarOrderModal = closeSolarOrderModal;

  if (orderBtn) {
    orderBtn.addEventListener('click', openSolarOrderModal);
  }

  const overlayEl = document.getElementById('solar-order-modal-overlay');
  if (overlayEl) {
    overlayEl.addEventListener('click', (e) => {
      if (e.target === overlayEl) {
        closeSolarOrderModal(e);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSolarOrderModal(e);
    }
  });

  document.addEventListener('click', function(e) {
    const target = e.target;
    if (!target) return;
    const btn = target.closest ? target.closest('#solar-summary-order-btn, .solar-summary-order-btn') : null;
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      openSolarOrderModal(e);
    }
  }, true);

});
