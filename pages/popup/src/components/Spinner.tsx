import { cn } from '@extension/ui';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-12 h-12',
};

const Spinner = ({ size = 'md', className }: SpinnerProps) => (
  <span role="status" aria-label="Loading" className={cn('inline-flex items-center', className)}>
    <svg
      className={cn('animate-spin rounded-full', sizeClasses[size])}
      viewBox="0 0 50 50"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-20" cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="5" fill="none" />
      <path className="opacity-90" fill="currentColor" d="M50 25c0-13.8-11.2-25-25-25v5c11.6 0 21 9.4 21 21h4z" />
    </svg>
  </span>
);

export default Spinner;
