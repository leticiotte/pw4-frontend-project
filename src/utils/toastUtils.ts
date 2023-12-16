import { toast } from 'react-toastify';

export const successToast = (title: string, autoClose?: number): void => {
  toast.success(title, {
    position: 'top-right',
    autoClose: autoClose ?? 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const warningToast = (title: string, autoClose?: number): void => {
  toast.warning(title, {
    position: 'top-right',
    autoClose: autoClose ?? 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const errorToast = (title: string, autoClose?: number): void => {
  toast.error(title, {
    position: 'top-right',
    autoClose: autoClose ?? 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
