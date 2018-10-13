import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'

type ResourceDetailsProps = {
    handleToggleClick: any;
    currentEmployee: any;
    handleOnChangeFirstName: any;
    handleOnChangeLastName: any;
    handleOnChangeNickName: any;
    handleOnChangeLocation: any;
    handleOnChangeStatus: any;
    handleOnChangePortalID: any;
    handleOnChangeManager: any;
    handleOnChangeHireDate: any;
    handleOnChangeTermDate: any;
    handleOnChangeEmployeeTitle: any;
    handleOnChangeOutOfOffice: any;
    
}

type ResourceDetailsState = {
    Statuses: any[];
    Locations: any[];
}

export class ResourceDetails extends React.Component<ResourceDetailsProps, ResourceDetailsState> {
    constructor(props) {
        super(props)

        this.state = {
            Statuses: [],
            Locations: []
        }
    }
    componentWillMount() {
        this.fetchStatuses()
        this.fetchLocations()
    }
    
    fetchStatuses = () => {
        fetch('/api/EmployeeStatus')
            .then(res => { return res.json() })
            .then(data => this.setState({ Statuses: data }))
    }
    fetchLocations = () => {
        fetch('/api/VacancyLocations')
            .then(res => { return res.json() })
            .then(data => this.setState({ Locations: data }))
    }
    
    render() {
        return (
            <table className="table">
                <thead>
                    <tr><th colSpan={5}>Resource Details</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Out of Office
                        <select className="form-control" value={this.props.currentEmployee.OutOfOfficeFlag} onChange={(e) => this.props.handleOnChangeOutOfOffice(e)}>
                                <option></option>
                                <option>Yes</option>
                                <option>No</option>)}
                        </select>
                        </td>
                        <td>First Name <input className="form-control" value={this.props.currentEmployee.FirstName} onChange={(e) => this.props.handleOnChangeFirstName(e)} /></td>
                        <td>Last Name <input className="form-control" value={this.props.currentEmployee.LastName} onChange={(e) => this.props.handleOnChangeLastName(e)} /></td>
                        <td>Nickname <input className="form-control" value={this.props.currentEmployee.NickName} onChange={(e) => this.props.handleOnChangeNickName(e)} /></td>
                        <td>Location
                        <select className="form-control" value={this.props.currentEmployee.VacancyLocation} onChange={(e) => this.props.handleOnChangeLocation(e)}>
                                <option></option>
                                {this.state.Locations.map(item => <option value={item.ID}>{item.LocationDesc}</option>)}
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>Status <select className="form-control" value={this.props.currentEmployee.EmployeeStatus} onChange={(e) => this.props.handleOnChangeStatus(e)}>
                                <option></option>
                                {this.state.Statuses.map(item => <option value={item.ID}>{item.StatusDesc}</option>)}
                            </select>
                        </td>
                        <td>Portal ID <input className="form-control" value={this.props.currentEmployee.PortalID} onChange={(e) => this.props.handleOnChangePortalID(e)} /></td>
                        <td>Manager <input className="form-control" value={this.props.currentEmployee.Manager} onChange={(e) => this.props.handleOnChangeManager(e)} /></td>
                        <td>Hire Date <input className="form-control" value={this.props.currentEmployee.HireDate} onChange={(e) => this.props.handleOnChangeHireDate(e)} /></td>
                        <td>Term Date <input className="form-control" value={this.props.currentEmployee.TermDate} onChange={(e) => this.props.handleOnChangeTermDate(e)} /></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}