export default function SendToServer ({ ...props }) {
    return <>
        <button onClick={ () => {

            const data = {
                'game_id': props.game,
                'dices': props.dices,
                'category': props.category,
            };
            
            fetch('http://localhost:8894/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then(resp => resp.json())
                .then(json => props.sendResult(json))
                .then(() => props.resetGame())
                .catch(err => console.error(err))

        }}>send to server</button>
    </>
}