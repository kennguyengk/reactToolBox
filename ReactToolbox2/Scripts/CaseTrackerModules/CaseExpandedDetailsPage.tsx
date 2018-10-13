import * as React from 'react'
import { find } from 'lodash'

import { ToolboxPage } from '../ToolboxPage'
import { TabContent } from './TabContent'


type CaseExpandedDetailsPageProps = {
    location: any;
	history: any;
	match: any;  //contains a params object with ID in it
	staticContext?: any;
}

type CaseExpandedDetailsState = {
	caseDetails: any;
	roles: any[];
}

const CaseHeaderPanel = (props) => { 
	return (<div>
				<div className="row">
					<div className="col-md-2">
						<div className="form-group">
							<label>Customer ID</label>
							<input type="text" className="form-control-sm" id="customerID" value={props.ID} />
						</div>
					</div>
					<div className="col-md-2">
						<div className="form-group">
							<label>Internal ID</label>
							<input type="text" className="form-control-sm" id="internalID" value={props.internalID} />
						</div>
					</div>
					<div className="col-md-3">
						<div className="form-group">
							<label>Customer Name</label>
							<input type="text" className="form-control-sm" id="custName" value={props.CustomerName} />
						</div>
					</div>
					<div className="col-md-3">
						<div className="form-group">
							<label>Business Type</label>
							<input type="text" className="form-control-sm" id="busType" value={props.Classification.Name} />
						</div>
					</div>

				</div>
			</div>
	)
}

const CaseOverview = (props) => {
	const title = {
		textAlign: 'left'
	} as React.CSSProperties

	const detail = {
		color: '#696969',
		textAlign: 'right'
	} as React.CSSProperties

	const stepTitle = {
		textAlign: 'left',
		color: '#696969'
	} as React.CSSProperties

	const stepIndicator = {
		textAlign: 'right'
	} as React.CSSProperties

	return (
		<div style={{ backgroundColor: '#eeeeee', padding: 20 }}>
			<h3 className="sidebar-label">Overview</h3>
			<table className="table">
				<tr>
					<td style={title}>Case ID</td>
					<td style={detail}>{props.ID}</td>
				</tr>
				<tr>
					<td style={title}>Classification</td>
					<td style={detail}>Individual</td>
				</tr>
				<tr>
					<td style={title}>Internal ID</td>
					<td style={detail}>{props.InternalID}</td>
				</tr>
				<tr>
					<td style={title}>Customer Name</td>
					<td style={detail}>{props.CustomerName}</td>
				</tr>
			</table>

			<hr />

			<h3 className="sidebar-label">Assignments</h3>
			<table className="table">
				<tr>
					<td style={title}>Remediation Analyst</td>
					<td style={detail}>{props.getAssignedRole('RA')}
					<span style={{ paddingLeft: 10}}>
						<a href="#">
							<span className="badge alert-info">
								<span className="glyphicon glyphicon-pencil"></span>
							</span>
						</a>
					</span>
					</td>
				</tr>
				<tr>
					<td style={title}>Quality Analyst</td>
					<td style={detail}>{props.getAssignedRole('QC')}
					<span style={{ paddingLeft: 10}}>
						<a href="#">
							<span className="badge alert-info">
								<span className="glyphicon glyphicon-pencil"></span>
							</span>
						</a>
					</span>
					</td>
				</tr>
				<tr>
					<td style={title}>Relationship Manager</td>
					<td style={detail}>{props.getAssignedRole('RML')}
					<span style={{ paddingLeft: 10}}>
						<a href="#">
							<span className="badge alert-info">
								<span className="glyphicon glyphicon-pencil"></span>
							</span>
						</a>
					</span>
					</td>
				</tr>
				<tr>
					<td style={title}>Business Partner</td>
					<td style={detail}>{props.getAssignedRole('BP')}
					<span style={{ paddingLeft: 10}}>
						<a href="#">
							<span className="badge alert-info">
								<span className="glyphicon glyphicon-pencil"></span>
							</span>
						</a>
					</span>
					</td>
				</tr>
			</table>

			<hr />

			<h3 className="sidebar-label">Next Steps</h3>
			<table className="table">
				<tr>
					<td style={stepTitle}>Screening</td>
					<td style={stepIndicator}>
						<span className="badge alert-success">
							<a href="#"><span className="glyphicon glyphicon-ok"></span></a>
						</span>
					</td>
				</tr>
				<tr>
					<td style={stepTitle}>False Positive</td>
					<td style={stepIndicator}>
						<span className="badge alert-success">
							<span className="glyphicon glyphicon-ok"></span>
						</span>
					</td>
				</tr>
				<tr>
					<td style={stepTitle}>Negative News</td>
					<td style={stepIndicator}>
						<span className="badge alert-danger">
							<span className="glyphicon glyphicon-remove"></span>
						</span>
					</td>
				</tr>
			</table>

			<hr />

			<h3 className="sidebar-label">Attachment</h3>
			<table className="table">
				<tr>
					<td style={stepTitle}><a href="#">test.docx</a></td>
					<td style={stepIndicator}>
						<span className="badge alert-info">
							<span className="glyphicon glyphicon-pencil"></span>
						</span>
						<span className="badge alert-danger">
							<span className="glyphicon glyphicon-remove"></span>
						</span>
					</td>
				</tr>
				<tr>
					<td style={stepTitle}><a href="#">test1.docx</a></td>
					<td style={stepIndicator}>
						<span className="badge alert-info">
							<span className="glyphicon glyphicon-pencil"></span>
						</span>
						<span className="badge alert-danger">
							<span className="glyphicon glyphicon-remove"></span>
						</span>
					</td>
				</tr>
				<tr>
					<td style={stepTitle}><a href="#">test2.docx</a></td>
					<td style={stepIndicator}>
						<span className="badge alert-info">
							<span className="glyphicon glyphicon-pencil"></span>
						</span>
						<span className="badge alert-danger">
							<span className="glyphicon glyphicon-remove"></span>
						</span>
					</td>
				</tr>
			</table>
		</div>
	)
}

