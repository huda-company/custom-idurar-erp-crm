import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '@/redux/auth/actions';
import PageLoader from '@/components/PageLoader';

const Logout = () => {
  const dispatch = useDispatch();
  function asyncLogout() {
    return dispatch(logoutAction());
  }
  useEffect(() => {
    asyncLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PageLoader />;
};
export default Logout;
