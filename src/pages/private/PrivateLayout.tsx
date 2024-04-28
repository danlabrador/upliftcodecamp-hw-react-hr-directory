import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Nav } from '../../components/Nav';

const ProtectedLayout = () => {
  return (
    <>
      <Nav />
      <div className="pb-[75px]" />
      <div className="container mx-auto p-8 min-h-mvh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ProtectedLayout;
