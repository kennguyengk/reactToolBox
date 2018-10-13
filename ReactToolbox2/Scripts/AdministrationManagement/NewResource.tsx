import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { Dashboard } from './Dashboard'
import { ResourceDetails } from './ResourceDetails'
import { AssignmentDetails } from './AssignmentDetails'

type NewResourceProps = {
    handleHideResourceModal
    showResourceModal
}
type NewResourceState = {
    isEditing: boolean;
    handleToggleClick: any;
    newResource: {
        ID: number;
        FullName: string;
        EmployeeTitle: string;
        EmployeeStatus: { StatusDesc: string; ID: number; };
        StartDate: string;
        LOB: string;
        Role: string;
        StatusDate: string;
        LocationID: number;
        VacancyLocation: string;
        PortalID: string;
        OutofOfficeFlag: boolean;
        FirstName: string;
        LastName: string;
        NickName: string;
        Manager: string;
        HireDate: string;
        TermDate: string;
        AssignmentSuite: string;
        AssignmentLeader: string;
        AssignmentEmailAddress: string;
        AssignmentLaptopName: string;
        AssignmentLaptopReceivedDate: string;
        AssignmentLaptopReturnedDate: string;
        AssignmentClientNetworkAccessName: string;
        AssignmentClientNetworkAccessReceivedDate: string;
        AssignmentClientNetworkAccessReturnedDate: string;
        AssignmentBillCode: string;
        AssignmentBillCodeStartDate: string;
        AssignmentBillCodeEndDate: string;
        AssignmentComments: string;
        AssignmentStatusDate: string;
        AssignmentStartDate: string;
        AssignmentEndDate: string;
        AssignmnetNetworkIdentifier: string;
        AssignmentNetworkIdentifier: string;
    };
    editingIdx: number;
    Locations: string;
    Statuses: string;
}
type Resources = {
    ID: number;
    FullName: string;
    EmployeeTitle: string;
    EmployeeStatus: { StatusDesc: string; ID: number; };
    StartDate: string;
    LOB: string;
    Role: string;
    StatusDate: string;
    LocationID: number;
    VacancyLocation: string;
    PortalID: string;
    OutofOfficeFlag: boolean;
    FirstName: string;
    LastName: string;
    NickName: string;
    Manager: string;
    HireDate: string;
    TermDate: string;
    AssignmentSuite: string;
    AssignmentLeader: string;
    AssignmentEmailAddress: string;
    AssignmentLaptopName: string;
    AssignmentLaptopReceivedDate: string;
    AssignmentLaptopReturnedDate: string;
    AssignmentClientNetworkAccessName: string;
    AssignmentClientNetworkAccessReceivedDate: string;
    AssignmentClientNetworkAccessReturnedDate: string;
    AssignmentBillCode: string;
    AssignmentBillCodeStartDate: string;
    AssignmentBillCodeEndDate: string;
    AssignmentComments: string;
    AssignmentStatusDate: string;
    AssignmentStartDate: string;
    AssignmentEndDate: string;
    AssignmnetNetworkIdentifier: string;
    AssignmentNetworkIdentifier: string;
    EmployeeModuleAccessLevels: {
        ModuleAccessLevel: {
            Module: { ID: number; ModuleDesc: string; };
            ID: number;
            ModuleID: number;
            ModuleAccessLevelDesc: string;
        };
        ID: number;
        EmployeeID: number;
        ModuleAccessLevelID: number;
        LOBID: number;
        TeamLeadID: number;
        ModuleAdmin: boolean;
    };
}

