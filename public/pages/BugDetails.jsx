const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.local.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService.getById(bugId)
            .then(bug => setBug(bug))
            .catch(err => showErrorMsg(`Cannot load bug`, err))
    }, [])

    return <div className="bug-details main-content">
        <h2>Bug Details</h2>
        {!bug && <p className="loading">Loading....</p>}
        {
            bug && 
            <div>
<<<<<<< HEAD:public/pages/BugDetails.jsx
                <h4>{bug.title}</h4>
                <h5>Severity: <span>{bug.severity}</span></h5>
                <p>{bug.description}</p>
=======
                <h3>{bug.title}</h3>
                <p className="severity">Severity: <span>{bug.severity}</span></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam esse facilis vitae numquam architecto mollitia fugiat culpa minima aperiam amet sapiente, voluptate sit, in nemo ea. Expedita iure tempore explicabo?</p>
>>>>>>> d4460168a84ead7d76bfda4454486e1e4b6fad33:pages/BugDetails.jsx
            </div>
        }
        <button><Link to="/bug">Back to List</Link></button>
    </div>

}