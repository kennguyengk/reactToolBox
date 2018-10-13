import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { Modal } from 'react-bootstrap'
import * as moment from 'moment'
import { NewResourceModal } from './NewResource'
import { NewVacancyModal } from './NewVacancy'

type DashboardProps = {
    location: any;
    history: any;
    match: any;
    staticContext?: any;
}

type DashboardState = {
    CandidateData: Candidates[];
    VacancyData: Vacancies[];
    isNewVacancyVisible: boolean;
    isNewResourceVisible: boolean;

}

type Candidates = {
    Id: number;
    FullName: string;
    EditDT: string;
}
type Vacancies = {
    Id: number;
    Role: string;
    RoleCount: number;
}

const CandidateRow = (props) => {
    return (
        <tr key={props.Id}>
            <td style={{ width: '45%' }}>{props.FullName}</td>
            <td style={{ width: '45%' }}>{props.TermDate}</td>
        </tr>
    )
}
const VacancyRow = (props) => {
    return (
        <tr key={props.Id}>
            <td style={{ width: '45%' }}>{props.ReferenceLabel}</td>
            <td style={{ width: '45%' }}>{props.Count}</td>
        </tr>
    )
}
const CandidatePanel = (props) => {
    return (
        <table className="table table-striped table-hover" style={{ width: '40%', padding: '20px' }}>
            <thead>
                <tr>
                    <th style={{ width: '15%' }}>Candidates</th>
                    <th>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <div className="pull-right" style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', textAlign: 'right' }}>
                                <a href="#" onClick={props.newResource}>Add New</a>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.candidates.map(item => <CandidateRow {...item} />)}
            </tbody>
        </table>
    )
}
const VacancyPanel = (props) => {
    return (
        <table className="table table-striped table-hover" style={{ width: '40%', padding: '20px' }}>
            <thead>
                <tr>
                    <th style={{ width: '15%' }}>Vacancies</th>
                    <th>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <div className="pull-right" style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', textAlign: 'right' }}>
                                <a href="#" onClick={props.newVacancy}>Add New</a>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.vacancies.map(item => <VacancyRow {...item} />)}
            </tbody>
        </table>
    )
}

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props) {
        super(props)

        this.state = {
            CandidateData: [],
            VacancyData: [],
            isNewResourceVisible: false,
            isNewVacancyVisible: false
        }
    }

    fetchCandidates = () => {
        fetch('/api/Employees')
            .then(res => res.json())
            .then(data => this.setState({ CandidateData: data }))
    }
    fetchVacancies = () => {
        fetch('/api/Vacancies/LabelCount')
            .then(res => res.json())
            .then(data => this.setState({ VacancyData: data }))
    }

    componentDidMount() {
        this.fetchCandidates();
        this.fetchVacancies();
    }

    newResource = (e) => {
        e.preventDefault()
        this.setState({
            isNewResourceVisible: true
        })
    }

    handleHideResourceModal = () => {
        this.setState({
            isNewResourceVisible: false
        })
        this.fetchCandidates()
    }
    newVacancy = (e) => {
        e.preventDefault()
        this.setState({
            isNewVacancyVisible: true
        })
    }

    handleHideVacancyModal = () => {
        this.setState({
            isNewVacancyVisible: false
        })
        this.fetchVacancies()
    }


    render() {
        const renderedCandidates = this.state.CandidateData
        const renderedVacancies = this.state.VacancyData

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CandidatePanel candidates={renderedCandidates} newResource={this.newResource} />
                    <VacancyPanel vacancies={renderedVacancies} newVacancy={this.newVacancy}  />
                </div>
                <NewResourceModal showResourceModal={this.state.isNewResourceVisible} handleHideResourceModal={this.handleHideResourceModal} />
                <NewVacancyModal showVacancyModal={this.state.isNewVacancyVisible} handleHideVacancyModal={this.handleHideVacancyModal} />
            </div>
        )
        }
}