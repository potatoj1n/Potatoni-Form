import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { questionActions } from '../reducers/questionReducer';
import QuestionContainer from '../containers/questionContainer';
import FormHeader from '../components/Form/formHeader';
import TitleBox from '../components/Form/TitleBox';
import useAppSelector from '../hooks/useAppSelector';

export default function Form() {
  const { form, questions } = useAppSelector(state => state.form);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    title: form.title,
    detail: '',
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
      <FormHeader title={info.title} detail={info.detail} />
      <div className="flex flex-col justify-center items-center flex-grow bg-blue-200">
        <main className="w-full max-w-screen-lg">
          <TitleBox info={info} handleChange={handleInfo} />
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
          <Link to="/response">응답</Link>
        </main>
      </div>
    </div>
  );
}
