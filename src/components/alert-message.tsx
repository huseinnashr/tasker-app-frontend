import React, { StatelessComponent, Fragment } from "react";

interface AlertMessageProps {
  message: string | string[];
}

export const AlertMessage: StatelessComponent<AlertMessageProps> = ({
  message,
}) => {
  return Array.isArray(message) ? (
    <ul style={{ marginBottom: "0px", paddingLeft: "20px" }}>
      {message.map((m, idx) => (
        <li key={idx}>{m}</li>
      ))}
    </ul>
  ) : (
    <Fragment>{message}</Fragment>
  );
};
