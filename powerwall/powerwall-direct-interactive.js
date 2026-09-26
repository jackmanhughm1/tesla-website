// Powerwall Direct Configurator Interactive Script

document.addEventListener("DOMContentLoaded", function() {
    console.log("Powerwall Direct Configurator Interactive Initialized");

    // Remove any modal open / scroll lock classes added by vendor scripts
    function unlockScroll() {
        document.body.classList.remove("tds-modal--is-open", "tds-site-header-panel--is-open", "tds--prevent-scroll");
        document.documentElement.classList.remove("tds-modal--is-open", "tds-site-header-panel--is-open", "tds--prevent-scroll");
        if (window.innerWidth <= 768) {
            document.documentElement.style.overflowY = "auto";
            document.documentElement.style.overflowX = "hidden";
            document.documentElement.style.height = "100%";
            document.body.style.overflow = "visible";
            document.body.style.overflowY = "visible";
            document.body.style.overflowX = "visible";
            document.body.style.height = "auto";
            document.body.style.minHeight = "100%";
            document.body.style.position = "static";
        }
    }
    unlockScroll();
    window.addEventListener("load", unlockScroll);
    window.addEventListener("resize", unlockScroll);
    setInterval(unlockScroll, 250);

    const bodyObserver = new MutationObserver(function(mutations) {
        if (document.body.classList.contains("tds-modal--is-open")) {
            document.body.classList.remove("tds-modal--is-open");
        }
        if (document.body.classList.contains("tds-site-header-panel--is-open")) {
            document.body.classList.remove("tds-site-header-panel--is-open");
        }
        if (document.body.classList.contains("tds--prevent-scroll")) {
            document.body.classList.remove("tds--prevent-scroll");
        }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });

    // Address Edit Interaction
    const editToggleBtn = document.getElementById("address-edit-toggle-btn");
    const editHeaderBtn = document.getElementById("address-edit-button");
    const displayView = document.getElementById("address-display-view");
    const editView = document.getElementById("address-edit-view");
    const saveBtn = document.getElementById("address-save-btn");
    const cancelBtn = document.getElementById("address-cancel-btn");
    const streetInput = document.getElementById("address-input-street");
    const cityStateZipInput = document.getElementById("address-input-citystatezip");
    const line1Text = document.getElementById("address-line1-text");
    const line2Text = document.getElementById("address-line2-text");

    const savedAddr = localStorage.getItem("tesla_powerwall_user_address");
    if (savedAddr) {
        const parts = savedAddr.split(",");
        if (parts.length > 1) {
            const street = parts[0].trim();
            const cityStateZip = parts.slice(1).join(",").trim();
            if (line1Text) line1Text.textContent = street;
            if (line2Text) line2Text.textContent = cityStateZip;
            if (streetInput) streetInput.value = street;
            if (cityStateZipInput) cityStateZipInput.value = cityStateZip;
            if (editHeaderBtn) editHeaderBtn.textContent = savedAddr;
        } else {
            if (line1Text) line1Text.textContent = savedAddr;
            if (streetInput) streetInput.value = savedAddr;
            if (editHeaderBtn) editHeaderBtn.textContent = savedAddr;
        }
    }

    function openAddressEdit() {
        if (displayView && editView) {
            displayView.style.display = "none";
            editView.style.display = "block";
            if (streetInput) streetInput.focus();
        }
    }

    function closeAddressEdit() {
        if (displayView && editView) {
            editView.style.display = "none";
            displayView.style.display = "block";
        }
    }

    if (editToggleBtn) editToggleBtn.addEventListener("click", openAddressEdit);
    if (displayView) displayView.addEventListener("click", openAddressEdit);

    if (cancelBtn) cancelBtn.addEventListener("click", closeAddressEdit);

    if (saveBtn) {
        saveBtn.addEventListener("click", function() {
            const streetVal = streetInput ? streetInput.value.trim() : "";
            const cityStateZipVal = cityStateZipInput ? cityStateZipInput.value.trim() : "";

            if (streetVal && line1Text) line1Text.textContent = streetVal;
            if (cityStateZipVal && line2Text) line2Text.textContent = cityStateZipVal;

            if (editHeaderBtn && streetVal) {
                editHeaderBtn.textContent = streetVal + (cityStateZipVal ? ", " + cityStateZipVal : "");
            }

            closeAddressEdit();

            // Brief confirmation toast
            const toast = document.createElement("div");
            toast.style.cssText = `
                position: fixed;
                bottom: 32px;
                right: 32px;
                background: #171a20;
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 6px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.25);
                z-index: 9999999;
                font-size: 14px;
                font-weight: 500;
            `;
            toast.innerHTML = "✓ Address Updated";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
        });
    }

    // Custom Tesla Country Dropdown Menu (Fixed/Absolute floating overlay)
    const countryTriggerBtn = document.querySelector(".tds-dropdown-trigger");
    const listboxOptions = document.querySelectorAll(".tds-listbox-option");

    if (countryTriggerBtn) {
        // Parse countries from DOM
        const countries = [];
        if (listboxOptions.length > 0) {
            listboxOptions.forEach(opt => {
                const label = opt.getAttribute("data-tds-label") || "";
                const fullText = opt.textContent.trim().replace(/\s+/g, " ");
                countries.push({ label: label, text: fullText });
            });
        } else {
            countries.push(
                { label: "US +1", text: "United States +1" },
                { label: "CA +1", text: "Canada +1" },
                { label: "GB +44", text: "United Kingdom +44" },
                { label: "NG +234", text: "Nigeria +234" },
                { label: "DE +49", text: "Germany +49" },
                { label: "FR +33", text: "France +33" },
                { label: "AU +61", text: "Australia +61" },
                { label: "MX +52", text: "Mexico +52" },
                { label: "IN +91", text: "India +91" },
                { label: "JP +81", text: "Japan +81" }
            );
        }

        // Create floating dropdown menu element
        let menu = document.getElementById("custom-tesla-country-menu");
        if (!menu) {
            menu = document.createElement("div");
            menu.id = "custom-tesla-country-menu";
            menu.style.cssText = `
                position: fixed;
                display: none;
                width: 290px;
                max-height: 320px;
                background: #ffffff;
                border: 1px solid #d0d1d2;
                border-radius: 12px;
                box-shadow: 0 16px 36px rgba(0,0,0,0.22);
                z-index: 99999999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden;
                flex-direction: column;
            `;

            // Search header
            const searchBox = document.createElement("div");
            searchBox.style.cssText = "padding: 10px; border-bottom: 1px solid #eeeeee; background: #fafafa;";
            searchBox.innerHTML = `<input type="text" id="custom-country-search" placeholder="Search country or code..." style="width: 100%; padding: 8px 12px; border: 1px solid #d0d1d2; border-radius: 6px; font-size: 13px; box-sizing: border-box; outline: none; background: #ffffff;">`;
            menu.appendChild(searchBox);

            // Options container
            const listContainer = document.createElement("div");
            listContainer.id = "custom-country-list-container";
            listContainer.style.cssText = "max-height: 250px; overflow-y: auto; padding: 4px 0;";
            menu.appendChild(listContainer);

            document.body.appendChild(menu);

            function renderOptions(filterText = "") {
                listContainer.innerHTML = "";
                const query = filterText.toLowerCase().trim();

                const filtered = countries.filter(c => 
                    c.label.toLowerCase().includes(query) || c.text.toLowerCase().includes(query)
                );

                if (filtered.length === 0) {
                    listContainer.innerHTML = `<div style="padding: 16px; font-size: 13px; color: #8e8e93; text-align: center;">No country found</div>`;
                    return;
                }

                filtered.forEach(c => {
                    const item = document.createElement("div");
                    item.style.cssText = "padding: 10px 16px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 13px; transition: background 0.15s ease;";
                    
                    const countryNameOnly = c.text.replace(c.label, '').trim();

                    item.innerHTML = `
                        <span style="font-weight: 600; color: #171a20;">${c.label}</span>
                        <span style="color: #5c5e62; font-size: 12px; max-width: 160px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${countryNameOnly}</span>
                    `;

                    item.addEventListener("mouseenter", () => item.style.background = "#f4f4f4");
                    item.addEventListener("mouseleave", () => item.style.background = "transparent");

                    item.addEventListener("click", (e) => {
                        e.stopPropagation();
                        const span = countryTriggerBtn.querySelector("span");
                        if (span) span.textContent = c.label;
                        menu.style.display = "none";
                        const phoneInput = document.getElementById("phoneNumber");
                        if (phoneInput) phoneInput.focus();
                    });

                    listContainer.appendChild(item);
                });
            }

            renderOptions();

            const searchInput = document.getElementById("custom-country-search");
            if (searchInput) {
                searchInput.addEventListener("input", (e) => {
                    renderOptions(e.target.value);
                });
            }
        }

        countryTriggerBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();

            if (menu.style.display === "flex" || menu.style.display === "block") {
                menu.style.display = "none";
            } else {
                const rect = countryTriggerBtn.getBoundingClientRect();
                menu.style.top = (rect.bottom + 6) + "px";
                menu.style.left = rect.left + "px";
                menu.style.display = "flex";

                const searchInput = document.getElementById("custom-country-search");
                if (searchInput) {
                    searchInput.value = "";
                    const listContainer = document.getElementById("custom-country-list-container");
                    if (listContainer) {
                        listContainer.innerHTML = "";
                        countries.forEach(c => {
                            const item = document.createElement("div");
                            item.style.cssText = "padding: 10px 16px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 13px; transition: background 0.15s ease;";
                            
                            const countryNameOnly = c.text.replace(c.label, '').trim();

                            item.innerHTML = `
                                <span style="font-weight: 600; color: #171a20;">${c.label}</span>
                                <span style="color: #5c5e62; font-size: 12px; max-width: 160px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${countryNameOnly}</span>
                            `;

                            item.addEventListener("mouseenter", () => item.style.background = "#f4f4f4");
                            item.addEventListener("mouseleave", () => item.style.background = "transparent");

                            item.addEventListener("click", (evt) => {
                                evt.stopPropagation();
                                const span = countryTriggerBtn.querySelector("span");
                                if (span) span.textContent = c.label;
                                menu.style.display = "none";
                                const phoneInput = document.getElementById("phoneNumber");
                                if (phoneInput) phoneInput.focus();
                            });

                            listContainer.appendChild(item);
                        });
                    }
                    setTimeout(() => searchInput.focus(), 50);
                }
            }
        });

        document.addEventListener("click", function(e) {
            if (menu && !menu.contains(e.target) && !countryTriggerBtn.contains(e.target)) {
                menu.style.display = "none";
            }
        });
    }

    // Form validation for "Have an Installer Contact Me" button
    const reserveBtn = document.querySelector(".styles-module-scss-module__F8niSa__reserveButton, [data-test='order-form-reserve-button']");
    const firstNameInput = document.querySelector("input[name='firstName']");
    const lastNameInput = document.querySelector("input[name='lastName']");
    const emailInput = document.querySelector("input[name='emailAddress']");
    const confirmEmailInput = document.querySelector("input[name='confirmEmailAddress']");
    const phoneInput = document.querySelector("input[name='phoneNumber'], #phoneNumber");

    function checkFormValidity() {
        if (!reserveBtn) return;

        const fn = firstNameInput ? firstNameInput.value.trim() : "";
        const ln = lastNameInput ? lastNameInput.value.trim() : "";
        const em = emailInput ? emailInput.value.trim() : "";
        const ph = phoneInput ? phoneInput.value.trim() : "";

        // Auto-fill confirm email if missing
        if (confirmEmailInput && em && !confirmEmailInput.value) {
            confirmEmailInput.value = em;
        }

        const isValid = (fn.length > 0 && ln.length > 0 && em.length > 0 && ph.length > 0);

        if (isValid) {
            reserveBtn.removeAttribute("disabled");
            reserveBtn.style.cssText = "background-color: #3e6ae1 !important; color: #ffffff !important; opacity: 1 !important; cursor: pointer !important; pointer-events: auto !important;";
        } else {
            reserveBtn.setAttribute("disabled", "disabled");
            reserveBtn.style.cssText = "";
        }
    }

    const formInputs = [firstNameInput, lastNameInput, emailInput, confirmEmailInput, phoneInput];
    formInputs.forEach(input => {
        if (input) {
            input.addEventListener("input", checkFormValidity);
            input.addEventListener("keyup", checkFormValidity);
            input.addEventListener("change", checkFormValidity);
        }
    });

    if (reserveBtn) {
        reserveBtn.addEventListener("click", function(e) {
            if (reserveBtn.hasAttribute("disabled")) return;
            e.preventDefault();

            const toast = document.createElement("div");
            toast.style.cssText = `
                position: fixed;
                bottom: 32px;
                right: 32px;
                background: #171a20;
                color: #ffffff;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                z-index: 9999999;
                font-size: 15px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 12px;
            `;
            toast.innerHTML = `<span>✓</span> Request Sent! Venture Solar will contact you shortly.`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 4000);
        });
    }

    // Powerwall Options Selection
    const optionLabels = document.querySelectorAll(".styles-module-scss-module__2QKsWW__powerwallOptionGroup label.tds-form-input--option");
    const optionRadios = document.querySelectorAll(".styles-module-scss-module__2QKsWW__powerwallOptionGroup input[type='radio']");

    function updateSelectedOption() {
        optionLabels.forEach(lbl => {
            const radioId = lbl.getAttribute("for");
            const radio = document.getElementById(radioId);
            if (radio && radio.checked) {
                lbl.classList.add("is-selected");
            } else {
                lbl.classList.remove("is-selected");
            }
        });
    }

    optionLabels.forEach(lbl => {
        lbl.addEventListener("click", function(e) {
            const radioId = lbl.getAttribute("for");
            const radio = document.getElementById(radioId);
            if (radio) {
                radio.checked = true;
                updateSelectedOption();
            }
        });
    });

    optionRadios.forEach(radio => {
        radio.addEventListener("change", updateSelectedOption);
    });

    updateSelectedOption();

    // Run initial check
    checkFormValidity();

    // Certified Installer Modal Controller
    function openInstallerModal(e) {
        if (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        }

        const phoneVal = (document.getElementById("phoneNumber")?.value || document.querySelector("input[name='phoneNumber']")?.value || "").trim();
        const countryCode = document.querySelector(".tds-dropdown-trigger span")?.textContent?.trim() || "US +1";
        const firstName = document.querySelector("input[name='firstName']")?.value?.trim() || "";
        const lastName = document.querySelector("input[name='lastName']")?.value?.trim() || "";
        const fullName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : "";
        const email = document.querySelector("input[name='emailAddress']")?.value?.trim() || "";
        const addrLine1 = document.getElementById("address-line1-text")?.textContent?.trim() || "";
        const addrLine2 = document.getElementById("address-line2-text")?.textContent?.trim() || "";
        const fullAddress = addrLine1 ? (addrLine1 + (addrLine2 ? ", " + addrLine2 : "")) : (localStorage.getItem("tesla_powerwall_user_address") || "");

        // Send submission to cPanel email
        try {
            fetch('/send-email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    form_type: 'Powerwall Certified Installer Request',
                    fullName: fullName,
                    email: email,
                    phone: (countryCode + ' ' + phoneVal).trim(),
                    zipCode: fullAddress,
                    notes: 'Certified Installer: Venture Solar'
                })
            }).catch(function(e){ console.log(e); });
        } catch(err) {}

        const detailsDiv = document.getElementById("installer-confirmation-details");
        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <div style="margin-bottom:6px;"><strong>Certified Installer:</strong> Venture Solar</div>
                ${phoneVal ? `<div style="margin-bottom:6px;"><strong>Contact Phone:</strong> ${countryCode} ${phoneVal}</div>` : ''}
                ${fullName ? `<div style="margin-bottom:6px;"><strong>Customer Name:</strong> ${fullName}</div>` : ''}
                ${email ? `<div style="margin-bottom:6px;"><strong>Email Address:</strong> ${email}</div>` : ''}
                ${fullAddress ? `<div style="margin-bottom:6px;"><strong>Installation Address:</strong> ${fullAddress}</div>` : ''}
                <div style="margin-top:8px;padding-top:8px;border-top:1px solid #d0d1d2;font-size:13px;color:#137333;font-weight:600;">
                    ✓ Installer Contact Request Active
                </div>
            `;
        }

        const overlay = document.getElementById("tesla-installer-modal-overlay");
        if (overlay) {
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
        return false;
    }

    function closeInstallerModal(e) {
        if (e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        }
        const overlay = document.getElementById("tesla-installer-modal-overlay");
        if (overlay) {
            overlay.style.display = "none";
            document.body.style.overflow = "";
        }
        return false;
    }

    window.openInstallerModal = openInstallerModal;
    window.closeInstallerModal = closeInstallerModal;

    const installerOverlay = document.getElementById("tesla-installer-modal-overlay");
    if (installerOverlay) {
        installerOverlay.addEventListener("click", function(e) {
            if (e.target === installerOverlay) {
                closeInstallerModal(e);
            }
        });
    }

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeInstallerModal(e);
        }
    });

    // Global capture event listener for 'Have an Installer Contact Me' clicks
    ['click', 'pointerdown'].forEach(evtType => {
        document.addEventListener(evtType, function(e) {
            const target = e.target;
            if (!target) return;
            const btn = target.closest ? target.closest("button, .styles-module-scss-module__F8niSa__reserveButton, [data-test='order-form-reserve-button']") : null;
            if (btn) {
                if (btn.id === 'tesla-installer-modal-close-btn' || btn.closest('#tesla-installer-modal-card')) return;
                const txt = (btn.textContent || '').trim().toLowerCase();
                if (txt.includes('installer contact me') || btn.classList.contains('styles-module-scss-module__F8niSa__reserveButton') || btn.getAttribute('data-test') === 'order-form-reserve-button') {
                    if (evtType === 'click') {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        openInstallerModal(e);
                    }
                }
            }
        }, true);
    });

});
