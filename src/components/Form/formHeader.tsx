import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as Logoimg } from '../../assets/form_logo.svg';
import { RootState } from '../../store/store';
import { Button, Snackbar } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
interface FormHeaderProps {
  title: string;
}

export default function FormHeader({ title }: FormHeaderProps) {
  const userName = useSelector((state: RootState) => state.auth.name);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSend = () => {
    const responsePageLink = `${window.location.origin}/response`;
    navigator.clipboard.writeText(responsePageLink);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <header className="h-28 mt-1 flex justify-between ">
      <div className="flex flex-row align-center">
        <Link to="/">
          <Logoimg />
        </Link>
        <h1 className="text-xl font-medium mt-3 ">{title}</h1>
      </div>
      <div className="flex p-3 font-normal text-base mr-32">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="border-none rounded-mdw-24 h-10"
          color="primary"
          onClick={handleSend}
        >
          보내기
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={handleCloseSnackbar}
          message="폼 링크가 클립보드에 복사되었습니다."
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
        <button className="w-11 h-11 rounded-3xl border text-sm p-1 ml-3">{userName}</button>
      </div>
    </header>
  );
}
