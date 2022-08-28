const SelectInputs = (props) => {
  return (
    <select
      id={props.id}
      name={props.name}
      disabled={props.isdisabled ? 'disabled' : ''}
    >
      {props && props.empty && <option value="">{props.empty}</option>}
      {props &&
        props.options &&
        props.options.length &&
        props.options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          );
        })}
    </select>
  );
};
export default SelectInputs;
