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
import '../../support/css/navbarstyle.css';

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
          <Navbar light expand="md" style={{ backgroundColor: '#26272b' }}>
            <NavbarBrand href="/" style={{ color: "#ff9100", fontFamily: 'Ubuntu, sans- serif', fontSize: '30pt', fontWeight: "900" }}>Refer</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem >
                  <NavLink href="/how-it-works" style={{ color: "gray" }}>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register" style={{ color: "gray" }}>Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login" style={{ color: "gray" }}>Login</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div >
      );
    }
    return (
      <Navbar light expand="md" style={{ backgroundColor: '#26272b' }}>
        <Link to='/homes'><NavbarBrand style={{ color: "#ff9100", fontFamily: 'Ubuntu, sans- serif', fontSize: '30pt', fontWeight: "900" }}>Refer</NavbarBrand></Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem style={{ color: "gray" }}>
              <Link to='/itinerary'><NavLink style={{ color: "gray" }}>My Itinerary</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "gray" }}>
                Hello, {this.props.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem />
                <a href="/"><DropdownItem onClick={this.onLogOutSelect} style={{ color: "gray" }}>
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