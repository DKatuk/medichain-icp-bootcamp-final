import { ToastContainer, toast } from 'react-toastify';

export const NOTIFY_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'passive',
};

export const makeNotify = (type, msg, durationMs = 2000) => {
    const classes = `text-sm`;

    switch (type) {
        case NOTIFY_TYPES.ERROR:
            toast.error(msg, {
                // duration: durationMs,
                className: classes,
                position: "top-right",
                theme: "light"
            });
            break;
        case NOTIFY_TYPES.SUCCESS:
            toast.success(msg, {
                // duration: durationMs,
                className: classes,
                position: "top-right",
                theme: "light"
            });
            break;
        case NOTIFY_TYPES.INFO:
            toast.info(msg, {
                // duration: durationMs,
                className: classes,
                position: "top-right",
                theme: "light"
            });
            break;

        default:
            toast(msg, {
                // duration: durationMs,
                className: classes,
                // position: "top-right",
            });
            break;
    }
};
