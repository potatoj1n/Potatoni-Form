import Dropdown from '../components/Form/dropDown';
import NarrativeQuestion from '../components/Form/narrativeQuestion';
import OptionalQuestion from '../components/Form/optionalQuestion';
import * as QUESTION_TYPES from '../const/questionType';
import useAppSelector from '../hooks/useAppSelector';

interface SolveProps {
  questionId: string;
}

const PreviewContainer = ({ questionId }: SolveProps) => {
  const { questions } = useAppSelector(state => state.form);
  const selectedQuestion = questions.find(item => item.id === questionId);
  if (!selectedQuestion) return null;
  const { type: questionType, options, questionContent, isNecessary } = selectedQuestion;
  const isAnswer = (value: number) => selectedQuestion.answers.findIndex(item => item === value) >= 0;

  const getOptionList = (type: number) => {
    const optionList = options?.map(option => (
      <OptionalQuestion
        isAnswer={isAnswer(option.id)}
        key={option.id}
        questionId={questionId}
        optionId={option.id}
        type={type}
        optionContent={option.option}
        isLast={false}
      />
    ));
    return optionList;
  };

  const getInput = () => {
    switch (questionType) {
      case QUESTION_TYPES.ONE_CHOICE:
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return getOptionList(questionType);
      case QUESTION_TYPES.DROP_DOWN:
        return <Dropdown questionId={questionId} menus={options} />;
      case QUESTION_TYPES.SHORT_ANSWER:
        return <NarrativeQuestion type="short" questionId={questionId} />;
      case QUESTION_TYPES.LONG_ANSWER:
        return <NarrativeQuestion type="long" questionId={questionId} />;
      default:
        return;
    }
  };

  return (
    <div className="text-base border rounded-xl flex flex-col flex-grow mb-5 bg-white p-8">
      <span className="title">{questionContent}</span>
      {isNecessary && <span className="title_necessary">*</span>}
      {getInput()}
    </div>
  );
};

export default PreviewContainer;
