import * as React from 'react'
import { EditAnswerChoice } from './EditAnswerChoice'
 
interface EditQuestionProps {
	ID: number;
	KnowledgeCheckID: number;
	Difficulty: string;
	Category: string;
	SubCategory: string;
	Desc: string;
	AnswerChoices: any[];
	idx: number;
	handleNewAnswerChoiceClick: Function;
	handleSaveQuestion: Function;
	handleBackNav: Function;
	handleQuestionInput: Function;
	handleAnswerChoiceInput: Function;
	handleDeleteAnswerChoice: Function;
	fetchKnowledgeCheckDetails: Function;
}

export class EditQuestion extends React.Component<EditQuestionProps, {}> {
	constructor(props) {
		super(props)
	}
	
	handleDeleteAnswerChoice = (answerChoiceId) => {
		fetch('/api/AnswerChoices/' + answerChoiceId, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(() => {
			this.props.fetchKnowledgeCheckDetails()
		})
	}

	render() {
		let renderedAnswerChoices = [<div></div>]

		if (this.props.AnswerChoices && this.props.AnswerChoices.length > 0) {
			renderedAnswerChoices = this.props.AnswerChoices.map((item, idx) => {
				return <EditAnswerChoice {...item} idx={idx} handleAnswerChoiceInput={this.props.handleAnswerChoiceInput} handleDeleteAnswerChoice={this.handleDeleteAnswerChoice}/>
			})
		}

		return (
			<div>
				<div className="row">
					<div className="col-md-4">
						<h2>Question #{this.props.idx + 1}</h2>
					</div>
					<div className="col-md-8">
						<div className="pull-right">
							<button type="button" className="btn btn-default" onClick={() => { this.props.handleBackNav() }}>
								<span className="glyphicon glyphicon-chevron-left"></span> Back
							</button>
							<span style={{ paddingLeft: 10, paddingRight: 10}}>|</span>
							<button type="button" className="btn btn-success" onClick={() => this.props.handleSaveQuestion()}>Submit</button>
						</div>
					</div>
				</div>

				<hr />
                <hr/>
				<div className="row">
					<div className="col-md-12">
						<b>Question Description</b>
						<textarea name="Desc" className="form-control" rows={3} value={this.props.Desc} onChange={(e) => this.props.handleQuestionInput(e)}></textarea>
					</div>
				</div>

				<hr />

				<div className="row">
					<div className="col-md-4">
						<b>Difficulty</b>
						<select name="Difficulty" className="form-control" onChange={(e) => this.props.handleQuestionInput(e)}>

						</select>
					</div>
					<div className="col-md-4">
						<b>Category</b>
						<select name="Category" className="form-control" onChange={(e) => this.props.handleQuestionInput(e)}>

						</select>
					</div>
					<div className="col-md-4">
						<b>Sub-Category</b>
						<select name="SubCategory" className="form-control" onChange={(e) => this.props.handleQuestionInput(e)}>

						</select>
					</div>
				</div>

				<hr />

				<div className="row">
					<div className="col-md-8">
						<h3>Answer Choices</h3>
					</div>
					<div className="col-md-4">
						<div className="pull-right">
							<button type="button" className="btn btn-primary" onClick={() => { this.props.handleNewAnswerChoiceClick(this.props.ID)}}>New Answer Choice</button>
						</div>
					</div>
				</div>

				{renderedAnswerChoices}
			</div>
		)
	}
}