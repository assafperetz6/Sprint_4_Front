

export function MemberSummary({ summary }){

    const { memberSummary } = summary
    const width = 97

    let avatars

    switch (true) {
        case memberSummary.length === 0:
            avatars = null
            break;
        case memberSummary.length === 1:
            avatars = <img className="member-summary-image" src={memberSummary[0].imgUrl} alt="" />
            break;
        case memberSummary.length === 2:
            avatars = 
                    <>
                        <img className="member-summary-image" src={memberSummary[0].imgUrl} alt="" />
                        <img className="member-summary-image second" src={memberSummary[1].imgUrl} alt="" />
                    </>
            break;
        case memberSummary.length > 2:
            avatars = 
                <>
                    <img className="member-summary-image" src={memberSummary[0].imgUrl} alt="" />
                    <h1 className="extra-members second">+2</h1>
                </>
            break;
    }

    return (
        <section style={{ width: width + 'px'}} className="summary member-summary">
                {avatars}
        </section>
    )
}
