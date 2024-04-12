import { Link } from 'react-router-dom';
import { ReactComponent as Logoimg } from '../../assets/form_logo.svg';
import TitleBox, { FormProps } from './TitleBox';

interface FormTitleProps {
  title: string;
  detail: string;
}

export default function FormHeader({ title, detail }: FormTitleProps) {
  const info: FormProps = { title, detail };
  return (
    <header className="h-16 mt-1 mr-28 ml-20 flex justify-between border-b border-gray-200">
      <div className="flex flex-row align-center">
        <Link to="/">
          <Logoimg />
        </Link>
        <TitleBox info={info} /> {/* title 속성만 전달 */}
      </div>
      <div className="flex p-3 font-normal text-base">
        <button className="border-none rounded-md bg-blue-500 text-white w-24 h-8 mr-2">Logout</button>
        {/* 여기에 유저 프로필을 표시하는 컴포넌트를 넣으세요 */}
      </div>
    </header>
  );
}
