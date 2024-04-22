import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuestionContainer from '../containers/questionContainer';
import FormHeader from '../components/Form/formHeader';
import SideMenu from '../components/Form/sideMenu';
import TitleBox from '../components/Form/TitleBox';
import useAppSelector from '../hooks/useAppSelector';

const Form = () => {
  const { form, questions } = useAppSelector(state => state.form);

  const [info, setInfo] = useState({
    title: form.form.title,
    detail: form.form.detail,
  });

  const handleInfo = (name: string, value: string) => {
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const getQuestionList = () => {
    return questions.map((question, idx) => (
      <QuestionContainer key={question.id} questionId={question.id} index={idx} />
    ));
  };

  return (
    <div className="flex flex-col h-screen">
      <FormHeader title={info.title} />
      <div className="flex flex-row justify-center text-base font-semibold gap-3">
        <Link to="/form" className="text-blue-500 border-blue-500 border-b-2">
          질문
        </Link>
        <Link to="/responseCheck">응답</Link>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow bg-blue-200">
        <main className="w-3/5 max-w-screen-lg">
          <TitleBox info={{ id: form.form.id, title: info.title, detail: info.detail }} handleChange={handleInfo} />
          <div>{getQuestionList()}</div>
        </main>
        <span className="fixed right-48 top-44">
          <SideMenu info={info} />
        </span>
      </div>
    </div>
  );
};

export default Form;
