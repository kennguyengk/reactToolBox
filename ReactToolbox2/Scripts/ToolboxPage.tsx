import * as React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar/Sidebar'
import { ToolboxHeader } from './ToolboxHeader'

interface ToolboxPageProps {
    title?: string;
	pathName: string;
}

interface ToolboxPageState {

}

const navButtons = [
	{
		caption: 'Notifications',
		route: '/',
		subMenuButtons: [
			{ caption: 'Notifications', route: '/' },
			{ caption: 'New Notification', route: '/Notifications/New' }
		]
	},
	{
		caption: 'Knowledge Checks',
		route: '/KCT',
		subMenuButtons: [
			{ caption: 'Knowledge Check Pages', header: true },
			{ caption: 'Knowledge Checks', route: '/KCT' },
			{ caption: 'Manage KCs', route: '/KCT/Manage' },
			{ caption: 'User Management', route: '/KCT/Users' }

		]
    },
    {
        caption: 'IMT',
        route: '/IMT',
        subMenuButtons: [
            { caption: 'IMT', header: true },
            { caption: 'New Request', route: '/IMT/New' },
            { caption: 'Managed Users', route: '/IMT/Users' },
            { caption: 'Reports', route: '/IMT/Reports' },
            { caption: 'Export', route: '/IMT/Export' },
            { caption: 'Release Notes', route: '/IMT/ReleaseNotes' }
        ]
	},
    {
        caption: 'Administration Management',
        route: '/AdminMgmt',
        subMenuButtons: [
            { caption: 'Resource Management', header: true },
            { caption: 'Dashboard', route: '/AdminMgmt' },
            { caption: 'Resource Queue', route: '/AdminMgmt/ResourceQueue' },
            { caption: 'Add New Resource', route: '/AdminMgmt/NewResource' },
            { caption: 'Vacancy Queue', route: '/AdminMgmt/VacancyQueue' },
            { caption: 'Add New Vacancy', route: '/AdminMgmt/NewVacancy' },
            { caption: 'Reports', route: '/AdminMgmt/Reports' }
        ]
    },
    {
        caption: 'Case Tracker',
        route: '/CT',
        subMenuButtons: [
            { caption: 'Case Tracker Modules', header: true },
            { caption: 'My Dashboard', route: '/CT/Dashboard' },
            { caption: 'My Reports', route: '/CT/Reports' }
        ]
    },
	{
		caption: 'QA',
		route: '/QA',
		subMenuButtons: [
			 { caption: 'QA', route: '/QA' },
			 { caption: 'Import', route: 'QA/Attachment' },
			 { caption: 'Export', route: '/QA' }
		]
	}
	
]

const ToolboxSubheaderButton = (props) => {
    if ('route' in Object.keys(props)) {
        return <li><Link to={props.route || '#'}>{props.caption}</Link></li>
    } else {
        return <li><a href="#" onClick={props.action}>{props.caption}</a></li>
    }
}

const ToolboxSubheader = (props) => {
    return (
        <div className="navbar-subheader">
            <div className="container-fluid">
                <div className="navbar-header" >
                    <ul className="nav navbar-nav">
                        <span>Button</span>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export class ToolboxPage extends React.Component<ToolboxPageProps, ToolboxPageState> {
    constructor(props) {
        super(props)
    }

    render() {
        const renderedTitle = (!this.props.title) ? <div></div> : (
			<div>
				<h1>{this.props.title}</h1>

				<hr />
			</div>
		)
		return (
            <div>
				<Sidebar navButtons={navButtons} pathName={this.props.pathName}/>

                <ToolboxHeader navButtons={navButtons} pathName={this.props.pathName}/>
                <div className="container body-content">
                    {renderedTitle}

                    {this.props.children}
                </div>
            </div>
        )
    }
}