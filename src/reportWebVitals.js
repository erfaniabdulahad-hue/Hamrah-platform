const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        if (typeof getCLS === 'function') getCLS(onPerfEntry);
        if (typeof getFID === 'function') getFID(onPerfEntry);
        if (typeof getFCP === 'function') getFCP(onPerfEntry);
        if (typeof getLCP === 'function') getLCP(onPerfEntry);
        if (typeof getTTFB === 'function') getTTFB(onPerfEntry);
      })
      .catch((err) => {
        // If web-vitals fails to load in some environments, avoid throwing.
        // Logging here is optional and avoids silent failures during development.
        // console.warn('web-vitals failed to load', err);
      });
  }
};

export default reportWebVitals;
