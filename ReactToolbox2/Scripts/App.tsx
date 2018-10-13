import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import { LandingPage } from './LandingPage/LandingPage'
import { KnowledgeCheckPage } from './KnowledgeChecks/KnowledgeCheckPage'
import { QA } from './QA/QA'
import { AdminLandingPage } from './AdministrationManagement/AdminLandingPage'

import { UserReports } from './CaseTrackerModules/UserReports'
import { UserWorkQueue } from './CaseTrackerModules/UserWorkQueue'
import { Footer } from './Footer'
import {CaseExpandedDetailsPage } from './CaseTrackerModules/CaseExpandedDetailsPage'

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery'
import '../Content/Site.css'
import '../Content/Sidebar.less'

const $ = require('jquery')

class App extends React.Component<{}, {}> {
    constructor() {
        super()
    }

    render() {
        return (
            <Router>
                <div id="wrapper" style={{ width: "100%" }}>
                    <div className="overlay" data-toggle="offcanvas"></div>

                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route path='/KCT' component={KnowledgeCheckPage} />
						 
                        <Route path='/AdminMgmt' component={AdminLandingPage} />
                        
                        <Route exact path='/CT' component={UserWorkQueue} />
						<Route exact path='/CT/Dashboard' component={UserWorkQueue} />
						<Route exact path='/CT/Reports' component={UserReports} />
						<Route exact path='/CT/Queue/:id' component={CaseExpandedDetailsPage} />
						<Route exact path='/QA' component={QA} />
                    </Switch>

                    <div id="page-content-wrapper">
                        <div className="container body-content">
                            <hr />

                            <Footer />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />
    , document.getElementById('content'))