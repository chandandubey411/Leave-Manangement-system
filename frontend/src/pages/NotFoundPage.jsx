import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
        <AlertTriangle className="w-7 h-7 text-amber-500" />
      </div>
      <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-2">404</h1>
      <p className="text-base font-medium text-slate-700 mb-1">Page not found</p>
      <p className="text-sm text-slate-500 max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        id="go-home-btn"
        variant="primary"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </Button>
    </div>
  );
}

export default NotFoundPage;
