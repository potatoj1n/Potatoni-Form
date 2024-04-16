import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { questionActions } from '../reducers/questionReducer';
import QuestionContainer from '../containers/questionContainer';
import FormHeader from '../components/Form/formHeader';
import SideMenu from '../components/Form/sideMenu';
import TitleBox from '../components/Form/TitleBox';
import useAppSelector from '../hooks/useAppSelector';

const Form = () => {
  const { form, questions } = useAppSelector(state => state.form);
  const dispatch = useDispatch();

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
      <Draggable key={question.id} draggableId={question.id} index={idx}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
            }}
            className="border rounded-xl min-h-62 mb-5 px-9 py-3"
          >
            <QuestionContainer key={question.id} questionId={question.id} provided={provided} />
          </div>
        )}
      </Draggable>
    ));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    dispatch(questionActions.reorderQuestion({ firstIdx: result.source.index, secondIdx: result.destination.index }));
  };

  return (
    <div className="flex flex-col h-screen">
      <FormHeader title={info.title} />
      <div className="flex flex-row justify-center text-base font-semibold gap-3">
        <Link to="/form" className="text-blue-500 border-blue-500 border-b-2">
          질문
        </Link>
        <Link to="/response">응답</Link>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow bg-blue-200">
        <main className="w-3/5 max-w-screen-lg">
          <TitleBox info={{ id: form.form.id, title: info.title, detail: info.detail }} handleChange={handleInfo} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div ref={provided.innerRef}>
                  {getQuestionList()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
        <span className="fixed right-48 top-44">
          <SideMenu info={info} />
        </span>
      </div>
    </div>
  );
};
export default Form;
