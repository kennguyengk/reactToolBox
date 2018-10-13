import * as React from 'react'
import { ToolboxPage } from '../ToolboxPage'
import { Route } from 'react-router-dom'


type UserDashboardProps = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

export class UserDashboard extends React.Component<UserDashboardProps, {}> {
    constructor(props) {
        super(props)

        this.state = {
            userDashboard: []
        }
    }

    fetchUserQueueItems = () => {
        fetch('/api/UserDashboard')
            .then(res => res.json())
            .then(res => this.setState({ userDashboard: res }))
    }

    render() {
        return (
            <h1>Placeholder Dashboard</h1>
        )
    }
}
