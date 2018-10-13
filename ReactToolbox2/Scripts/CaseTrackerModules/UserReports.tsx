import * as React from 'react'
import { ToolboxPage } from '../ToolboxPage'
import { Route } from 'react-router-dom'


type UserReportsProps = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

export class UserReports extends React.Component<UserReportsProps, {}> {
    constructor(props) {
        super(props)

        this.state = {
            userReports: []
        }
    }

    fetchUserQueueItems = () => {
        fetch('/api/UserReports')
            .then(res => res.json())
            .then(res => this.setState({ userReports: res }))
    }

    render() {
        return (
			<ToolboxPage pathName={ this.props.location.pathname }>
				<h1>Placeholder Reports</h1>
			</ToolboxPage>
        )
    }
}
