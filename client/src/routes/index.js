import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Menu, Image, Container, Header } from 'semantic-ui-react';

import Home from './Home';
import Register from './Register';
import User from './User';
import Update from './Update';

const Routes = () => (
  <Router>
    <div>
      <Menu borderless>
        <Container>
          <Menu.Item as={Link} to="/" refresh="true">
            <Image
              src="https://www.evolenthealth.com/sites/all/themes/evolentcorporate/logo.png"
              alt="Evolent Health"
              size="small"
            />
          </Menu.Item>
          <Menu.Item as={Link} to="/" refresh="true">
            <Header as="h3">Home</Header>
          </Menu.Item>
          <Menu.Item as={Link} to="/add-contact" refresh="true">
            <Header as="h3">Add Contact</Header>
          </Menu.Item>
        </Container>
      </Menu>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-contact" component={Register} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/update/:id" component={props => <Update {...props} />} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
