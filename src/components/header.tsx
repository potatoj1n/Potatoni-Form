import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../hooks/authActions';
import { RootState } from '../store/store';
import { ReactComponent as MainLogo } from '../assets/mainLogo.svg';

export default function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userName = useSelector((state: RootState) => state.auth.name);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
  };

  return (
    <header className="h-16 mt-1 mx-24 flex justify-between border-b border-gray-200">
      <Link to="/">
        <MainLogo />
      </Link>
      <div className="flex p-3 font-normal text-base">
        {isLoggedIn ? (
          <>
            <button className="w-11 h-11 rounded-3xl border text-sm p-1 mr-3">{userName}</button>
            <button onClick={handleLogout} className="border-none rounded-md bg-blue-500 text-white w-24 h-9 ">
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="border-none rounded-md bg-gray-100 mr-2 text-blue-500 w-20 h-9">
              <Link to="/login">Login</Link>
            </button>
            <button className="border-none rounded-md bg-blue-500 text-white w-24 h-9">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
