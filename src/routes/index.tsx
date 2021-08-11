import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import MessageView from '../views/ChatView';
// layouts
// import MainLayout from '../layouts/main';
// import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// // guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// // import RoleBasedGuard from '../guards/RoleBasedGuard';
// // components
// import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

// const Loadable = (Component: any) => (props: any) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { pathname } = useLocation();
//   const isDashboard = pathname.includes('/dashboard');

//   return (
//     <Suspense
//       fallback={
//         <LoadingScreen
//           style={{
//             ...(!isDashboard && {
//               top: 0,
//               left: 0,
//               width: 1,
//               zIndex: 9999,
//               position: 'fixed'
//             })
//           }}
//         />
//       }
//     >
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
  return useRoutes([


    // Dashboard Routes
    {
      path: 'dashboard',
      element: 
          <DashboardLayout />
      ,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },


        {
          path: 'chat',
          children: [
            { path: '/', element: <MessageView /> },
            { path: 'new', element: <MessageView /> },
            { path: ':conversationKey', element: <MessageView /> }
          ]
        },
        // { path: 'kanban', element: <Kanban /> }
      ]
    },


    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS
