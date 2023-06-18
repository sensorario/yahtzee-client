export default function TiraDadi({ ...props }) {
    return <>
        <button onClick={() => props.setNumeroLanci(props.pressed + 1)}>roll dices</button>
    </>
}