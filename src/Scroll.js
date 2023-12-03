import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Todo from "./Todo";

class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.arr?.slice(0, 14),
      hasMore: true,
      renderItems: 2,
      rendered: 14
    };
  }

  fetchMoreData = () => {
    const { arr, totalItems } = this.props;
    const { renderItems, list, rendered } = this.state;

    if (list.length >= arr.length) {
      this.setState({ hasMore: false });
      return;
    }
    setTimeout(() => {
      this.setState({
        // list: list.concat(arr.slice(rendered, rendered + renderItems)),
        list: arr?.slice(0, rendered + renderItems),
        rendered: rendered + renderItems
      });
    }, 3000);
  };

  render() {
    const { arr } = this.props;
    const { list } = this.state;

    return (
      <div>
        <hr />
        <InfiniteScroll
          dataLength={arr.length}
          // next={this.fetchMoreData}// catch event scroll to bottom
          onScroll={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {list.map((todo, index) => (
            <Todo index={index} key={todo.id} todo={todo} {...this.props} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Scroll;
