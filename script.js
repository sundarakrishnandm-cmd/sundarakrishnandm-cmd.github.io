// This site needs no framework, backend, API keys, cookies, or paid services.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const copyButton = document.querySelector('#copy-email');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('sundarakrishnan.dm@gmail.com');
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.innerHTML = 'Copy email <span aria-hidden="true">⧉</span>'; }, 2000);
  } catch {
    window.location.href = 'mailto:sundarakrishnan.dm@gmail.com';
  }
});
