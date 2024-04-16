import useAppSelector from '../hooks/useAppSelector';
import TitleBox from '../components/Form/TitleBox';
import PreviewContainer from '../containers/previewContainer';
import FormHeader from '../components/Form/formHeader';
import { Link } from 'react-router-dom';

const ResponseCheck = () => {
  const form = useAppSelector(state => state.form);
  const { questions } = form;

  return (
    <div className="flex flex-col h-screen">
      <FormHeader title={form.form.form.title} />
      <div className="flex flex-row justify-center text-base font-semibold gap-3">
        <Link to="/form">질문</Link>
        <Link to="/response" className="text-blue-500 border-blue-500 border-b-2">
          응답
        </Link>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow bg-blue-200">
        <main className="w-3/5 max-w-screen-lg text-xl">
          <div className="border bg-white rounded-xl my-5 p-8">
            <TitleBox info={form.form.form} />
          </div>
          <div>
            {questions.map(question => (
              <PreviewContainer key={question.id} questionId={question.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponseCheck;
