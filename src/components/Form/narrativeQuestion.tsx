import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { questionActions } from '../../reducers/questionReducer';

interface QuestionProps {
  type: 'short' | 'long';
  questionId: string;
}

const NarrativeQuestion = ({ type, questionId }: QuestionProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPreview = location.pathname === '/preview';
  const isResult = location.pathname === '/response';
  const { questions } = useAppSelector(state => state.form);
  const question = questions?.find(item => item.id === questionId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(questionActions.setNarrativeAnswer({ id: questionId, narrativeContent: e.target.value }));
  };

  return (
    <div>
      {!isPreview && !isResult ? (
        <input
          type="text"
          disabled
          placeholder={type === 'short' ? '단답형 텍스트' : '장문형 텍스트'}
          className="mt-3"
        />
      ) : (
        <input
          className="mt-3 w-2/3 focus:outline-none focus:border-b-blue-500 focus:border-b-2"
          type="text"
          placeholder={isPreview ? '내 답변' : ''}
          value={question?.narrativeAnswer}
          onChange={handleChange}
          disabled={isResult ? true : false}
        />
      )}
    </div>
  );
};

export default NarrativeQuestion;
