import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import axios from "../../util/axiosWrapper";
import auth from "../../util/auth2";
import Actions from "../../reducers/actions";
import '../../static/scss/header.scss'

class Header extends Component {
  state = {
    user: null,
  };

  componentWillReceiveProps(newprops) {
    this.setState({user: newprops.user});
  }

  render() {
    const { user } = this.props;

    return (
      <Navbar
        collapseOnSelect={false}
        /* sticky="top" */ expand="md"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand as={NavLink} to="/">
          CoderClub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as={NavLink} to="/courses">
              Courses
            </Nav.Link>
            {/* <Nav.Link eventKey="2" as={NavLink} to="/pricing">
              Pricing
            </Nav.Link> */}
          </Nav>
          <Nav>
            {user.username ? (
              <NavDropdown
                title={user.username}
                id="collasible-nav-dropdown"
                className='dropdown-menu-right'
              >
                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="/action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item as={NavLink} to="/auth">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    console.log("logout");
                    auth.logout();
                  }}
                >
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <React.Fragment>
                <Nav.Link eventKey="3" as={NavLink} to="/auth">
                  SignIn/SignUp
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapPropsToState = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({ type: Actions.SETUSER, user: user });
    },
  };
};

export default connect(mapStateToProps, mapPropsToState)(Header);
