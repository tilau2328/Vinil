import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav } from 'react-bootstrap';

class Header extends Component {
  isCurrent(link){ return this.props.location.pathname == link; }
  goToUrl(url){ this.props.history.push(url); }

  render(){
    return (
      <div className="container-fluid">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"
                className="btn-link navbar-brand"
                style={this.isCurrent('/') ? {pointerEvents: "none"} : null}>
                Home
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem
                eventKey={0}
                onClick={ e => this.goToUrl('/projects') }
                style={this.isCurrent('/projects') ? {pointerEvents: "none"} : null}
              > Projects </NavItem>
              <NavItem
                eventKey={1}
                onClick={ e => this.goToUrl('/materials') }
                style={this.isCurrent('/materials') ? {pointerEvents: "none"} : null}
              > Materials  </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem
                eventKey={2}
                onClick={ e => this.goToUrl('/clients') }
                style={this.isCurrent('/clients') ? {pointerEvents: "none"} : null}
              > Clients </NavItem>
              <NavItem
                eventKey={3}
                onClick={ e => this.goToUrl('/suppliers') }
                style={this.isCurrent('/suppliers') ? {pointerEvents: "none"} : null}
              > Suppliers </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {

  };
}

function mapDispatchToProps(dispatch){
  return {

  };
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(Header);
