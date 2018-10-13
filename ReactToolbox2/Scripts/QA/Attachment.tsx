import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { QA } from './QA'




const ModuleItem = (props) => {

    return <option value={props.id}>{props.name}</option>
}



    

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


        {/*fetch('/api/FileUpload</', {
           method: 'post',
           headers: new Headers({
               'Content-Type': 'application/json; charset=utf-8'
           }),
           body: JSON.stringify(requestBody)
        })
           .then(res => res.json())*/}

        this.state = {

          
            moduleId: 1, 
            AttachmentName: {
                FileName: null
            },
            Modules: [],
            
             
        }

        this.handleSelectBox = this.handleSelectBox.bind(this)
       
    }

   

    componentDidMount(){

        fetch('/api/Module')
            .then(res => res.json())
           
            .then(data => this.setState({ Modules: data }))
            
          
    }
    handleSelectBox(e){

        this.setState({ moduleId:e.target.value })
    }

    handleChange=  (e) => {

        const formData = ReactDOM.findDOMNode(this.refs.fileUploader)
        var today = new Date();
        var fileUploadName = (formData as any).files[0].name;
        var extension = fileUploadName.substr(fileUploadName.lastIndexOf('.') + 1).toLowerCase();
        const Attachment = {
            CaseId:"1",
               
            FileName: 123456,
            UrlPath:"/uploads/"+fileUploadName,
            Type:extension,
            Size:(formData as any).files[0].size,
            CreatedById:5,
            LoadedDate:today.toDateString(),
            ModuleId:this.state.moduleId

        }
        
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
            
        }).then(

      
        fetch('/api/Attachments/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(Attachment)
        }))
        this.props.handleAttachmentModal()
        
           // add second request post  
    }


	render() {

        const moduleItems = (this.state.Modules && this.state.Modules.length > 0) ? this.state.Modules.map(
                                                                                (item,i) =>
                                                                                    <ModuleItem key={i}
                                                                                             id={item.ID}
                                                                                             name={item.ModuleDesc}/>
                                                                                                    
                                                                             ): "loading"
                                                                                               

		return (


			<Modal show={this.props.showResourceModal} onHide={this.props.handleAttachmentModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
				<Modal.Header closeButton>
					<Modal.Title>Add Attachment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <div>
					  
                <select ref="moduleID" value={this.state.moduleID} onChange={this.handleSelectBox}>
                    {moduleItems}
                </select>    
                <input type="file" id="file" ref="fileUploader" /> 
				
					
					</div>
					<Modal.Footer>
						 
                        <button type="button" className="btn btn-primary" onClick={this.handleChange}>Upload</button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		)
	}
}