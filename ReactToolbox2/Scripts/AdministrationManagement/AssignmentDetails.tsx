import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'

type AssignmentDetailsProps = {
    currentEmployee: any;
    handleOnChangeAssignmentName: any;
    handleOnChangeAssignmentSuite: any;
    handleOnChangeAssignmentLeader: any;
    handleOnChangeLOB: any;
    handleOnChangeManager: any;
    handleOnChangeAssignmentEmailAddress: any;
    handleOnChangeAssignmentLaptopName: any;
    handleOnChangeAssignmentClientLaptopReceivedDate: any;
    handleOnChangeAssignmentClientLaptopReturnedDate: any;
    handleOnChangeAssignmentClientNetworkAccess: any;
    handleOnChangeAssignmentClientNetworkAccessReceivedDate: any;
    handleOnChangeAssignmentClientNetworkAccessReturnedDate: any;
    handleOnChangeAssignmentBillCode: any;
    handleOnChangeAssignmentBillCodeStartDate: any;
    handleOnChangeAssignmentBillCodeEndDate: any;
    handleOnChangeAssignmentComments: any;
    handleOnChangeAssignmentStatusDate: any;
    handleOnChangeAssignmentStartDate: any;
    handleOnChangeAssignmentEndDate: any;
    handleOnChangeAssignmentNetworkIdentifier: any;

}

type AssignmentDetailsState = {
    LOBs: any[];
}

export class AssignmentDetails extends React.Component<AssignmentDetailsProps, AssignmentDetailsState> {
    constructor(props) {
        super(props)

        this.state = {
            LOBs: []
        }
    }
    componentWillMount() {
        this.fetchLOBs()

    }
    fetchLOBs = () => {
        fetch('/api/LOBs')
            .then(res => { return res.json() })
            .then(data => this.setState({ LOBs: data }))
    }
    render() {
        return (
            <table className="table">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={9}><b>Assignment Details</b></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Assignment Name <input className="form-control" value={this.props.currentEmployee.AssignmentName} onChange={(e) => this.props.handleOnChangeAssignmentName(e)} /></td>
                        <td colSpan={2}>Start Date <input className="form-control" value={this.props.currentEmployee.AssignmentStartDate} onChange={(e) => this.props.handleOnChangeAssignmentStartDate(e)} /></td>
                        <td colSpan={2}>End Date <input className="form-control" value={this.props.currentEmployee.AssignmentEndDate} onChange={(e) => this.props.handleOnChangeAssignmentEndDate(e)} /></td>
                        <td>Network ID <input className="form-control" value={this.props.currentEmployee.AssignmentNetworkIdentifier} onChange={(e) => this.props.handleOnChangeAssignmentNetworkIdentifier(e)} /></td>
                        <td>Role <input className="form-control" /></td>
                        <td>Location <input className="form-control" /></td>
                    </tr>
                    <tr>
                        <td colSpan={3}>SOW Code <input className="form-control" value={this.props.currentEmployee.AssignmentBillCodeName} onChange={(e) => this.props.handleOnChangeAssignmentBillCode(e)} /></td>
                        <td colSpan={2}>Suite <input className="form-control" value={this.props.currentEmployee.AssignmentSuite} onChange={(e) => this.props.handleOnChangeAssignmentSuite(e)} /></td>
                        <td colSpan={2}>LOB
                            <select className="form-control" value={this.props.currentEmployee.LOBID} onChange={(e) => this.props.handleOnChangeLOB(e, this.state.LOBs)}  >
                                <option></option>
                                {this.state.LOBs.map(item => <option value={item.ID}>{item.LOBDesc}</option>)}
                            </select></td>
                        <td colSpan={2}>Leader <input className="form-control" value={this.props.currentEmployee.AssignmentLeader} onChange={(e) => this.props.handleOnChangeAssignmentLeader(e)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={3} rowSpan={4}>Comments <textarea className="form-control" rows={4} value={this.props.currentEmployee.AssignmentComments} onChange={(e) => this.props.handleOnChangeAssignmentComments(e)} /></td>
                        <td colSpan={6}>Client Email Address <input className="form-control" value={this.props.currentEmployee.AssignmentEmailAddress} onChange={(e) => this.props.handleOnChangeAssignmentEmailAddress(e)} /></td>

                    </tr>
                    <tr>

                        <td colSpan={2}>Client Laptop Name <input className="form-control" value={this.props.currentEmployee.AssignmentLaptopName} onChange={(e) => this.props.handleOnChangeAssignmentLaptopName(e)} /></td>
                        <td colSpan={2}>Client Network Access <input className="form-control" value={this.props.currentEmployee.AssignmentClientNetworkAccess} onChange={(e) => this.props.handleOnChangeAssignmentClientNetworkAccess(e)} /></td>
                        <td colSpan={2}>Bill Code <input className="form-control" value={this.props.currentEmployee.AssignmentBillCodeName} onChange={(e) => this.props.handleOnChangeAssignmentBillCode(e)} /></td>
                    </tr>
                    <tr>

                        <td colSpan={2}>Received Date <input className="form-control" value={this.props.currentEmployee.AssignmentClientLaptopReceivedDate} onChange={(e) => this.props.handleOnChangeAssignmentClientLaptopReceivedDate(e)} /></td>
                        <td colSpan={2}>Received Date <input className="form-control" value={this.props.currentEmployee.AssignmentClientNetworkAccessReceivedDate} onChange={(e) => this.props.handleOnChangeAssignmentClientNetworkAccessReceivedDate(e)} /></td>
                        <td colSpan={2}>Received Date <input className="form-control" value={this.props.currentEmployee.AssignmentBillCodeStartDate} onChange={(e) => this.props.handleOnChangeAssignmentBillCodeStartDate(e)} /></td>
                    </tr>
                    <tr>

                        <td colSpan={2}>Returned Date <input className="form-control" value={this.props.currentEmployee.AssignmentClientLaptopReturnedDate} onChange={(e) => this.props.handleOnChangeAssignmentClientLaptopReturnedDate(e)} /></td>
                        <td colSpan={2}>Returned Date <input className="form-control" value={this.props.currentEmployee.AssignmentClientNetworkAccessReturnedDate} onChange={(e) => this.props.handleOnChangeAssignmentClientNetworkAccessReturnedDate(e)} /></td>
                        <td colSpan={2}>Returned Date <input className="form-control" value={this.props.currentEmployee.AssignmentBillCodeEndDate} onChange={(e) => this.props.handleOnChangeAssignmentBillCodeEndDate(e)} /></td>
                    </tr>

                </tbody>
            </table>
        )
    }
}