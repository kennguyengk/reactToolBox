import * as React from 'react'
import { Modal } from 'react-bootstrap'

type SplashPageProps = {
	handleHideModal: Function;
	showModal: boolean;
}

export class SplashPage extends React.Component<SplashPageProps, {}> {
	constructor() {
		super()
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.props.handleHideModal}>
				<Modal.Body>
					<div style={{ height: '100%', width: '100%' }}>
						<img src={require('../Content/logo.png')} />

						<hr />
                    
						<div style={{ textAlign: 'center'}}>
							<h1>Data Remdiation Services Toolbox</h1>
						</div>
						<div style={{ paddingLeft: 10}}>
							<small>Version: 0.0.2</small>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}