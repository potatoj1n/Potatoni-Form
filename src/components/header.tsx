import { Link } from 'react-router-dom';
import { ReactComponent as MainLogo } from '../assets/mainLogo.svg';

export default function Header() {
  return (
    <div>
      <header className="h-16 mt-1 flex justify-between border-b border-gray-200">
        <Link to="/">
          <MainLogo />
        </Link>
        <div className="flex p-3 font-normal text-base">
          <button className="border-none rounded-md bg-gray-100 mr-2 w-20 h-8">
            <Link to="/login">Login</Link>
          </button>
          <button className="border-none rounded-md bg-blue-500 text-white w-24 h-8">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </header>
    </div>
  );
}
function HeaderUser() {
  return (
    <div>
      <header className="h-12 flex justify-between border-b border-gray-200">
        <Link to="/" className="mt-2">
          <MainLogo />
        </Link>
        <div className="flex p-3 ">
          <button className="border rounded-md bg-gray-100 mr-2 w-20 h-8">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </header>
    </div>
  );
}
export { HeaderUser };
