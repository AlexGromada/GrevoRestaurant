import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';

import UserDataContext from "./context/UserDataContext.jsx";
import './reset.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataContext>
      <RouterProvider router={router} />
    </UserDataContext>
  </StrictMode>
);