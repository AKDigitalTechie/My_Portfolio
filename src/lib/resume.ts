import { profile } from '@/data/profile';

export type ResumeStatus = 'loading' | 'success' | 'error';

export const RESUME_STATUS_EVENT = 'resume-download-status';

function emit(status: ResumeStatus) {
  window.dispatchEvent(new CustomEvent<ResumeStatus>(RESUME_STATUS_EVENT, { detail: status }));
}

let inFlight = false;
let cachedBlob: Promise<Blob> | null = null;

function loadResume(): Promise<Blob> {
  if (!cachedBlob) {
    cachedBlob = fetch(profile.resumeUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.blob();
      })
      .then((data) => new Blob([data], { type: 'application/pdf' }))
      .catch((error) => {
        cachedBlob = null; // allow a retry
        throw error;
      });
  }
  return cachedBlob;
}

/** Warm the cache while the browser is idle so the click is instant. */
export function prefetchResume(): void {
  const run = () => {
    loadResume().catch(() => {});
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 2000);
  }
}

/**
 * Downloads the resume without leaving the page: the PDF is fetched in the
 * background (usually already prefetched) and saved through a temporary link,
 * so the browser never navigates to (or tries to render) the PDF.
 */
export async function downloadResume(): Promise<void> {
  if (inFlight) return;
  inFlight = true;
  emit('loading');

  try {
    const blob = await loadResume();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = profile.resumeFileName;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Give slower mobile browsers time to start reading the file before releasing it.
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    emit('success');
  } catch {
    emit('error');
  } finally {
    inFlight = false;
  }
}

/** Click handler for download links: keeps the user on the page. */
export function handleResumeClick(event: { preventDefault: () => void }) {
  event.preventDefault();
  void downloadResume();
}
