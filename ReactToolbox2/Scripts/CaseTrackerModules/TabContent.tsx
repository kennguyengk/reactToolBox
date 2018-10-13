import * as React from "react"
import {uniqBy} from "lodash"

const FieldContent = ({fieldData}) => {
		
	let renderedSourceDocOption = <option></option>
	if (fieldData.SourceDocIndex.length > 0) {
		
		renderedSourceDocOption = fieldData.SourceDocIndex.map(item => { return <option id={item.SourceDocument.ID}>{item.SourceDocument.Name}</option>})	
	}
	
	return (
		<div>
			<tr style={{ paddingTop: 10 }}>
				<td>{fieldData.ID}</td>
				<td>{fieldData.Name}</td>
				<td>
					{fieldData.InitialValue}
				</td>
				<td>
					<input className="form-control-sm">{fieldData.UpdatedValue}</input>
				</td>
				<td>
					<select className="form-control-sm">
						<option></option>
						{renderedSourceDocOption}
					</select>

				</td>
				<td>
					<input className="form-control-sm">{fieldData.SourceDocumentDate}</input>
				</td>
				<td>
					<button type="button" className="btn btn-default">Missing Info</button>
				</td>
			</tr>			
		</div>
	)

}
	
const RequirementContent = ({requirementName, matrix, requirementId}) => {
	const fields = matrix.filter(item => item.FieldDescription.RequirementDescription.Name === requirementName)
	
	return (
		<div>
			<h3 className="clickable sidebar-label" data-toggle="collapse" data-target={"#requirement-" + requirementId}>{requirementName}</h3>
			<div id={"requirement-"+requirementId} className="collapse">
				<table>
					<thead>
						<tr style={{paddingBottom: 20}}>
							<th className="col-md-1">Ref. ID</th>
							<th className="col-md-2">Field Name</th>
							<th className="col-md-2">Last Value</th>
							<th className="col-md-2">New Value</th>
							<th className="col-md-2">Source Document</th>
							<th className="col-md-2">Source Date</th>
							<th className="col-md-1"></th>
						</tr>
						<tr>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								<select className='form-control-sm'>
									<option></option>
								</select>
							</th>
							<th>
								
							</th>
							
						</tr>
						
					</thead>
					
					<tbody>
						{fields.map(item =>
							<FieldContent fieldData = {item.FieldDescription}/>

						)}
					</tbody>
					
				</table>
			</div>
		</div>

	)	
}

export const TabContent = ({caseDetails, categoryId}) => {
	console.log(caseDetails)
	if (Object.keys(caseDetails).length === 0) {
		return (<div></div>)

	} 
	
	const matrix = caseDetails.ClassificationDescription.ClassificationFieldMatrix
	const allrequirements: any[] = matrix
		.filter(item => item.FieldDescription.RequirementDescription.CategoryDescription.ID === categoryId)
		.map(matrixItem => {
			return {
				id: matrixItem.FieldDescription.RequirementDescription.ID, 
				name: matrixItem.FieldDescription.RequirementDescription.Name
			}
		})
	const requirements = uniqBy(allrequirements, (e) => {return e.id})
	return (
		<div>
			{requirements.map(item =>
				<RequirementContent requirementName={item.name} matrix={matrix} requirementId={item.id} />
			)}
		</div>

	)	
}	