import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>React</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Главная
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/linkslist'}>
              <NavItem>
                <Glyphicon glyph='education' /> Список ссылок
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/tags'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Список тегов
                </NavItem>
            </LinkContainer>
            <LinkContainer to={'/generator'}>
              <NavItem>
                    <Glyphicon glyph='th-list' /> Генератор ссылок
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/search'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Поиск по тегам
                </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
