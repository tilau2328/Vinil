import 'react-select/dist/react-select.css';

import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Index from './pages/Index';

import Clients from '../clients/pages/Clients';
import Client from '../clients/pages/Client';
import CreateClient from '../clients/pages/CreateClient';
import EditClient from '../clients/pages/EditClient';

import Projects from '../projects/pages/Projects';
import Project from '../projects/pages/Project';
import CreateProject from '../projects/pages/CreateProject';
import EditProject from '../projects/pages/EditProject';

import Materials from '../materials/pages/Materials';
import Material from '../materials/pages/Material';
import CreateMaterial from '../materials/pages/CreateMaterial';
import EditMaterial from '../materials/pages/EditMaterial';

import Suppliers from '../suppliers/pages/Suppliers';
import Supplier from '../suppliers/pages/Supplier';
import CreateSupplier from '../suppliers/pages/CreateSupplier';
import EditSupplier from '../suppliers/pages/EditSupplier';

const App = ({ children, match }) => (
  <div className="container">
    <Header />
    <Route exact path="/" component={Index} />

    <Route exact path="/clients" component={Clients} />
    <Route exact path="/create_client" component={CreateClient} />
    <Route exact path="/clients/:id" component={Client} />
    <Route exact path="/clients/:id/edit" component={EditClient} />

    <Route exact path="/projects" component={Projects} />
    <Route exact path="/create_project" component={CreateProject} />
    <Route exact path="/projects/:id" component={Project} />
    <Route exact path="/projects/:id/edit" component={EditProject} />

    <Route exact path="/materials" component={Materials} />
    <Route exact path="/create_material" component={CreateMaterial} />
    <Route exact path="/materials/:id" component={Material} />
    <Route exact path="/materials/:id/edit" component={EditMaterial} />

    <Route exact path="/suppliers" component={Suppliers} />
    <Route exact path="/create_supplier" component={CreateSupplier} />
    <Route exact path="/suppliers/:id" component={Supplier} />
    <Route exact path="/suppliers/:id/edit" component={EditSupplier} />
  </div>
);

export default App;
