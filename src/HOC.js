import React from "react";
import ReactDOM from "react-dom";

export function withData(WrappedComponent) {
  class HigherComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        list: this.props.arr,
        renderItems: 20,
        renderMoreItems: 5,
      };
      this.reff = React.createRef();
    }

    handleScroll = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const bottom = scrollHeight - scrollTop - clientHeight;
      if (!bottom) {
        console.log("start get more data");
        this.getMoreData();
      }
    };
    getMoreData = () => {
      const { arr } = this.props;
      const { renderItems, renderMoreItems } = this.state;

      setTimeout(() => {
        this.setState({
          list: arr.slice(0, renderItems),
          renderItems: renderItems + renderMoreItems,
        });
        console.log("running setTimeOut");
      }, 1000);
    };

    componentDidMount = () => {
      ReactDOM.findDOMNode(this.reff.current).addEventListener(
        "scroll",
        this.handleScroll
      );
    };
    render() {
      return (
        <WrappedComponent {...this.props} {...this.state} ref={this.reff} />
      );
    }
  }
  return HigherComponent;
}
