import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserProvider from './context/user';

// import Table from './components/Table';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
        {/* <SignIn /> */}
      
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>,
);
