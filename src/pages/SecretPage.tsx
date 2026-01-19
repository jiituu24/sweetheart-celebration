import { useNavigate } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import SecretGate from '@/components/SecretGate';

const SecretPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/letter');
  };

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <FloatingElements />
      <SecretGate secretKey="love" onSuccess={handleSuccess} />
    </div>
  );
};

export default SecretPage;
