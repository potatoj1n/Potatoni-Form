import { useLocation } from 'react-router-dom';

export interface FormProps {
  title: string;
  detail: string;
}

interface Props {
  info: FormProps;
  handleChange?: (name: string, value: string) => void;
}

const TitleBox = ({ info, handleChange }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const isPreview = pathname === '/preview';
  const isResult = pathname === '/form/responseCheck';

  return (
    <div>
      {!isPreview && !isResult ? (
        <div className="border rounded-xl w-auto flex border-t-blue-500 border-t-8 flex-col mb-5 h-52 bg-white p-8">
          <input
            type="text"
            className="font-semibold text-3xl mb-12 p-2 focus:outline-none focus:border-b-2 focus:border-blue-500 focus:bg-gray-100"
            placeholder="제목 없는 설문"
            name="title"
            value={info.title}
            onChange={({ target: { value } }) => handleChange && handleChange('title', value)}
          />

          <input
            type="text"
            className="p-2 focus:outline-none focus:border-b-2 focus:border-blue-500 "
            placeholder="설문지 설명"
            name="detail"
            value={info.detail}
            onChange={({ target: { value } }) => handleChange && handleChange('detail', value)}
          />
        </div>
      ) : (
        <div>
          <div className="text-2xl mb-3">{info.title}</div>
          <div className="text-lg ml-5">{info.detail}</div>
          <hr />
          <div className="text-sm mt-1">* 필수항목</div>
        </div>
      )}
    </div>
  );
};

export default TitleBox;
