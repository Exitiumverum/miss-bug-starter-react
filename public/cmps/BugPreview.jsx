export function BugPreview({bug}) {

    console.log(bug)
    return <article className="bug-preview">
        <p className="title">{bug.title}</p>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Description: {bug.description}</p>
    </article>
}