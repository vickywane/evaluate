import { cn } from '@extension/ui';

const Header = () => (
  <header className={cn('w-full border-b border-gray-200 bg-white px-6 py-4 text-gray-900')}>
    <div className="mx-auto flex max-w-7xl items-center justify-between">
      <h1 className="text-2xl font-bold">Evaluate</h1>
    </div>
  </header>
);

export default Header;
