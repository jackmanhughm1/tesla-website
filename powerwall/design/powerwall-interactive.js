// Powerwall Design Studio Interactive Script

document.addEventListener("DOMContentLoaded", function() {
    console.log("Powerwall Design Studio Interactive Initialized");

    // Inject dynamic CSS for options, active Next button, and Address Input / Dropdown
    const style = document.createElement("style");
    style.innerHTML = `
        /* Option buttons styling */
        .tds-form-input--option {
            transition: all 0.2s ease !important;
            cursor: pointer !important;
            border: 2px solid #171a20 !important;
            background: #f4f4f4 !important;
            color: #171a20 !important;
            font-weight: 600 !important;
            text-align: center !important;
            padding: 12px 24px !important;
            border-radius: 6px !important;
            user-select: none !important;
            font-size: 15px !important;
            display: inline-block !important;
            min-width: 140px !important;
        }

        .tds-form-input--option:hover {
            border-color: #171a20 !important;
            background-color: #e8e8e8 !important;
        }

        .tds-form-input--option.is-selected {
            border: 2px solid #171a20 !important;
            background-color: #f4f4f4 !important;
            font-weight: 600 !important;
            color: #171a20 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
        }

        /* Active Next button styling */
        #landing-page-next-btn,
        #landing-page-next-btn.is-active,
        #landing-page-next-btn:not([disabled]) {
            background-color: #3e6ae1 !important;
            color: #ffffff !important;
            opacity: 1 !important;
            cursor: pointer !important;
            pointer-events: auto !important;
            border: none !important;
            box-shadow: 0 4px 14px rgba(62, 106, 225, 0.4) !important;
            transition: all 0.25s ease !important;
            font-weight: 600 !important;
        }

        #landing-page-next-btn:hover {
            background-color: #345bb9 !important;
            transform: translateY(-1px);
        }

        /* Address Search Field styling */
        #address-search-field .tds-form-input {
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            background: #f4f4f4 !important;
            border-radius: 4px !important;
            padding: 0 8px !important;
            min-height: 40px !important;
            border: 1px solid transparent !important;
            transition: all 0.2s ease !important;
            box-sizing: border-box !important;
        }

        #address-search-field .tds-form-input:focus-within {
            background: #ffffff !important;
            border-color: #171a20 !important;
            box-shadow: 0 0 0 1px #171a20 !important;
        }

        #addressAutocomplete {
            flex: 1 1 auto !important;
            width: 100% !important;
            background: transparent !important;
            border: none !important;
            outline: none !important;
            font-size: 14px !important;
            font-family: inherit !important;
            color: #171a20 !important;
            padding: 10px 8px !important;
            box-shadow: none !important;
        }

        #address-search-field .tds-form-input-leading {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: #5c5e62 !important;
            padding-left: 4px !important;
        }

        #address-search-field .tds-form-input-search-clear {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding-right: 4px !important;
        }

        #address-search-field .tds-form-input-search-clear button {
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            padding: 4px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            color: #5c5e62 !important;
            transition: background 0.15s ease, color 0.15s ease !important;
        }

        #address-search-field .tds-form-input-search-clear button:hover {
            background: rgba(0, 0, 0, 0.08) !important;
            color: #171a20 !important;
        }

        /* Autocomplete suggestions dropdown */
        .tesla-address-dropdown {
            position: absolute !important;
            top: calc(100% + 4px) !important;
            left: 0 !important;
            right: 0 !important;
            background: #ffffff !important;
            border: 1px solid #e2e2e2 !important;
            border-radius: 6px !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
            z-index: 9999 !important;
            max-height: 240px !important;
            overflow-y: auto !important;
            margin: 0 !important;
            padding: 6px 0 !important;
            list-style: none !important;
        }

        .tesla-address-option {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            padding: 10px 16px !important;
            font-size: 14px !important;
            color: #171a20 !important;
            cursor: pointer !important;
            transition: background 0.15s ease !important;
        }

        .tesla-address-option:hover {
            background: #f4f4f4 !important;
        }

        .tesla-address-option svg {
            flex-shrink: 0 !important;
            color: #5c5e62 !important;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // 1. ADDRESS INPUT & CLEAR BUTTON INTERACTION
    // ==========================================
    const addressInput = document.getElementById("addressAutocomplete");
    const addressField = document.getElementById("address-search-field");
    const inputWrapper = addressField ? addressField.querySelector(".tds-form-input") : null;
    const clearBtnWrapper = addressField ? addressField.querySelector(".tds-form-input-search-clear") : null;
    const clearBtn = clearBtnWrapper ? clearBtnWrapper.querySelector("button") : null;

    const sampleAddresses = [
        "29-01 39th Ave, Long Island City, NY 11101, USA",
        "3500 Deer Creek Rd, Palo Alto, CA 94304, USA",
        "1 Tesla Road, Austin, TX 78725, USA",
        "45500 Fremont Blvd, Fremont, CA 94538, USA",
        "10500 Tesla Blvd, Del Valle, TX 78617, USA",
        "1 Electric Ave, Sparks, NV 89434, USA",
        "901 Page Ave, Fremont, CA 94538, USA",
        "1000 S Fremont Ave, Alhambra, CA 91803, USA",
        "500 W 33rd St, New York, NY 10001, USA",
        "100 Universal City Plaza, Universal City, CA 91608, USA"
    ];

    let dropdownEl = null;

    function createDropdown() {
        if (!dropdownEl && inputWrapper) {
            dropdownEl = document.createElement("ul");
            dropdownEl.className = "tesla-address-dropdown";
            dropdownEl.style.display = "none";
            inputWrapper.appendChild(dropdownEl);
        }
    }

    function showDropdown(items) {
        createDropdown();
        if (!dropdownEl) return;
        dropdownEl.innerHTML = "";

        if (items.length === 0) {
            dropdownEl.style.display = "none";
            return;
        }

        items.forEach(addr => {
            const li = document.createElement("li");
            li.className = "tesla-address-option";
            li.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${addr}</span>
            `;
            li.addEventListener("mousedown", function(e) {
                e.preventDefault();
                setAddress(addr);
                hideDropdown();
            });
            dropdownEl.appendChild(li);
        });

        dropdownEl.style.display = "block";
    }

    function hideDropdown() {
        if (dropdownEl) dropdownEl.style.display = "none";
    }

    function updateClearBtnVisibility() {
        if (!clearBtnWrapper || !addressInput) return;
        if (addressInput.value && addressInput.value.trim().length > 0) {
            clearBtnWrapper.style.display = "flex";
        } else {
            clearBtnWrapper.style.display = "none";
        }
    }

    function setAddress(val) {
        if (!addressInput) return;
        addressInput.value = val;
        if (inputWrapper) inputWrapper.setAttribute("data-tds-value", val);
        localStorage.setItem("tesla_powerwall_user_address", val);
        updateClearBtnVisibility();
    }

    // Load saved address if available
    const savedAddress = localStorage.getItem("tesla_powerwall_user_address");
    if (savedAddress && addressInput) {
        setAddress(savedAddress);
    } else if (addressInput && addressInput.value) {
        updateClearBtnVisibility();
    }

    // Clear Button ("X") click -> Erase address and focus input
    if (clearBtn) {
        clearBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (addressInput) {
                addressInput.value = "";
                if (inputWrapper) inputWrapper.setAttribute("data-tds-value", "");
                localStorage.removeItem("tesla_powerwall_user_address");
                updateClearBtnVisibility();
                addressInput.focus();
                showDropdown(sampleAddresses.slice(0, 5));
            }
        });
    }

    // Input events
    if (addressInput) {
        addressInput.addEventListener("input", function() {
            const val = addressInput.value.trim();
            updateClearBtnVisibility();
            if (inputWrapper) inputWrapper.setAttribute("data-tds-value", addressInput.value);
            localStorage.setItem("tesla_powerwall_user_address", addressInput.value);

            if (val.length === 0) {
                showDropdown(sampleAddresses.slice(0, 5));
            } else {
                const matches = sampleAddresses.filter(a => a.toLowerCase().includes(val.toLowerCase()));
                if (matches.length > 0) {
                    showDropdown(matches);
                } else {
                    // Provide dynamic suggestions based on typed text
                    showDropdown([
                        `${val}, USA`,
                        `${val}, CA, USA`,
                        `${val}, NY, USA`,
                        `${val}, TX, USA`
                    ]);
                }
            }
        });

        addressInput.addEventListener("focus", function() {
            const val = addressInput.value.trim();
            if (val.length === 0) {
                showDropdown(sampleAddresses.slice(0, 5));
            } else {
                const matches = sampleAddresses.filter(a => a.toLowerCase().includes(val.toLowerCase()));
                showDropdown(matches.length > 0 ? matches : [`${val}, USA`]);
            }
        });

        addressInput.addEventListener("blur", function() {
            // Small timeout to allow mousedown on dropdown items
            setTimeout(hideDropdown, 200);
        });

        addressInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                hideDropdown();
                if (nextBtn) nextBtn.click();
            }
        });
    }

    document.addEventListener("click", function(e) {
        if (addressField && !addressField.contains(e.target)) {
            hideDropdown();
        }
    });

    // ==========================================
    // 2. POWERWALL OPTIONS & NEXT BUTTON
    // ==========================================
    const powerwallInput = document.getElementById("has-existing-powerwall");
    const powerwallLabel = document.querySelector("label[for=\"has-existing-powerwall\"]");
    const nextBtn = document.getElementById("landing-page-next-btn");

    // Automatically select Powerwall and activate Next button
    if (powerwallLabel) {
        powerwallLabel.classList.add("is-selected");
        if (powerwallInput) powerwallInput.checked = true;
    }

    if (nextBtn) {
        nextBtn.removeAttribute("disabled");
        nextBtn.classList.add("is-active");
        nextBtn.style.pointerEvents = "auto";
    }

    if (powerwallLabel) {
        powerwallLabel.addEventListener("click", function(e) {
            e.preventDefault();
            powerwallLabel.classList.toggle("is-selected");
            if (powerwallInput) powerwallInput.checked = powerwallLabel.classList.contains("is-selected");
            
            if (powerwallLabel.classList.contains("is-selected")) {
                if (nextBtn) {
                    nextBtn.removeAttribute("disabled");
                    nextBtn.classList.add("is-active");
                }
            } else {
                if (nextBtn) {
                    nextBtn.setAttribute("disabled", "disabled");
                    nextBtn.classList.remove("is-active");
                }
            }
        });
    }

    // Handle Next button click
    if (nextBtn) {
        nextBtn.addEventListener("click", function(e) {
            e.preventDefault();
            if (addressInput && addressInput.value.trim()) {
                localStorage.setItem("tesla_powerwall_user_address", addressInput.value.trim());
            }
            console.log("Navigating to direct.html");
            window.location.href = "direct.html";
        });
    }
});
