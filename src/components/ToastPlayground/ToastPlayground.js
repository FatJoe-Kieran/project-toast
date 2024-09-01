import React, { useContext, useState } from "react";
import useKeyDown from "../../hooks/useKeyDown";
import Button from "../Button";
import { ToastContext } from "../ToastProvider";
import ToastShelf from "../ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_MESSAGE = "";
const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const { addToast, removeAllToasts } = useContext(ToastContext);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [variant, setVariant] = useState(DEFAULT_VARIANT);
  useKeyDown(27, removeAllToasts);
  // useEffect(() => {
  //   const close = (e) => {
  //     if (e.keyCode === 27) {
  //       removeAllToasts();
  //     }
  //   };
  //   window.addEventListener("keydown", close);
  //   return () => window.removeEventListener("keydown", close);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formMessage = e.target.message.value;
    const formVariant = e.target.variant.value;

    if (!formMessage) {
      alert("Message is required");
      return;
    }
    if (!formVariant) {
      alert("Variant is required");
      return;
    }

    addToast(message, variant);
    setMessage(DEFAULT_MESSAGE);
    setVariant(DEFAULT_VARIANT);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label} style={{ alignSelf: "baseline" }}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;

              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
