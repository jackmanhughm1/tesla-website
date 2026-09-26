/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
{
(function () {
  const optimizelyUrl = 'https://cdn.optimizely.com/js/27160410180.js';
  const cookieBannerStageSrc = 'https://digitalassets.tesla.com/raw/upload/emea-market-assets/stage/cookie-banner.js';
  const cookieBannerProdSrc = 'https://digitalassets.tesla.com/raw/upload/emea-market-assets/prod/cookie-banner.js';
  const gtmUrl = 'https://www.googletagmanager.com/ns.html?id=GTM-KMG5DM';

  function addScriptToParent(src, parentElement) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', src);
      scriptElement.setAttribute('type', 'text/javascript');

      parentElement.append(scriptElement);
  }

  document.addEventListener('tsla-cookie-consent', (consent) => {
      console.info('[Cookie Consent] Decision: ' + consent.detail.decision);
      if (consent.detail.decision === 'accepted') {
          // Add Optimizely snippet
          addScriptToParent(optimizelyUrl, document.body);

          // Add Google Analytics (GA) snippet
          window.dataLayer = [];
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KMG5DM');

          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.style.visibility ="hidden";
          iframe.src = gtmUrl;
          document.body.appendChild(iframe);
          window.TSLA_ANALYTICS.init();
          window.addEventListener(
              'scroll',
              () => {
                  window.TSLA_ANALYTICS.genericScrollEventHandler();
              },
              false
          );
      }
  });

  document.addEventListener('DOMContentLoaded', () => {
      if (document && document.body && document.head) {
          const currentRegion = window.drupalSettings.path.currentLanguage || 'en_us';

          // For CN we dont even inject the cookie banner,
          // Which leads to also not having Optimizely and GA injected (as those rely on the consent decision from the cookie banner)
          if (currentRegion === 'zh_cn') return;

          // Initiate cookie banner script:
          const isProd = window.location.host === 'www.tesla.com'
          const cookieBannerSrc = isProd ? cookieBannerProdSrc : cookieBannerStageSrc;
          addScriptToParent(cookieBannerSrc, document.body);
      }
  });
})();
}
{
window['cua-chat'] = window['cua-chat'] || {};
window['cua-chat'].actions = window['cua-chat'].actions || {};
window['cua-chat'].chatAskAQuestionMode = true; // Enable chat ask a question mode
window['cua-chat'].manualIconRender = true;

const showStickyBar = () => { return; };

const dynamicContent = (state) => {
  return Promise.resolve().then(() => {
    const dynamicContentContainers = document.querySelectorAll(
      '[data-entity="dynamic-content-container-injector-2"]'
    );

    dynamicContentContainers.forEach((container) => {
      const dynamicContentCopyElements = container.querySelectorAll(
        '[data-entity="dynamic-content-copy"]'
      );
      dynamicContentCopyElements.forEach((copyElement) => {
        const stateList = copyElement.getAttribute('data-state-list');
        if (stateList && !stateList.split(',').includes(state)) {
          copyElement.style.display = 'none';
          copyElement.innerHTML = '';
        } else {
          copyElement.style.display = 'inline';
          copyElement.classList.add('tcl-dynamic-content--visible');
        }
      });

    });
  });
}

let result = getStateFromCookie().then(async (state) => {
  let locale = window.Tesla?.locale || 'en_US';
  locale = locale === 'en' ? 'en_US' : locale;

  let region = locale?.split('_')?.[1]?.toUpperCase() || 'US';
  return getPrice(region, state, '&includeRegionalIncentives&includeFederalIncentives').then((pricingData) => {
    return { state, pricingData };
  });
});

window.addEventListener('load', () => {
  try {
    if (result.state) {
      Promise.all([
        dynamicContent(result.state),
        extractPricingData(result.state, result.pricingData)
      ]).then(() => {
        setTimeout(() => {
          const dynamicContentPlaceholderElements = document.querySelectorAll(
            '[data-entity="dynamic-content-placeholder"]'
          );
          dynamicContentPlaceholderElements.forEach((placeholder) => {
            placeholder.innerHTML = '';
          });
        }, 100);
      });
    } else {
      getStateFromCookie().then(fetchedState => {
        Promise.all([
          dynamicContent(fetchedState),
          extractPricingData(fetchedState, result.pricingData)
        ]).then(() => {
          setTimeout(() => {
            const dynamicContentPlaceholderElements = document.querySelectorAll(
              '[data-entity="dynamic-content-placeholder"]'
            );
            dynamicContentPlaceholderElements.forEach((placeholder) => {
              placeholder.innerHTML = '';
            });
          }, 100);
        });
      });
    }
  } catch (error) {
    console.log('Error initializing dynamic pricing:', error);
  }
});

}
