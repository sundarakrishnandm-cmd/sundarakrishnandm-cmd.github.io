// This site needs no framework, backend, API keys, cookies, or paid services.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});

// Open one short case study at a time.
const caseDetails = [...document.querySelectorAll('.case-details')];
caseDetails.forEach(detail => {
  detail.addEventListener('toggle', () => {
    const title = document.querySelector(`[aria-controls="${detail.id}"].case-title-button`);
    title?.setAttribute('aria-expanded', String(detail.open));
    if (detail.open) caseDetails.forEach(other => { if (other !== detail) other.open = false; });
  });
});
document.querySelectorAll('.case-title-button').forEach(button => {
  button.addEventListener('click', () => {
    const detail = document.getElementById(button.getAttribute('aria-controls'));
    if (detail) detail.open = !detail.open;
  });
});
function openLinkedCase() {
  const detail = document.getElementById(window.location.hash.slice(1));
  if (detail?.classList.contains('case-details')) detail.open = true;
}
window.addEventListener('hashchange', openLinkedCase);
openLinkedCase();

// Native dialog supports Escape, focus trapping and returning to the thumbnail.
const imageViewer = document.getElementById('evidence-lightbox');
const viewerImage = document.getElementById('evidence-lightbox-image');
const viewerCaption = document.getElementById('evidence-lightbox-caption');
const viewerOriginal = document.getElementById('evidence-lightbox-original');
let previousImageTrigger;
let previousBodyOverflow = '';
document.querySelectorAll('.evidence-thumb').forEach(link => {
  link.addEventListener('click', event => {
    if (!imageViewer?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    previousImageTrigger = link;
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector('img').alt;
    viewerCaption.textContent = link.dataset.caption;
    viewerOriginal.href = link.href;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    imageViewer.showModal();
  });
});
document.getElementById('close-evidence-lightbox')?.addEventListener('click', () => imageViewer.close());
imageViewer?.addEventListener('click', event => { if (event.target === imageViewer) imageViewer.close(); });
imageViewer?.addEventListener('close', () => {
  document.body.style.overflow = previousBodyOverflow;
  previousImageTrigger?.focus();
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
