import { ReactComponent as ShowIcon } from '../../assets/previewIcon.svg';
import { ReactComponent as AddIcon } from '../../assets/addIcon.svg';
import { useDispatch } from 'react-redux';
import { formActions } from '../../reducers/formReducer';
import { questionActions } from '../../reducers/questionReducer';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as QUESTION_TYPES from '../../const/questionType';
import { IconButton, Tooltip } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface Props {
  info: {
    title: string;
    detail: string;
  };
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
    <div className="flex flex-col justify-around items-baseline border bg-gray-100 p-1 gap-1 rounded-xl">
      <Link to="/preview">
        <Tooltip title="미리보기" placement="right">
          <IconButton>
            <ShowIcon onClick={handlePreview} />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title="질문 추가" placement="right">
        <IconButton>
          <AddIcon onClick={handleAddQuestion} />
        </IconButton>
      </Tooltip>
      <Tooltip title="파일 추가" placement="right">
        <IconButton component="label" role={undefined} aria-label="upload file">
          <CloudUploadIcon />
          <VisuallyHiddenInput type="file" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SideMenu;
