import { useRoutes } from 'react-router-dom';
import Chat from '../views/dashboard/Chat';

// ----------------------------------------------------------------------



export default function Router() {
  return useRoutes([

    // Dashboard Routes
  
      
        {
          path: 'chat',
          element: <Chat />
          children: [
            { path: '/', element: <Chat /> },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> }
          ]
        },
        // { path: 'kanban', element: <Kanban /> }


    ]);

  }

