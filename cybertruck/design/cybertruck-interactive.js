document.addEventListener('DOMContentLoaded', function() {
    console.log("Cybertruck Interactive Studio Initializing...");

    // State
    const state = {
        paymentMethod: 'cash', // 'cash', 'lease', 'finance'
        trim: '$MTC07', // '$MTC08', '$MTC07', '$MTC04'
        wheel: 'cyber', // 'cyber', 'core'
        interior: 'tactical_grey', // 'tactical_grey', 'white'
        currentSlide: 0
    };

    const trimData = {
        '$MTC08': {
            id: '$MTC08',
            name: 'Dual Motor All-Wheel Drive',
            title: 'Dual Motor All-Wheel Drive',
            price: 74990,
            lease: 949,
            finance: 1049,
            range: '325',
            towing: '11,000',
            acceleration: '4.1'
        },
        '$MTC07': {
            id: '$MTC07',
            name: 'Premium All-Wheel Drive',
            title: 'Premium All-Wheel Drive',
            price: 84990,
            lease: 1129,
            finance: 1199,
            range: '325',
            towing: '11,000',
            acceleration: '4.1'
        },
        '$MTC04': {
            id: '$MTC04',
            name: 'Cyberbeast',
            title: 'Cyberbeast',
            price: 99990,
            lease: 1249,
            finance: 1409,
            range: '301',
            towing: '11,000',
            acceleration: '2.6'
        }
    };

    const wheelPrices = {
        'cyber': 0,
        'core': 0
    };

    const interiorPrices = {
        'tactical_grey': 0,
        'white': 2000
    };

    // Helper: Format Currency
    function formatCurrency(val) {
        return '$' + val.toLocaleString('en-US');
    }

    // Update Pricing & Specs
    function updatePrices() {
        const trimInfo = trimData[state.trim] || trimData['$MTC07'];
        const wPrice = wheelPrices[state.wheel] || 0;
        const iPrice = interiorPrices[state.interior] || 0;

        const totalPrice = trimInfo.price + wPrice + iPrice;

        // Footer & Summary Prices
        const footerPriceEl = document.querySelector('[data-id="footer-price"] span') || document.querySelector('[data-id="footer-price"]');
        const summaryPriceVal = document.querySelector('[data-id="summary-price-value"]');
        const purchasePriceItem = document.querySelector('[data-id="purchase-price-line-item"]');
        const vehiclePriceItem = document.querySelector('[data-id="vehicle-price-line-item"]');

        let displayString = '';
        let subtextString = 'Vehicle Price';
        if (state.paymentMethod === 'lease') {
            displayString = `$${trimInfo.lease.toLocaleString('en-US')}/mo`;
            subtextString = 'Est. Lease Payment';
        } else if (state.paymentMethod === 'finance') {
            displayString = `$${trimInfo.finance.toLocaleString('en-US')}/mo`;
            subtextString = 'Est. Finance Payment';
        } else {
            displayString = formatCurrency(totalPrice);
            subtextString = 'Vehicle Price';
        }

        const mobileFooterPrice = document.querySelector('[data-id="mobile-footer-price"]');
        const mobileFooterSubtext = document.querySelector('[data-id="mobile-footer-subtext"]');

        if (footerPriceEl) footerPriceEl.textContent = displayString;
        if (mobileFooterPrice) mobileFooterPrice.textContent = displayString;
        if (mobileFooterSubtext) mobileFooterSubtext.textContent = subtextString;
        if (summaryPriceVal) summaryPriceVal.textContent = displayString;
        if (purchasePriceItem) purchasePriceItem.textContent = formatCurrency(totalPrice);
        if (vehiclePriceItem) vehiclePriceItem.textContent = formatCurrency(trimInfo.price);

        // Update Wheel Price Label
        const wheelPriceEl = document.querySelector('[data-id="WHEELS-price"]');
        if (wheelPriceEl) {
            wheelPriceEl.textContent = wPrice === 0 ? 'Included' : formatCurrency(wPrice);
        }

        // Update Interior Header (Title & Price)
        renderInteriorHeader(state.interior);

        // Update Specs
        const rangeVal = document.querySelector('[data-id="range"] span');
        const accelVal = document.querySelector('[data-id="acceleration"] span');

        if (rangeVal) rangeVal.textContent = trimInfo.range;
        if (accelVal) accelVal.textContent = trimInfo.acceleration;

        // Update Trim Card Prices
        const mtc08PriceEl = document.querySelector('[data-id="$MTC08-price"] span') || document.querySelector('[data-id="$MTC08-price"]');
        const mtc07PriceEl = document.querySelector('[data-id="$MTC07-price"] span') || document.querySelector('[data-id="$MTC07-price"]');
        const mtc04PriceEl = document.querySelector('[data-id="$MTC04-price"] span') || document.querySelector('[data-id="$MTC04-price"]');

        if (state.paymentMethod === 'lease') {
            if (mtc08PriceEl) mtc08PriceEl.textContent = '$' + trimData['$MTC08'].lease.toLocaleString('en-US') + ' /mo';
            if (mtc07PriceEl) mtc07PriceEl.textContent = '$' + trimData['$MTC07'].lease.toLocaleString('en-US') + ' /mo';
            if (mtc04PriceEl) mtc04PriceEl.textContent = '$' + trimData['$MTC04'].lease.toLocaleString('en-US') + ' /mo';
        } else if (state.paymentMethod === 'finance') {
            if (mtc08PriceEl) mtc08PriceEl.textContent = '$' + trimData['$MTC08'].finance.toLocaleString('en-US') + ' /mo';
            if (mtc07PriceEl) mtc07PriceEl.textContent = '$' + trimData['$MTC07'].finance.toLocaleString('en-US') + ' /mo';
            if (mtc04PriceEl) mtc04PriceEl.textContent = '$' + trimData['$MTC04'].finance.toLocaleString('en-US') + ' /mo';
        } else {
            if (mtc08PriceEl) mtc08PriceEl.textContent = formatCurrency(trimData['$MTC08'].price);
            if (mtc07PriceEl) mtc07PriceEl.textContent = formatCurrency(trimData['$MTC07'].price);
            if (mtc04PriceEl) mtc04PriceEl.textContent = formatCurrency(trimData['$MTC04'].price);
        }

        // Update Summary Titles
        const summaryTitles = document.querySelectorAll('.coin_trim_summary .coin-group--title span');
        summaryTitles.forEach(el => {
            el.textContent = trimInfo.title;
        });
    }

    // Payment Tabs Setup
    const allTabButtons = Array.from(document.querySelectorAll('button[role="tab"], .tds-tab'));

    allTabButtons.forEach((tabBtn) => {
        tabBtn.style.cursor = 'pointer';
        tabBtn.addEventListener('click', function(e) {
            e.preventDefault();

            allTabButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
                btn.classList.remove('is-active', 'tds-tab--active', 'active');
            });

            tabBtn.setAttribute('aria-selected', 'true');
            tabBtn.setAttribute('tabindex', '0');
            tabBtn.classList.add('is-active', 'tds-tab--active', 'active');

            const btnText = (tabBtn.textContent || '').trim().toLowerCase();
            if (btnText.includes('cash')) {
                state.paymentMethod = 'cash';
            } else if (btnText.includes('finance')) {
                state.paymentMethod = 'finance';
            } else {
                state.paymentMethod = 'lease';
            }

            updatePrices();
        });
    });

    // Trim Selection Setup
    const trimOptions = {
        '$MTC08': document.querySelector('[data-id="$MTC08-option"]'),
        '$MTC07': document.querySelector('[data-id="$MTC07-option"]'),
        '$MTC04': document.querySelector('[data-id="$MTC04-option"]')
    };

    Object.keys(trimOptions).forEach(key => {
        const optionEl = trimOptions[key];
        if (optionEl) {
            optionEl.style.cursor = 'pointer';
            optionEl.addEventListener('click', () => {
                Object.keys(trimOptions).forEach(k => {
                    const el = trimOptions[k];
                    if (el) {
                        el.classList.remove('tds-option--is-selected', 'is-selected');
                        el.setAttribute('data-id-selected', 'false');
                        const radio = el.querySelector('input[type="radio"]');
                        if (radio) radio.checked = false;
                    }
                });
                optionEl.classList.add('tds-option--is-selected', 'is-selected');
                optionEl.setAttribute('data-id-selected', 'true');
                const radio = optionEl.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;

                const trimGroup = document.querySelector('.group-TRIM');
                if (trimGroup) {
                    trimGroup.className = trimGroup.className.replace(/group--selected_\S+/g, '') + ' group--selected_' + key;
                }

                state.trim = key;
                updatePrices();
            });
        }
    });

    // Wheels Setup
    const wheelCyber = document.querySelector('[data-id="$WH0A-option"]');
    const wheelCore = document.querySelector('[data-id="$WH0B-option"]');

    if (wheelCyber) {
        wheelCyber.style.cursor = 'pointer';
        wheelCyber.addEventListener('click', () => {
            state.wheel = 'cyber';
            updatePrices();
        });
    }
    if (wheelCore) {
        wheelCore.style.cursor = 'pointer';
        wheelCore.addEventListener('click', () => {
            state.wheel = 'core';
            updatePrices();
        });
    }

    // Interior Setup
    function getInteriorGroup() {
        return document.getElementById('LexiconGroup:main.INTERIOR') ||
               document.querySelector('#LexiconGroup\\:main\\.INTERIOR') ||
               document.querySelector('[data-active-group="INTERIOR"]') ||
               document.querySelector('[data-id="INTERIOR-section"]') ||
               document.querySelector('.group-section--container[data-group-id="INTERIOR"]');
    }

    function renderInteriorHeader(type) {
        const isWhite = type === 'white';
        const nameText = isWhite ? 'White Décor' : 'Tactical Grey Décor';
        const priceText = isWhite ? '$2,000' : 'Included';

        const interiorGroup = getInteriorGroup();
        if (!interiorGroup) return;

        let titleRow = interiorGroup.querySelector('.child-group--selected_option--title');
        const detailsContainer = interiorGroup.querySelector('.child-group--selected_option_details') || interiorGroup.querySelector('.custom-content');

        if (!titleRow && detailsContainer) {
            titleRow = document.createElement('div');
            titleRow.className = 'child-group--selected_option--title';
            detailsContainer.appendChild(titleRow);
        }

        if (titleRow) {
            titleRow.style.display = 'flex';
            titleRow.style.flexDirection = 'row';
            titleRow.style.justifyContent = 'space-between';
            titleRow.style.alignItems = 'center';
            titleRow.style.width = '100%';
            titleRow.style.boxSizing = 'border-box';

            titleRow.innerHTML = `
                <div class="group-option--name-wrapper" style="order: 1; flex: 0 0 auto; text-align: left; justify-content: flex-start; display: flex; width: auto; max-width: none; inline-size: auto; min-inline-size: 0;">
                    <div class="text-loader--content group-option--detail-container_name tds-text--medium tds--no_padding tds-text--h4 coin-text--body-highlighted" tabindex="-1">
                        <span style="font-size: 15px; font-weight: 500; color: #171a20; line-height: 1.2;">${nameText}</span>
                    </div>
                </div>
                <div class="group-option--price" style="order: 2; flex: 0 0 auto; margin-left: auto; text-align: right; justify-content: flex-end; display: flex; width: auto; max-width: none; inline-size: auto; min-inline-size: 0;">
                    <p class="text-loader--content group-option--detail-container_price tds-o-padding_bottom-2 coin-text--body-highlighted" data-id="INTERIOR-price" tabindex="-1" style="margin: 0; padding: 0; width: auto; inline-size: auto; min-inline-size: 0;">
                        <span style="font-size: 15px; font-weight: 500; color: #171a20; line-height: 1.2;">${priceText}</span>
                    </p>
                </div>
            `;
        }
    }

    function selectInterior(type) {
        state.interior = type; // 'tactical_grey' or 'white'

        const radioGrey = document.getElementById('INTERIOR_$IG05');
        const radioWhite = document.getElementById('INTERIOR_$IW05');
        const optGrey = document.querySelector('[data-id="$IG05-option"]');
        const optWhite = document.querySelector('[data-id="$IW05-option"]');

        const isWhite = type === 'white';

        if (radioGrey) {
            radioGrey.checked = !isWhite;
            radioGrey.setAttribute('data-id-selected', !isWhite ? 'true' : 'false');
            if (!isWhite) radioGrey.classList.add('group--option--selected');
            else radioGrey.classList.remove('group--option--selected');
        }
        if (radioWhite) {
            radioWhite.checked = isWhite;
            radioWhite.setAttribute('data-id-selected', isWhite ? 'true' : 'false');
            if (isWhite) radioWhite.classList.add('group--option--selected');
            else radioWhite.classList.remove('group--option--selected');
        }

        if (optGrey) {
            optGrey.setAttribute('data-id-selected', !isWhite ? 'true' : 'false');
            const parent = optGrey.closest('.observer-placeholder');
            if (parent) {
                if (!isWhite) parent.classList.add('is-selected');
                else parent.classList.remove('is-selected');
            }
            const svg = document.querySelector('label[for="INTERIOR_$IG05"] svg') || optGrey.querySelector('svg');
            if (svg) {
                if (!isWhite) svg.classList.add('selected');
                else svg.classList.remove('selected');
            }
        }

        if (optWhite) {
            optWhite.setAttribute('data-id-selected', isWhite ? 'true' : 'false');
            const parent = optWhite.closest('.observer-placeholder');
            if (parent) {
                if (isWhite) parent.classList.add('is-selected');
                else parent.classList.remove('is-selected');
            }
            const svg = document.querySelector('label[for="INTERIOR_$IW05"] svg') || optWhite.querySelector('svg');
            if (svg) {
                if (isWhite) svg.classList.add('selected');
                else svg.classList.remove('selected');
            }
        }

        renderInteriorHeader(type);
        updatePrices();
    }

    const interiorGreyElements = [
        document.querySelector('[data-id="$IG05-option"]'),
        document.getElementById('INTERIOR_$IG05'),
        document.querySelector('label[for="INTERIOR_$IG05"]'),
        document.querySelector('#LexiconGroup\\:main\\.INTERIOR .observer-placeholder:first-child')
    ].filter(Boolean);

    interiorGreyElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
            selectInterior('tactical_grey');
        });
    });

    const interiorWhiteElements = [
        document.querySelector('[data-id="$IW05-option"]'),
        document.getElementById('INTERIOR_$IW05'),
        document.querySelector('label[for="INTERIOR_$IW05"]'),
        document.querySelector('#LexiconGroup\\:main\\.INTERIOR .observer-placeholder:last-child')
    ].filter(Boolean);

    interiorWhiteElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
            selectInterior('white');
        });
    });

    const interiorRadios = document.querySelectorAll('input[name="INTERIOR"]');
    interiorRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (radio.value === '$IW05' || radio.id.includes('IW05')) {
                selectInterior('white');
            } else {
                selectInterior('tactical_grey');
            }
        });
    });

    // Compare Models Link Navigation
    const compareBtn = document.querySelector('[data-id="TRIM-learn-more-button"]');
    if (compareBtn) {
        compareBtn.style.cursor = 'pointer';
        compareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            var isDesign = window.location.pathname.includes('/design');
            window.location.href = isDesign ? '../compare/index.html' : './compare/index.html';
        });
    }

    // Single Native Gallery Carousel Setup
    const gallerySections = Array.from(document.querySelectorAll('.gallery_asset--section'));
    const prevBtn = document.querySelector('[data-id="gallery-prev-button"]') || document.querySelector('.gallery-pagination--arrow:first-child');
    const nextBtn = document.querySelector('[data-id="gallery-next-button"]') || document.querySelector('.gallery-pagination--arrow:last-child');
    const dotsContainer = document.querySelector('.gallery-pagination--dots');

    const totalSlides = gallerySections.length;

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'gallery-pagination--dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(idx) {
        state.currentSlide = (idx + totalSlides) % totalSlides;

        gallerySections.forEach((sec, i) => {
            if (i === state.currentSlide) {
                sec.classList.add('is-active');
                sec.style.display = 'flex';
                sec.style.opacity = '1';
                sec.style.visibility = 'visible';
            } else {
                sec.classList.remove('is-active');
                sec.style.display = 'none';
                sec.style.opacity = '0';
                sec.style.visibility = 'hidden';
            }
        });

        const nativeDots = Array.from(document.querySelectorAll('.gallery-pagination--dot'));
        nativeDots.forEach((dot, i) => {
            if (i === state.currentSlide) {
                dot.classList.add('is-active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('is-active');
                dot.removeAttribute('aria-current');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(state.currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(state.currentSlide + 1);
        });
    }

    // Touch swipe support for gallery on mobile
    const galleryWrapper = document.querySelector('.gallery-outer-wrapper') || document.querySelector('.cf-asset-wrapper');
    if (galleryWrapper) {
        let touchStartX = 0;
        let touchEndX = 0;
        galleryWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        galleryWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 40) {
                goToSlide(state.currentSlide + 1);
            } else if (touchEndX - touchStartX > 40) {
                goToSlide(state.currentSlide - 1);
            }
        }, { passive: true });
    }

    // Initialize initial slide & prices display
    goToSlide(0);
    updatePrices();
    renderInteriorHeader(state.interior);

    // Run periodic check for first 2.5s to ensure dynamic hydration doesn't strip the price
    const interiorTimer = setInterval(() => {
        renderInteriorHeader(state.interior);
    }, 250);
    setTimeout(() => clearInterval(interiorTimer), 3000);

    
    // Tesla Order Modal Controller
    function openTeslaOrderModal(e) {
        if (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }
        const overlay = document.getElementById('tesla-order-modal-overlay');
        const formView = document.getElementById('tsla-order-form-container');
        const successView = document.getElementById('tsla-order-success');
        if (overlay) {
            if (formView) formView.style.display = 'block';
            if (successView) successView.style.display = 'none';

            // Auto-select Cyberbeast if that trim is currently active in state
            const carSelect = document.getElementById('tsla-car-select');
            if (carSelect) {
                if (state.trim === '$MTC04') {
                    carSelect.value = 'Cyberbeast';
                } else {
                    carSelect.value = 'Cybertruck';
                }
            }

            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                const nameInp = document.getElementById('tsla-name-input');
                if (nameInp) nameInp.focus();
            }, 50);
        }
        return false;
    }

    function closeTeslaOrderModal(e) {
        if (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        }
        const overlay = document.getElementById('tesla-order-modal-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
        return false;
    }

    function handleTeslaOrderSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const carModel = document.getElementById('tsla-car-select')?.value || 'Cybertruck';
        const fullName = document.getElementById('tsla-name-input')?.value || '';
        const phone = document.getElementById('tsla-phone-input')?.value || '';
        const address = document.getElementById('tsla-address-input')?.value || '';
        const note = document.getElementById('tsla-note-input')?.value || '';

        // Send submission to cPanel email
    try {
        fetch('/send-email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                form_type: 'Cybertruck Order Reservation',
                model: carModel,
                fullName: fullName,
                phone: phone,
                zipCode: address,
                notes: note
            })
        }).catch(function(e){ console.log(e); });
    } catch(err) {}

    const detailsDiv = document.getElementById('tsla-confirmation-details');
        if (detailsDiv) {
            detailsDiv.innerHTML = '<div style="margin-bottom:6px;"><strong>Selected Model:</strong> ' + carModel + '</div>' +
                '<div style="margin-bottom:6px;"><strong>Full Name:</strong> ' + fullName + '</div>' +
                '<div style="margin-bottom:6px;"><strong>Phone Number:</strong> ' + phone + '</div>' +
                '<div style="margin-bottom:6px;"><strong>Address:</strong> ' + address + '</div>' +
                (note && note.trim() ? '<div><strong>Note:</strong> ' + note + '</div>' : '');
        }

        const formView = document.getElementById('tsla-order-form-container');
        const successView = document.getElementById('tsla-order-success');
        if (formView) formView.style.display = 'none';
        if (successView) successView.style.display = 'block';
        return false;
    }

    window.openTeslaOrderModal = openTeslaOrderModal;
    window.closeTeslaOrderModal = closeTeslaOrderModal;
    window.handleTeslaOrderSubmit = handleTeslaOrderSubmit;

    function initOrderModal() {
        const orderButtons = [
            document.querySelector('[data-id="footer-cta-button"]'),
            document.querySelector('.aside-footer--button'),
            document.querySelector('[data-id="mobile-order-cta"]'),
            document.querySelector('.mobile-order-btn')
        ].filter(Boolean);

        orderButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                openTeslaOrderModal(e);
            });
        });

        const overlay = document.getElementById('tesla-order-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeTeslaOrderModal(e);
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeTeslaOrderModal(e);
            }
        });
    }

    initOrderModal();

    // Multi-tier capture listener for any dynamic or nested Order Now triggers
    ['click', 'pointerdown', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, function(e) {
            const target = e.target;
            if (!target) return;
            const btn = target.closest ? target.closest('button, a, [data-id="footer-cta-button"], .aside-footer--button, [data-id="mobile-order-cta"], .mobile-order-btn') : null;
            if (btn) {
                if (btn.id === 'tsla-form-submit-btn' || btn.closest('#tesla-order-modal-card')) return;
                const txt = (btn.textContent || '').trim().toLowerCase();
                const dataId = btn.getAttribute('data-id') || '';
                const cls = btn.className || '';
                if (txt === 'order now' || dataId === 'footer-cta-button' || dataId === 'mobile-order-cta' || cls.indexOf('aside-footer--button') !== -1 || cls.indexOf('mobile-order-btn') !== -1) {
                    if (eventType === 'click') {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        openTeslaOrderModal(e);
                    }
                }
            }
        }, true);
    });

    console.log("Cybertruck Interactive Studio Initialized Successfully.");
});