export class NewResourceModal extends React.Component<NewResourceProps, NewResourceState> {
    constructor(props) {
        super(props)

        this.state = {
            newResource: {
                ID: null,
                FullName: null,
                EmployeeTitle: null,
                EmployeeStatus: { StatusDesc: null, ID: null },
                StartDate: null,
                LOB: null,
                Role: null,
                StatusDate: null,
                LocationID: null,
                VacancyLocation: null,
                PortalID: null,
                OutofOfficeFlag: null,
                FirstName: null,
                LastName: null,
                NickName: null,
                Manager: null,
                HireDate: null,
                TermDate: null,
                AssignmentSuite: null,
                AssignmentLeader: null,
                AssignmentEmailAddress: null,
                AssignmentLaptopName: null,
                AssignmentLaptopReceivedDate: null,
                AssignmentLaptopReturnedDate: null,
                AssignmentClientNetworkAccessName: null,
                AssignmentClientNetworkAccessReceivedDate: null,
                AssignmentClientNetworkAccessReturnedDate: null,
                AssignmentBillCode: null,
                AssignmentBillCodeStartDate: null,
                AssignmentBillCodeEndDate: null,
                AssignmentComments: null,
                AssignmentStatusDate: null,
                AssignmentStartDate: null,
                AssignmentEndDate: null,
                AssignmnetNetworkIdentifier: null,
                AssignmentNetworkIdentifier: null
},
            isEditing: false,
            handleToggleClick: null,
            editingIdx: null,
            Locations: null,
            Statuses: null
        }
    }
    handleOnChangeAssignmentName = (e) => {
        let newState = { ...this.state }
        //newState.newResource.AssignmentName = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeOutOfOffice = (e) => {
        let newState = { ...this.state }
        newState.newResource.OutofOfficeFlag = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeFirstName = (e) => {
        let newState = { ...this.state }
        newState.newResource.FirstName = e.target.value
        this.setState({ newResource: newState.newResource })

    }
    handleOnChangeLastName = (e) => {
        let newState = { ...this.state }
        newState.newResource.LastName = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeLOB = (e) => {
        let newState = { ...this.state }
        newState.newResource.LOB = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeNickName = (e) => {
        let newState = { ...this.state }
        newState.newResource.NickName = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeLocation = (e, Locations) => {
        console.log(this.state.newResource)
        let newState = { ...this.state }
        newState.newResource.LocationID = e.target.value
        const newLocation = Locations.find(item => item.ID === e.target.value)
        newState.newResource.VacancyLocation = newLocation
        this.setState({ newResource: newState.newResource })
        console.log(newState.newResource)
    }
    handleOnChangeStatus = (e, Statuses) => {
        console.log(this.state.newResource)
        let newState = { ...this.state }
        newState.newResource.EmployeeStatus.ID = e.target.value
        const newStatus = Statuses.find(item => item.ID === e.target.value)
        newState.newResource.EmployeeStatus.StatusDesc = newStatus
        this.setState({ newResource: newState.newResource })
        console.log(newState.newResource)
    }
    handleOnChangePortalID = (e) => {
        let newState = { ...this.state }
        newState.newResource.PortalID = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeManager = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.Manager = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeHireDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.HireDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeTermDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.TermDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeEmployeeTitle = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.EmployeeTitle = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentSuite = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentSuite = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentLeader = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentLeader = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentEmailAddress = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentEmailAddress = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentLaptopName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentLaptopName = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentClientLaptopReceivedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentLaptopReceivedDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentClientLaptopReturnedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentLaptopReturnedDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentClientNetworkAccess = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentClientNetworkAccessName = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentClientNetworkAccessReceivedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentClientNetworkAccessReceivedDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentClientNetworkAccessReturnedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentClientNetworkAccessReturnedDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentBillCode = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentBillCode = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentBillCodeStartDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentBillCodeStartDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentBillCodeEndDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentBillCodeEndDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentComments = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentComments = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentStatusDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentStatusDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentStartDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentStartDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentEndDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentEndDate = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleOnChangeAssignmentNetworkIdentifier = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.newResource.AssignmentNetworkIdentifier = e.target.value
        this.setState({ newResource: newState.newResource })
    }
    handleSaveNewVacancy = () => {
        const requestBody = {
            //FirstName: this.state.FirstName
            //LOB: this.state.LOB,
            //Status: this.state.Status,
            //OpenDate: this.state.OpenDate,
            //StartDate: this.state.StartDate,
            //Location: this.state.Location,
            //Manager: this.state.Manager,
            //SOWCode: this.state.SOWCode,
            //Comments: this.state.Comments
        }
        fetch('/api/Employees/', {
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

            <Modal show={this.props.showResourceModal} onHide={this.props.handleHideResourceModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Candidate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResourceDetails
                        currentEmployee={this.state.newResource}
                        handleToggleClick={this.state.handleToggleClick}
                        handleOnChangeFirstName={this.handleOnChangeFirstName}
                        handleOnChangeLastName={this.handleOnChangeLastName}
                        handleOnChangeManager={this.handleOnChangeManager}
                        handleOnChangeOutOfOffice={this.handleOnChangeOutOfOffice}
                        handleOnChangeNickName={this.handleOnChangeNickName}
                        handleOnChangeLocation={this.handleOnChangeLocation}
                        handleOnChangeStatus={this.handleOnChangeStatus}
                        handleOnChangePortalID={this.handleOnChangePortalID}
                        handleOnChangeHireDate={this.handleOnChangeHireDate}
                        handleOnChangeTermDate={this.handleOnChangeTermDate}
                        handleOnChangeEmployeeTitle={this.handleOnChangeEmployeeTitle} />
                    <AssignmentDetails
                        currentEmployee={this.state.newResource}
                        handleOnChangeLOB={this.handleOnChangeLOB}
                        handleOnChangeAssignmentName={this.handleOnChangeAssignmentName}
                        handleOnChangeAssignmentSuite={this.handleOnChangeAssignmentSuite}
                        handleOnChangeAssignmentLeader={this.handleOnChangeAssignmentLeader}
                        handleOnChangeAssignmentEmailAddress={this.handleOnChangeAssignmentEmailAddress}
                        handleOnChangeAssignmentLaptopName={this.handleOnChangeAssignmentLaptopName}
                        handleOnChangeAssignmentClientLaptopReceivedDate={this.handleOnChangeAssignmentClientLaptopReceivedDate}
                        handleOnChangeAssignmentClientLaptopReturnedDate={this.handleOnChangeAssignmentClientLaptopReturnedDate}
                        handleOnChangeAssignmentClientNetworkAccess={this.handleOnChangeAssignmentClientNetworkAccess}
                        handleOnChangeAssignmentClientNetworkAccessReceivedDate={this.handleOnChangeAssignmentClientNetworkAccessReceivedDate}
                        handleOnChangeAssignmentClientNetworkAccessReturnedDate={this.handleOnChangeAssignmentClientNetworkAccessReturnedDate}
                        handleOnChangeAssignmentBillCode={this.handleOnChangeAssignmentBillCode}
                        handleOnChangeAssignmentBillCodeStartDate={this.handleOnChangeAssignmentBillCodeStartDate}
                        handleOnChangeAssignmentBillCodeEndDate={this.handleOnChangeAssignmentBillCodeEndDate}
                        handleOnChangeManager={this.handleOnChangeManager}
                        handleOnChangeAssignmentComments={this.handleOnChangeAssignmentComments}
                        handleOnChangeAssignmentStatusDate={this.handleOnChangeAssignmentStatusDate}
                        handleOnChangeAssignmentStartDate={this.handleOnChangeAssignmentStartDate}
                        handleOnChangeAssignmentEndDate={this.handleOnChangeAssignmentEndDate}
                        handleOnChangeAssignmentNetworkIdentifier={this.handleOnChangeAssignmentNetworkIdentifier} />
                    <Modal.Footer>
                        <button type="button" className="btn btn-default">Close</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
}