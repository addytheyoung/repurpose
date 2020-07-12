import React from "react";
import Filter from "../images/filter.png";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Info from "../images/info.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchPageMobile from "./SearchPageMobile";
import AboutPageMobile from "./AboutPageMobile";
import ProfilePageMobile from "./ProfilePageMobile";

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
      <div style={{ zIndex: 102 }}>
        {this.state.aboutPage && (
          <div style={{ zIndex: 1 }}>
            <AboutPageMobile closePage={() => this.closePage()} />
          </div>
        )}
        {this.state.searchPage && (
          <SearchPageMobile closePage={() => this.closePage()} />
        )}
        {this.state.profilePage && (
          <ProfilePageMobile
            redirectToCheckout={this.state.redirectToCheckout}
            closePage={() => this.closePage()}
          />
        )}
        <div
          style={{
            height: "8vh",
            zIndex: 102,
            width: "100vw",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => this.takeMeHome()}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",

                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
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
                  marginTop: 10,
                  color: this.state.homePage ? "#426CB4" : "#000000",
                }}
              >
                Home
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              this.setState({
                homePage: false,
                aboutPage: true,
                searchPage: false,
                profilePage: false,
                mainSearchPage: false,
                cartPage: false,
              })
            }
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
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
                  marginTop: 10,
                  color: this.state.aboutPage ? "#426CB4" : "#000000",
                }}
              >
                About
              </div>
            </div>
          </div>

          <div
            onClick={() =>
              this.setState({
                homePage: false,
                aboutPage: false,
                searchPage: true,
                profilePage: false,
                mainSearchPage: false,
                cartPage: false,
              })
            }
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
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
                  marginTop: 10,
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
            onClick={() =>
              this.setState({
                homePage: false,
                aboutPage: false,
                searchPage: false,
                profilePage: true,
                mainSearchPage: false,
                cartPage: false,
              })
            }
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
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
                  marginTop: 10,
                  color: this.state.profilePage ? "#426CB4" : "#000000",
                }}
              >
                Profile
              </div>
            </div>
          </div>

          <div
            onClick={() => this.goCart()}
            style={{
              height: "100%",
              width: "17vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
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
                  marginTop: 10,

                  color: this.state.cartPage ? "#426CB4" : "#000000",
                }}
              >
                Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  goCart() {
    if (window.location.pathname == "/cart") {
      this.setState({
        homePage: false,
        aboutPage: false,
        searchPage: false,
        profilePage: false,
        mainSearchPage: false,
        cartPage: false,
      });
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

  takeMeHome() {
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