const CaseDetails = (props) => {
	const title = {
		fontWeight: 'bold',
		textAlign: 'left'
	} as React.CSSProperties

	const detail = {
		color: '#696969',
		textAlign: 'right'
	} as React.CSSProperties
	const rounded = {
		
	} as React.CSSProperties
	return (
		<div>
			<ul className="nav nav-tabs" role="tablist">
				<li role="presentation" className="active"><a href="#riskrating" role="tab" data-toggle="tab">Risk Rating</a></li>
				<li role="presentation"><a href="#cipreq" role="tab" data-toggle="tab">CIP Requirements</a></li>
				<li role="presentation"><a href="#remreq" role="tab" data-toggle="tab">Remediation Reqs.</a></li>
				<li role="presentation"><a href="#transhra" role="tab" data-toggle="tab">Trans. HRA</a></li>
				<li role="presentation"><a href="#relatedparties" role="tab" data-toggle="tab">Related Parties</a></li>
				<li role="presentation"><a href="#pepreq" role="tab" data-toggle="tab">PEP Reqs.</a></li>
				<li role="presentation"><a href="#screening" role="tab" data-toggle="tab">Screening</a></li>
				<li role="presentation"><a href="#documentation" role="tab" data-toggle="tab">Documentation</a></li>
				<li role="presentation"><a href="#hraedd" role="tab" data-toggle="tab">HRA Determination</a></li>
				<li role="presentation"><a href="#cddi" role="tab" data-toggle="tab">CDDI Screening</a></li>
				<li role="presentation"><a href="#hra" role="tab" data-toggle="tab">HRA Screening</a></li>
				<li role="presentation"><a href="#memoreview" role="tab" data-toggle="tab">Memo Review</a></li>
			</ul>
			<div className="tab-content">
				<div role="tabpanel" className="tab-pane active" id="riskrating">
					<TabContent caseDetails={props} categoryId={1} />
				</div>
				<div role="tabpanel" className="tab-pane" id="cipreq">
					<TabContent caseDetails={props} categoryId={2} />						
				</div>
				<div role="tabpanel" className="tab-pane" id="remreq">
					<TabContent caseDetails={props} categoryId={3} />			
							
				</div>
				<div role="tabpanel" className="tab-pane" id="transhra">
					<TabContent caseDetails={props} categoryId={4} />			

				</div>
				<div role="tabpanel" className="tab-pane" id="relatedparties" style={{ paddingLeft: 10 }}>
					<TabContent caseDetails={props} categoryId={5} />			
							
				</div>
				<div role="tabpanel" className="tab-pane" id="pepreq" style={{ paddingLeft: 10 }}>
					<TabContent caseDetails={props} categoryId={6} />			
							
							
				</div>
				<div role="tabpanel" className="tab-pane" id="screening" style={{ paddingLeft: 10 }}>
					<TabContent caseDetails={props} categoryId={7} />			

				</div>
				<div role="tabpanel" className="tab-pane" id="documentation" style={{ paddingLeft: 10 }}>
					<TabContent caseDetails={props} categoryId={8} />			
							
				</div>
				<div role="tabpanel" className="tab-pane" id="hraedd" style={{ paddingLeft: 10 }}>
					<TabContent caseDetails={props} categoryId={9} />			
							
				</div>
				<div role="tabpanel" className="tab-pane" id="cddi" style={{ paddingLeft: 10 }}>
					<div className="row">
						<div className="col-md-3">
							<h3>Screening</h3>
						</div>						
						<div className="col-md-3">
							<h3>False Positive</h3>
						</div>
						<div className="col-md-6">
							<h3>Negative News/PEP</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-3">
							<label style={title}>Screening Disp</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
							<label style={title}>False Positive Disp</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
							<label style={title}>Negative News Disp</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
							<label style={title}>Sent To Partner</label>
							<input className="form-control-sm" style={detail}></input>								
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<label style={title}>Sent To CDDI</label>
							<input className="form-control-sm" style={detail}></input>
						</div>
						<div className="col-md-3">
							<label style={title}>Date Completed</label>
							<input className="form-control-sm" style={detail}></input>
						</div>
						<div className="col-md-3">
							<label style={title}>PEP Disp</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
							<label style={title}>Rec'd From Partner</label>
							<input className="form-control-sm" style={detail}></input>								
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<label style={title}>Rec'd From CDDI</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
						</div>
						<div className="col-md-3">
							<label style={title}>Expedited</label>
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						<div className="col-md-3">
							<label style={title}>Business Partner</label>
							<input className="form-control-sm" style={detail}></input>								
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<label style={title}>Request ID</label>
							<input className="form-control-sm" style={detail}></input>		
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-3">
							<label style={title}>CDDI Comment</label><br />
							<textarea className="form-control" rows={5}></textarea>		
						</div>
						<div className="col-md-3">
							<label style={title}>False Positive Comment</label><br />
							<textarea className="form-control" rows={5}></textarea>		
						</div>
						<div className="col-md-3">
							<label style={title}>Negative News Comment</label><br />
							<textarea className="form-control" rows={5} style={rounded}></textarea>		
						</div>
						<div className="col-md-3">
							<label style={title}>Business Partner Comment</label><br />
							<textarea className="form-control" rows={5} style={rounded}></textarea>		
						</div>
					</div>
					<hr />
				</div>
				<div role="tabpanel" className="tab-pane" id="memoreview" style={{ paddingLeft: 10 }}>
							
							
				</div>
				<div role="tabpanel" className="tab-pane" id="hra" style={{ paddingLeft: 10 }}>
					<div className="row">
						<div className="col-md-6">
							<h3>HRA Screening Request</h3>
						</div>						
						
						<div className="col-md-6">
							<h3>Business Partner HRA Response</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-6">
							<div className="col-md-3">
								<label style={title}>RM Liaison</label>
								<select className="form-control-sm" style={detail}>
									<option></option>
									<option>Wiley, Coyote</option>
									<option>Runner, Road</option>
								</select>	
							</div>
							<div className="col-md-3">
								<label style={title}>Type</label>
								<input className="form-control-sm" style={detail}></input>	
							</div>
							<div className="col-md-3">
								<label style={title}>EDD Req.</label>
								<select className="form-control-sm" style={detail}>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>	
							</div>
							<div className="col-md-3">
								<label style={title}>Form Sent</label>
								<input className="form-control-sm" style={detail}></input>	
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="col-md-9">
								<label style={title}>RML Status</label><br />
								<select className="form-control-sm" style={detail}>
									<option></option>
									<option>Sent to Business Partner</option>
									<option>Returned from Business Partner</option>
								</select>	
							</div>
							<div className="col-md-3">
								<label style={title}>Rec'd</label>
								<input className="form-control-sm" style={detail}></input>	
							</div>
						</div>
						<div className="col-md-6">
							<label style={title}>Business Partner Status</label><br />
							<select className="form-control-sm" style={detail}>
								<option></option>
								<option>Sent to Business Partner</option>
								<option>Returned from Business Partner</option>
							</select>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-6">
							<label style={title}>RML Comment</label><br />
							<textarea className="form-control" rows={5}></textarea>		
						</div>
						<div className="col-md-6">
							<label style={title}>Business Partner Comment</label><br />
							<textarea className="form-control" rows={5}></textarea>	
						</div>
					</div>
					<hr />
							
				</div>
				
			</div>
		</div>
	)
}


