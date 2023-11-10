import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { UserProvider } from './context/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx';
import Users from './Pages/Users.jsx';
import Groups from './Pages/Groups.jsx';
import Chats from './Pages/Chats.jsx';
import Profile from './Pages/Profile.jsx';
import Chat from './Pages/Chat.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/groups',
        element: <Groups/>
      }, 
      {
        path: '/groups/:id',
        element: <Chat type='group'></Chat>
      },
      {
        path: '/your-groups',
        element: <Groups/>
      },
      {
        path: '/chats',
        element: <Chats/>
      },
      {
        path: '/chats/:id',
        element: <Chat type='private'></Chat>
      },
      {
        path: '/profile',
        element: <Profile/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>,
)
