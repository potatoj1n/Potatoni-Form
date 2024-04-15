import { Link } from 'react-router-dom';
import Header from '../components/header';
import { ReactComponent as FormIcon } from '../assets/form_icon.svg';
import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Main() {
  const [view, setView] = React.useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
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
          <ul>
            <li>최근 설문 항목</li>
            <li></li>
          </ul>
          <button>
            <Link to="/form">Form</Link>
          </button>
          <div className="fixed right-32 bottom-60">
            <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
              <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="module" aria-label="module">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="quilt" aria-label="quilt">
                <ViewQuiltIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
