import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { VacancyDetails } from './VacancyDetails'

type VacancyQueue = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

type VacancyQueueState = {
    isEditing: boolean;
    Data: Vacancies[];
    editingIdx: number;
    VacancyRole: string;
    LOB: string;
    Status: string;
    OpenDate: string;
    StartDate: string;
    Location: string;
    Manager: string;
    SOWCode: string;
    Comments: string;
    buttonsVisible: boolean;
}

type Vacancies = {
    ID: number;
    VacancyRoleID: number;
    EmployeeID: number;
    RoleDesc: string;
    LOB: string;
    LOBID: number;
    VacancyStatusID: number;
    OpenDate: string;
    StartDate: string;
    VacancyLocationID: number;
    Manager: string;
    SOWCode: string;
    Comments: string;
    VacancyStatus: any;
    VacancyRole: any;
    VacancyLocation: any;
    Employee: any;
}

const VacancyRow = (props) => {
    let renderedToggle = props.isEditing ? <span className="glyphicon glyphicon-chevron-left"></span> : <span className="glyphicon glyphicon-chevron-right"></span>

    return (
        <tr key={props.ID}>
            <td style={{ textAlign: 'center' }}><a href='#' onClick={() => props.handleToggleClick(props.idx)}>{renderedToggle}</a></td>
            <td style={{ textAlign: 'center' }}>{props.ID}</td>
            <td>{props.VacancyRole.RoleDesc}</td>
            <td>{props.LOB}</td>
            <td>{props.VacancyStatus.StatusDesc}</td>
            <td>{props.OpenDate}</td>
            <td>{props.StartDate}</td>
            <td>{props.Employee}</td>
            <td>{props.VacancyLocation.LocationDesc}</td>
        </tr>
    )
}

const VacancyPanel = (props) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Vacancy ID</th>
                    <th>Role</th>
                    <th>LOB</th>
                    <th>Status</th>
                    <th>Open Date</th>
                    <th>Start Date</th>
                    <th>Resource Assigned</th>
                    <th>Location</th>
                </tr>
            </thead>
            
                {props.children}
           
        </table>
    )
}

export class Vacancy extends React.Component<VacancyQueue, VacancyQueueState> {
    constructor(props) {
        super(props)

        this.state = {
            Data: [],
            isEditing: false,
            editingIdx: null,
            VacancyRole: null,
            LOB: null,
            Status: null,
            OpenDate: null,
            StartDate: null,
            Location: null,
            Manager: null,
            SOWCode: null,
            Comments: null,
            buttonsVisible: true
        }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick(idx) {
        console.log(idx)
        if (this.state.editingIdx === idx) {
            this.setState({
                editingIdx: null
            });
        } else {
            this.setState({
                editingIdx: idx
            });
        }

    }
    fetchVacancies = () => {
        fetch('/api/Vacancies')
            .then(res => { return res.json() })
            .then(data => this.setState({ Data: data }))
    }
    
    componentDidMount() {
        this.fetchVacancies();
    }

    handleOnChangeVacancyRole = (e, VacancyRoles) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].VacancyRoleID = e.target.value
        const newVacancyRole = VacancyRoles.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].VacancyRole = newVacancyRole
        this.setState({ VacancyRole: e.target.value })
        console.log(newState.Data)
    }
    handleOnChangeLOB = (e, LOBs) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].LOBID = e.target.value
        const newLOB = LOBs.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].LOB = newLOB
        this.setState({ LOB: e.target.value })
        console.log(newState.Data)
    }
    handleOnChangeStatus = (e, Statuses) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].VacancyStatusID = e.target.value
        const newStatus = Statuses.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].VacancyStatus = newStatus
        this.setState({ Status: e.target.value })
        console.log(newState.Data)
    }
    handleOnChangeOpenDate = (e) => {
        this.setState({ OpenDate: e.target.value })
    }
    handleOnChangeStartDate = (e) => {
        this.setState({ StartDate: e.target.value })
    }
    handleOnChangeLocation = (e, Locations) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].VacancyLocationID = e.target.value
        const newStatus = Locations.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].VacancyLocation = newStatus
        this.setState({ Location: e.target.value })
        console.log(newState.Data)
    }
    handleOnChangeManager = (e) => {
        this.setState({ Manager: e.target.value })
    }
    handleOnChangeSOWCode = (e) => {
        this.setState({ SOWCode: e.target.value })
    }
    handleOnChangeComments = (e) => {
        this.setState({ Comments: e.target.value })
    }

    handleSaveNewVacancy = () => {
        const requestBody = {
            VacancyRole: this.state.VacancyRole,
            LOB: this.state.LOB,
            Status: this.state.Status,
            OpenDate: this.state.OpenDate,
            StartDate: this.state.StartDate,
            Location: this.state.Location,
            Manager: this.state.Manager,
            SOWCode: this.state.SOWCode,
            Comments: this.state.Comments
            
        }

        fetch('/api/Vacancies/' + this.state.Data[this.state.editingIdx].ID, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())

    }

    render() {
        let renderedVacancies = [<tr></tr>]
        const currentVacancy = this.state.Data[this.state.editingIdx] || {}
        if (this.state.Data.length > 0) {
            renderedVacancies = this.state.Data.map((item, idx) => {
                let renderedEditRow = (this.state.editingIdx === idx) ? <VacancyDetails currentVacancy={currentVacancy} handleOnChangeVacancyRole={this.handleOnChangeVacancyRole} handleOnChangeLOB={this.handleOnChangeLOB} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOpenDate={this.handleOnChangeOpenDate} handleOnChangeStartDate={this.handleOnChangeStartDate} handleOnChangeLocation={this.handleOnChangeLocation} handleOnChangeManager={this.handleOnChangeManager} handleOnChangeSOWCode={this.handleOnChangeSOWCode} handleOnChangeComments={this.handleOnChangeComments} handleSaveNewVacancy={this.handleSaveNewVacancy} handleToggleClick={this.handleToggleClick} idx={idx} isEditing={this.state.editingIdx === idx} buttonsVisible={this.state.buttonsVisible}/> : null
                return (
                    <tbody>
                        <VacancyRow {...item} handleToggleClick={this.handleToggleClick} idx={idx} isEditing={this.state.editingIdx === idx} />
                        {renderedEditRow}
                    </tbody>
                )
            }
            )}
        return (
            <div>
            <VacancyPanel>
                    {renderedVacancies}
                    
            </VacancyPanel>

            </div>
        )
    }
}