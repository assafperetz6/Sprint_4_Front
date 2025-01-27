import { useSelector } from "react-redux";
import { StatusSummary } from "./dynamic-summary-cmp/StatusSummary";
import { PrioritySummary } from "./dynamic-summary-cmp/PrioritySummary";
import { DateSummary } from "./dynamic-summary-cmp/DateSummary";
import { MemberSummary } from "./dynamic-summary-cmp/MemberSummary";
import { TimelineSummary } from "./dynamic-summary-cmp/TimelineSummary";

export function GroupSummary({ group, cmpsOrder, collapsedPreview = false }){

    const statusLabels = useSelector(storeState => storeState.boardModule.board.statusLabels)
    const priorityLabels = useSelector(storeState => storeState.boardModule.board.priorityLabels)
    
    const accumulator = {}
    cmpsOrder.forEach(cmp => {
        const newStr = cmp.toLowerCase().replace('picker', 'Summary')
        if (newStr.startsWith('status') || newStr.startsWith('priority')) {
            accumulator[newStr] = {}
        } else accumulator[newStr] = []
    })

        const { tasks } = group
        const groupSummary = tasks.reduce(addToAcc, accumulator)
        const groupSummaryArray = summaryIntoArray(groupSummary) 


    function addToAcc(acc, task) {
        const { dateSummary, statusSummary, prioritySummary, timelineSummary, memberSummary } = acc
        const { dueDate, status, priority, timeline, members, } = task

        for (const field in task) {
            switch (field) {
                case 'status':
                    if (!statusSummary[status]) statusSummary[status] = 1
                    else statusSummary[status] ++
                    break;
                case 'priority':
                    if (!prioritySummary[priority]) prioritySummary[priority] = 1
                    else prioritySummary[priority] ++
                    break;
                case 'timeline':
                    if (timeline) timelineSummary.push(timeline)
                    break;
                case 'dueDate':
                    if (dueDate) dateSummary.push(dueDate)
                    break;
                case 'members':
                    if (members.length) memberSummary.push(structuredClone(members))
                    break;
            
                default:
                    break;
            }
        }

        return acc
    }

    function summaryIntoArray(summary) {
        let { dateSummary, timelineSummary, memberSummary} = summary

        const memberIds = []
        const filteredMemberSummary = memberSummary.flat().filter(summary => {
            if ( !memberIds.includes(summary._id)) {
                memberIds.push(summary._id)
                return true
            } else return false
        })
        summary.memberSummary = filteredMemberSummary

        if (dateSummary.length >= 2) {
            dateSummary.sort((a, b) => a - b)
            summary.dateSummary = {
                start: dateSummary[0],
                end: dateSummary.at(-1),
            }
        } else if (dateSummary.length === 1) {
            summary.dateSummary = {
                start: dateSummary[0],
                end: dateSummary[0],
            }
        } else summary.dateSummary = {}

        const times = timelineSummary.flatMap(time => Object.values(time))
        if (times.length >= 2) {
            times.sort((a, b) => a - b)
            summary.timelineSummary = {
                start: times[0],
                end: times.at(-1),
            }
        } else if (times.length === 1) {
            summary.timelineSummary = {
                start: times[0],
                end: times[0],
            }
        } else summary.timelineSummary = {}

        const res = []
        for (const field in summary){
            res.push({ [field]: summary[field]})
        }    

        return res
    }

	return (
		<section className="group-summary full">
			{!collapsedPreview && <section style={{ width: 400 + 'px', height: '42px' }} className="white-space"></section>}
			<section className="group-summary-container">
				{groupSummaryArray.map((summary, idx) => (
					<DynamicSummaryCmp group={group} padding={8} summary={summary} statusLabels={statusLabels} priorityLabels={priorityLabels} key={idx} />
				))}
			</section>
		</section>
	)
}

function DynamicSummaryCmp( props ){
    const field  = Object.keys(props.summary)[0]

    switch (field) {
        case 'dateSummary':
            
            return <DateSummary {...props} />
        case 'statusSummary':
            
            return <StatusSummary {...props} />
        case 'prioritySummary':
            
            return <PrioritySummary {...props} />
        case 'timelineSummary':
                
            return <TimelineSummary {...props} />
        case 'memberSummary':
            
            return <MemberSummary {...props} />
    
        default:
            break;
    }
}