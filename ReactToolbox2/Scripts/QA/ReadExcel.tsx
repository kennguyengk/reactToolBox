import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { QA } from './QA'








export class ReadExcel extends React.Component {

	constructor(props){
		super(props)
		this.state = {

			file:null

		}
		this.onChange = this.onChange.bind(this)

	}

	onChange(e) {
    	this.setState({file:e.target.files[0]})
  	}
	handleChange=  (e) => {

		const formData = new FormData();
		formData.append('file',this.state.file)
		fetch('/api/ReadExcelFile/', {
            method: 'POST',
            body: formData
            
        })
	}

	render() {


 		
 		return (

 			<Modal show={this.props.showResourceModal} onHide={this.props.handleAttachmentModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
				<Modal.Header closeButton>
					<Modal.Title>Upload xlsx file</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                	<div>
					  	
                		<input type="file" id="file" onChange={this.onChange} ref="fileUploader" accept=".xlsx, .xls" /> 
					</div>
					<Modal.Footer>
						 
                        <button type="button" className="btn btn-primary" onClick={this.handleChange}>Upload</button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>

 		)

	}
}