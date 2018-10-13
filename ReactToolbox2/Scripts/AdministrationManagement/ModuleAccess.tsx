import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { ModuleAccessFields } from './ModuleAccessFields'

type ModuleAccessProps = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
    
}

type ModuleAccessState = {
    
}

export const ModuleAccess = (props) => {
    const modules = [
        { ID: 1, ModuleDesc: "Case Tracker" },
        { ID: 2, ModuleDesc: "Issue Management" },
        { ID: 3, ModuleDesc: "Knowledge Check" },
        { ID: 4, ModuleDesc: "Performance Management" },
        { ID: 5, ModuleDesc: "Attribute Matrix" },
        { ID: 6, ModuleDesc: "Quality Assurance" },
        { ID: 7, ModuleDesc: "ActiveException Reporting" },
        { ID: 8, ModuleDesc: "Document Repository" }
    ]

    const renderedModules = modules.map(module => <ModuleAccessFields {...module} />)
    return (
        <div className="row">
            {renderedModules}
        </div>
    )
}
