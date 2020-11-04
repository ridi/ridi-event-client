function addScriptLoadListener(
  scriptElement: HTMLScriptElement,
): Promise<void> {
  const listener = new Promise<void>(resolve => {
    const callback = () => {
      scriptElement.removeEventListener('load', callback);
      resolve();
    };
    scriptElement.addEventListener('load', callback);
  });

  const timeout = new Promise<void>((_, reject) => {
    setTimeout(() => {
      reject('Failed to load Script.');
    }, 5000);
  });

  return Promise.race([listener, timeout]);
}

export function loadTagManager(id: string) {
    return addScriptLoadListener((function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j:any=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);return j;
  })(window as any,document,'script','dataLayer',id));
  }
