import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { ToolboxPage } from '../ToolboxPage'
import { SplashPage } from '../SplashPage'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { Link } from 'react-router-dom'

type Notification = {
    Id: number;
    Message: string;
    StartDT: string;
    ExpireDT: string;
    InsertedDT: string;
}

type LandingPageState = {
    data: Notification[];
    showAll: boolean;
    isNewFormVisible: boolean;
    newNotificationMessage: string;
    newNotificationStartDT: string;
    newNotificationExpireDT: string;
	splashPageVisible: boolean;
}

type LandingPageProps = {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}


const NotificationRow = (props) => {
    return (
        <tr key={props.Id}>
            <td>{props.StartDT}</td>
            <td>{props.Message}</td>
        </tr>
    )
}

const NewNotificationModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row" style={{paddingBottom: '10px'}}>
                    <div className="col-md-8 col-md-offset-2">
                        <b>Active Date</b>
                        <input className="form-control" value={props.newNotificationStartDT} onChange={props.handleOnChangeNewNotificationStartDT} />
                    </div>
                </div>
                <div className="row" style={{paddingBottom: '10px'}}>
                    <div className="col-md-8 col-md-offset-2">
                        <b>Expiration Date</b>
                        <input className="form-control" value={props.newNotificationExpireDT} onChange={props.handleOnChangeNewNotificationExpireDT} />
                    </div>
                </div>
                <div className="row" style={{paddingBottom: '10px'}}>
                    <div className="col-md-8 col-md-offset-2">
                        <b>Message</b>
                        <textarea className="form-control" rows={3} value={props.newNotificationMessage} onChange={props.handleOnChangeNewNotificationMessage}></textarea>
                    </div>
                </div>
                <Modal.Footer>
                    <button type="button" className="btn btn-default">Close</button>
                    <button type="button" className="btn btn-primary" onClick={props.handleSaveNewNotification}>Save</button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

const NotificationPanel = (props) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th style={{ width: '15%' }}>Date</th>
                    <th>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <div className="pull-left">Notification Details</div>
                            <div className="pull-right" style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', textAlign: 'right' }}>
                                <small>Showing {props.renderedNotificationCount} of {props.totalNotificationCount}</small>
                                {props.showAll ? <a href="#" onClick={props.toggleShowAll}>Show Active</a> : <a href="#" onClick={props.toggleShowAll}>Show All</a>}
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.notifications.map(item => <NotificationRow {...item} />)}
            </tbody>
        </table>    
    )
}

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            showAll: false,
            isNewFormVisible: false,
            newNotificationMessage: '',
            newNotificationStartDT: '',
            newNotificationExpireDT: '',
			splashPageVisible: true
        }
    }
    
    fetchNotifications = () => {
        fetch('/api/Notifications')
            .then(res => res.json())
            .then(data => this.setState({ data: data }))
    }

	showSplashPage = () => {
		this.setState({
			splashPageVisible: true
		})

		setTimeout(() => {
			this.setState({
				splashPageVisible: false
			})
		}, 5000)
	}

    toggleShowAll = (e) => {
        e.preventDefault();
        this.setState({ showAll: !this.state.showAll })
    }

    componentDidMount() {
        this.fetchNotifications()
		this.showSplashPage()
    }

    newNotification = (e) => {
        e.preventDefault()
        this.setState({ isNewFormVisible: true })
    }

    handleHideModal = () => {
        this.setState({ isNewFormVisible: false })
        this.fetchNotifications()
    }

    handleOnChangeNewNotificationMessage = (e) => {
        this.setState({ newNotificationMessage: e.target.value })
    }

    handleOnChangeNewNotificationStartDT = (e) => { this.setState({ newNotificationStartDT: e.target.value }) }
    handleOnChangeNewNotificationExpireDT = (e) => { this.setState({ newNotificationExpireDT: e.target.value }) }

    handleSaveNewNotification = () => {
        const requestBody = {
            Message: this.state.newNotificationMessage,
            StartDT: moment(this.state.newNotificationStartDT, 'MM/DD/YYYY').format('MM/DD/YYYY'),
            ExpireDT: moment(this.state.newNotificationExpireDT, 'MM/DD/YYYY').format('MM/DD/YYYY'),
            InsertedDT: moment().format('MM/DD/YYYY')
        }
        
        fetch('/api/Notifications', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(requestBody)
        })
        .then(res => res.json())
        .then(res => this.handleHideModal())
    }

    render() {
        const allNotifications = this.state.data
        const filteredNotifications = this.state.data.filter(item => new Date(item.StartDT) < new Date() && new Date(item.ExpireDT) > new Date())
        const renderedNotifications = this.state.showAll ? allNotifications : filteredNotifications

        return (
            <ToolboxPage
                title="Notifications"
				pathName={this.props.location.pathname}>

                <NotificationPanel
                    notifications={renderedNotifications}
                    showAll={this.state.showAll}
                    totalNotificationCount={allNotifications.length}
                    renderedNotificationCount={renderedNotifications.length}
                    toggleShowAll={this.toggleShowAll}
                />

                <NewNotificationModal
                    showModal={this.state.isNewFormVisible}
                    handleHideModal={this.handleHideModal}
                    handleSaveNewNotification={this.handleSaveNewNotification}
                    newNotificationMessage={this.state.newNotificationMessage}
                    newNotificationStartDT={this.state.newNotificationStartDT}
                    newNotificationExpireDT={this.state.newNotificationExpireDT}
                    handleOnChangeNewNotificationMessage   = {this.handleOnChangeNewNotificationMessage}
                    handleOnChangeNewNotificationStartDT   = {this.handleOnChangeNewNotificationStartDT}
                    handleOnChangeNewNotificationExpireDT  = {this.handleOnChangeNewNotificationExpireDT}
                />

				<SplashPage showModal={this.state.splashPageVisible} handleHideModal={() => {}} />
            </ToolboxPage>
        )
    }
}