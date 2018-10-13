import * as React from 'react'
import { ToolboxPage } from '../ToolboxPage'
import { UserQueueTable } from './UserQueueTable'
import { UserWorkQueue } from './UserWorkQueue'
//Specify class parameters you need for displaying - list needs semicolon not comma
type UserDashboardProps = {
    location: any;
	history: any;
	match: any;
	staticContext?: any;
}

type UserDashboardState = {
	userQueueTable: any[];

}

export class UserDashboared extends React.Component<UserDashboardProps, UserDashboardState> {
    constructor(props) {
		super(props)
		this.state={ 
			userQueueTable: []
		}
	}
	//fetch the Cases part of the case controller when called
    fetchUserQueueItems = () => {
        fetch('/api/Cases')
            .then(res => {return res.json()})
            .then(res => this.setState({ userQueueTable: res }))
    }
	componentDidMount() {  //will call this function on 'ready'
		this.fetchUserQueueItems()	
	}
    render() {
        return (
			<ToolboxPage title='Queue' pathName={ this.props.location.pathname }> 
				<UserQueueTable userQueueTable={ this.state.userQueueTable }></UserQueueTable>
			</ToolboxPage>
        )
    }
}

