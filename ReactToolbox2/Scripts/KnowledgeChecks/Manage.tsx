import * as React from 'react'
import { ManageSummary } from './ManageSummary'
import { ManageQuestionsContainer } from './ManageQuestionsContainer'
import { Question } from './Question'
import { AnswerChoice } from './AnswerChoice'
import { EditQuestion } from './EditQuestion'


type ManageProps = {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}

type ManageState = {
	knowledgeCheck: any;
	renderedQuestions: any[];
	editingQuestion: number | null;
}

export class Manage extends React.Component<ManageProps, ManageState> {
	constructor(props) {
		super(props)

		this.state = {
			knowledgeCheck: {},
			renderedQuestions: [],
			editingQuestion: null
		}
	}

	componentDidMount() {
		this.fetchKnowledgeCheckDetails()
	}

	fetchKnowledgeCheckDetails = async () => {
		var knowledgeCheck = await fetch('/api/KnowledgeChecks/' + this.props.match.params.id)
		var jsonRes = await knowledgeCheck.json()
		
		this.setState({ knowledgeCheck: jsonRes })
	}

	isEditingQuestion = (question) => {
		if (this.state.editingQuestion !== null) {
			const editingQuestionId = this.state.knowledgeCheck.Questions[this.state.editingQuestion].ID
			
			return editingQuestionId === question['ID']
		}

		return false
	}

	handleInput = (e) => {
		var knowledgeCheck = this.state.knowledgeCheck
		knowledgeCheck[e.target.name] = e.target.value

		this.setState({ knowledgeCheck: knowledgeCheck })
	}

	handleQuestionInput = (e) => {
		let newState = this.state.knowledgeCheck
		const idx = this.state.editingQuestion
		
		newState.Questions[idx][e.target.name] = e.target.value

		this.setState({
			knowledgeCheck: newState
		})
	}

	handleAnswerChoiceInput = (e, idx) => {
		let newState = this.state.knowledgeCheck
		const questionIdx = this.state.editingQuestion

		if (e.target.type === 'checkbox') {
			newState.Questions[questionIdx].AnswerChoices[idx][e.target.name] = e.target.checked
		} else {
			newState.Questions[questionIdx].AnswerChoices[idx][e.target.name] = e.target.value
		}

		this.setState({
			knowledgeCheck: newState
		})
	}

