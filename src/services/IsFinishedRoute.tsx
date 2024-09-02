import { Navigate } from 'react-router';
import ProtectedRoute from './Protected';
import { useQuizContext } from './QuizContext';

const IsFinishedRoute = ({ children }: { children: JSX.Element }) => {
  const { isFinished } = useQuizContext();
  if (!isFinished) {
    return <Navigate to="/" replace />;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default IsFinishedRoute;