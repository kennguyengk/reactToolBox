import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { ResourceDetails } from './ResourceDetails'
import { AssignmentDetails } from './AssignmentDetails'
import { ModuleAccess } from './ModuleAccess'
import * as moment from 'moment'

type ResourceQueue = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

type ResourceQueueState = {
    isEditing: boolean;
    Data: Resources[];
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

const ResourceRow = (props) => {
    let renderedToggle = props.isEditing ? <span className="glyphicon glyphicon-chevron-left"></span> : <span className="glyphicon glyphicon-chevron-right"></span>
    
    return (
        <tr key={props.Id}>
            <td><a href='#' onClick={() => props.handleToggleClick(props.idx)}>{renderedToggle}</a></td>
            <td>{props.ID}</td>
            <td>{props.FullName}</td>
            <td>{props.EmployeeTitle}</td>
            <td>{props.EmployeeStatus.StatusDesc}</td>
            <td>{props.AssignmentStartDate}</td>
            <td>LOB</td>
            <td>Role</td>
            <td>{props.StatusDate}</td>
        </tr>
    )
}
const EditResourceRow = (props) => {
    
    return (
        <tr>
            <td colSpan={9}>
                <table className='table' style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th colSpan={9}>
                                <div className="pull-left">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation"><a href="#resourcedetails" aria-controls="resourcedetails" role="tab" data-toggle="tab">Resource Details</a></li>
                                        <li role="presentation"><a href="#assignmentdetails" aria-controls="assignmentdetails" role="tab" data-toggle="tab">Assignment Details</a></li>
                                        <li role="presentation"><a href="#moduleaccess" aria-controls="moduleaccess" role="tab" data-toggle="tab">Modules</a></li>
                                    </ul>
                                </div>

                                <div className="btn-toolbar pull-right">
                                    <button className='btn btn-default' onClick={() => props.handleToggleClick(props.idx)}>Cancel</button>
                                    <button className='btn btn-primary'>Save</button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={9}>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id="resourcedetails">
                                        <ResourceDetails
                                            currentEmployee={props.resource}
                                            handleOnChangeFirstName={this.handleOnChangeFirstName}
                                            handleOnChangeLastName={this.handleOnChangeLastName}
                                            handleOnChangeOutOfOffice={this.handleOnChangeOutOfOffice}
                                            handleOnChangeNickName={this.handleOnChangeNickName}
                                            handleOnChangeLocation={this.handleOnChangeLocation}
                                            handleOnChangeStatus={this.handleOnChangeStatus}
                                            handleOnChangePortalID={this.handleOnChangePortalID}
                                            handleOnChangeManager={this.handleOnChangeManager}
                                            handleOnChangeHireDate={this.handleOnChangeHireDate}
                                            handleOnChangeTermDate={this.handleOnChangeTermDate}
                                            handleOnChangeEmployeeTitle={this.handleOnChangeEmployeeTitle}
                                            handleToggleClick={this.handleToggleClick} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="assignmentdetails">
                                        <AssignmentDetails
                                            currentEmployee={props.resource}
                                            handleOnChangeLOB={this.handleOnChangeLOB}
                                            handleOnChangeManager={this.handleOnChangeManager}
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
                                            handleOnChangeAssignmentComments={this.handleOnChangeAssignmentComments}
                                            handleOnChangeAssignmentStatusDate={this.handleOnChangeAssignmentStatusDate}
                                            handleOnChangeAssignmentStartDate={this.handleOnChangeAssignmentStartDate}
                                            handleOnChangeAssignmentEndDate={this.handleOnChangeAssignmentEndDate}
                                            handleOnChangeAssignmentNetworkIdentifier={this.handleOnChangeAssignmentNetworkIdentifier} />
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="moduleaccess">
                                        <ModuleAccess
                                            currentEmployee={props.resource}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        )
    } 



const ResourcePanel = (props) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>Resource ID</th>
                    <th>Resource</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>LOB</th>
                    <th>Role</th>
                    <th>Status Date</th>
                </tr>
            </thead>
            {props.children}
        </table>
    )
}

export class Resource extends React.Component<ResourceQueue, ResourceQueueState> {
    constructor(props) {
        super(props)

        this.state = {
            Data: [],
            isEditing: false,
            editingIdx: null,
            Locations: null,
            Statuses: null
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

    fetchResources = () => {
        fetch('/api/Employees')
            .then(res => res.json())
            .then(data => this.setState({ Data: data }))
    }

    componentDidMount() {
        this.fetchResources();
    }

    handleOnChangeOutOfOffice = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].OutofOfficeFlag = e.target.value
        this.setState({ Data : newState.Data })

    }
    handleOnChangeFirstName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].FirstName = e.target.value
        this.setState({ Data : newState.Data })

    }
    handleOnChangeLastName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].LastName = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeNickName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].NickName = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeLocation = (e, Locations) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].LocationID = e.target.value
        const newLocation = Locations.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].VacancyLocation = newLocation
        this.setState({ Data: newState.Data })
        console.log(newState.Data)
    }
    handleOnChangeStatus = (e, Statuses) => {
        console.log(this.state.Data)
        let newState = { ...this.state }
        newState.Data[this.state.editingIdx].EmployeeStatus.ID = e.target.value
        const newStatus = Statuses.find(item => item.ID === e.target.value)
        newState.Data[this.state.editingIdx].EmployeeStatus.StatusDesc = newStatus
       this.setState({ Data: newState.Data })
        console.log(newState.Data)
    }
    handleOnChangePortalID = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].PortalID = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeManager = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].Manager = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeHireDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].HireDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeTermDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].TermDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeEmployeeTitle = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].EmployeeTitle = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        //newState.Data[idx].AssignmentName = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentSuite = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentSuite = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentLeader = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentLeader = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentEmailAddress = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentEmailAddress = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentLaptopName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentLaptopName = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentLaptopReceivedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentLaptopReceivedDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentLaptopReturnedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentLaptopReturnedDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentClientNetworkAccessName = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentClientNetworkAccessName = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentClientNetworkAccessReceivedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentClientNetworkAccessReceivedDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentClientNetworkAccessReturnedDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentClientNetworkAccessReturnedDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentBillCode = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentBillCode = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentBillCodeStartDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentBillCodeStartDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentBillCodeEndDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentBillCodeEndDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentComments = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentComments = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentStatusDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentStatusDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentStartDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentStartDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentEndDate = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentEndDate = e.target.value
        this.setState({ Data: newState.Data })
    }
    handleOnChangeAssignmentNetworkIdentifier = (e) => {
        const idx = this.state.editingIdx
        let newState = { ...this.state }
        newState.Data[idx].AssignmentNetworkIdentifier = e.target.value
        this.setState({ Data: newState.Data })
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
        fetch('/api/Employees/' + this.state.Data[this.state.editingIdx].ID, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())

    }


    render() {
        let renderedResources = [<tr></tr>]
        if (this.state.Data.length > 0) {
            renderedResources = this.state.Data.map((item, idx, editPanel) => {
                let renderedEditRow = (this.state.editingIdx === idx) ? <EditResourceRow resource={item} handleToggleClick={this.handleToggleClick} idx={idx} isEditing={this.state.editingIdx === idx} /> : null
                
                return (
                    <tbody>
                        <ResourceRow {...item} handleToggleClick={this.handleToggleClick} idx={idx} isEditing={this.state.editingIdx===idx} />
                        {renderedEditRow}
                    </tbody>
                )
            }
            )
        }
        return (
            <div>
                <ResourcePanel>
                    {renderedResources}

                </ResourcePanel>

            </div>
        )
    }
}