	handleSave = () => {
		fetch('/api/KnowledgeChecks/' + this.state.knowledgeCheck.ID, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json; charset=utf-8'
			}),
			body: JSON.stringify(this.state.knowledgeCheck)
		})
		.catch(err => { console.log(err) })
	}

	handleEditQuestionClick = (questionId) => {
		const question = this.state.knowledgeCheck.Questions.filter(item => item.ID === questionId)[0]
		const questionIdx = this.state.knowledgeCheck.Questions.indexOf(question)
		
		this.setState({
			editingQuestion: questionIdx
		})
	}

	handleNewQuestion = (e) => {
		const requestBody = {
			KnowledgeCheckID: this.state.knowledgeCheck.ID,
			Difficulty: '',
			Category: '',
			SubCategory: '',
			Desc: '',
			IsActive: true
		}

		fetch('/api/Questions', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(requestBody)
		})
		.then(res => { return res.json() })
		.then(res => {
			let newState = this.state.knowledgeCheck
			newState.Questions.push(res)
			const newQuestionIdx = newState.Questions.indexOf(res)
			
			console.log(newState)
			console.log(newQuestionIdx)

			this.setState({
				knowledgeCheck: newState,
				editingQuestion: newQuestionIdx
			})
		})
	}

	handleSaveAnswerChoice = (answerChoice) => {
		console.log(answerChoice)

		fetch('/api/AnswerChoices/' + answerChoice.ID, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({...answerChoice})
		})
		.catch(err => console.log(err))
	}

	handleSaveQuestion = (questionProps) => {
		const idx = this.state.editingQuestion
		const question = this.state.knowledgeCheck.Questions[idx]

		fetch('/api/Questions/' + question.ID, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({...question})
		})
		.then(res => console.log(res))
		.catch(err => console.log(err))

		question.AnswerChoices.forEach(answerChoice => this.handleSaveAnswerChoice(answerChoice))

		this.setState({
			editingQuestion: null
		})
	}

	handleNewAnswerChoiceClick = (questionId) => {
		const question = this.state.knowledgeCheck.Questions.filter(item => item.ID === questionId)[0]
		
		const requestBody = {
			KnowledgeCheckID: question['KnowledgeCheckID'],
			QuestionID: questionId,
			Desc: '',
			Explanation: '',
			IsCorrect: false,
			IsInactive: false
		}

		fetch('/api/AnswerChoices', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(requestBody)
		})
		.then(res => { return res.json() })
		.then(res => {
			let newState = this.state.knowledgeCheck
			const question = this.state.knowledgeCheck.Questions.filter(item => item.ID === questionId)[0]
			const questionIdx = this.state.knowledgeCheck.Questions.indexOf(question)
			const questionState = newState.Questions[questionIdx]

			console.log(questionState)

			if (Object.keys(questionState).indexOf('AnswerChoices') === -1 || !questionState['AnswerChoices']) {
				questionState['AnswerChoices'] = []
			}
			questionState.AnswerChoices.push(res)

			this.setState({
				knowledgeCheck: newState
			})
		})
	}

	handleDeleteQuestionClick = (questionId) => {
		fetch('/api/Questions/' + questionId, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
		.then(() => {
			this.fetchKnowledgeCheckDetails()
		})
	}
	
	renderedQuestions = () => {
		if (this.state.knowledgeCheck.Questions && this.state.knowledgeCheck.Questions.length > 0) {
			return this.state.knowledgeCheck.Questions.map((question, idx) => {
				let renderedAnswerChoices = <div></div>

				if (this.isEditingQuestion(question)) {
					renderedAnswerChoices = question.AnswerChoices.map(answerChoice => { return <AnswerChoice {...answerChoice} /> })
				}

				return (
					<Question
						{...question}
						idx={idx}
						isEditingQuestion={this.isEditingQuestion(question)}
						handleEditQuestionClick={this.handleEditQuestionClick}
						handleDeleteQuestionClick={this.handleDeleteQuestionClick}
						>
					</Question>
				)
			})
		}

		return <div></div>
	}

	getEditingQuestion = () => {
		if (this.state.editingQuestion !== null) {
			const questionIdx = this.state.editingQuestion
			const question = this.state.knowledgeCheck.Questions[questionIdx]

			return question
		}

		return null
	}

	handleBackNav = () => {
		this.setState({
			editingQuestion: null
		})
	}

	render() {
		let questionContainer = <div></div>

		if (this.state.editingQuestion !== null) {
			questionContainer = <ManageQuestionsContainer>
				<div className="row">
					<EditQuestion
					{...this.getEditingQuestion()}
					idx={this.state.editingQuestion}
					handleBackNav={this.handleBackNav}
					handleNewAnswerChoiceClick={this.handleNewAnswerChoiceClick}
					handleQuestionInput={this.handleQuestionInput}
					handleSaveQuestion={this.handleSaveQuestion}
					handleAnswerChoiceInput={this.handleAnswerChoiceInput}
					fetchKnowledgeCheckDetails={this.fetchKnowledgeCheckDetails}
					/>
				</div>
			</ManageQuestionsContainer>
		} else {
			questionContainer = <ManageQuestionsContainer>
				<div className="row">
					<div className="col-md-12" style={{ paddingBottom: 15 }}>
						<div className="pull-right">
							<button className="btn btn-primary" onClick={this.handleNewQuestion}>Add Question</button>
						</div>
					</div>
				</div>
				{this.renderedQuestions()}
			</ManageQuestionsContainer>
		}

		return (
			<div>
				<h1>{this.state.knowledgeCheck.Name}</h1>

				<hr />

				<ManageSummary {...this.state.knowledgeCheck} handleInput={this.handleInput} handleSave={this.handleSave} />
				{questionContainer}
			</div>
		)
	}
}