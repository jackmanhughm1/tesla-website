document.addEventListener('DOMContentLoaded', () => {
  console.log('Tesla Inventory Interactive Script Initialized');

  // Model Data Definitions
  const MODEL_DATA = {
    ms: {
      name: 'Model S',
      trims: ['Model S All-Wheel Drive', 'Model S Performance', 'Model S Plaid'],
      image: '../New & Pre-Owned Electric Cars _ Tesla_files/Mega-Menu-Vehicles-Model-S-New-NA-TW-KR_U6AZ.avif',
      cards: [
        { title: '2021 Model S Plaid', price: '$50,000', estMo: '$808/mo', range: '332 mi', location: 'Located in Franklin', odometer: '69,809 mi', paint: 'Solid Black', wheels: '19" Tempest', interior: 'All Black' },
        { title: '2022 Model S Long Range', price: '$53,800', estMo: '$873/mo', range: '405 mi', location: 'Located in Winfield Township', odometer: '42,100 mi', paint: 'Pearl White Multi-Coat', wheels: '21" Arachnid', interior: 'Black and White' },
        { title: '2023 Model S All-Wheel Drive', price: '$64,500', estMo: '$1,040/mo', range: '405 mi', location: 'Available to view in Colma', odometer: '18,500 mi', paint: 'Deep Blue Metallic', wheels: '19" Tempest', interior: 'Cream' },
        { title: '2021 Model S Performance', price: '$49,300', estMo: '$796/mo', range: '348 mi', location: 'Available to view in Aurora', odometer: '77,643 mi', paint: 'Midnight Silver Metallic', wheels: '21" Sonic Carbon', interior: 'All Black' },
        { title: '2022 Model S Plaid', price: '$54,800', estMo: '$891/mo', range: '396 mi', location: 'Located in Kansas City', odometer: '38,200 mi', paint: 'Red Multi-Coat', wheels: '21" Arachnid', interior: 'Black and White' },
        { title: '2024 Model S Plaid', price: '$79,990', estMo: '$1,290/mo', range: '359 mi', location: 'New Inventory - In Stock', odometer: '15 mi', paint: 'Ultra Red', wheels: '21" Arachnid', interior: 'All Black' }
      ]
    },
    m3: {
      name: 'Model 3',
      trims: ['Model 3 Rear-Wheel Drive', 'Model 3 Long Range', 'Model 3 Performance'],
      image: '../New & Pre-Owned Electric Cars _ Tesla_files/Mega-Menu-Vehicles-Model-3-Performance-LHD_U6AZ.avif',
      cards: [
        { title: '2023 Model 3 Rear-Wheel Drive', price: '$28,900', estMo: '$450/mo', range: '272 mi', location: 'Available to view in Colma', odometer: '24,100 mi', paint: 'Pearl White Multi-Coat', wheels: '18" Aero', interior: 'All Black' },
        { title: '2024 Model 3 Long Range', price: '$34,990', estMo: '$550/mo', range: '341 mi', location: 'Located in Los Angeles', odometer: '8,200 mi', paint: 'Deep Blue Metallic', wheels: '19" Nova', interior: 'Black and White' },
        { title: '2024 Model 3 Performance', price: '$44,990', estMo: '$710/mo', range: '303 mi', location: 'New Inventory - San Francisco', odometer: '10 mi', paint: 'Ultra Red', wheels: '20" Warp', interior: 'All Black' },
        { title: '2022 Model 3 Long Range AWD', price: '$31,500', estMo: '$490/mo', range: '358 mi', location: 'Available to view in West Bloomfield', odometer: '41,063 mi', paint: 'Midnight Silver Metallic', wheels: '19" Sport', interior: 'Black and White' },
        { title: '2023 Model 3 Performance', price: '$38,200', estMo: '$598/mo', range: '315 mi', location: 'Located in Mesa', odometer: '19,400 mi', paint: 'Solid Black', wheels: '20" Überturbine', interior: 'All Black' },
        { title: '2024 Model 3 Rear-Wheel Drive', price: '$38,990', estMo: '$610/mo', range: '272 mi', location: 'New Inventory - In Stock', odometer: '12 mi', paint: 'Stealth Grey', wheels: '18" Photon', interior: 'All Black' }
      ]
    },
    my: {
      name: 'Model Y',
      trims: ['Model Y Rear-Wheel Drive', 'Model Y Long Range AWD', 'Model Y Performance'],
      image: '../New & Pre-Owned Electric Cars _ Tesla_files/Mega-Menu-Vehicles-Model-Y-2-v3_U6AZ.avif',
      cards: [
        { title: '2023 Model Y Long Range AWD', price: '$36,900', estMo: '$580/mo', range: '330 mi', location: 'Available to view in Colma', odometer: '21,500 mi', paint: 'Pearl White Multi-Coat', wheels: '19" Gemini', interior: 'All Black' },
        { title: '2024 Model Y Performance', price: '$47,990', estMo: '$755/mo', range: '279 mi', location: 'New Inventory - San Jose', odometer: '15 mi', paint: 'Quicksilver', wheels: '21" Überturbine', interior: 'Black and White' },
        { title: '2022 Model Y Long Range', price: '$33,400', estMo: '$525/mo', range: '318 mi', location: 'Located in Aurora', odometer: '36,800 mi', paint: 'Midnight Silver Metallic', wheels: '20" Induction', interior: 'All Black' },
        { title: '2023 Model Y Rear-Wheel Drive', price: '$31,990', estMo: '$500/mo', range: '260 mi', location: 'Available in North Hollywood', odometer: '14,200 mi', paint: 'Solid Black', wheels: '19" Gemini', interior: 'All Black' },
        { title: '2024 Model Y Long Range AWD', price: '$43,990', estMo: '$690/mo', range: '310 mi', location: 'New Inventory - Fremont', odometer: '8 mi', paint: 'Deep Blue Metallic', wheels: '19" Gemini', interior: 'Black and White' },
        { title: '2023 Model Y Performance', price: '$41,500', estMo: '$650/mo', range: '303 mi', location: 'Located in Mount Kisco', odometer: '18,900 mi', paint: 'Ultra Red', wheels: '21" Überturbine', interior: 'All Black' }
      ]
    },
    mx: {
      name: 'Model X',
      trims: ['Model X Dual Motor AWD', 'Model X Plaid'],
      image: '../New & Pre-Owned Electric Cars _ Tesla_files/Mega-Menu-Vehicles-Model-X-New_U6AZ.avif',
      cards: [
        { title: '2022 Model X Plaid', price: '$64,900', estMo: '$1,020/mo', range: '333 mi', location: 'Available to view in Colma', odometer: '32,100 mi', paint: 'Pearl White Multi-Coat', wheels: '22" Turbine', interior: 'Black and White' },
        { title: '2023 Model X Dual Motor AWD', price: '$69,500', estMo: '$1,090/mo', range: '348 mi', location: 'Located in Los Angeles', odometer: '19,800 mi', paint: 'Solid Black', wheels: '20" Cyberstream', interior: 'Cream' },
        { title: '2024 Model X Plaid', price: '$94,990', estMo: '$1,490/mo', range: '326 mi', location: 'New Inventory - San Francisco', odometer: '10 mi', paint: 'Ultra Red', wheels: '22" Turbine', interior: 'All Black' },
        { title: '2021 Model X Long Range', price: '$56,800', estMo: '$890/mo', range: '360 mi', location: 'Located in Kansas City', odometer: '54,200 mi', paint: 'Midnight Silver Metallic', wheels: '20" Silver', interior: 'All Black' },
        { title: '2023 Model X Plaid', price: '$76,900', estMo: '$1,210/mo', range: '333 mi', location: 'Available in Winfield Township', odometer: '14,500 mi', paint: 'Deep Blue Metallic', wheels: '22" Turbine', interior: 'Black and White' }
      ]
    },
    ct: {
      name: 'Cybertruck',
      trims: ['Cybertruck All-Wheel Drive', 'Cyberbeast'],
      image: '../New & Pre-Owned Electric Cars _ Tesla_files/Mega-Menu-Vehicles-Cybertruck-1x_U6AZ.avif',
      cards: [
        { title: '2024 Cybertruck Foundation Series AWD', price: '$99,990', estMo: '$1,580/mo', range: '348 mi', location: 'New Inventory - Austin', odometer: '15 mi', paint: 'Stainless Steel', wheels: '20" Cyber', interior: 'Tactical Grey' },
        { title: '2024 Cybertruck Cyberbeast', price: '$119,990', estMo: '$1,890/mo', range: '320 mi', location: 'New Inventory - San Francisco', odometer: '12 mi', paint: 'Stainless Steel', wheels: '20" Cyber', interior: 'Tactical Grey' },
        { title: '2024 Cybertruck All-Wheel Drive', price: '$79,990', estMo: '$1,270/mo', range: '340 mi', location: 'In Stock - Ready for Delivery', odometer: '20 mi', paint: 'Matte Black Wrap', wheels: '20" Cyber', interior: 'All Black' }
      ]
    }
  };

  // Bind Sidebar Model Radio Buttons
  const modelRadios = document.querySelectorAll('input[name="Model"]');
  const trimAccordionContent = document.querySelector('.filter-Trim .tds-accordion-content') || document.querySelector('.filter-Trim');

  const renderTrimAccordion = (modelKey) => {
    if (!trimAccordionContent) return;
    const modelInfo = MODEL_DATA[modelKey] || MODEL_DATA.ms;
    
    let trimHTML = '';
    modelInfo.trims.forEach((trim, idx) => {
      const trimId = `trim_${modelKey}_${idx}`;
      trimHTML += `
        <div class="tds-form-input">
          <input class="tds-form-input-choice inv-trim-checkbox" type="checkbox" id="${trimId}" data-trim="${trim}">
          <div class="tds-form-input-choice-label">
            <label class="tds-form-label" for="${trimId}">${trim}</label>
          </div>
        </div>
      `;
    });
    trimAccordionContent.innerHTML = trimHTML;

    // Add checkbox event listener
    const trimCheckboxes = trimAccordionContent.querySelectorAll('.inv-trim-checkbox');
    trimCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        applyFiltersAndRender(modelKey);
      });
    });
  };

  const renderVehicleGrid = (modelKey, activeTrims = [], searchQuery = '') => {
    const modelInfo = MODEL_DATA[modelKey] || MODEL_DATA.ms;
    const resultsContainer = document.querySelector('.results-container') || document.querySelector('#inventory-results');
    
    if (!resultsContainer) return;

    let filteredCards = modelInfo.cards.filter(c => {
      const matchesTrim = activeTrims.length === 0 || activeTrims.some(t => c.title.toLowerCase().includes(t.toLowerCase()));
      const matchesSearch = !searchQuery || JSON.stringify(c).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTrim && matchesSearch;
    });

    if (filteredCards.length === 0) {
      filteredCards = modelInfo.cards;
    }

    let gridHTML = `<div class="accessibility-header tds-o--is_visually_hidden full-width"><h2>Results</h2></div>`;

    filteredCards.forEach((c, idx) => {
      gridHTML += `
        <article class="result card vehicle-card" style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 16px; margin-bottom: 24px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.04); font-family: Universal-Sans, sans-serif;">
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 280px; max-width: 440px;">
              <img src="${modelInfo.image}" alt="${c.title}" style="width: 100%; height: auto; border-radius: 8px; object-fit: cover;">
            </div>
            <div style="flex: 1.2; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 22px; font-weight: 600; margin: 0 0 6px 0; color: #171a20;">${c.title}</h3>
                  <span style="font-size: 20px; font-weight: 700; color: #171a20;">${c.price}</span>
                </div>
                <div style="font-size: 14px; color: #5c5eb2; font-weight: 500; margin-bottom: 12px;">Est ${c.estMo} financing</div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 16px 0; padding: 12px; background: #f8f8f8; border-radius: 8px;">
                  <div>
                    <span style="font-size: 12px; color: #707070; display: block;">Range (est.)</span>
                    <strong style="font-size: 15px; color: #171a20;">${c.range}</strong>
                  </div>
                  <div>
                    <span style="font-size: 12px; color: #707070; display: block;">Odometer</span>
                    <strong style="font-size: 15px; color: #171a20;">${c.odometer}</strong>
                  </div>
                  <div>
                    <span style="font-size: 12px; color: #707070; display: block;">Location</span>
                    <strong style="font-size: 14px; color: #171a20;">${c.location}</strong>
                  </div>
                </div>

                <div style="font-size: 13px; color: #393c41; line-height: 1.6;">
                  <span><strong>Paint:</strong> ${c.paint}</span> • 
                  <span><strong>Wheels:</strong> ${c.wheels}</span> • 
                  <span><strong>Interior:</strong> ${c.interior}</span>
                </div>
              </div>

              <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button class="inv-order-now-btn" data-model="${modelKey}" style="flex: 1; padding: 10px 20px; background: #3e6ae1; color: #fff; border: none; border-radius: 4px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s;">Order Now</button>
                <button class="inv-view-details-btn" style="padding: 10px 20px; background: transparent; color: #171a20; border: 1px solid #171a20; border-radius: 4px; font-weight: 500; font-size: 14px; cursor: pointer;">View Details</button>
              </div>
            </div>
          </div>
        </article>
      `;
    });

    resultsContainer.innerHTML = gridHTML;

    // Bind Order Now buttons to local design studio
    const orderBtns = resultsContainer.querySelectorAll('.inv-order-now-btn');
    orderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.getAttribute('data-model');
        if (m === 'm3') window.location.href = '../model3/design/index.html';
        else if (m === 'ct') window.location.href = '../cybertruck/design/index.html';
        else window.location.href = '../modely/design/index.html';
      });
    });
  };

  let activeModelKey = 'ms';

  const applyFiltersAndRender = (modelKey) => {
    const selectedTrims = [];
    if (trimAccordionContent) {
      const checkedBoxes = trimAccordionContent.querySelectorAll('.inv-trim-checkbox:checked');
      checkedBoxes.forEach(cb => selectedTrims.push(cb.getAttribute('data-trim')));
    }
    renderVehicleGrid(modelKey, selectedTrims);
  };

  // Add click listeners to sidebar Model radios
  modelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = e.target.value;
      activeModelKey = val;
      renderTrimAccordion(activeModelKey);
      applyFiltersAndRender(activeModelKey);
    });
  });

  // Initial Load
  const checkedRadio = document.querySelector('input[name="Model"]:checked');
  if (checkedRadio) {
    activeModelKey = checkedRadio.value;
  }
  renderTrimAccordion(activeModelKey);
  applyFiltersAndRender(activeModelKey);
});
