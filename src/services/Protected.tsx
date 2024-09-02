
import { Navigate } from 'react-router';
import { useQuizContext } from './QuizContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isFinished } = useQuizContext();
  

  if (!isFinished) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;