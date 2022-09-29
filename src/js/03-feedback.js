import throttle from 'lodash.throttle';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const key = 'feedback-form-state';

const formEl = document.querySelector('form.feedback-form');

function updateFormData() {
  formEl.elements.email.value = load(key).email || '';
  formEl.elements.message.value = load(key).message || '';
}

function saveTextFormData(event) {
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  save('feedback-form-state', { email: email, message: message });
}

function submitForm(event) {
  event.preventDefault();
  const email = formEl.elements.email.value;
  const message = formEl.elements.message.value;
  console.log({ email: email, message: message });
  formEl.reset();
  localStorage.clear();
}

updateFormData();

formEl.addEventListener('input', throttle(saveTextFormData, 1000));
formEl.addEventListener('submit', submitForm);
