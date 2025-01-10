export function LabelPicker({ ...props }) {
    let { task, columnType } = props
    
    if (columnType === 'item') return
    
    let columnData
    switch (columnType) {
        case 'person':            
            columnData = <img src={task.byMember?.imgUrl} alt="User Pic" />
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
