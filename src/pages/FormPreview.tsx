import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TitleBox from '../components/Form/TitleBox';
import PreviewContainer from '../containers/previewContainer';
import useAppSelector from '../hooks/useAppSelector';
import { questionActions } from '../reducers/questionReducer';

const Preview = () => {
  const dispatch = useDispatch();
  const form = useAppSelector(state => state.form);
  const { questions } = form;

  const handleReset = () => {
    dispatch(questionActions.resetAnswer());
  };

  return (
    <div className="bg-blue-200 w-full flex flex-col justify-items-start items-center flex-grow h-screen">
      <div className="border rounded-2xl mt-20 w-1/2 flex border-t-blue-500 border-t-8 flex-col mb-5 h-auto bg-white p-8">
        <TitleBox info={form.form} />
      </div>
      <div className="w-1/2 h-auto">
        {questions.map(question => (
          <PreviewContainer key={question.id} questionId={question.id} />
        ))}
      </div>
      <div className="flex flex-row w-1/2 justify-between items-center">
        <Link to="/response">
          <button className="border-none rounded-md bg-blue-500 text-white w-20 p-3 ml-1">제 출</button>
        </Link>
        <div className="text-blue-500 mr-1" onClick={handleReset}>
          양식 지우기
        </div>
      </div>
    </div>
  );
};

export default Preview;
