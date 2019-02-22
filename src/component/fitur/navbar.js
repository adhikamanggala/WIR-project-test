import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { onUserLogout, keepLogin } from "../../actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Header extends React.Component {
  state = { listUser: [], searchListUser: [] }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    axios.get('http://localhost:2000/user')
      .then((res) => {
        this.setState({ listUser: res.data, searchListUser: res.data })
      }).catch((err) => {
        console.log(err)
      })
  }
  onLogOutSelect = () => {
    this.props.onUserLogout();
    cookies.remove('dataUser');
  }

  render() {
    if (this.props.username === '') {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/" style={{ color: "#ff9100", fontFamily: 'Ubuntu, sans- serif', fontSize: '30pt', fontWeight: "900" }}>Refer</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/how-it-works">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div >
      );
    }
    return (
      <Navbar light expand="md">
        <Link to='/homes'><NavbarBrand style={{ color: "#ff9100", fontFamily: 'Ubuntu, sans- serif', fontSize: '30pt', fontWeight: "900" }}>Refer</NavbarBrand></Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to='/diskusi'><NavLink>Itinerary</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Hello, {this.props.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <Link to='/'><DropdownItem>
                  Option
                </DropdownItem></Link>
                <DropdownItem divider />
                <a href="/"><DropdownItem onClick={this.onLogOutSelect}>
                  Log Out
                </DropdownItem></a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.auth.username
  }
}

export default connect(mapStateToProps, { onUserLogout, keepLogin })(Header);