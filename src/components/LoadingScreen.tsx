import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  isLoading: boolean;
}

export function LoadingScreen({ progress, isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary-500/10 blur-[100px]" />
          <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-accent-500/10 blur-[120px]" />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 animate-glow-pulse rounded-2xl bg-primary-500/30 blur-2xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl glass-strong border border-primary-500/30">
                <Code2 className="h-9 w-9 text-primary-400" strokeWidth={1.5} />
              </div>
            </div>

            <div className="text-center">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                Ajay Kumar
              </h1>
              <p className="mt-1 text-sm text-text-muted font-mono">
                Software Engineer
              </p>
            </div>

            <div className="w-64">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-xs text-text-muted">
                <span>Loading workspace</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
