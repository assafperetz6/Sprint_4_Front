import { makeId } from "../../services/util.service"

export function StatusSummary({ summary, statusLabels, padding }){

    const width = 140
    let total = 0

    const { statusSummary } = summary
    const summaryForRender = []

    for (const field in statusSummary) {
        total += statusSummary[field]
        statusLabels.find(label => {
            if (label.id === field) {
                summaryForRender.push({ id: label.id, color: label.color, size: statusSummary[field]})
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
