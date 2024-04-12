import { Link } from 'react-router-dom';
//import { useState } from 'react';
import Header from '../components/header';
import { ReactComponent as FormIcon } from '../assets/form_icon.svg';
//import form from '../store/store';

export default function Main() {
  // const [order, setOrder] = useState('createAt');
  // const handleNewOrder = () => setOrder('createAt');
  // const handleOldOrder = () => setOrder('title');
  // const sortedItems = form.sort((a, b) => b[order] - a[order]);
  return (
    <div>
      <Header />
      <div className="mx-28">
        <div className="flex justify-between border-none rounded-2xl h-72 bg-gray-100 mt-3  p-12">
          <div>
            <h1 className="font-bold text-3xl mb-9">새 질문 생성하기</h1>
            <h2 className="font-medium text-xl mb-3">사용자들의 의견으로 미래를 함께 그려봅시다! 함께해요!</h2>
            <p className="font-normal text-base">
              당신의 의견을 효과적으로 모아줄 혁신적인 플랫폼, 새로운 아이디어를 발견하세요!
            </p>
          </div>
          <button className="border bg-white rounded-2xl w-80 h-52 mr-36 mb-10 px-28 py-8">
            <Link to="/form">
              <FormIcon />
            </Link>
          </button>
        </div>
        <div>
          <h2 className="font-bold text-2xl mt-16">최근 설문지</h2>
          <span>
            <button>최신순</button>
            <button>A-Z</button>
          </span>
          <ul>
            <li>최근 설문 항목</li>
            <li></li>
          </ul>
          <button>
            <Link to="/form">Form</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
