import * as React from 'react'

type QuestionProps = {
	ID: number;
	KnowledgeCheckID: number;
	Difficulty: string;
	Category: string;
	SubCategory: string;
	Desc: string;
	IsActive: boolean;
	isEditingQuestion: boolean;
	idx: number;
	handleEditQuestionClick: Function;
	handleDeleteQuestionClick: Function;
}

export class Question extends React.Component<QuestionProps, {}> {
	renderedQuestionDesc = () => {
		if (this.props.isEditingQuestion) {
			return <textarea className="form-control" rows={3} value={this.props.Desc}></textarea>
		} else {
			let questionDesc = <span></span>
			
			if (this.props.Desc) {
				questionDesc = <span>{this.props.Desc}</span>
			} else {
				questionDesc = <i><small>No question description</small></i>
			}
			return (
				<div className="panel panel-default" style={{ padding: '10px' }}>
					{questionDesc}
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<div className="row" style={{ paddingBottom: '10px' }}>
					<div className="col-md-4">
						<span style={{ fontWeight: 'bold', fontSize: 20 }}>Question #{this.props.idx + 1}</span>
					</div>
					<div className="col-md-8">
						<div className="pull-right">
							<button type="button" className="btn btn-danger" onClick={() => this.props.handleDeleteQuestionClick(this.props.ID)}>Delete</button>
							<span style={{ paddingLeft: 5, paddingRight: 5}}>|</span>
							<button type="button" className="btn btn-default" onClick={() => this.props.handleEditQuestionClick(this.props.ID)}>Edit</button>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{this.renderedQuestionDesc()}
					</div>
				</div>
				<div style={{ paddingTop: 15 }}>
					{this.props.children}
				</div>

				<hr />
			</div>
		)
	}
}