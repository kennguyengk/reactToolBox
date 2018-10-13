import * as React from 'react'

import { ToolboxPage } from '../ToolboxPage'
import { Route } from 'react-router-dom'
import { Home } from './Home'
import { Manage } from './Manage'
import { AttemptPage } from './Attempt'
import { UserPage } from './UserPage'

type KnowledgeCheckPageProps = {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}

export class KnowledgeCheckPage extends React.Component<KnowledgeCheckPageProps, {}> {

    render() {
        return (
            <ToolboxPage pathName={this.props.location.pathname}>
                <Route exact path='/KCT' component={Home} />
                <Route exact path='/KCT/Manage' render={() => <h1>Manage</h1>} />
				<Route path='/KCT/Manage/:id' component={Manage} />
                <Route path='/KCT/Users' component={UserPage} />
				<Route path='/KCT/Attempt/:id' component={AttemptPage} />
            </ToolboxPage>
        )
    }
}