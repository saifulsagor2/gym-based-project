"use client";

type ToastProps = {
    message: string;
};

const Toast = ({ message }: ToastProps) => {
    return (
        <div className="toast">
            <span>✓</span>
            {message}
        </div>
    );
};

export default Toast;