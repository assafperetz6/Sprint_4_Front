export function LabelPicker({ ...props }) {
    let { task, columnType } = props
    
    if (columnType === 'item') return

    console.log(task)
    
    let columnData
    switch (columnType) {
        case 'person':            
            columnData = <li><img src={task.byMember?.imgUrl} alt="User Pic" /></li>
            break;
        case 'status':
            columnData = task.status
            break;
        case 'priority':
            columnData = task.priority
            break;
        case 'date':
            columnData = task.dueDate
            break;
        default:
            break;
    }
    return <li>{columnData}</li>
}