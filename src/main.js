import './styles/main.scss';

const main = () => {
  const el = document.createElement('div');
  el.innerHTML = 'Hello world!';
  document.querySelector('.page-wrapper').appendChild(el);
};

main();
