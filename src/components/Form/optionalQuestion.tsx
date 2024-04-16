import { Radio, Checkbox, IconButton } from '@material-ui/core';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg'; // 추가
import * as QUESTION_TYPES from '../../const/questionType';
import { useDispatch } from 'react-redux';
import { questionActions } from '../../reducers/questionReducer';
import { useLocation } from 'react-router-dom';

interface QuestionProps {
  type: number;
  questionId: string;
  optionId: number;
  optionContent: string;
  isLast: boolean;
  isAnswer?: boolean;
}

const OptionalQuestion = ({ type, optionId, questionId, optionContent, isLast, isAnswer }: QuestionProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isPreview = location.pathname === '/preview';
  const isResult = location.pathname === '/form/responseCheck';

  const handleAddOption = () => {
    isLast && dispatch(questionActions.addOption({ id: questionId, optionId }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(questionActions.setOptionContent({ id: questionId, optionId, optionContent: e.target.value }));
  };

  const handleDeleteOption = () => {
    dispatch(questionActions.deleteOption({ id: questionId, optionId }));
  };

  const isChecked = () => {
    if (isPreview || isResult) return isAnswer;
    else return false;
  };

  const isDisabled = () => {
    if (isResult) return true;
    else return false;
  };

  const showOptionButton = () => {
    switch (type) {
      case QUESTION_TYPES.ONE_CHOICE:
        return (
          <Radio
            disabled={isDisabled()}
            onClick={() => dispatch(questionActions.markOneAnswer({ id: questionId, optionId, isAnswer }))}
            value={String(optionId)}
            checked={isChecked()}
          />
        );
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <Checkbox
            disabled={isDisabled()}
            onChange={() => dispatch(questionActions.markMultipleAnswer({ id: questionId, optionId, isAnswer }))}
            value={String(optionId)}
            checked={isChecked()}
          />
        );
      case QUESTION_TYPES.DROP_DOWN:
        return <div className="dropdown-option">{optionId}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row justify-start gap-4">
      {showOptionButton()}
      {isPreview || isResult ? (
        <div className="w-full">
          {optionContent}
          {!isDisabled() && (
            <IconButton aria-label="delete" onClick={handleDeleteOption}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ) : (
        <div className="w-full">
          <input
            type="text"
            value={optionContent}
            onChange={handleContentChange}
            onClick={handleAddOption}
            className="focus:outline-none  hover:border-b w-96"
          />
          {!isDisabled() && (
            <IconButton aria-label="delete" onClick={handleDeleteOption}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionalQuestion;
