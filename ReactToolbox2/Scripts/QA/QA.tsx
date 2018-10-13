import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {ToolboxPage} from '../ToolboxPage'
import * as moment from 'moment'
import { Modal } from 'react-bootstrap'
import { Attachment } from './Attachment'
import { ReadExcel } from './ReadExcel'
type QAProps = {
	location: any;
	history: any;
	match: any;
	staticContext?: any;
}


type QAState = {
    QADetailsData: any[];
    isModalOpen: boolean;
    CaseID: any[];
    ModuleID: any[];
    Urlpath: any[];
    CreatedById: any[];
    LoadedDate: any[];
    HttpPostedFileBase: any[]; 
}


 
const QARowDetail = (props) => {
	return (
		<tr key={props.Id}>
			<td style={{ width: '5%' }}>{props.ImportCaseID}</td>
			<td style={{ width: '5%' }}>{props.FindingRecdDate}</td>
			<td style={{ width: '5%' }}>{props.Milestone.Description}</td>
			<td style={{ width: '5%' }}>{props.Lob.Description}</td>
			<td style={{ width: '9%' }}>{props.AssignedQA.FullName}</td>	
			<td style={{ width: '9%' }}>{props.QAStatus.Description}</td>
			<td style={{ width: '2%' }}>{props.SentToFinalReview? "Yes":"No"}</td>
			<td style={{ width: '9%' }}>{props.Review.FullName}</td>
			<td style={{ width: '9%' }}>{props.Status.Description}</td>
			<td style={{ width: '2%' }}>{props.QAReviewComp? "Yes":"No"}</td>
			<td style={{ width: '9%' }}>{props.CaseStatus.FullName}</td>
			<td style={{ width: '5%' }}>{props.ReceivedDate}</td>
			<td style={{ width: '9%' }}>{props.AssignedRa.FullName}</td>
			<td style={{ width: '9%' }}>{props.AssignedQA.FullName}</td>
			<td style={{ width: '5%' }}>{props.Finding.Description}</td>
			<td style={{ width: '5%' }}>{props.FinalDate}</td>
 
		 
		 
		</tr>
	)
}

export class QA extends React.Component<QAProps,QAState> {
	constructor(props) {
		super(props)
		this.state = {
					QADetailsData: [],
                    isModalOpen: false,
                    CaseID: 1,
                    ModuleID: [],
                    Urlpath: [],
                    CreatedById: [],
                    LoadedDate: [],
                    HttpPostedFileBase: [],
                    isModalReadExcelOpen: false, 

		}
    }


    fetchQADetails= () => {
		    fetch('/api/QAs')
			    .then(res => res.json())
			    .then(data => this.setState({ QADetailsData: data }))
        }
    componentDidMount() {
            this.fetchQADetails();
    } 
     
     

     openModal = () => {
         this.setState({
             isModalOpen: true
         })
     }

     openReadExcelModel = () =>{

     	this.setState({

     		isModelReadExcelOpen: true	
     	})

     }
     hideAttachmentModal  = () => {
         this.setState({
             isModalOpen: false
         })
     }

    hideReadExcelModal = () => {

    	this.setState({
    		isModelReadExcelOpen: false
    	})

    }
    render() {
        const renderedRows = (this.state.QADetailsData && this.state.QADetailsData.length > 0) ? this.state.QADetailsData.map(item => <QARowDetail {...item} />) : <div><h1>Loading...</h1> </div>


            return (
                <ToolboxPage title="" pathName={this.props.location.pathname}>
                    <Attachment showResourceModal={this.state.isModalOpen}
                                handleAttachmentModal={this.hideAttachmentModal} CaseID={this.state.CaseID}
                                ModuleID={this.state.ModuleID}
                                Urlpath={this.state.Urlpath}
                                CreatedById={this.state.CreatedById}
                                LoadedDate={this.state.LoadedDate}
                                HttpPostedFileBase={this.state.HttpPostedFileBase} />


                    <ReadExcel showResourceModal={this.state.isModelReadExcelOpen} 
                    		   handleAttachmentModal={this.hideReadExcelModal}/>                                            
                    <button type="button" onClick={this.openModal}> Upload Document</button> 
                    <button type="button" onClick={this.openReadExcelModel}> Import Case</button>    

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>    
                        <QAPanel>
					    {
					    renderedRows
					    }
					    </QAPanel>
           
                    </div>
  
                 

               </ToolboxPage>
            )
            }

}




	 

 // line 76 is looking got the number of rows 



const QAPanel = (props) => {


	return (  <table className="table table-striped table-hover" style={{ width: '99%', padding: '20px' }}>
            <thead>
                <tr>

				


                    <th style={{ width: '5%' }}>Case ID </th>
					<th style={{ width: '5%' }}>Finding Recd Date</th>
					<th style={{ width: '5%' }}>Milestone</th>
					<th style={{ width: '5%' }}>Lob</th>
					<th style={{ width: '10%' }}>Assigned To</th>
					<th style={{ width: '5%' }}>QA Status To</th>
					<th style={{ width: '2%' }}>Final Review Sent</th>
					<th style={{ width: '10%' }}>Reviewed By</th>
					<th style={{ width: '15%' }}>Review Status</th>
					<th style={{ width: '2%' }}>QA Completed</th>
					<th style={{ width: '2%' }}>Case Status</th>
					<th style={{ width: '5%' }}>Received Date</th>
					<th style={{ width: '10%' }}>RA Assigned</th>
					<th style={{ width: '10%' }}>QA Assigned</th>
					<th style={{ width: '3%' }}>Finding</th>
					<th style={{ width: '3%' }}>Final Date</th>
			 


                </tr>
				<tr>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
					<th><select className='form-control-sm'> <option></option>	</select></th>
				 
				</tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
	)
}


	