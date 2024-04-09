import { Link } from 'react-router-dom';
import Header from '../components/header';
export default function Main() {
  return (
    <div className="">
      <Header />
      <button>
        <Link to="/form">Form</Link>
      </button>
      <Link to="/response">응답</Link>
    </div>
  );
}
