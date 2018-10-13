import * as React from 'react'

const PipeSpacer = () => {
	return <span style={{ paddingLeft: 10, paddingRight: 10}}>|</span>
}

const UserTable = (props) => {
	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Status</th>
					<th>Score</th>
					<th>Actions</th>
				</tr>
				<tr>
					<th>
						<select className="form-control input-sm"></select>
					</th>
					<th>
						<select className="form-control input-sm"></select>
					</th>
				</tr>
			</thead>
			<tbody>
				{props.children}
			</tbody>
		</table>
	)
}

const UserRecord = ({ FirstName, LastName, EmployeeID, KnowledgeCheckID, StartDT, SubmitDT, Responses }) => {
	let status
	let style
	let correctCount
	let totalCount
	let renderedCounts

	if (!StartDT && !SubmitDT) {
		status = 'Not Taken'
		style = {}
	}

	if (StartDT && !SubmitDT) {
		status = 'In Progress'
		style = {
			color: 'yellow'
		}
	}

	if (StartDT && SubmitDT) {
		status = 'Complete'
		style = {
			color: 'green'
		}

		correctCount = Responses.filter(item => item.AnswerChoice.IsCorrect).length
		totalCount = Responses.length

		renderedCounts = "" + correctCount + " / " + totalCount
	}

	if (!StartDT && SubmitDT) {
		status = 'ERROR'
		style = {
			color: 'red'
		}
	}

	return (
		<tr>
			<td>{FirstName} {LastName}</td>
			<td>
				<span style={style}>{status}</span>
			</td>
			<td>
				{renderedCounts}
			</td>
			<td>
				<a href="#">Reset</a>
				<PipeSpacer />
				<a href="#">View</a>
			</td>
		</tr>
	)
}

interface UserPageProps {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}

interface UserPageState {
	employees: any[];
	attempts: any[];
}

export class UserPage extends React.Component<UserPageProps, UserPageState> {
	constructor(props) {
		super(props)

		this.state = {
			employees: [],
			attempts: []
		}
	}
	
	componentWillMount() {
		fetch('/api/Employees')
			.then(res => res.json())
			.then(res => this.setState({ employees: res }))

		fetch('/api/Attempts')
			.then(res => res.json())
			.then(res => this.setState({ attempts: res }))
	}

	render() {
		let renderedEmployees = [<div></div>]
		
		if (this.state.employees.length > 0) {
			renderedEmployees = this.state.employees.map(employee => {
				let attempt
				const employeeAttempts = this.state.attempts.filter(item => item.KnowledgeCheckID === 1 && item.EmployeeID === employee.ID)

				if (employeeAttempts.length === 1) {
					attempt = employeeAttempts[0]
				}

				if (employeeAttempts.length > 1) {
					throw 'Too many attempts returned!'
				}

				return <UserRecord {...employee} {...attempt} />
			})
		}

		return (
			<div>
				<h1>User Management</h1>

				<hr />

				<UserTable>
					{renderedEmployees}
				</UserTable>
			</div>
		)
	}
}