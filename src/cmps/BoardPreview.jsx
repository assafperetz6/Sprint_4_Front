

export function BoardPreview({ board }){

    return (
        <section className="boardPreview">
            <h1>ID: {board._id}</h1>
            <h1>TITLE: {board.title}</h1>
            <h1>Creatd by:</h1>
            <pre>{JSON.stringify(board.createdBy, null, 2)}</pre>
        </section>
    )
}