import express from 'express'
import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))
app.listen(3030, () => console.log('Server ready at port 3030'))

app.get('/api/bug', (req, res) => {

    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.console.error('cannot get bug');
            res.send('cannot get bugs')
        })
})

app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        description: req.query.description,
        severity: req.query.severity,
        createdAt: req.query.createdAt
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