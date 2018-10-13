import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'

type ModuleAccessFieldProps = {
    ID: number;
    ModuleDesc: string;
}

type ModuleAccessFieldState = {
    LOBs: any[];
    TeamLeads: any[];
    AccessLevels: any[];
}

export class ModuleAccessFields extends React.Component<ModuleAccessFieldProps, ModuleAccessFieldState> {
   constructor(props) {
       super(props)
       this.state = {
           LOBs: [],
           TeamLeads: [],
           AccessLevels: []
       }
    }
   componentWillMount() {
       this.fetchLOBs()
       this.fetchTeamLeads()
       this.fetchAccessLevels()

   }
   fetchLOBs = () => {
       fetch('/api/LOBs')
           .then(res => { return res.json() })
           .then(data => this.setState({ LOBs: data }))
   }
   fetchTeamLeads = () => {
       fetch('/api/Employees')
           .then(res => { return res.json() })
           .then(data => this.setState({ TeamLeads: data }))
   }
   fetchAccessLevels = () => {
       fetch('/api/ModuleAccessLevels')
           .then(res => { return res.json() })
           .then(data => {
               console.log(data)
               this.setState({ AccessLevels: data })
           })
   }
   render() {
       const moduleAccessLevels = this.state.AccessLevels.filter(item => item.ModuleID === this.props.ID)

        return (
            <div className="col-md-3" style={{ borderWidth: '1px', borderColor: '#dddddd', borderStyle: 'solid', paddingBottom: '1px', paddingLeft: '1px', paddingRight: '1px', paddingTop: '1px' }}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr><td><b>{this.props.ModuleDesc}</b></td></tr>
                    </thead>
                    <tbody>
                            <tr><td>LOB
                                <select className="form-control" >
                                    <option></option>
                                    {this.state.LOBs.map(item => <option value={item.ID}>{item.LOBDesc}</option>)}
                                </select></td></tr>
                            <tr><td>Role
                                <select className="form-control" >
                                    <option></option>
                                    {moduleAccessLevels.map(item => <option value={item.ID}>{item.ModuleAccessLevelDesc}</option>)}
                                </select>
                            </td></tr>
                            <tr><td>Team Lead
                                <select className="form-control" >
                                    <option></option>
                                    {this.state.TeamLeads.map(item => <option value={item.ID}>{item.FullName}</option>)}
                                </select></td></tr>
                            <tr><td>Module Admin
                                <select className="form-control" >
                                    <option></option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </td></tr>
                        </tbody>
                </table>
            </div>
        )
    }
}