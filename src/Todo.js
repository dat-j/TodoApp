import React, { useState } from "react";

//components

//styles
import "./styles.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    todoEditingId: "",
    text: ""
  };
  //get todoEditing ID
  getEditTodo = (todoEditingId) => {
    this.setState({
      todoEditingId
    });
  };
  //click to edit in header
  clickEditTodo = (id = "") => {
    const { editTodoHeader, todo, index } = this.props;
    this.setState({
      todoEditingId: id,
      text: todo.text
    });
    editTodoHeader(id, todo.text);
  };

  onChangeInput = (e) => {
    this.setState({
      text: e.target.value
    });
  };
  handleKeyDown = (e) => {
    const { editTodo, todo, index } = this.props;
    const { text } = this.state;
    if (e.key === "Enter" && text && text.trim()) {
      editTodo(
        {
          ...todo,
          text
        },
        index
      );
      this.getEditTodo("");
    }
  };

  render() {
    const { todo, delTodo, checkBoxClick } = this.props;
    const { todoEditingId } = this.state;
    const isEditing = todoEditingId === todo.id;
    return (
      <div className="todo">
        <li>
          {!isEditing ? (
            <div className="todo-item">
              <input
                className="checkbox"
                type="checkbox"
                onClick={() => checkBoxClick(todo)}
              />
              <label
                style={{ textDecoration: todo.isDone ? "line-through" : null }}
                onDoubleClick={() => this.getEditTodo(todo.id)}
              >
                {todo.text}
              </label>
              <button
                className="edit-btn"
                onClick={() => this.clickEditTodo(todo.id)}
              >
                edit
              </button>
              <button className="del-btn" onClick={() => delTodo(todo.id)}>
                delete
              </button>
            </div>
          ) : (
            <input
              className="todo-item"
              type="text"
              defaultValue={todo.text} // value và defaultValue?
              onChange={this.onChangeInput}
              onKeyDown={this.handleKeyDown}
            />
          )}
        </li>
      </div>
    );
  }
}
export default Todo;
