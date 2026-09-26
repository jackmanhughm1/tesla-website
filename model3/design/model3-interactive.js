/**
 * Tesla Model 3 Design Studio - Interactive Controller
 */

function initModel3Studio() {
    const trimData = {
        "$MT367": { code: "$MT367", name: "Model 3 Rear-Wheel Drive", specs: { range: 321, topSpeed: "125 mph", accel: "5.8 sec" }, basePrices: { cash: 38990, lease: 419, finance: 499 } },
        "$MT369": { code: "$MT369", name: "Model 3 Premium Rear-Wheel Drive", specs: { range: 363, topSpeed: "125 mph", accel: "4.9 sec" }, basePrices: { cash: 42490, lease: 429, finance: 549 } },
        "$MT370": { code: "$MT370", name: "Model 3 Premium All-Wheel Drive", specs: { range: 341, topSpeed: "125 mph", accel: "4.2 sec" }, basePrices: { cash: 47490, lease: 499, finance: 619 } },
        "$MT371": { code: "$MT371", name: "Model 3 Performance", specs: { range: 303, topSpeed: "163 mph", accel: "2.9 sec" }, basePrices: { cash: 54990, lease: 649, finance: 799 } }
    };

    const paintOptions = {
        "$PN01": { code: "$PN01", name: "Stealth Grey", price: 0 },
        "$PPSW": { code: "$PPSW", name: "Pearl White Multi-Coat", price: 1000 },
        "$PX02": { code: "$PX02", name: "Diamond Black", price: 1500 },
        "$PR01": { code: "$PR01", name: "Ultra Red", price: 2000 }
    };

    const wheelOptions = {
        "$W38C": { code: "$W38C", name: "18’’ Prismata Wheels", price: 0, rangeDelta: 0 },
        "$W39G": { code: "$W39G", name: "19’’ Nova Wheels", price: 1500, rangeDelta: -20 },
        "$W38P": { code: "$W38P", name: "18’’ Prismata Wheels", price: 0, rangeDelta: 0 },
        "$W39P": { code: "$W39P", name: "19’’ Nova Wheels", price: 1500, rangeDelta: -20 }
    };

    let activeTrim = "$MT367";
    let activePayment = "lease";
    let activePaint = "$PN01";
    let activeWheel = "$W38C";

    const dots = Array.from(document.querySelectorAll(".gallery-pagination--dot"));
    const prevBtn = document.querySelector('[data-id="gallery-prev-button"]');
    const nextBtn = document.querySelector('[data-id="gallery-next-button"]');
    let currentSlide = 0;

    function showSlide(index) {
        const allSections = document.querySelectorAll(".gallery_asset--section");
        if (!allSections.length) return;
        if (index < 0) index = allSections.length - 1;
        if (index >= allSections.length) index = 0;
        currentSlide = index;

        allSections.forEach((sec, i) => {
            if (i === currentSlide) {
                sec.classList.add("is-active");
                sec.style.cssText = "opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; z-index: 5 !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; display: flex !important; align-items: center; justify-content: center; transform: scale(1) !important; transition: opacity 0.4s ease, transform 0.4s ease;";
            } else {
                sec.classList.remove("is-active");
                sec.style.cssText = "opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; z-index: 0 !important; position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; display: flex !important; align-items: center; justify-content: center; transform: scale(0.98) !important; transition: opacity 0.4s ease, transform 0.4s ease;";
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add("is-active");
                dot.setAttribute("aria-current", "true");
            } else {
                dot.classList.remove("is-active");
                dot.removeAttribute("aria-current");
            }
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            showSlide(i);
        });
    });

    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

    function updatePriceAndSpecs() {
        const trim = trimData[activeTrim] || trimData["$MT367"];
        const paint = paintOptions[activePaint] || paintOptions["$PN01"];
        const wheel = wheelOptions[activeWheel] || wheelOptions["$W38P"];

        const finalRange = trim.specs.range + wheel.rangeDelta;

        // Update 3-column specs bar
        const rangeValEl = document.querySelector('[data-id="range"] span:first-child');
        const speedValEl = document.querySelector('[data-id="top-speed"] span:first-child');
        const accelValEl = document.querySelector('[data-id="acceleration"] span:first-child');
        if (rangeValEl) rangeValEl.textContent = finalRange;
        if (speedValEl) speedValEl.textContent = trim.specs.topSpeed.replace(' mph', '');
        if (accelValEl) accelValEl.textContent = trim.specs.accel.replace(' sec', '');

        const rangeDisplay = document.querySelector('[data-id*="WHEELS-certified_range"]');
        if (rangeDisplay) {
            rangeDisplay.textContent = `Range (EPA est.) : ${finalRange}mi`;
        }

        const addedOptionsCost = paint.price + wheel.price;
        let formattedPrice = "";
        let disclaimerText = "";

        if (activePayment === "cash") {
            const totalCash = trim.basePrices.cash + addedOptionsCost;
            formattedPrice = `$${totalCash.toLocaleString()}`;
            disclaimerText = "Vehicle Price";
        } else if (activePayment === "lease") {
            const estLease = trim.basePrices.lease + Math.round(addedOptionsCost / 36);
            formattedPrice = `$${estLease} /mo`;
            disclaimerText = "Est. Lease";
        } else if (activePayment === "finance") {
            const estFinance = trim.basePrices.finance + Math.round(addedOptionsCost / 60);
            formattedPrice = `$${estFinance} /mo`;
            disclaimerText = "Est. Financing";
        }

        // Update Bottom Sticky Footer Price & Subtext
        const footerPriceEls = document.querySelectorAll('[data-id*="mobile-footer-price"], [data-id*="footer-price"], .summary-panel--aside-footer .tds-text--h3, .mobile-bottom-bar--price');
        footerPriceEls.forEach(el => {
            el.innerHTML = `<span>${formattedPrice}</span>`;
        });

        const footerDisclaimerEls = document.querySelectorAll('[data-id*="footer-price-disclaimer"], [data-id*="footer-price-type"], .mobile-bottom-bar--subtext');
        footerDisclaimerEls.forEach(el => {
            el.textContent = disclaimerText;
        });

        // Update Variant Option Card Prices
        const mt367El = document.querySelector('[data-id*="$MT367-price"]');
        const premCatEl = document.querySelector('[data-id*="Premium-trim-category-price"]');
        const mt369El = document.querySelector('[data-id*="$MT369-price"]');
        const mt370El = document.querySelector('[data-id*="$MT370-price"]');
        const mt371El = document.querySelector('[data-id*="$MT371-price"]');

        if (activePayment === "cash") {
            if (mt367El) mt367El.innerHTML = `<span>$38,990</span>`;
            if (premCatEl) premCatEl.innerHTML = `<span>From $42,490</span>`;
            if (mt369El) mt369El.innerHTML = `<span>$42,490</span>`;
            if (mt370El) mt370El.innerHTML = `<span>$47,490</span>`;
            if (mt371El) mt371El.innerHTML = `<span>$54,990</span>`;
        } else if (activePayment === "lease") {
            if (mt367El) mt367El.innerHTML = `<span>$419<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (premCatEl) premCatEl.innerHTML = `<span>From $429<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt369El) mt369El.innerHTML = `<span>$429<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt370El) mt370El.innerHTML = `<span>$499<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt371El) mt371El.innerHTML = `<span>$649<span class="tds-text--caption">&nbsp;/mo</span></span>`;
        } else {
            if (mt367El) mt367El.innerHTML = `<span>$499<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (premCatEl) premCatEl.innerHTML = `<span>From $549<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt369El) mt369El.innerHTML = `<span>$549<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt370El) mt370El.innerHTML = `<span>$619<span class="tds-text--caption">&nbsp;/mo</span></span>`;
            if (mt371El) mt371El.innerHTML = `<span>$799<span class="tds-text--caption">&nbsp;/mo</span></span>`;
        }

        // Highlight selected card
        const card1 = document.querySelector('[data-id="$MT367-option"]');
        const card2 = document.querySelector('[data-id="Premium-trim-category"]');
        const card3 = document.querySelector('[data-id="$MT371-option"]');

        [card1, card2, card3].forEach(c => {
            if (c) {
                c.classList.remove("is-selected");
                c.removeAttribute("data-id-selected");
            }
        });

        if (activeTrim === "$MT367" && card1) {
            card1.classList.add("is-selected");
            card1.setAttribute("data-id-selected", "true");
        } else if ((activeTrim === "$MT369" || activeTrim === "$MT370") && card2) {
            card2.classList.add("is-selected");
            card2.setAttribute("data-id-selected", "true");
        } else if (activeTrim === "$MT371" && card3) {
            card3.classList.add("is-selected");
            card3.setAttribute("data-id-selected", "true");
        }
    }

    function updatePaymentUI() {
        const tabs = document.querySelectorAll('.tds-tab, [role="tab"], button[data-id*="tab"], button[id*="finplat"]');
        tabs.forEach(btn => {
            const txt = (btn.textContent || "").trim().toLowerCase();
            const id = btn.id || "";
            const dataId = btn.getAttribute("data-id") || "";
            const finProduct = btn.getAttribute("financeproductid") || "";

            let isMatch = false;
            if (activePayment === "cash" && (txt === "cash" || id === "cash" || dataId.includes("cash") || finProduct === "cash")) isMatch = true;
            if (activePayment === "lease" && (txt === "lease" || id.includes("LEASE") || dataId.includes("LEASE") || finProduct.includes("LEASE"))) isMatch = true;
            if (activePayment === "finance" && (txt === "finance" || id.includes("LOAN") || dataId.includes("LOAN") || finProduct.includes("LOAN"))) isMatch = true;

            btn.setAttribute("aria-selected", isMatch ? "true" : "false");
            btn.setAttribute("tabindex", isMatch ? "0" : "-1");
            if (isMatch) {
                btn.classList.add("tds-tab--active", "is-active", "active");
                btn.style.fontWeight = "700";
                btn.style.color = "#171a20";
                btn.style.borderBottom = "2px solid #171a20";
            } else {
                btn.classList.remove("tds-tab--active", "is-active", "active");
                btn.style.fontWeight = "400";
                btn.style.color = "#5c5e62";
                btn.style.borderBottom = "none";
            }
        });

        updatePriceAndSpecs();
    }

    function handleTrimClick(e) {
        const optionEl = e.target.closest('[data-id*="-option"], [data-id*="trim-category"]');
        if (!optionEl) return;

        const dataId = optionEl.getAttribute("data-id") || "";
        if (dataId.includes("$MT367")) {
            activeTrim = "$MT367";
        } else if (dataId.includes("Premium") || dataId.includes("$MT369")) {
            activeTrim = "$MT369";
        } else if (dataId.includes("$MT370")) {
            activeTrim = "$MT370";
        } else if (dataId.includes("$MT371")) {
            activeTrim = "$MT371";
        }
        updatePriceAndSpecs();
    }

    function handleTabClick(e) {
        const tabBtn = (e.target && e.target.closest) ? e.target.closest('.tds-tab, [role="tab"], button[data-id*="tab"], button[id*="finplat"], [financeproductid], .FinanceToggle button') : null;
        if (!tabBtn) return;

        const txt = (tabBtn.textContent || "").trim().toLowerCase();
        const id = tabBtn.id || "";
        const dataId = tabBtn.getAttribute("data-id") || "";
        const finProduct = tabBtn.getAttribute("financeproductid") || "";

        let newPayment = null;
        if (txt.includes("cash") || id === "cash" || dataId.includes("cash") || finProduct === "cash") {
            newPayment = "cash";
        } else if (txt.includes("lease") || id.includes("LEASE") || dataId.includes("LEASE") || finProduct.includes("LEASE")) {
            newPayment = "lease";
        } else if (txt.includes("finance") || id.includes("LOAN") || dataId.includes("LOAN") || finProduct.includes("LOAN")) {
            newPayment = "finance";
        }

        if (newPayment) {
            window.setTeslaPaymentMethod(newPayment);
        }
    }

    function handleSwatchClick(e) {
        const paintSwatch = e.target.closest('#LexiconGroup\\:main\\.EXTERIOR .group-PAINT .observer-placeholder, #LexiconGroup\\:main\\.EXTERIOR .group-PAINT input, #LexiconGroup\\:main\\.EXTERIOR .group-PAINT label');
        if (paintSwatch) {
            const container = paintSwatch.closest('.observer-placeholder');
            const input = container ? container.querySelector('input[name="PAINT"]') : null;
            if (input && input.value) {
                activePaint = input.value;
                updateExteriorSwatches();
                updatePriceAndSpecs();
            }
        }

        const wheelSwatch = e.target.closest('#LexiconGroup\\:main\\.EXTERIOR .group-WHEELS .observer-placeholder, #LexiconGroup\\:main\\.EXTERIOR .group-WHEELS input, #LexiconGroup\\:main\\.EXTERIOR .group-WHEELS label');
        if (wheelSwatch) {
            const container = wheelSwatch.closest('.observer-placeholder');
            const input = container ? container.querySelector('input[name="WHEELS"]') : null;
            if (input && input.value) {
                activeWheel = input.value;
                updateExteriorSwatches();
                updatePriceAndSpecs();
            }
        }
    }

    function updateExteriorSwatches() {
        const paint = paintOptions[activePaint] || paintOptions["$PN01"];
        const wheel = wheelOptions[activeWheel] || wheelOptions["$W38C"] || { name: "18’’ Prismata Wheels", price: 0 };

        const paintPriceText = paint.price === 0 ? "Included" : `$${paint.price.toLocaleString()}`;
        const wheelPriceText = wheel.price === 0 ? "Included" : `$${wheel.price.toLocaleString()}`;

        // Update Paint Name & Price
        const paintNameEl = document.querySelector('.group-PAINT .group-option--detail-container_name span, [data-id="PAINT-name"] span');
        if (paintNameEl) paintNameEl.textContent = paint.name;

        const paintPriceEl = document.querySelector('.group-PAINT [data-id="PAINT-price"] span, .group-PAINT .group-option--price span');
        if (paintPriceEl) {
            paintPriceEl.textContent = paintPriceText;
        }

        // Update Paint Swatch selection ring
        const paintInputs = document.querySelectorAll('input[name="PAINT"]');
        paintInputs.forEach(inp => {
            const isMatch = inp.value === activePaint;
            inp.checked = isMatch;
            inp.setAttribute('data-id-selected', isMatch ? "true" : "false");
            const svg = inp.closest('.observer-placeholder') ? inp.closest('.observer-placeholder').querySelector('.group--options_asset') : null;
            if (svg) {
                if (isMatch) svg.classList.add('selected');
                else svg.classList.remove('selected');
            }
        });

        // Update Wheels Name & Price
        const wheelNameEl = document.querySelector('.group-WHEELS .group-option--detail-container_name span, [data-id="WHEELS-name"] span');
        if (wheelNameEl) wheelNameEl.textContent = wheel.name;

        const wheelPriceEl = document.querySelector('.group-WHEELS [data-id="WHEELS-price"] span, .group-WHEELS .group-option--price span');
        if (wheelPriceEl) {
            wheelPriceEl.textContent = wheelPriceText;
        }

        // Update Wheel Swatch selection ring
        const wheelInputs = document.querySelectorAll('input[name="WHEELS"]');
        wheelInputs.forEach(inp => {
            const isMatch = inp.value === activeWheel;
            inp.checked = isMatch;
            inp.setAttribute('data-id-selected', isMatch ? "true" : "false");
            const svg = inp.closest('.observer-placeholder') ? inp.closest('.observer-placeholder').querySelector('.group--options_asset') : null;
            if (svg) {
                if (isMatch) svg.classList.add('selected');
                else svg.classList.remove('selected');
            }
        });
    }

    ["click", "touchstart", "pointerdown"].forEach(evtName => {
        document.addEventListener(evtName, handleTabClick, { capture: true, passive: true });
        document.addEventListener(evtName, handleTrimClick, { capture: true, passive: true });
        document.addEventListener(evtName, handleSwatchClick, { capture: true, passive: true });
    });

    window.setTeslaPaymentMethod = function(method) {
        if (!method) return;
        activePayment = method;
        updatePaymentUI();
    };

    updatePaymentUI();
    updateExteriorSwatches();
    showSlide(0);

    initOrderModal();
}

// --- POPUP ORDER MODAL IMPLEMENTATION ---
function openTeslaOrderModal(e) {
    if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
    initOrderModal();
    const overlay = document.getElementById('tesla-order-modal-overlay');
    const formView = document.getElementById('tsla-order-form-container');
    const successView = document.getElementById('tsla-order-success');
    if (overlay) {
        if (formView) formView.style.display = 'block';
        if (successView) successView.style.display = 'none';
        overlay.style.display = 'flex';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const nameInp = document.getElementById('tsla-name-input');
            if (nameInp) nameInp.focus();
        }, 100);
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
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    return false;
}

function handleTeslaOrderSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const carModel = document.getElementById('tsla-car-select') ? document.getElementById('tsla-car-select').value : 'Model 3';
    const fullName = document.getElementById('tsla-name-input') ? document.getElementById('tsla-name-input').value : '';
    const phone = document.getElementById('tsla-phone-input') ? document.getElementById('tsla-phone-input').value : '';
    const address = document.getElementById('tsla-address-input') ? document.getElementById('tsla-address-input').value : '';
    const note = document.getElementById('tsla-note-input') ? document.getElementById('tsla-note-input').value : '';

    // Send submission to cPanel email
    try {
        fetch('/send-email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                form_type: 'Model 3 Order Reservation',
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
        detailsDiv.innerHTML = `
            <div style="margin-bottom:6px;"><strong>Selected Model:</strong> ${carModel}</div>
            <div style="margin-bottom:6px;"><strong>Full Name:</strong> ${fullName}</div>
            <div style="margin-bottom:6px;"><strong>Phone Number:</strong> ${phone}</div>
            <div style="margin-bottom:6px;"><strong>Address:</strong> ${address}</div>
            ${note && note.trim() ? `<div><strong>Note:</strong> ${note}</div>` : ''}
        `;
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
    let modalOverlay = document.getElementById('tesla-order-modal-overlay');
    if (!modalOverlay) {
        if (!document.getElementById('tesla-order-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'tesla-order-modal-styles';
            style.textContent = `
                #tesla-order-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.65);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999999;
                    padding: 16px;
                    box-sizing: border-box;
                    opacity: 0;
                    transition: opacity 0.25s ease;
                }
                #tesla-order-modal-overlay.active {
                    display: flex !important;
                    opacity: 1;
                }
                #tesla-order-modal-card {
                    background: #ffffff;
                    width: 100%;
                    max-width: 460px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    color: #171a20;
                    padding: 28px 24px 24px;
                    box-sizing: border-box;
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }

        modalOverlay = document.createElement('div');
        modalOverlay.id = 'tesla-order-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-label', 'Order Vehicle Form');

        modalOverlay.innerHTML = `
            <div id="tesla-order-modal-card">
                <button type="button" id="tsla-modal-close-btn" onclick="closeTeslaOrderModal(event)" style="position:absolute;top:18px;right:18px;width:32px;height:32px;border-radius:50%;background:#f4f4f4;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#393c41;padding:0;" aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div id="tsla-order-form-container">
                    <div style="margin-bottom:20px;padding-right:36px;text-align:left;">
                        <h2 style="font-size:22px;font-weight:700;letter-spacing:-0.4px;margin:0 0 6px 0;color:#171a20;line-height:1.2;">Complete Your Order</h2>
                        <p style="font-size:13px;color:#5c5e62;margin:0;line-height:1.4;">Reserve your vehicle configuration with Tesla.</p>
                    </div>

                    <form id="tsla-order-form" onsubmit="return handleTeslaOrderSubmit(event)">
                        <div style="margin-bottom:14px;display:flex;flex-direction:column;text-align:left;">
                            <label style="font-size:11px;font-weight:600;color:#393c41;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px;" for="tsla-car-select">Car Model *</label>
                            <select id="tsla-car-select" name="carModel" required style="width:100%;box-sizing:border-box;background:#f4f4f6;border:1px solid #d0d1d2;border-radius:8px;padding:11px 13px;font-size:14px;color:#171a20;outline:none;cursor:pointer;">
                                <option value="Model 3" selected>Model 3</option>
                                <option value="Model Y L Premium">Model Y L Premium</option>
                                <option value="Model Y">Model Y</option>
                            </select>
                        </div>

                        <div style="margin-bottom:14px;display:flex;flex-direction:column;text-align:left;">
                            <label style="font-size:11px;font-weight:600;color:#393c41;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px;" for="tsla-name-input">Name *</label>
                            <input type="text" id="tsla-name-input" name="fullName" placeholder="Full name" required autocomplete="name" style="width:100%;box-sizing:border-box;background:#f4f4f6;border:1px solid #d0d1d2;border-radius:8px;padding:11px 13px;font-size:14px;color:#171a20;outline:none;">
                        </div>

                        <div style="margin-bottom:14px;display:flex;flex-direction:column;text-align:left;">
                            <label style="font-size:11px;font-weight:600;color:#393c41;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px;" for="tsla-phone-input">Phone Number *</label>
                            <input type="tel" id="tsla-phone-input" name="phoneNumber" placeholder="(555) 000-0000" required autocomplete="tel" style="width:100%;box-sizing:border-box;background:#f4f4f6;border:1px solid #d0d1d2;border-radius:8px;padding:11px 13px;font-size:14px;color:#171a20;outline:none;">
                        </div>

                        <div style="margin-bottom:14px;display:flex;flex-direction:column;text-align:left;">
                            <label style="font-size:11px;font-weight:600;color:#393c41;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px;" for="tsla-address-input">Address *</label>
                            <input type="text" id="tsla-address-input" name="address" placeholder="Street address, city, state, zip" required autocomplete="street-address" style="width:100%;box-sizing:border-box;background:#f4f4f6;border:1px solid #d0d1d2;border-radius:8px;padding:11px 13px;font-size:14px;color:#171a20;outline:none;">
                        </div>

                        <div style="margin-bottom:14px;display:flex;flex-direction:column;text-align:left;">
                            <label style="font-size:11px;font-weight:600;color:#393c41;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px;" for="tsla-note-input">Note</label>
                            <textarea id="tsla-note-input" name="note" placeholder="Any special notes or delivery preferences..." rows="3" style="width:100%;box-sizing:border-box;background:#f4f4f6;border:1px solid #d0d1d2;border-radius:8px;padding:11px 13px;font-size:14px;color:#171a20;outline:none;resize:vertical;min-height:68px;"></textarea>
                        </div>

                        <button type="submit" id="tsla-form-submit-btn" style="background-color:#3e6ae1;color:#ffffff;width:100%;height:44px;border-radius:8px;font-size:14px;font-weight:600;border:none;cursor:pointer;margin-top:10px;display:flex;align-items:center;justify-content:center;transition:background-color 0.2s;">Order Now</button>
                    </form>
                </div>

                <div id="tsla-order-success" style="display:none;text-align:center;padding:12px 6px;">
                    <div style="width:52px;height:52px;background:#e6f4ea;color:#137333;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 style="font-size:20px;font-weight:700;color:#171a20;margin:0 0 8px 0;">Order Submitted!</h2>
                    <p style="font-size:13.5px;color:#5c5e62;line-height:1.5;margin:0 0 18px 0;">Thank you! Your order reservation has been placed. A Tesla Advisor will be in touch shortly.</p>
                    <div id="tsla-confirmation-details" style="background:#f4f4f6;border-radius:8px;padding:14px;text-align:left;font-size:13px;line-height:1.6;margin-bottom:20px;"></div>
                    <button type="button" onclick="closeTeslaOrderModal(event)" style="background-color:#3e6ae1;color:#ffffff;width:100%;height:44px;border-radius:8px;font-size:14px;font-weight:600;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">Done</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
    }

    const form = document.getElementById('tsla-order-form');
    if (form) {
        form.onsubmit = handleTeslaOrderSubmit;
    }

    modalOverlay.onclick = function(e) {
        if (e.target === modalOverlay) closeTeslaOrderModal(e);
    };

    const closeBtn = document.getElementById('tsla-modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeTeslaOrderModal;
    }
}

// Global click capture to intercept ANY order button
['click', 'pointerdown', 'touchstart'].forEach(function(evtName) {
    document.addEventListener(evtName, function(e) {
        const target = e.target;
        if (!target) return;
        const btn = target.closest ? target.closest('button, a, [data-id="footer-cta-button"], .aside-footer--button, .mobile-bottom-bar--order-btn') : null;
        if (btn) {
            if (btn.id === 'tsla-form-submit-btn' || btn.closest('#tesla-order-modal-card')) {
                return;
            }
            const txt = (btn.textContent || '').trim().toLowerCase();
            const dataId = btn.getAttribute('data-id') || '';
            const cls = btn.className || '';

            if (
                txt === 'order now' ||
                dataId === 'footer-cta-button' ||
                cls.indexOf('aside-footer--button') !== -1 ||
                cls.indexOf('mobile-bottom-bar--order-btn') !== -1
            ) {
                if (evtName === 'click') {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    openTeslaOrderModal(e);
                }
            }
        }
    }, true);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeTeslaOrderModal(e);
});

initOrderModal();
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
        initOrderModal();
        initModel3Studio();
    });
} else {
    initOrderModal();
    initModel3Studio();
}

