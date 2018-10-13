import * as React from 'react'
import { Link } from 'react-router-dom'
import '../Content/Sidebar.less'

interface ToolboxHeaderProps {
	navButtons: any;
	pathName: string;
}

interface ToolboxHeaderState {

}

export class ToolboxHeader extends React.Component<ToolboxHeaderProps, ToolboxHeaderState> {
    constructor(props) {
        super(props)
    }

	currentPathSubHeaders = () => {
		let activePath = this.props.navButtons.filter(item => item.route === this.props.pathName)
		if (activePath.length === 0) {
			/* I am at /KCT/Manage
			*  I should skip links for /
			*  I should show links for /KCT
			*/
			activePath = this.props.navButtons
				.reduce((acc, item) => {
					let routeMatch = this.props.pathName.indexOf(item.route) > -1
					let lengthMatch = (acc.route) ? (item.route.length > acc.route.length) : true

					if (routeMatch && lengthMatch) {
						return item
					}

					return acc
				})

			activePath = [activePath]
		}

		if (activePath.length > 0 && activePath[0].subMenuButtons) {
			return activePath[0].subMenuButtons
				.filter(item => !item.header)
				.map(item => { return <li><a href={item.route}>{item.caption}</a></li> })
		}

		return <span></span>
	}

    render() {
		const userDropdownStyle = {
			fontSize: 18,
			fontWeight: 'bold',
			color: 'white',
			borderBottomWidth: 1,
			borderBottomColor: 'white',
			borderBottomStyle: 'solid'
		} as React.CSSProperties

		const userDropdownContainerStyle = {
			paddingTop: 10,
			paddingRight: 15
		} as React.CSSProperties

        return (
			<div>
				<div className="navbar navbar-default" style={{ marginBottom: 0, height: '50px' }}>
					<div className="container-fluid">
						<div className="navbar-header" style={{width: '100%'}}>
							<div className="row" style={{paddingLeft: '10px', paddingRight: '10px'}}>
								<div className="pull-left">
									<button type="button" className="hamburger navbar-toggle is-closed animated" data-toggle="offcanvas" style={{ float: 'left' }}>
										<span className="hamb-top"></span>
										<span className="hamb-middle"></span>
										<span className="hamb-bottom"></span>
									</button>
									<a className="navbar-brand" href="#">DRS Toolbox</a>
									<ul className="nav navbar-nav">
										{this.props.navButtons.map(item => { return ( <li><Link to={item.route}>{item.caption}</Link></li> )})}
									</ul>
								</div>
								<div className="pull-right" style={userDropdownContainerStyle}>
									<div className="btn-group">
										<button type="button" className="btn btn-primary btn-toggle" data-toggle="dropdown">Dillon Wiley <span className="caret"></span></button>
										<ul className="dropdown-menu">
											<li><a href="#">Profile</a></li>
											<li><a href="#">Profile</a></li>
											<li><a href="#">Contact Admin</a></li>
											<li role="separator" className="divider"></li>
											<li><a href="#">Logout</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="navbar-subheader">
					<div className="container-fluid">
						<div className="navbar-header" style={{ width: '100%' }}>
							<ul className="nav navbar-nav">
								{this.currentPathSubHeaders()}
							</ul>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

