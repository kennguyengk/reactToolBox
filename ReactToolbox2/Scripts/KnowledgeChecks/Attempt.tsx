import * as React from 'react'

type Attempt = {
	ID: number;
	EmployeeID: number;
	KnowledgeCheckID: number;
	StartDT: string;
	SubmitDT: string;
}

type Response = {
	ID: number;
	AttemptID: number;
	QuestionID: number;
	AnswerChoiceID: number;
}

const QuestionNavigatorItem = ({ questionIdx, questionId, isAnswered, handleQuestionNav }) => {
	const styles = {
		textAlign: 'center',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: '#bababa',
		paddingTop: 5,
		paddingBottom: 5,
		cursor: 'pointer',
		background: isAnswered ? '#00e600' : ''
	}

	return <td style={styles} onClick={ () => { handleQuestionNav(questionIdx) }}><a href="#" onClick={(e) => { e.preventDefault() }}>{questionIdx + 1}</a></td>
}

const QuestionNavigator = ({ questions, currentQuestionIdx, handleQuestionNav, handleInstructionNav, handleDoneNav, responses }) => {
	const navItemsPerRow = 5
	const tableStyles = {
		background: '',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: '#bababa'
	}
	
	const chunkedQuestions = questions.reduce((acc, item, idx) => {
		const ix = Math.floor(idx / navItemsPerRow)

		if (!acc[ix]) { acc[ix] = [] }
		acc[ix].push(item)

		return acc
	}, [])

	const renderedChunks = chunkedQuestions.map((row, rowIdx) => {
		let blocks = []

		for (let i = 0; i < navItemsPerRow; i++) {
			const question = row[i]
			const questionIdx = i

			if (row[i]) {
				const isQuestionAnswered = !!(responses[question.ID])

				blocks.push(<QuestionNavigatorItem
					questionIdx={(rowIdx * navItemsPerRow) + questionIdx}
					questionId={question.ID}
					isAnswered={isQuestionAnswered}
					handleQuestionNav={handleQuestionNav} />)
			} else {
				blocks.push(<td style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#bababa' }}></td>)
			}
		}

		return <tr>{blocks}</tr>
	})

	return (
		<table className="table" style={tableStyles}>
			<tr>
				<td colSpan={navItemsPerRow} style={{ textAlign: 'center' }}>
					<a href="#" onClick={handleInstructionNav}>Instructions</a>
				</td>
			</tr>

			{renderedChunks}

			<tr>
				<td colSpan={navItemsPerRow} style={{ textAlign: 'center' }}>
					<a href="#" onClick={handleDoneNav}>Done</a>
				</td>
			</tr>
		</table>
	)
}

const AnswerChoice = ({ Desc, Explanation, ID, IsCorrect, IsInactive, KnowledgeCheckID, QuestionID, letter, handleAnswerClick, isSelected }) => {
	const letterStyle = {
		fontWeight: 'bold',
		fontSize: 28
	} as React.CSSProperties

	const style = {
		backgroundColor: (isSelected) ? '#00e600' : ''
	}
	
	return (
		<div className="panel panel-default clickable"  onClick={() => { handleAnswerClick(QuestionID, ID) }}>
			<div className="panel-body" style={style}>
				<div className="col-md-1">
					<span style={letterStyle}>{letter}</span>
				</div>
				<div className="col-md-11">
					{Desc}
				</div>
			</div>
		</div>
	)
}

const Question = (props) => {
	const questionPanelStyle = {
		padding: 10
	}

	return (
		<div>
			<h1>Question #{props.currentQuestionIdx + 1}</h1>

			<hr />

			<div className="panel panel-default" style={questionPanelStyle}>
				{props.Desc}
			</div>

			<hr />

			<div style={{ paddingBottom: 10 }}>
				<b>Select an answer below</b>
			</div>
			
			{props.children}
		</div>
	)
}

const InstructionsPage = () => {
	return (
		<h1>Instructions</h1>
	)
}

const FinishedPage = () => {
	return (
		<h1>Knowledge Check Complete!</h1>
	)
}

const DonePage = ({ handleSubmit }) => {
	return (
		<div>
			<h1>Almost Done!</h1>
			<hr />
			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<div className="panel panel-default">
						<div className="panel-body">
							Click below to submit your answers.

							<button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

interface AttemptPageState {
	questions: any[];
	currentQuestionIdx: number | null;
	responses: Response[];
	showingPage: string;
	attemptId: number;
}

interface AttemptPageProps {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}

export class AttemptPage extends React.Component<AttemptPageProps, AttemptPageState> {
	constructor() {
		super()

		this.state = {
			attemptId: null,
			questions: [],
			currentQuestionIdx: 0,
			responses: [],
			showingPage: 'instructions'
		}
	}

	componentWillMount() {
		const requestBody = {
			KnowledgeCheckID: this.props.match.params.id
		}

		fetch('/api/Attempts/' + this.props.match.params.id, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json; charset=utf-8'
			}),
			body: JSON.stringify(requestBody)
		})
		.then(res => { return res.json() })
		.then(res => {
			this.setState({
				attemptId: res.ID
			})

			return res
		})
		.then(res => {
			fetch('/api/KnowledgeChecks/' + this.props.match.params.id, {
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8'
				})
			})
			.then(res => { return res.json() })
			.then(res => {
				console.log(res)
				this.setState({
					questions: res.Questions
				})
			})
		})
	}

	handleQuestionNav = (idx) => {
		this.setState({
			showingPage: 'question',
			currentQuestionIdx: idx
		})
	}

	handleAnswerClick = (questionId, answerChoiceId) => {
		let newResponses = {...this.state.responses}

		newResponses[questionId] = answerChoiceId
		
		this.setState({
			responses: newResponses
		})

		console.log(this.state)
	}

	handleInstructionNav = () => {
		this.setState({
			showingPage: 'instructions'
		})
	}

	handleDoneNav = () => {
		this.setState({
			showingPage: 'done'
		})
	}

	handleSubmit = () => {
		this.state.questions.forEach(question => {
			const requestBody = {
				AttemptID: this.state.attemptId,
				AnswerChoiceID: this.state.responses[question.ID]
			}

			fetch('/api/Responses/' + this.props.match.params.id, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8'
				}),
				body: JSON.stringify(requestBody)
			})
			.catch(err => {
				console.log(err)
			})
		})

		this.setState({
			showingPage: 'complete'
		})
	}

	isAnswerChoiceSelected = (questionId, answerChoiceId) => {
		return this.state.responses[questionId] === answerChoiceId
	}

	render() {
		if (this.state.showingPage === 'complete') {
			return <FinishedPage />
		}

		let renderedAnswerChoices = <div></div>
		let renderedPage = <div></div>
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

		const questionIdx = this.state.currentQuestionIdx
		const question = this.state.questions[questionIdx]

		if (question && question.AnswerChoices) {
			renderedAnswerChoices = question.AnswerChoices.map((item, answerChoiceIdx) => <AnswerChoice {...item} letter={letters[answerChoiceIdx]} handleAnswerClick={this.handleAnswerClick} isSelected={this.isAnswerChoiceSelected(question.ID, item.ID)} />)
		}

		if (question && this.state.showingPage === 'question') {
			renderedPage = <Question {...this.state.questions[questionIdx]} currentQuestionIdx={this.state.currentQuestionIdx}>
					{renderedAnswerChoices}
				</Question>
		}

		if (this.state.showingPage === 'instructions') {
			renderedPage = <InstructionsPage />
		}

		if (this.state.showingPage === 'done') {
			renderedPage = <DonePage handleSubmit={this.handleSubmit} />
		}

		return (
			<div>
				<div className="col-md-3">
					<QuestionNavigator
						questions={this.state.questions}
						currentQuestionIdx={this.state.currentQuestionIdx}
						handleQuestionNav={this.handleQuestionNav}
						handleInstructionNav={this.handleInstructionNav}
						handleDoneNav={this.handleDoneNav}
						responses={this.state.responses}
						/>
				</div>
				<div className="col-md-9">
					{renderedPage}
				</div>
			</div>
		)
	}
}
