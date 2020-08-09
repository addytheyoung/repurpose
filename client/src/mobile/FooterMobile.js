import React from "react";
import Filter from "../images/filter.png";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Info from "../images/info.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

export default class FooterMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homePage: true,
      aboutPage: false,
      searchPage: false,
      profilePage: false,
      mainSearchPage: false,
      cartPage: false,
    };
    if (this.props.searchPage) {
      this.state = {
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        mainSearchPage: true,
        cartPage: false,
      };
    } else if (this.props.cartPage) {
      this.state = {
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        mainSearchPage: false,
        cartPage: true,
      };
    }
  }

  render() {
    if (this.props.profilePage && !this.state.profilePage) {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: true,
        mainSearchPage: false,
        redirectToCheckout: true,
        cartPage: false,
      });
    }
    return (
      <div>
        <div
          style={{
            height: "9vh",
            zIndex: 102,
            width: "100vw",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => this.openPage("homePage")}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              paddingTop: "1vh",
              // alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <HomeOutlinedIcon
                style={{
                  width: "8vw",
                  height: "8vw",
                  color: this.state.homePage ? "#426CB4" : "#000000",
                }}
              ></HomeOutlinedIcon>
              <div
                style={{
                  fontWeight: 500,
                  marginTop: "0.2vh",
                  color: this.state.homePage ? "#426CB4" : "#000000",
                }}
              >
                Home
              </div>
            </div>
          </div>
          <div
            onClick={() => this.openPage("aboutPage")}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              marginTop: "1vh",
              // alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <InfoOutlinedIcon
                style={{
                  width: "8vw",
                  height: "8vw",
                  color: this.state.aboutPage ? "#426CB4" : "#000000",
                }}
              ></InfoOutlinedIcon>
              <div
                style={{
                  fontWeight: 500,
                  marginTop: "0.2vh",
                  color: this.state.aboutPage ? "#426CB4" : "#000000",
                }}
              >
                About
              </div>
            </div>
          </div>

          <div
            onClick={() => this.openPage("searchPage")}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              marginTop: "1vh",
              // alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <SearchOutlinedIcon
                style={{
                  width: "8vw",
                  height: "8vw",
                  color:
                    this.state.searchPage || this.state.mainSearchPage
                      ? "#426CB4"
                      : "#000000",
                }}
              ></SearchOutlinedIcon>
              <div
                style={{
                  fontWeight: 500,
                  marginTop: "0.2vh",
                  color:
                    this.state.searchPage || this.state.mainSearchPage
                      ? "#426CB4"
                      : "#000000",
                }}
              >
                Search
              </div>
            </div>
          </div>

          <div
            onClick={() => this.openPage("profilePage")}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              marginTop: "1vh",
              // alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <AccountCircleOutlinedIcon
                style={{
                  width: "8vw",
                  height: "8vw",
                  color: this.state.profilePage ? "#426CB4" : "#000000",
                }}
              ></AccountCircleOutlinedIcon>
              <div
                style={{
                  fontWeight: 500,
                  marginTop: "0.2vh",
                  color: this.state.profilePage ? "#426CB4" : "#000000",
                }}
              >
                Profile
              </div>
            </div>
          </div>

          <div
            onClick={() => this.openPage("cartPage")}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              marginTop: "1vh",
              // alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <ShoppingCartOutlinedIcon
                style={{
                  width: "8vw",
                  height: "8vw",

                  color: this.state.cartPage ? "#426CB4" : "#000000",
                }}
              ></ShoppingCartOutlinedIcon>

              <div
                style={{
                  fontWeight: 500,
                  marginTop: "0.2vh",

                  color: this.state.cartPage ? "#426CB4" : "#000000",
                }}
              >
                Cart
              </div>
            </div>
            {localStorage.getItem("cart") && localStorage.getItem("cart") != 0 && (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 12,
                  backgroundColor: "red",
                  borderRadius: 100,
                  position: "absolute",
                  width: "4.5vw",
                  height: "4.5vw",
                  marginLeft: "3.5vw",
                }}
              >
                {localStorage.getItem("cart")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  openPage(page) {
    if (page == "homePage") {
      if (window.location.pathname != "/") {
        this.setState({
          homePage: true,
          aboutPage: false,
          searchPage: false,
          profilePage: false,
          mainSearchPage: false,
          cartPage: false,
        });
        window.location.href = "/";
      } else {
        this.setState({
          homePage: true,
          aboutPage: false,
          searchPage: false,
          profilePage: false,
          mainSearchPage: false,
          cartPage: false,
        });
        this.props.openPage(page);
      }
    } else if (page == "aboutPage") {
      this.setState({
        homePage: false,
        aboutPage: true,
        searchPage: false,
        profilePage: false,
        mainSearchPage: false,
        cartPage: false,
      });
      this.props.openPage(page);
      return;
    } else if (page == "searchPage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: true,
        profilePage: false,
        mainSearchPage: false,
        cartPage: false,
      });
      this.props.openPage(page);
    } else if (page == "profilePage") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: true,
        mainSearchPage: false,
        cartPage: false,
      });
      this.props.openPage(page);
    } else if (page == "cartPage") {
      if (window.location.pathname == "/cart") {
        this.setState({
          homePage: false,
          aboutPage: false,
          searchPage: false,
          profilePage: false,
          mainSearchPage: false,
          cartPage: true,
        });
        this.props.openPage(page);
      } else {
        this.setState({
          homePage: false,
          aboutPage: false,
          searchPage: false,
          profilePage: false,
          mainSearchPage: false,
          cartPage: true,
        });
        window.location.href = "/cart";
      }
    }
  }

  closePage() {
    if (this.props.cartPage) {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        mainSearchPage: false,
        cartPage: true,
      });
    } else {
      this.setState({
        homePage: true,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        mainSearchPage: false,
        cartPage: false,
      });
    }
  }
}
