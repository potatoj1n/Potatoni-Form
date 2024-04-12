import useAppSelector from '../hooks/useAppSelector';
import TitleBox from '../components/Form/TitleBox';
import PreviewContainer from '../containers/previewContainer';

const Response = () => {
  const form = useAppSelector(state => state.form);
  const { questions } = form;

  return (
    <div className="flex flex-col mt-16 relative ">
      <div className="page-title">응답 내용</div>
      <TitleBox info={form.form} />
      {questions.map(question => (
        <PreviewContainer key={question.id} questionId={question.id} />
      ))}
    </div>
  );
};

export default Response;
