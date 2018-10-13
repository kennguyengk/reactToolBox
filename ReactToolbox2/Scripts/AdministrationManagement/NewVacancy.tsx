import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { Dashboard } from './Dashboard'
import { VacancyDetails } from './VacancyDetails'

type NewVacancyProps = {
    
    showVacancyModal: any;
    handleHideVacancyModal: any;
}

type NewVacancyState = {
    currentVacancy: any;
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
    handleToggleClick: any;
    idx: any;
    isEditing: boolean;
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


export class NewVacancyModal extends React.Component<NewVacancyProps, NewVacancyState> {
    constructor(props) {
        super(props)
            this.state = {
            currentVacancy: {},
            VacancyRole: '',
            LOB: '',
            Status: '',
            OpenDate: '',
            StartDate: '',
            Location: '',
            Manager: '',
            SOWCode: '',
            Comments: '',
            buttonsVisible: false,
            handleToggleClick: '',
            idx: '',
            isEditing: false

        }
    }
    handleOnChangeVacancyRole = (e, VacancyRoles) => {
        let newState = { ...this.state }
        newState.currentVacancy.VacancyRoleID = e.target.value
        const newVacancyRole = VacancyRoles.find(item => item.ID === e.target.value)
        newState.currentVacancy.VacancyRole = newVacancyRole
        this.setState({ VacancyRole: e.target.value })
    }
    handleOnChangeLOB = (e, LOBs) => {
        let newState = { ...this.state }
        newState.currentVacancy.LOBID = e.target.value
        const newLOB = LOBs.find(item => item.ID === e.target.value)
        newState.currentVacancy.LOB = newLOB
        this.setState({ LOB: e.target.value })
    }
    handleOnChangeStatus = (e, Statuses) => {
        let newState = { ...this.state }
        newState.currentVacancy.VacancyStatusID = e.target.value
        const newStatus = Statuses.find(item => item.ID === e.target.value)
        newState.currentVacancy.VacancyStatus = newStatus
        this.setState({ Status: e.target.value })
    }
    handleOnChangeOpenDate = (e) => {
        this.setState({ OpenDate: e.target.value })
    }
    handleOnChangeStartDate = (e) => {
        this.setState({ StartDate: e.target.value })
    }
    handleOnChangeLocation = (e, Locations) => {
        let newState = { ...this.state }
        newState.currentVacancy.VacancyLocationID = e.target.value
        const newStatus = Locations.find(item => item.ID === e.target.value)
        newState.currentVacancy.VacancyLocation = newStatus
        this.setState({ Location: e.target.value })
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
            Role: this.state.VacancyRole,
            LOB: this.state.LOB,
            Status: this.state.Status,
            OpenDate: this.state.OpenDate,
            StartDate: this.state.StartDate,
            Location: this.state.Location,
            Manager: this.state.Manager,
            SOWCode: this.state.SOWCode,
            Comments: this.state.Comments
            
        }

        fetch('/api/Vacancies', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())


    }
    render() {


        return (
            <Modal show={this.props.showVacancyModal} onHide={this.props.handleHideVacancyModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Vacancy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VacancyDetails currentVacancy={this.state.currentVacancy} handleOnChangeVacancyRole={this.handleOnChangeVacancyRole} handleOnChangeLOB={this.handleOnChangeLOB} handleOnChangeStatus={this.handleOnChangeStatus} handleOnChangeOpenDate={this.handleOnChangeOpenDate} handleOnChangeStartDate={this.handleOnChangeStartDate} handleOnChangeLocation={this.handleOnChangeLocation} handleOnChangeManager={this.handleOnChangeManager} handleOnChangeSOWCode={this.handleOnChangeSOWCode} handleOnChangeComments={this.handleOnChangeComments} handleSaveNewVacancy={this.handleSaveNewVacancy} buttonsVisible={this.state.buttonsVisible} isEditing={this.state.isEditing} handleToggleClick={this.state.handleToggleClick} idx={this.state.idx}/>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleSaveNewVacancy}>Save</button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
}
