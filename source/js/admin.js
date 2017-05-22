import prepareSend from './prepareSend';

const formBlog = document.querySelector('#data-blog__form');

function prepareSendPost(e) {
  e.preventDefault();
  let data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  prepareSend('/admin/addpost', formBlog, data);
}