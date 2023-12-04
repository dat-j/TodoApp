import { withData } from "./HOC";
import React from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list, renderItems } = this.props;
    return (
      <div id="todoList">
        <ul>
          {list?.slice(0, renderItems).map((todo, index) => (
            <Todo index={index} key={todo.id} todo={todo} {...this.props} />
          ))}
        </ul>
      </div>
    );
  }
}
const HocComponent = withData(TodoList);

export default HocComponent;

// import React from "react";

// //components
// import Todo from "./Todo";
// //styles
// import "./styles.css";

// class TodoList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: this.props.arr?.slice(0, 20),
//       renderItems: 2,
//       rendered: 20,
//       isBottom: false
//     };
//     this.todoListRef = React.createRef();
//   }

//   fetchMoreData = () => {
//     const { arr, totalItems } = this.props;
//     const { renderItems, list, rendered } = this.state;

//     setTimeout(() => {
//       this.setState({
//         list: arr?.slice(0, rendered + renderItems),
//         rendered: rendered + renderItems
//       });
//     }, 300);
//   };

//   handleScroll = (e) => {
//     const scrollHeight = e.target.scrollHeight;
//     const scrollTop = e.target.scrollTop;
//     const clientHeight = e.target.clientHeight;
//     const bottom = scrollHeight - scrollTop - clientHeight;
//     const nearBottom = 20;

//     console.log("scrollHeight:", scrollHeight);
//     console.log("scrollTop:", scrollTop);
//     console.log("clientHeight:", clientHeight);
//     console.log("bottom:", bottom);
//     if (nearBottom >= bottom + 10) {
//       console.log("reachedBottom");
//       this.fetchMoreData();
//     }
//   };

//   componentDidMount = () => {
//     this.todoListRef.current.addEventListener("scroll", this.handleScroll);
//   };
//   render() {
//     const { list } = this.state;
//     const { arr } = this.props;
//     return (
//       <div id="todoList" ref={this.todoListRef}>
//         <ul>
//           {list.map((todo, index) => (
//             <Todo index={index} key={todo.id} todo={todo} {...this.props} />
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default TodoList;
