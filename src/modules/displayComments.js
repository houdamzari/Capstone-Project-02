import { BASE_URL } from './utils.js';
import commentCounter from './commentCounter.js';
import addComment from './addComment.js';
import displayDetails from './displayDetails.js';

let itemID = 0;

const textUsername = document.getElementById('username-text');
const textComment = document.getElementById('comment-text');
const commentPopup = document.querySelector('.comment-popup');
const popup = document.querySelector('.popup');

const getComments = async (i) => {
  const response = await fetch(`${BASE_URL}/comments?item_id=item${i}`);
  const data = await response.json();
  return data;
};
const displayComments = async () => {
  const popupSection = document.querySelector('.popup');
  if (!popupSection.getElementsByTagName('h2').length) {
    popupSection.innerHTML += '<i class="fa-solid fa-xmark fa-xl"></i>';
    const h2 = document.createElement('h2');
    h2.id = 'comments';
    const detailSec = document.querySelector('.details');
    detailSec.after(h2);
  }
  const popupSection = document.querySelector('.popup');
  if (!popupSection.getElementsByTagName('h2').length) {
    popupSection.innerHTML += '<i class="fa-solid fa-xmark fa-xl"></i>';
    const h2 = document.createElement('h2');
    h2.id = 'comments';
    const detailSec = document.querySelector('.details');
    detailSec.after(h2);
  }

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      // detailTitle.innerHTML = '';
      // detailYear.innerHTML = '';
      // detailDirector.innerHTML = '';
      // detailStory.innerHTML = '';
      // movieImg.src = '';
      popup.style.display = 'none';
    }
    const textUsername = document.getElementById('username-text');
    const textComment = document.getElementById('comment-text');
    if (event.target.classList.value === 'fa-regular fa-comment fa-2xl') {
      const dataComments = await getComments(event.target.id);
      itemID = event.target.id;
      let commentText = '';
      const commentPopup = document.querySelector('.comment-popup');
      commentPopup.innerText = '';
      textUsername.value = '';
      textComment.value = '';
      popup.style.display = 'block';
      for (let index = 0; index < dataComments.length; index += 1) {
        commentText = `${dataComments[index].creation_date} ${dataComments[index].username}: ${dataComments[index].comment}`;
        commentPopup.innerHTML += `<p>${commentText}</p>`;
        textUsername.value = '';
        textComment.value = '';
        popup.style.display = 'block';
      }
      commentCounter();
    }
    if (
      event.target.classList.value === 'cmt-btn'
      && textUsername.value
      && textComment.value
    ) {
      await addComment(itemID, textUsername.value, textComment.value);
    }
    if (itemID) await displayDetails(itemID);
  });
};
export default displayComments;