import * as React from 'react'

interface EditAnswerChoiceProps {
	idx: number;
	ID: number;
	Desc: string;
	IsCorrect: boolean;
	handleAnswerChoiceInput: Function;
	handleDeleteAnswerChoice: Function;
}
export class EditAnswerChoice extends React.Component<EditAnswerChoiceProps, {}> {
	render() {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let answerChoiceLetter = letters[this.props.idx]

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row" style={{ paddingBottom: 10 }}>
								<div className="col-md-12">
									<div className="pull-left">
										<a href="#" style={{ color: 'red' }} onClick={() => this.props.handleDeleteAnswerChoice(this.props.ID)}>Delete</a>
									</div>
									<div className="pull-right">
										Is Correct? <input name="IsCorrect" type="checkbox" checked={this.props.IsCorrect} onChange={(e) => this.props.handleAnswerChoiceInput(e, this.props.idx)} />	
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-2">
									<span style={{fontSize: 24, fontWeight: 'bold'}}>{answerChoiceLetter}</span>
								</div>
								<div className="col-md-10">
									<textarea name="Desc" className="form-control" rows={2} value={this.props.Desc} onChange={(e) => this.props.handleAnswerChoiceInput(e, this.props.idx)}></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}