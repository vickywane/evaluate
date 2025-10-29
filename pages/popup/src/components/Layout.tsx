import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className={'App w-[400px]'}>
    <Outlet />
  </div>
);

export default Layout;
