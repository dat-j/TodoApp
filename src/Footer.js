import React, { createContext } from "react";

import { filterStatus } from "./App";
//styles
import "./styles.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { numOfTodoLeft, setStatus } = this.props;

    return (
      <div>
        <section className="footer">
          <strong>{numOfTodoLeft}</strong>
          <span>công việc còn lại</span>

          <a
            href="#"
            className="footer-btn"
            onClick={() => setStatus(filterStatus.all)}
          >
            All
          </a>

          <a
            href="#"
            className="footer-btn"
            onClick={() => setStatus(filterStatus.notDone)}
          >
            Not Done
          </a>

          <a
            href="#"
            className="footer-btn"
            onClick={() => setStatus(filterStatus.done)}
          >
            Done
          </a>
        </section>
      </div>
    );
  }
}
export default Footer;
