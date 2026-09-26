document.addEventListener('DOMContentLoaded', () => {
  console.log('Tesla Model S Inventory Script Initialized');

  // Find left panel Model radio buttons
  const modelRadios = document.querySelectorAll('input[name="Model"]');

  modelRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = e.target.value;
      console.log('Selected model radio:', val);

      if (val === 'ms') {
        // Redirect to Model S dataset view or update grid
        if (!window.location.pathname.endsWith('models.html')) {
          window.location.href = 'models.html';
        }
      } else if (val === 'm3') {
        window.location.href = 'index.html?model=m3';
      } else if (val === 'my') {
        window.location.href = 'index.html?model=my';
      } else if (val === 'mx') {
        window.location.href = 'index.html?model=mx';
      } else if (val === 'ct') {
        window.location.href = 'index.html?model=ct';
      }
    });
  });

  // Ensure Model S radio is checked when on models.html
  if (window.location.pathname.endsWith('models.html')) {
    const msRadio = document.querySelector('input[value="ms"]');
    if (msRadio) {
      msRadio.checked = true;
    }
  }
});
