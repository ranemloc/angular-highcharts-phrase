export function loadInContextEditor(): void {
  // @ts-ignore
  window.PHRASEAPP_CONFIG = {
    projectId: 'c09e2ce8ad89aae21a7a7386725311d3'
  };

  (() => {
    const phraseapp = document.createElement('script'); phraseapp.type = 'text/javascript'; phraseapp.async = true;
    phraseapp.src = ['https://', 'phraseapp.com/assets/in-context-editor/2.0/app.js?', new Date().getTime()].join('');
    const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(phraseapp, s);
  })();
}
