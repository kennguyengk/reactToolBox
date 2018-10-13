import * as React from 'react'

type SidebarNavSubLinkProps = {
	caption: string;
	route?: string;
	header?: boolean;
}

export class SidebarNavSubLink extends React.Component<SidebarNavSubLinkProps, {}> {
	renderLink = () => {
		if (this.props.header) {
			return <span>{this.props.caption}</span>
		} else {
			return <a href={this.props.route}>{this.props.caption}</a>
		}
	}

	subLinkClasses = () => {
		return (this.props.header) ? 'dropdown-header' : ''
	}

	render() {
		return (
			<li className={this.subLinkClasses()}>{this.renderLink()}</li>
		)
	}
}