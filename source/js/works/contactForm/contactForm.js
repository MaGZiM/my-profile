import prepareSend from '../../prepareSend';

const form = document.querySelector('#mail');

if(form) {
  form.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
  e.preventDefault();

  let data = {
    name: form.name.value,
    email: form.email.value,
    message: form.text.value
  };

  prepareSend('/works', form, data);
}

