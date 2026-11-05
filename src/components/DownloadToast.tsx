import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { RESUME_STATUS_EVENT, type ResumeStatus } from '@/lib/resume';

const messages: Record<ResumeStatus, string> = {
  loading: 'Downloading resume...',
  success: 'Resume downloaded successfully',
  error: "Couldn't download the resume. Please try again.",
};

export function DownloadToast() {
  const [status, setStatus] = useState<ResumeStatus | null>(null);
  const timer = useRef<number>();

  useEffect(() => {
    const onStatus = (event: Event) => {
      const next = (event as CustomEvent<ResumeStatus>).detail;
      window.clearTimeout(timer.current);
      setStatus(next);
      if (next !== 'loading') {
        timer.current = window.setTimeout(() => setStatus(null), next === 'success' ? 4000 : 5000);
      }
    };

    window.addEventListener(RESUME_STATUS_EVENT, onStatus);
    return () => {
      window.removeEventListener(RESUME_STATUS_EVENT, onStatus);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[10000] flex justify-center px-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)' }}
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {status && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-bg-secondary px-4 py-3 text-sm font-medium shadow-lg shadow-black/40"
          >
            {status === 'loading' && <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary-400" />}
            {status === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />}
            {status === 'error' && <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />}
            <span>{messages[status]}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
