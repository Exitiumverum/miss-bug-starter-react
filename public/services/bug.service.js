import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bugs'
const BASE_URL = '/api/bug/'

_createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
    // editDesc,
    getDefaultFilter
}

function query(filterBy) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                bugs = bugs.filter(bug => regExp.test(bug.title))
            }

            if (filterBy.minSeverity) {
                bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
            }

            return bugs
        })
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err: ', err)

        })
}


function remove(bugId) {
    return exios.delete(BASE_URL + bugId).then(res => res.data)
}

function save(bug) {
    console.log(BASE_URL + bug._id, bug);
    
    if (bug._id) {
        return axios.put(BASE_URL + bug._id , bug).then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug).then(res => res.data)
    }
}

function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (bugs && bugs.length > 0) return

    bugs = [
        {
            title: "Infinite Lop Detected",
            severity: 4,
            _id: "1NF1N1T3",
            description: 'hello'
        },
        {
            title: "Keyboard Not Found",
            severity: 3,
            _id: "K3YB0RD",
            description: ''
        },
        {
            title: "404 Coffee Not Found",
            severity: 2,
            _id: "C0FF33",
            description: ''
        },
        {
            title: "Unexpected Response",
            severity: 1,
            _id: "G0053",
            description: ''
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, bugs)
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}