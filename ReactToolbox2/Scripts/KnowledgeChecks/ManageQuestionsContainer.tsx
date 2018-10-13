import * as React from 'react'

type ManageQuestionsContainerProps = {
	
}
export class ManageQuestionsContainer extends React.Component<ManageQuestionsContainerProps, {}> {
	render() {
		return (
			<div className="col-md-7 col-md-offset-1">
				{this.props.children}
			</div>
		)
	}
}