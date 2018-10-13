import * as React from 'react'
import { ToolboxPage } from '../ToolboxPage'
import { UserQueueTable } from './UserQueueTable'
//Specify class parameters you need for displaying - list needs semicolon not comma
type UserWorkQueueProps = {
    location: any;
	history: any;
	match: any;
	staticContext?: any;
}

type UserWorkQueueState = {
	userQueueTable: any[];

}

export class UserWorkQueue extends React.Component<UserWorkQueueProps, UserWorkQueueState> {
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
			<ToolboxPage pathName={ this.props.location.pathname }> 
				<UserQueueTable userQueueTable={ this.state.userQueueTable }></UserQueueTable>
			</ToolboxPage>
        )
    }
}