export class CaseExpandedDetailsPage extends React.Component<CaseExpandedDetailsPageProps, CaseExpandedDetailsState> {
    constructor(props) {
		super(props)
		this.state={ 
			caseDetails: {},
			roles: []
		}
	}
	
	//fetch the Cases/5 part of the case controller when called
    fetchCaseDetails = () => {
        fetch('/api/Cases/' + this.props.match.params.id)
            .then(res => {return res.json()})
            .then(res => this.setState({ caseDetails: res }))

		fetch('/api/Roles')
			.then(res => { return res.json() })
			.then(res => { this.setState({ roles: res })})

		
    }

	getAssignedRole = (roleDesc) => {
		// If caseDetails isn't loaded yet, return Unassigned
		if (Object.keys(this.state.caseDetails).length === 0) { return `Unassigned` }

		const role = find(this.state.roles, item => { return item.Description === roleDesc })

		// If no role desc found, return Unassigned
		if (!role) {
			return `Unassigned`
		}

		const roleId = role.ID
		const res = find(this.state.caseDetails.Assignments, item => item.RoleID === roleId)
		return res ? res.Employee.FullName : `Unassigned`
	}

	componentWillMount() {  //will call this function on 'ready'
		this.fetchCaseDetails()	
	}

	render() {
        return (
			<ToolboxPage pathName={ this.props.location.pathname }> 
				<div className="row">
					<div className="col-md-3">
						<CaseOverview {...this.state.caseDetails} getAssignedRole={this.getAssignedRole} />
					</div>
					<div className="col-md-9">
						<CaseDetails {...this.state.caseDetails}/>
					</div>
				</div>
			</ToolboxPage>
        )
    }
}