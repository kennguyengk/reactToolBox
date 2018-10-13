import * as React from 'react'


type SidebarNavLinkProps = {
	key: number;
	caption: string;
	route: string;
	subHeaderButtons: any;
}

export class SidebarNavLink extends React.Component<SidebarNavLinkProps, {}> {
	constructor(props) {
		super(props)
	}

	hasSubMenuButtons = () => {
		return this.props.subHeaderButtons && this.props.subHeaderButtons.length > 0
	}

	navClasses = () => {
		return (this.hasSubMenuButtons()) ? 'dropdown' : ''
	}

	renderNavLink = () => {
		if (this.hasSubMenuButtons()) {
			return <a href={this.props.route} data-toggle="dropdown">{this.props.caption}</a>
		} else {
			return (
				<span>
					<a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.props.caption}</a>
					<ul className="dropdown-menu" role="menu">
						{this.props.children}
					</ul>
				</span>
			)
		}
	}

	render() {
		return (
			<li key={this.props.key} className={this.navClasses()}>
				{this.renderNavLink()}
			</li>
		)
	}
}