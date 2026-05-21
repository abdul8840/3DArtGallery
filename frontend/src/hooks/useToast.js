import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: '#fff',
        fontWeight: '500',
      },
    });
  };

  const showError = (message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        fontWeight: '500',
      },
    });
  };

  const showInfo = (message) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        fontWeight: '500',
      },
    });
  };

  const showWarning = (message) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
        fontWeight: '500',
      },
    });
  };

  const showLoading = (message = 'Loading...') => {
    return toast.loading(message, {
      position: 'top-right',
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismissToast,
  };
};

export default useToast;