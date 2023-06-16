export default function Pressed ({ ...props }) {
    return <>
        <button onClick={ () => {

            const data = {
                'game_id': Math.random(),
                'dices': props.dices,
                'category': props.category,
            };

            console.log(data)
            
            fetch('http://localhost:8894/move', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then(resp => resp.json())
                .then(json => console.log(json))
                .catch(err => console.error(err))

        }}>send to server</button>
    </>
}