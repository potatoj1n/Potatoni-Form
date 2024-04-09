import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { RootState } from '../store/store';
import { ReactComponent as MainLogo } from '../assets/mainLogo.svg';

export default function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 mt-1 flex justify-between border-b border-gray-200">
      <Link to="/">
        <MainLogo />
      </Link>
      <div className="flex p-3 font-normal text-base">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="border-none rounded-md bg-blue-500 text-white w-24 h-8 mr-2">
              Logout
            </button>
            {/* 여기에 유저 프로필을 표시하는 컴포넌트를 넣으세요 */}
          </>
        ) : (
          <>
            <button className="border-none rounded-md bg-gray-100 mr-2 w-20 h-8">
              <Link to="/login">Login</Link>
            </button>
            <button className="border-none rounded-md bg-blue-500 text-white w-24 h-8">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
