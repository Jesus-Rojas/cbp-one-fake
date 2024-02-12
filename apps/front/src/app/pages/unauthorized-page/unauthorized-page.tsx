import { HomeLayout } from '../../layouts/home-layout/home-layout';
import './unauthorized-page.css';

function UnauthorizedPage () {
  return (
    <HomeLayout>
      <p className='title-text'>
        User not found,
        <br />
        verify link.
      </p>
    </HomeLayout>
  );
}

export { UnauthorizedPage };
