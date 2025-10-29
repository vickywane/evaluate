import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="flex h-12 w-full items-center justify-between border-b px-3">
    <Link to="/">
      <div className="flex items-center gap-1">
        <h1 className="text-base"> Evaluate </h1>
      </div>
    </Link>

    <div className="hover:cursor-pointer">
      <FiX className="text-lg" />
    </div>
  </div>
);

export default Header;
