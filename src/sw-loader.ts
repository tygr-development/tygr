if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      // tslint:disable-next-line:no-console
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log('ServiceWorker registration failed: ', err);
    }

  });
}
