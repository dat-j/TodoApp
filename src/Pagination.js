import React from "react";
import Todo from "./Todo";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // arr: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
      currentPage: 1,
      todosPerPage: 5
    };
  }

  handlePageClick = (event) => {
    this.setState({
      currentPage: event.target.value
    });
  };

  render() {
    const { currentPage, todosPerPage } = this.state;
    const { arr } = this.props;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = arr?.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos?.map((todo, index) => {
      return <Todo index={index} key={todo.id} todo={todo} {...this.props} />;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arr?.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((pageNumber) => {
      return (
        <li key={pageNumber} value={pageNumber} onClick={this.handlePageClick}>
          {pageNumber}
        </li>
      );
    });

    return (
      <div>
        <ul>{renderTodos}</ul>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Pagination;
