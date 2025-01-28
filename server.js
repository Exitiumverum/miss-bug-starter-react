import express from 'express'
import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.use(express.static('public'))
// app.use(cookieParser())
app.use(express.json())

// app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {

    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.console.error('cannot get bug');
            res.send('cannot get bugs')
        })
})

app.put('/api/bug/:id', (req, res) => {
    console.log('heloo put');
    
    const bugToSave = {
        _id: req.body._id, // Changed from req.query to req.body
        title: req.body.title, // Changed from req.query to req.body
        description: req.body.description, // Changed from req.query to req.body
        severity: req.body.severity, // Changed from req.query to req.body
        createdAt: req.body.createdAt
    }
    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
        .catch(err => {
            loggerService.error('Cannot save bug', err)
            res.status(500).send('Cannot save bug')
        })
})

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            loggerService.console.error('cannot get bug');
            res.status(500).send('cannot get bugs')
        })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then(() => res.send(bugId + 'removed succesfully'))
        .catch(err => {
            loggerService.error('Cannot find bug: ', err)
            res.status(500).send('Cannot remove bug')
        })
})

const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)