import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { QA } from './QA'

type AttachmentProps = {
    handleAttachmentModal
    showResourceModal
    CaseID
    ModuleID
    Urlpath
    CreatedById
    LoadedDate
    HttpPostedFileBase
}

type AttchmentState = {


    AttachmentName: {
        FileName: string;

    }


}


export class Attachment extends React.Component<AttachmentProps, AttchmentState> {
    constructor(props) {
        super(props)


        //fetch('/api/FileUpload</', {
        //    method: 'post',
        //    headers: new Headers({
        //        'Content-Type': 'application/json; charset=utf-8'
        //    }),
        //    body: JSON.stringify(requestBody)
        //})
        //    .then(res => res.json())

        this.state = {
            AttachmentName: {
                FileName: null
            }
        }
    }


    handleChange = (e) => {

        const formData = ReactDOM.findDOMNode(this.refs.fileUploader)
        const data = new FormData()
        data.append("file", (formData as any).files[0])
        data.append("CaseID", this.props.CaseID)
        data.append("ModuleID", this.props.ModuleID)
        data.append("Urlpath", this.props.Urlpath)
        data.append("CreatedById", this.props.CreatedById)
        data.append("LoadedDate", this.props.LoadedDate)
        data.append("HttpPostedFileBase", this.props.HttpPostedFileBase)
        fetch('/api/FileUpload/', {
            method: 'POST',
            body: data

        })




        // add second request post  
    }


    render() {
        return (

            <Modal show={this.props.showResourceModal} onHide={this.props.handleAttachmentModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Attachment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>


                        <input type="file" id="file" ref="fileUploader" />
                        <input type="hidden" name="test" value="test"/>

                    </div>
                    <Modal.Footer>

                        <button type="button" className="btn btn-primary" onClick={this.handleChange}>Upload</button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
}