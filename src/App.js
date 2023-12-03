import React from "react";

//components
import Header from "./Header";
import Todolist from "./TodoList";
import Footer from "./Footer";
import Pagination from "./Pagination";
import Scroll from "./Scroll";
import ThemeProvider, { themeContext } from "./ThemeProvider";
import { todoData } from "./TodoData";
//styles
import "./styles.css";

//const storageKey = "key";
export const filterStatus = {
  all: "all",
  done: "done",
  notDone: "notDone"
};
const filterByStatus = (arr = [], status = "", id = "") => {
  switch (status) {
    case filterStatus.notDone:
      return arr.filter((item) => !item.isDone);
    case filterStatus.done:
      return arr.filter((item) => item.isDone);
    case filterStatus.all:
      return arr;
  }
};
const filterItem = (arr = [], id) => {
  return arr.filter((item) => item.id !== id);
};
const filterItemLeft = (arr = []) => {
  return arr.filter((item) => !item.isDone);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
    this.state = {
      arr: todoData,
      status: filterStatus.all
    };
  }
  //set status
  setStatus = (status = "") => {
    this.setState({ status });
  };
  //addTodo
  addTodo = (todo = {}) => {
    this.setState((preState) => ({
      arr: [todo, ...preState.arr]
    }));
  };
  //updateTodo

  updateTodo = (id, text) => {
    const { arr } = this.state;
    const newArr = arr.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return { todo };
    });
    this.setState(newArr);
    console.log(newArr);
  };

  //delTodo
  delTodo = (id = "") => {
    const { arr } = this.state;
    this.setState({
      arr: filterItem(arr, id)
    });
    console.log("dasd");
  };

  //edit todoHeader
  editTodoHeader = (id, value) => {
    //focus header input
    if (this.headerRef.current) {
      this.headerRef.current.focusInput(id, value);
    }
  };
  //edit todo
  editTodo = (todo, index) => {
    const { arr } = this.state;
    arr.splice(index, 1, todo);
    this.setState({ arr });
  };

  //checkbox
  checkBoxClick = (item) => {
    this.setState(({ arr }) => ({
      arr: arr.map((todo) =>
        todo.id === item.id ? { ...todo, isDone: !todo.isDone } : todo
      )
    }));
  };
  //click page event
  handlePageClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { arr, status } = this.state;
    const { toggleTheme, theme } = this.context;
    return (
      <div className={theme}>
        <h1>TODOS</h1>
        <input
          type="checkbox"
          id="switch"
          className="switch-input"
          onClick={toggleTheme}
        />
        <label htmlFor="switch" className="switch"></label>
        <Header
          ref={this.headerRef}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          editTodo={this.editTodo}
        />
        <Todolist
          checkBoxClick={this.checkBoxClick}
          delTodo={this.delTodo}
          editTodo={this.editTodo}
          getEditTodo={this.getEditTodo}
          arr={filterByStatus(arr, status)}
          editTodoHeader={this.editTodoHeader}
        />
        {/* <Scroll
          checkBoxClick={this.checkBoxClick}
          delTodo={this.delTodo}
          editTodo={this.editTodo}
          getEditTodo={this.getEditTodo}
          arr={filterByStatus(arr, status)}
          editTodoHeader={this.editTodoHeader}
          totalItems={this.state.totalItems}
        /> */}
        <Footer
          setStatus={this.setStatus}
          numOfTodoLeft={filterItemLeft(arr).length}
        />
        {/* <Pagination
          checkBoxClick={this.checkBoxClick}
          delTodo={this.delTodo}
          editTodo={this.editTodo}
          getEditTodo={this.getEditTodo}
          arr={filterByStatus(arr, status)}
        /> */}
      </div>
    );
  }
}
export default App;
App.contextType = themeContext;
