import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../../redux/actions/notificationActions";
import { RootState } from "../../redux/store";

interface NotificationProps {
  msg: string;
}

let timeout: ReturnType<typeof setTimeout>;

const Notification: FC<NotificationProps> = ({ msg }) => {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.notification.type);

  useEffect(() => {
    if (msg !== "") {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(setNotification(""));
      }, 7000);
    }
  }, [dispatch, msg]);

  const closeNotification = () => {
    dispatch(setNotification(""));
    clearTimeout(timeout);
  };

  return (
    <div
      className={
        msg
          ? `${
              type === "danger"
                ? "bg-red-100 w-full  text-red-700 px-4 py-3  relative"
                : "bg-teal-100  w-full text-teal-900 px-4 py-3  bg-green-400"
            }`
          : "notification hidden"
      }
      role="alert"
    >
      <p className="mr-6">{msg}</p>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={closeNotification}
      >
        <svg
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default Notification;
