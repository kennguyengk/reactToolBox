import * as React from 'react'
import * as moment from 'moment'

type KnowledgeCheck = {
	ID: number;
	Name: string;
	Summary: string;
	ActiveDT: string;
	ExpireDT: string;
	InsertedDT: string;
	UpdatedDT: string;
}

export class KnowledgeCheckList extends React.Component<{handleNewKnowledgeCheckClick: any;}, {}> {
	render() {
		return (
			<div>
				<div className="col-md-12">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
								<div className="pull-left" style={{ paddingLeft: '10px'}}>
									<b>Select a Knowledge Check below:</b>
								</div>
								<div className="pull-right" style={{ paddingRight: '10px'}}>
									<button type="button" className="btn btn-primary" onClick={this.props.handleNewKnowledgeCheckClick}>Create Knowledge Check</button>
								</div>
							</div>

							<hr />

							<table className="table table-striped">
								<thead>
									<tr>
										<th style={{width: '15'}}>Action</th>
										<th style={{width: '50%'}}>Knowledge Check</th>
										<th style={{width: '9%'}}>Missed</th>
										<th style={{width: '13%'}}>Active Date</th>
										<th style={{width: '13%'}}>Deadline</th>
									</tr>
								</thead>
									
								<tbody>
									{this.props.children}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export class KnowledgeCheckRecord extends React.Component<KnowledgeCheck, {}> {
	render() {
		return (
			<tr>
				<td>
					<a href={"/KCT/Attempt/" + this.props.ID}>Start</a>
					<br />
					<a href={"/KCT/Manage/" + this.props.ID}>Manage</a>
				</td>
				<td>{this.props.Name}</td>
				<td>--</td>
				<td>{this.props.ActiveDT}</td>
				<td>{this.props.ExpireDT}</td>
			</tr>
		)
	}
}

type HomeState = {
	knowledgeChecks: KnowledgeCheck[];
}
export class Home extends React.Component<{}, HomeState> {
	constructor() {
		super()
		
		this.state = {
			knowledgeChecks: []
		}
	}

	componentWillMount() {
		this.fetchKnowledgeChecks()
	}

    fetchKnowledgeChecks = () => {
        fetch('/api/KnowledgeChecks')
            .then(res => res.json())
            .then(res => this.setState({ knowledgeChecks: res }))
    }

	handleNewKnowledgeCheckClick = () => {
		const now = moment().format('YYYY-MM-DDTHH:mm:ss')
		
		const requestBody = {
			Name: '',
			Summary: '',
			ActiveDT: now,
			ExpireDT: now,
			InsertedDT: now,
			UpdatedDT: now
		}

		fetch('/api/KnowledgeChecks', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(res => res.json())
		.then(res => {
			this.fetchKnowledgeChecks()
			window.location.href = '/KCT/Manage/' + res.ID
		})
		.catch(err => { console.log(err) })
	}

	render() {
		return (
			<KnowledgeCheckList handleNewKnowledgeCheckClick={this.handleNewKnowledgeCheckClick}>
				{this.state.knowledgeChecks.map(item => { return <KnowledgeCheckRecord {...item}></KnowledgeCheckRecord> })}
			</KnowledgeCheckList>
		)
	}
}