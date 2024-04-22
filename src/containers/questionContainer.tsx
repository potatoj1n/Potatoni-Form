import useAppSelector from '../hooks/useAppSelector';
import Dropdown from '../components/Form/dropDown';
import { ReactComponent as CopyIcon } from '../assets/copyIcon.svg';
import { ReactComponent as TrashIcon } from '../assets/trashIcon.svg';
import { Switch, IconButton, Tooltip } from '@material-ui/core';
import * as QUESTION_TYPES from '../const/questionType';
import NarrativeQuestion from '../components/Form/narrativeQuestion';
import OptionalQuestion from '../components/Form/optionalQuestion';
import { useDispatch } from 'react-redux';
import { questionActions } from '../reducers/questionReducer';
import { v4 as uuidv4 } from 'uuid';

const menus = [
  { id: QUESTION_TYPES.SHORT_ANSWER, option: '단답형' },
  {
    id: QUESTION_TYPES.LONG_ANSWER,
    option: '장문형',
  },
  {
    id: QUESTION_TYPES.ONE_CHOICE,
    option: '객관식 질문',
  },
  {
    id: QUESTION_TYPES.MULTIPLE_CHOICE,
    option: '체크박스',
  },
  {
    id: QUESTION_TYPES.DROP_DOWN,
    option: '드롭다운',
  },
];

interface QuestionProps {
  questionId: string;
  index: number;
}

const QuestionContainer = ({ questionId }: QuestionProps) => {
  const dispatch = useDispatch();
  const { questions } = useAppSelector(state => state.form);

  const selectedQuestion = questions.find(item => item.id === questionId);
  if (!selectedQuestion) return null;
  const { type: questionType, options, questionContent, isNecessary } = selectedQuestion;
  const lastOptionIndex = options.length + 1;

  const newQuestion = (newId: string) => {
    return {
      ...selectedQuestion,
      id: newId,
    };
  };

  const handleSwitch = () => {
    dispatch(questionActions.setNecessary(questionId));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(questionActions.setQuestionContent({ id: questionId, questionContent: e.target.value }));
  };

  const handleDeleteQuestion = () => {
    dispatch(questionActions.deleteQuestion(questionId));
  };

  const handleCopyQuestion = () => {
    const newId = uuidv4();
    dispatch(questionActions.addQuestion(newQuestion(newId)));
  };

  const getOptionList = (type: number) => {
    const optionList = options
      ?.map(option => (
        <OptionalQuestion
          key={option.id}
          questionId={questionId}
          optionId={option.id}
          optionContent={option.option}
          type={type}
          isLast={false}
        />
      ))
      .concat(
        <OptionalQuestion
          key={lastOptionIndex}
          questionId={questionId}
          optionId={lastOptionIndex}
          optionContent="옵션 추가"
          type={type}
          isLast
        />,
      );
    return optionList;
  };

  const getInput = () => {
    switch (questionType) {
      case QUESTION_TYPES.ONE_CHOICE:
      case QUESTION_TYPES.MULTIPLE_CHOICE:
      case QUESTION_TYPES.DROP_DOWN:
        return getOptionList(questionType);
      case QUESTION_TYPES.SHORT_ANSWER:
        return <NarrativeQuestion type="short" questionId={questionId} />;
      case QUESTION_TYPES.LONG_ANSWER:
        return <NarrativeQuestion type="long" questionId={questionId} />;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col mb-7 border bg-white rounded-xl p-10">
      <div className="flex flex-row ">
        <input
          className=" p-3 w-2/3 text-xl border-gray-500 border-b focus:border-b-2 focus:border-blue-500 focus:outline-none bg-gray-100 mr-5"
          type="text"
          placeholder="질문"
          value={questionContent}
          onChange={handleQuestionChange}
        />
        <Dropdown questionId={questionId} menus={menus} />
      </div>
      <div>{getInput()}</div>
      <hr />
      <div className="flex flex-row justify-end items-center gap-3">
        <Tooltip title="복사">
          <IconButton>
            <CopyIcon onClick={handleCopyQuestion} />
          </IconButton>
        </Tooltip>
        <Tooltip title="삭제">
          <IconButton>
            <TrashIcon onClick={handleDeleteQuestion} />
          </IconButton>
        </Tooltip>
        <div className="switch-label">필수</div>
        <Switch checked={isNecessary} onChange={handleSwitch} color="primary" />
      </div>
    </div>
  );
};

export default QuestionContainer;
