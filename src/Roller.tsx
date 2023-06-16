export default function Roller({ ...props }) {
    return <>
        <button onClick={() => props.ciao(props.pressed + 1)}>roll dices</button>
    </>
}