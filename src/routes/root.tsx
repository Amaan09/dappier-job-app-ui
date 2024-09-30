import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Spinner } from '../shared/spinner';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <Dashboard >
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </Dashboard>
  );
};
