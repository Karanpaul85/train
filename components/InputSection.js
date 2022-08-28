import styles from '../styles/inputSection.module.css';
import Inputs from './Input';
import { useRouter } from 'next/router';
const InputSection = ({
  children,
  chnageStatus,
  errorStatus,
  loader,
  apiUrl,
}) => {
  const router = useRouter();
  let params = {};
  let allError = false;
  const submit = (e) => {
    e.preventDefault();
    let divElem = document.getElementById('inputSection');
    let inputElements = divElem.querySelectorAll(
      'input, select, checkbox, textarea'
    );
    inputElements &&
      inputElements.forEach((item) => {
        let inputId = item.getAttribute('id');
        if (inputId !== 'checkBtn') {
          let inputValue = item.value;
          inputValue === '' ? error(item) : removeErro(item);
        }
      });
    !allError && getData();
  };
  const error = (id) => {
    id.classList.add('error');
    allError = true;
  };
  const removeErro = (id) => {
    let inputId = id.getAttribute('id');
    let inputValue = id.value;
    if (inputId === 'pnrNumber') {
      if (inputValue.length === 10) {
        router.push({
          pathname: 'pnr-enquiry',
          query: { pnrNumber: inputValue },
        });
      } else {
        id.classList.add('error');
        allError = true;
      }
    } else {
      id.classList.remove('error');
      params[inputId] = inputValue;
      allError = false;
    }
  };
  const getData = () => {
    if (loader !== undefined) loader(true);
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: apiUrl,
      params: params,
      headers: {
        'X-RapidAPI-Key': process.env.apiKey,
        'X-RapidAPI-Host': process.env.apiHost,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        if (chnageStatus !== undefined) chnageStatus(response.data);
        if (loader !== undefined) loader(false);
      })
      .catch(function (error) {
        if (errorStatus !== undefined) errorStatus(error.response.data);
        if (loader !== undefined) loader(false);
      });
  };
  return (
    <div className={styles.inputSection} id="inputSection">
      <form onSubmit={submit} autoComplete="off">
        {children}
        <Inputs type="submit" value="check" id="checkBtn" />
      </form>
    </div>
  );
};
export default InputSection;
