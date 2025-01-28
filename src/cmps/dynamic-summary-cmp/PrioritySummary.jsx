import { makeId } from "../../services/util.service"

export function PrioritySummary({ summary, priorityLabels, padding }){

    const width = 140
    let total = 0

    const { prioritySummary } = summary
    const summaryForRender = []

    for (const field in prioritySummary) {
        total += prioritySummary[field]
        priorityLabels.find(label => {
            if (label.id === field) {
                summaryForRender.push({ id: label.id, color: label.color, size: prioritySummary[field]})
            }
        })
    }

    summaryForRender.sort((a, b) => a.id.localeCompare(b.id))
    const unit = (width - (padding * 2) )/ total

    return (
        <section style={{ width: width + 'px'}} className="summary">
            {summaryForRender.map(summary => (
                <div 
                    className="summary-colored-block" 
                    key={makeId()} 
                    style={{ backgroundColor: summary.color, width: (unit * summary.size) + 'px'}}>
                </div>
            ))}
        </section>
    )
}
