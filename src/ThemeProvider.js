import React, { createContext } from "react";

export const themeContext = createContext({
  theme: "light",
  toggleTheme: () => null
});

class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light"
    };
  }
  toggleTheme = () => {
    // this.setState({ theme: "light" ? "dark" : "light" });
    const { theme } = this.state;
    if (theme === "light") {
      this.setState({ theme: "dark" });
    } else {
      this.setState({ theme: "light" });
    }
  };
  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <themeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        {children}
      </themeContext.Provider>
    );
  }
}
export default ThemeProvider;
