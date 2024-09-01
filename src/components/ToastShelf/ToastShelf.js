import React, { useContext } from "react";
import Toast from "../Toast";
import { ToastContext } from "../ToastProvider";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, removeToastById } = useContext(ToastContext);

  return (
    <ol className={styles.wrapper} role="region" aria-live="polite" aria-label="Notification">
      {toasts.map((toast) => {
        const { id, variant, message } = toast;
        return (
          <li key={id} className={styles.toastWrapper}>
            <Toast id={id} variant={variant} handleClose={() => removeToastById(id)}>
              {message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
