import React, { useState } from "react";

//components
import Todo from "./Todo";
//styles
import "./styles.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.inputRef = React.createRef();
    this.tempId = null;
  }
  //focus input
  focusInput(id, text) {
    if (this.inputRef.current) {
      this.setState({ text });
      this.tempId = id;
      this.inputRef.current.focus();
    }
  }

  //catch onchange event
  onChangeInput = (e) => {
    this.setState({
      text: e.target.value,
    });
  };
  //catch key down event
  handleKeyDown = (e) => {
    const { addTodo, updateTodo } = this.props;
    const { text } = this.state;

    if (e.key === "Enter" && text && text.trim()) {
      //add text.trim() loai bo space khi nhap
      if (this.tempId) {
        const { value } = e.target;
        updateTodo(this.tempId, value);
        this.tempId = null;
        console.log("dang edit todo");
      } else {
        addTodo({
          id: new Date().valueOf(),
          text: e.target.value,
          isDone: false,
        });
      }
      this.setState({ text: "" });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <>
        <input
          className="header-input"
          type="text"
          ref={this.inputRef}
          placeholder="Cần phải làm gì?"
          value={text}
          onChange={this.onChangeInput}
          onKeyDown={this.handleKeyDown}
        ></input>
      </>
    );
  }
}
export default Header;

