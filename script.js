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
const viewerStage = document.getElementById('evidence-lightbox-stage');
const viewerPrevious = document.getElementById('evidence-lightbox-previous');
const viewerNext = document.getElementById('evidence-lightbox-next');
const viewerCounter = document.getElementById('evidence-lightbox-counter');
const viewerHint = document.getElementById('evidence-lightbox-hint');
let previousImageTrigger;
let previousBodyOverflow = '';
let viewerGallery = [];
let viewerIndex = 0;
function showGalleryImage(index) {
  if (!viewerGallery.length) return;
  viewerIndex = (index + viewerGallery.length) % viewerGallery.length;
  const link = viewerGallery[viewerIndex];
  viewerImage.src = link.href;
  viewerImage.alt = link.querySelector('img').alt;
  viewerCaption.textContent = link.dataset.caption;
  viewerOriginal.href = link.href;
  viewerCounter.textContent = `${viewerIndex + 1} / ${viewerGallery.length}`;
  const multiple = viewerGallery.length > 1;
  viewerPrevious.hidden = !multiple;
  viewerNext.hidden = !multiple;
  viewerHint.hidden = !multiple;
}
function moveGalleryImage(direction) {
  if (imageViewer?.open && viewerGallery.length > 1) showGalleryImage(viewerIndex + direction);
}
document.querySelectorAll('.evidence-thumb').forEach(link => {
  link.addEventListener('click', event => {
    if (!imageViewer?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    previousImageTrigger = link;
    const gallery = link.closest('.evidence-thumbnails');
    viewerGallery = gallery ? [...gallery.querySelectorAll('.evidence-thumb')] : [link];
    showGalleryImage(viewerGallery.indexOf(link));
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    imageViewer.showModal();
  });
});
viewerPrevious?.addEventListener('click', () => moveGalleryImage(-1));
viewerNext?.addEventListener('click', () => moveGalleryImage(1));
imageViewer?.addEventListener('keydown', event => {
  if (viewerGallery.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  moveGalleryImage(event.key === 'ArrowRight' ? 1 : -1);
});
let swipeStart;
viewerStage?.addEventListener('touchstart', event => {
  swipeStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : undefined;
}, { passive: true });
viewerStage?.addEventListener('touchend', event => {
  if (!swipeStart || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - swipeStart.x;
  const dy = event.changedTouches[0].clientY - swipeStart.y;
  swipeStart = undefined;
  if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.25) moveGalleryImage(dx < 0 ? 1 : -1);
}, { passive: true });
viewerStage?.addEventListener('touchcancel', () => { swipeStart = undefined; }, { passive: true });
document.getElementById('close-evidence-lightbox')?.addEventListener('click', () => imageViewer.close());
imageViewer?.addEventListener('click', event => { if (event.target === imageViewer) imageViewer.close(); });
imageViewer?.addEventListener('close', () => {
  document.body.style.overflow = previousBodyOverflow;
  swipeStart = undefined;
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
