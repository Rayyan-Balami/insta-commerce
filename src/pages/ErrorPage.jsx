import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, House } from 'lucide-react';
import NoDataPlaceholder from '@/components/NoDataPlaceholder';

const ErrorPage = () => {
  const location = useLocation();
  const errorCode = location.state?.errorCode || 404;

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 lg:p-6">
      <NoDataPlaceholder
        header={errorCode}
        body="Oops! Something went wrong."
      >
        <Button variant="outline" size="sm" className="h-8" asChild>
        <Link to="/" className="flex items-center gap-1">
          Go Home
          <MoveRight className="h-3.5 w-3.5" />
          <House className="h-3.5 w-3.5" />
        </Link>
      </Button>
      </NoDataPlaceholder>
    </div>
  );
};

export default ErrorPage;