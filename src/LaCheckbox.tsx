
export default function LaCheckbox({ ...props }) {
  return <input onChange={event => {
    const selected = document.querySelectorAll('input[type="checkbox"]:checked')
    console.log(selected)
  }} type='checkbox' data-dice={props.d} data-index={props.index} />
}