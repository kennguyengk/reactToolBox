import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'


type VacancyDetailsProps = {
    currentVacancy: any;
    handleSaveNewVacancy: any;
    handleOnChangeVacancyRole: any;
    handleOnChangeLOB: any;
    handleOnChangeStatus: any;
    handleOnChangeOpenDate: any;
    handleOnChangeStartDate: any;
    handleOnChangeLocation: any;
    handleOnChangeManager: any;
    handleOnChangeSOWCode: any;
    handleOnChangeComments: any;
    isEditing: any;
    buttonsVisible: boolean;
    handleToggleClick: any;
    idx: any;
}

type VacancyDetailsState = {
    VacancyRoles: any[];
    LOBs: any[];
    Statuses: any[];
    Locations: any[];
    SOWCodes: any[];
    
}


export class VacancyDetails extends React.Component<VacancyDetailsProps, VacancyDetailsState> {
    constructor(props) {
        super(props) 
        
        this.state = {
            VacancyRoles: [],
            LOBs: [],
            Statuses: [],
            Locations: [],
            SOWCodes: []
        }
    }
    componentWillMount() {
        this.fetchVacancyRoles()
        this.fetchLOBs()
        this.fetchStatuses()
        this.fetchLocations()
        this.fetchSOWCodes()
    }

    fetchVacancyRoles = () => {
        fetch('/api/VacancyRoles')
            .then(res => { return res.json() })
            .then(data => this.setState({ VacancyRoles: data }))
    }
    fetchLOBs = () => {
        fetch('/api/LOBs')
            .then(res => { return res.json() })
            .then(data => this.setState({ LOBs: data }))
    }
    fetchStatuses = () => {
        fetch('/api/VacancyStatus')
            .then(res => { return res.json() })
            .then(data => this.setState({ Statuses: data }))
    }
    fetchLocations = () => {
        fetch('/api/VacancyLocations')
            .then(res => { return res.json() })
            .then(data => this.setState({ Locations: data }))
    }
    fetchSOWCodes = () => {
        fetch('/api/LOBs')
            .then(res => { return res.json() })
            .then(data => this.setState({ SOWCodes: data }))
    }

    render() {
        let buttons =  this.props.buttonsVisible ? <div><th><button type="button" className="btn btn-default" onClick={() => this.props.handleToggleClick(this.props.idx)}>Cancel</button></th> <th><button type="button" className="btn btn-primary" onClick={this.props.handleSaveNewVacancy}>Submit</button></th></div> : <div><th></th><th></th></div>
        return (
            <tr>
                <td colSpan={9}>
                    <table className="table">
                        <thead>
                            <th colSpan={7}><b>Vacancy Details</b></th>

                            {buttons}

                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    Role <select className="form-control" value={this.props.currentVacancy.VacancyRoleID} onChange={(e) => this.props.handleOnChangeVacancyRole(e, this.state.VacancyRoles)}  >
                                        <option></option>
                                        {this.state.VacancyRoles.map(item => <option value={item.ID}>{item.RoleDesc}</option>)}
                                    </select>
                                </td>
                                <td>
                                    LOB  <select className="form-control" value={this.props.currentVacancy.LOBID} onChange={(e) => this.props.handleOnChangeLOB(e, this.state.LOBs)}  >
                                        <option></option>
                                        {this.state.LOBs.map(item => <option value={item.ID}>{item.LOBDesc}</option>)}
                                    </select>
                                </td>
                                <td>
                                    Status <select className="form-control" value={this.props.currentVacancy.VacancyStatusID} onChange={(e) => this.props.handleOnChangeStatus(e, this.state.Statuses)}  >
                                        <option></option>
                                        {this.state.Statuses.map(item => <option value={item.ID}>{item.StatusDesc}</option>)}
                                    </select>
                                </td>
                                <td>
                                    Open Date <input className="form-control" value={this.props.currentVacancy.OpenDate} onChange={(e) => this.props.handleOnChangeOpenDate(e)}/>
                                </td>
                                <td>
                                    Start Date <input className="form-control" value={this.props.currentVacancy.StartDate} onChange={(e) => this.props.handleOnChangeStartDate(e)} />
                                </td>
                                <td colSpan={2}>
                                    Location <select className="form-control" value={this.props.currentVacancy.LocationID} onChange={(e) => this.props.handleOnChangeLocation(e, this.state.Locations)}  >
                                        <option></option>
                                        {this.state.Locations.map(item => <option value={item.ID}>{item.LocationDesc}</option>)}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={1}></td>
                                <td colSpan={1}>
                                    Manager <input className="form-control" value={this.props.currentVacancy.Manager} onChange={(e) => this.props.handleOnChangeManager(e)} />
                                </td>
                                <td colSpan={1}>
                                    SOW Code <input className="form-control" value={this.props.currentVacancy.SOWCode} onChange={(e) => this.props.handleOnChangeSOWCode(e)} />
                                </td>
                                <td colSpan={6}>
                                    Comments <textarea className="form-control" rows={5} value={this.props.currentVacancy.Comments} onChange={(e) => this.props.handleOnChangeComments(e)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

        )

    }
}
