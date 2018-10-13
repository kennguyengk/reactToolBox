import * as React from 'react'

type AnswerChoiceProps = {
	ID: number;
	KnowledgeCheckID: number;
	Desc: string;
	Explanation: string;
	IsCorrect: boolean;
	IsInactive: boolean;
}

export class AnswerChoice extends React.Component<AnswerChoiceProps, {}> {
	render() {
		return (
			<div className="row">
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="col-md-2">
							<span style={{ fontSize: 24, fontWeight: 'bold' }}>A</span>
						</div>
						<div className="col-md-10">
							<textarea className="form-control" rows={2} value={this.props.Desc} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}