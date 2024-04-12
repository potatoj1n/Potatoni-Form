import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import { questionActions } from '../../reducers/questionReducer';
import { useDispatch } from 'react-redux';
import useAppSelector from '../../hooks/useAppSelector';
import { useLocation } from 'react-router-dom';

interface MenuProps {
  id: number;
  option: string;
}

interface Props {
  questionId: string;
  menus: MenuProps[];
  isAnswer?: boolean;
}

const Dropdown = ({ questionId, menus, isAnswer }: Props) => {
  const dispatch = useDispatch();
  const theme = unstable_createMuiStrictModeTheme();

  const location = useLocation();
  const isPreview = location.pathname === '/preview';
  const isResult = location.pathname === '/result';

  const { questions } = useAppSelector(state => state.form);
  const question = questions.find(item => item.id === questionId);
  if (!question) return null;
  const { type: questionType, answers } = question;
  const selectedAnswer = answers.length > 0 ? answers[0] : '';

  const handleTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(questionActions.changeType({ id: questionId, type: e.target.value }));
  };

  const handleAnswerChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(questionActions.markOneAnswer({ id: questionId, optionId: e.target.value, isAnswer }));
  };

  const showValue = () => {
    if (isPreview || isResult) return selectedAnswer;
    else return questionType;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Select
          disableUnderline
          disabled={isResult ? true : false}
          value={showValue()}
          onChange={isPreview ? handleAnswerChange : handleTypeChange}
        >
          {menus.map(menu => (
            <MenuItem key={menu.id} value={menu.id}>
              <div>{menu.option}</div>
            </MenuItem>
          ))}
        </Select>
      </ThemeProvider>
    </div>
  );
};

export default Dropdown;
