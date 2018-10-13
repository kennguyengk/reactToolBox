import * as React from 'react'

type ManageSummaryProps = {
	ID: number;
	Name: string;
	Summary: string;
	ActiveDT: string;
	ExpireDT: string;
	handleInput: any;
	handleSave: any;
}

export class ManageSummary extends React.Component<ManageSummaryProps, {}> {
	render() {
		return (
			<div className="col-md-4">
				<b>Name</b>
				<input className="form-control" name={'Name'} onChange={this.props.handleInput} value={this.props.Name} />

				<hr />

				<b>Summary</b>
				<textarea className="form-control" rows={3} name={'Summary'} value={this.props.Summary} onChange={this.props.handleInput}></textarea>

				<hr />
				<b>Start Date</b>
				<input className="form-control" name={'ActiveDT'} onChange={this.props.handleInput} value={this.props.ActiveDT} />

				<hr />

				<b>Expiration Date</b>
				<input className="form-control" name={'ExpireDT'} onChange={this.props.handleInput} value={this.props.ExpireDT} />

				<hr />

				<button type="button" className="btn btn-primary" onClick={this.props.handleSave}>Save</button>
			</div>
		)
	}
}