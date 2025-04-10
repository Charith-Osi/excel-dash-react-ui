
import React from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type ToastOptions = {
  description?: string;
  action?: React.ReactNode;
  cancel?: React.ReactNode;
  onActionClick?: () => void;
  onCancelClick?: () => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  duration?: number;
  important?: boolean;
  dismissible?: boolean;
};

export const successToast = (message: string, options?: ToastOptions) => {
  return toast(
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <span>{message}</span>
    </div>,
    options
  );
};

export const errorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, options);
};

export const infoToast = (message: string, options?: ToastOptions) => {
  return toast.info(message, options);
};

export const warningToast = (message: string, options?: ToastOptions) => {
  return toast.warning(message, options);
};
