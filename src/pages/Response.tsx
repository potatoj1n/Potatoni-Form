import { Link } from 'react-router-dom';
import TitleBox from '../components/Form/TitleBox';
import PreviewContainer from '../containers/previewContainer';
import useAppSelector from '../hooks/useAppSelector';

const Response = () => {
  const form = useAppSelector(state => state.form);
  const { questions } = form;

  const handleSubmit = async () => {
    try {
      const formData = JSON.stringify({ form });
      const response = await fetch('api/v1/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        alert('응답이 제출되었습니다');
      } else {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('제출에 실패했습니다:', error);
    }
  };

  return (
    <div className="bg-blue-200 w-full flex flex-col justify-items-start items-center flex-grow h-screen">
      <div className="mt-20 w-1/2 flex flex-col mb-5 h-auto">
        <TitleBox info={form.form.form} />
      </div>
      <div className="w-1/2 h-auto">
        {questions.map(question => (
          <PreviewContainer key={question.id} questionId={question.id} />
        ))}
      </div>
      <div className="flex flex-row w-1/2 justify-between items-center">
        <Link to="/">
          <button onClick={handleSubmit} className="border-none rounded-md bg-blue-500 text-white w-20 p-3 ml-1">
            제 출
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Response;
