import { ReactComponent as ShowIcon } from '../../assets/previewIcon.svg';
import { ReactComponent as AddIcon } from '../../assets/addIcon.svg';
import { FormProps } from './TitleBox';
import { useDispatch } from 'react-redux';
import { formActions } from '../../reducers/formReducer';
import { questionActions } from '../../reducers/questionReducer';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as QUESTION_TYPES from '../../const/questionType';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  info: FormProps;
}

const newQuestion = (newId: string) => ({
  id: newId,
  type: QUESTION_TYPES.ONE_CHOICE,
  questionContent: '',
  isNecessary: false,
  options: [
    {
      id: 1,
      option: '옵션 1',
    },
  ],
  answers: [],
  narrativeAnswer: '',
});

const SideMenu = ({ info }: Props) => {
  const dispatch = useDispatch();

  const handlePreview = () => {
    dispatch(formActions.addForm(info));
  };

  const handleAddQuestion = () => {
    const newId = uuidv4();
    dispatch(questionActions.addQuestion(newQuestion(newId)));
  };

  return (
    <div className="flex flex-col justify-around border bg-gray-100 p-2 gap-1 rounded-xl">
      <Link to="/preview">
        <IconButton>
          <ShowIcon onClick={handlePreview} />
        </IconButton>
      </Link>
      <IconButton>
        <AddIcon onClick={handleAddQuestion} />
      </IconButton>
    </div>
  );
};

export default SideMenu;
