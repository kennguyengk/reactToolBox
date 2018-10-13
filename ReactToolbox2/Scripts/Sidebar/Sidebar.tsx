import * as React from 'react'
import '../../Content/Sidebar.less'
import { SidebarNavLink } from './SidebarNavLink'
import { SidebarNavSubLink } from './SidebarNavSubLink'

type SidebarProps = {
	navButtons: any;
	pathName: string;
}

export class Sidebar extends React.Component<SidebarProps, {}> {
	constructor(props) {
		super(props)
	}

    componentDidMount() {
        $(document).ready(function () {
            const trigger = $('.hamburger')
            const overlay = $('.overlay')
            let isClosed = false

            trigger.click(function () {
                hamburger_cross();
            });

            $('.overlay').click(function () {
                hamburger_cross()
            })

            function hamburger_cross() {

                if (isClosed == true) {
                    overlay.hide();
                    trigger.removeClass('is-open');
                    trigger.addClass('is-closed');
                    isClosed = false;
                } else {
                    overlay.show();
                    trigger.removeClass('is-closed');
                    trigger.addClass('is-open');
                    isClosed = true;
                }
            }

            $('[data-toggle="offcanvas"]').click(function () {
                $('#wrapper').toggleClass('toggled');
            });
        })
    }

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
                <ul className="nav sidebar-nav">
                    <li className="sidebar-brand">
                        <a href="#">
                            Data Remediation Toolbox
                        </a>
                    </li>
					{this.props.navButtons.map((item, idx) => {
						let subNavButtons = <div></div>
						if (item.subMenuButtons) {
							subNavButtons = item.subMenuButtons.map((button, btnIdx) => { return ( <SidebarNavSubLink {...button} />)})
						}
						return (
							<SidebarNavLink key={idx} {...item}>
								{subNavButtons}
							</SidebarNavLink>
						)
					})}
                </ul>
            </nav>
        )
    }
}

/*
	<li className="dropdown">
		<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-fw fa-plus"></i> Knowledge Checks <span className="caret"></span></a>
		<ul className="dropdown-menu" role="menu">
			<li className="dropdown-header">Knowledge Check Pages</li>
			<li><a href="#">All Knowledge Checks</a></li>
			<li className="dropdown-header">Administrator Pages</li>
			<li><a href="#">Manage Users</a></li>
			<li><a href="#">Reporting</a></li>
		</ul>
	</li>
*/
