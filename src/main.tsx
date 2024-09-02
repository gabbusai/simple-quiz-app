import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainMenu from './components/Pages/MainMenu.tsx'
import QuestionPage from './components/Pages/QuestionPage.tsx'
import QuizContextProvider from './services/QuizContext.tsx'
import Overview from './components/Overview.tsx'
import IsFinishedRoute from './services/IsFinishedRoute.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
    },
  },
});

const router = createBrowserRouter([
  {
  path: '/',
  element: <MainMenu/>
  },

  {
    path: '/quiz',
    element: <QuestionPage />
    },

  {
    path: '/overview',
    element: (
      <IsFinishedRoute>
        <Overview />
      </IsFinishedRoute>
    ),
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizContextProvider>
      <RouterProvider router={router} />
      </QuizContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
