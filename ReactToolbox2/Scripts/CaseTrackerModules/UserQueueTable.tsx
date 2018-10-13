import * as React from 'react'
import { ToolboxPage } from '../ToolboxPage'
import { CaseExpandedDetailsPage } from './CaseExpandedDetailsPage'


//Specify class parameters you need for displaying - list needs semicolon not comma
type UserQueueTableProps = {
    userQueueTable: any[];
}

export class UserQueueTable extends React.Component<UserQueueTableProps, {}> {
   
    render() {
		const renderedTableRows = this.props.userQueueTable.map(item => { 
			return (
				<tr style={{ paddingTop: 10 }}>
					<td><a href={"/CT/Queue/" + item.ID}>{ item.ID }</a></td>
					<td>{ item.Internal }</td>
					<td>{ item.Name }</td>
					<td>{ item.StatusName }</td>
					<td>{ item.PriorityName }</td>
					<td>{ item.BusinessPartner }</td>
					<td>{ item.LastUpdated }</td>
					<td>{ item.Age }</td>
				</tr>
			)
		})
        return (
				<div className='col-md-12'>
					
					<table className='table table-striped'>
						<thead>
							<tr style={{paddingBottom: 20}}>
								<th>Case ID</th>
								<th>Unique ID</th>
								<th>Customer Name</th>
								<th>Status</th>
								<th>Priority</th>
								<th>Business Partner</th>
								<th>Last Updated</th>
								<th>Age</th>
							</tr>
							<tr>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
								<th>
									<select className='form-control'>
										<option></option>
									</select>
								</th>
							</tr>
						</thead>
						<tbody>
							{ renderedTableRows }
						</tbody>
					</table>
					<hr />
				</div>
			
        )
    }
}
