import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { Link } from 'react-router-dom'
import { ToolboxPage } from '../ToolboxPage'
import { Route } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Resource } from './ResourceQueue'
import { Vacancy } from './VacancyQueue'

type AdminLandingPageProps = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

export class AdminLandingPage extends React.Component<AdminLandingPageProps> {
    
    render() {
        return (
            <ToolboxPage title="Administration Management" pathName={this.props.location.pathname}>
                <Route exact path='/AdminMgmt' component={Dashboard} />
                <Route exact path='/AdminMgmt/ResourceQueue' component={Resource} />
                <Route exact path='/AdminMgmt/NewResource' />
                <Route exact path='/AdminMgmt/VacancyQueue' component={Vacancy} />
                <Route exact path='/AdminMgmt/NewVacancy' />
                <Route exact path='/AdminMgmt/Reports'  />

             </ToolboxPage>
        )
    }
}