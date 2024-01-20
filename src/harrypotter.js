document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/data';
  const castNameListContainer = document.querySelector(
    '.castNameList-container'
  );
  const castContainer = document.querySelector('.cast-container');

  const extraCastDetails = document.querySelector(
    '.extraCastDetails-Container'
  );

  const houseLogoPaths = {
    Gryffindor:
      'https://ik.imagekit.io/96nylqpko/Gryffindor_ClearBG.jpg?updatedAt=1705429922438',
    Hufflepuff:
      'https://ik.imagekit.io/96nylqpko/Hufflepuff_ClearBG.jpg?updatedAt=1705430668687',
    Ravenclaw:
      'https://ik.imagekit.io/96nylqpko/RavenclawCrest%20.jpg?updatedAt=1705430510801',
    Slytherin:
      'https://ik.imagekit.io/96nylqpko/Slytherin_ClearBG.jpg?updatedAt=1705429979031',
  };

  const defaultHouseLogoPath =
    'https://ik.imagekit.io/96nylqpko/hogwarslegacy-houses-poll.jpg?updatedAt=1705432789063';

  let currentCastId = 1;

  function fetchCastDetails(castId) {
    fetch(`${baseUrl}/${castId}`)
      .then((resp) => resp.json())
      .then((castData) => {
        renderCastDetails(castData);
      })
      .catch((err) => {
        console.error('Error fetching cast details:', err);
      });
  }

  /**** search functionality ****/

  //search popup table
  function toggleOverlay() {
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
  }
  document
    .querySelector('#searchInput')
    .addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const listItems = document.querySelectorAll('.castNames');
      const tableRows = document.querySelectorAll('#castName-table tbody tr');

      listItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();

        if (itemText.startsWith(searchTerm)) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });

      tableRows.forEach((row) => {
        row.style.display = 'none';
      });

      if (searchTerm === '') {
        listItems.forEach((item) => {
          item.classList.remove('show');
        });
      } else {
        fetch(baseUrl)
          .then((resp) => resp.json())
          .then((data) => {
            const popupContainer = document.createElement('div');
            popupContainer.classList.add('popup-container');

            const popupTable = document.createElement('table');
            popupTable.classList.add('popup-table');
            popupTable.addEventListener('click', (event) => {
              if (event.target.tagName.toLowerCase() === 'td') {
                const castName = event.target.textContent.trim();
                const cast = data.find(
                  (c) => c.name.toLowerCase() === castName.toLowerCase()
                );
                if (cast) {
                  currentCastId = cast.id;
                  clearCastList();
                  renderCastDetails(cast);
                  document.querySelector('#searchInput').value = '';
                  document.querySelector('.popup-container').remove();
                }
              }
            });

            const containerDiv = document.createElement('div');
            containerDiv.classList.add('table-container');

            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
            <th>Name</th>
            <th>Actor</th>
            <th>Y.O.B</th>
            <th>House</th>
          `;
            const tbody = document.createElement('tbody');
            tbody.appendChild(headerRow);
            popupTable.appendChild(tbody);

            data.forEach((cast) => {
              if (cast.name.toLowerCase().startsWith(searchTerm)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${cast.name}</td>
                <td>${cast.actor || ''}</td>
                <td>${cast.yearOfBirth || ''}</td>
              `;
                const houseLogoCell = document.createElement('td');
                const houseLogo = document.createElement('img');
                houseLogo.classList.add('popup-house-logo');

                houseLogo.src =
                  houseLogoPaths[cast.house] || defaultHouseLogoPath;
                houseLogoCell.appendChild(houseLogo);
                row.appendChild(houseLogoCell);
                tbody.appendChild(row);
              }
            });
            containerDiv.appendChild(headerRow);
            containerDiv.appendChild(tbody);
            popupTable.appendChild(containerDiv);
            popupContainer.appendChild(popupTable);

            document.body.appendChild(popupContainer);
            toggleOverlay();

            popupContainer.style.display = 'block';
            e.target.addEventListener('input', () => {
              popupContainer.remove();
            });
          });
      }
    });

  document.addEventListener('click', (event) => {
    const popupContainer = document.querySelector('.popup-container');
    const searchInput = document.querySelector('#searchInput');

    if (
      popupContainer &&
      !popupContainer.contains(event.target) &&
      event.target !== searchInput
    ) {
      popupContainer.remove();
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  });
  function clearCastList() {
    const listItems = document.querySelectorAll('.castNames');

    listItems.forEach((item) => {
      item.classList.remove('show');
    });
  }

  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((data) => {
      const castNameList = document.querySelector('#castName-list');

      data.forEach((cast) => {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('cast-row');

        const itemCell = document.createElement('td');
        itemCell.classList.add('castNames');
        itemCell.textContent = cast.name;
        itemCell.addEventListener('click', () => {
          currentCastId = cast.id;
          clearCastList();
          renderCastDetails(cast);
          document.querySelector('#searchInput').value = '';
        });

        const actorCell = document.createElement('td');
        actorCell.textContent = cast.actor || '';

        const yearOfBirthCell = document.createElement('td');
        yearOfBirthCell.textContent = cast.yearOfBirth || '';

        const houseLogoCell = document.createElement('td');
        const houseLogo = document.createElement('img');
        houseLogo.classList.add('small-house-logo');
        houseLogo.src = houseLogoPaths[cast.house] || 'default-house-logo.jpg';
        houseLogoCell.appendChild(houseLogo);

        tableRow.appendChild(itemCell);
        tableRow.appendChild(actorCell);
        tableRow.appendChild(yearOfBirthCell);
        tableRow.appendChild(houseLogoCell);

        castNameList.appendChild(tableRow);
      });
    });

  /*** Renders cast details ***/
  function renderCastDetails(cast) {
    clearExtraCastDetails();

    castContainer.innerHTML = '';

    const castDetailsContainer = document.createElement('div');
    castDetailsContainer.id = 'casts-details';

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    const actorImg = document.createElement('img');
    actorImg.classList.add('actor-img');
    actorImg.src = cast.image;
    actorImg.alt = cast.title;

    const briefInfoContainer = document.createElement('div');
    briefInfoContainer.classList.add('briefInfoContainer');

    const castName = document.createElement('h3');
    castName.classList.add('cast-name');
    castName.textContent = cast.name || '';

    const altName = document.createElement('p');
    altName.classList.add('alt-name');
    if (
      cast.alternate_names !== undefined &&
      cast.alternate_names !== null &&
      cast.alternate_names.length > 0
    ) {
      altName.innerHTML = `<strong>AKA 🤣:</strong> ${cast.alternate_names}`;
    }

    const actor = document.createElement('p');
    actor.classList.add('actor');
    actor.innerHTML = `<strong>Actor:</strong> ${cast.actor || ''}`;

    const personality = document.createElement('p');
    personality.classList.add('personality');
    personality.innerHTML = `<strong>Personality: </strong>${
      cast.species || ''
    } <span>|</span> ${cast.gender || ''} <hr>`;

    castContainer.appendChild(castDetailsContainer);
    castDetailsContainer.append(imgContainer);
    castDetailsContainer.append(briefInfoContainer);
    imgContainer.appendChild(actorImg);
    briefInfoContainer.appendChild(castName);
    briefInfoContainer.appendChild(altName);
    briefInfoContainer.appendChild(actor);
    briefInfoContainer.appendChild(personality);

    const houseLogoContainer = document.createElement('div');
    houseLogoContainer.classList.add('houseLogoContainer');

    const houseLogo = document.createElement('img');
    houseLogo.classList.add('house-logo');
    houseLogo.src = houseLogoPaths[cast.house] || defaultHouseLogoPath;
    castDetailsContainer.appendChild(houseLogoContainer);
    houseLogoContainer.appendChild(houseLogo);

    castContainer.appendChild(castDetailsContainer);

    const moreDetailsContainer = createMoreDetailsContainer(cast);
    moreDetailsContainer.classList.add('more-info');

    /*** Comment Form ***/
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    const commentsTitle = document.createElement('h4');
    commentsTitle.textContent = 'Comments:';

    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments-list');
    commentsContainer.appendChild(commentsList);
    commentsList.addEventListener('click', handleCommentItemClick);

    commentsContainer.appendChild(commentsTitle);
    commentsContainer.appendChild(commentsList);

    extraCastDetails.appendChild(commentsContainer);

    const formContainer = document.createElement('div');
    formContainer.classList.add('comment-form-container');
    formContainer.innerHTML = ` <p>WHAT DO YOU LIKE ABOUT THE CHARACTER? 😊</p>`;

    const form = document.createElement('form');
    form.classList.add('comment-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('.comment-input');
      const commentText = input.value;
      if (commentText.trim()) {
        /**** POST request to the server to create a new comment ****/
        fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            castId: currentCastId,
            text: commentText,
          }),
        })
          .then((response) => response.json())
          .then((newComment) => {
            const commentsContainer = document.querySelector(
              '.comments-container'
            );
            const commentsList =
              commentsContainer.querySelector('.comments-list');
            const newCommentElement = document.createElement('li');
            newCommentElement.classList.add('comment-item');
            newCommentElement.dataset.id = newComment.id;
            newCommentElement.innerHTML = `
               <span>${newComment.text}</span><button class="delete-comment-btn" data-id="${newComment.id}">Delete</button>
`;
            commentsList.appendChild(newCommentElement);
            input.value = '';
          })
          .catch((error) => {
            console.error('Error creating comment:', error);
          });
      }
    });

    const input = document.createElement('input');
    input.classList.add('comment-input');

    input.placeholder = 'Add a comment...';

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('comment-submit-btn');
    submitBtn.textContent = 'Submit';

    formContainer.appendChild(form);
    form.appendChild(input);
    form.appendChild(submitBtn);
    extraCastDetails.appendChild(formContainer);

    extraCastDetails.appendChild(commentsContainer);
    const popupContainer = document.querySelector('.popup-container');
    if (popupContainer) {
      popupContainer.remove();
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }

  /*** handle comment delete button clicks ***/
  function handleCommentItemClick(event) {
    const commentItem = event.target.closest('.comment-item');
    const commentId = commentItem.dataset.id;

    if (event.target.classList.contains('delete-comment-btn')) {
      deleteComment(commentId);
    } else {
      showCommentDetails(commentId);
    }
  }

  /*** function to delete a comment ***/
  function deleteComment(commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const commentsList = document.querySelector('.comments-list');
        const commentItem = document.querySelector(`[data-id="${commentId}"]`);
        commentItem.remove();
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  }

  /*** display the  more details of a specific cast ***/
  function createMoreDetailsContainer(cast) {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const moreDetailsContainer = document.createElement('details');
    moreDetailsContainer.id = 'more-details-container';

    const moreDetailsBtn = document.createElement('summary');
    moreDetailsBtn.innerText = 'More Details ';
    moreDetailsBtn.classList.add('toggle-details-btn');
    moreDetailsBtn.addEventListener('click', function () {
      const moreDetailsContent = document.querySelector(
        '.more-details-content'
      );
      moreDetailsContent.toggleAttribute('open');
    });
    moreDetailsContainer.appendChild(moreDetailsBtn);
    moreDetailsContainer.appendChild(createMoreDetailsContent(cast));

    detailsContainer.appendChild(moreDetailsContainer);
    extraCastDetails.appendChild(detailsContainer);
    return detailsContainer;
  }

  function createMoreDetailsContent(cast) {
    const moreDetailsContent = document.createElement('div');
    moreDetailsContent.classList.add('more-details-content');

    const table = document.createElement('table');
    table.classList.add('details-table');

    const addTableRow = (label, value) => {
      const row = document.createElement('tr');

      const labelCell = document.createElement('td');
      labelCell.classList.add('label-cell');
      labelCell.textContent = label;

      const valueCell = document.createElement('td');
      valueCell.classList.add('value-cell');
      valueCell.textContent = value;

      row.appendChild(labelCell);
      row.appendChild(valueCell);

      table.appendChild(row);
    };

    cast.wand && cast.wand.wood && addTableRow('Wand Wood 🪄', cast.wand.wood);
    cast.wand && cast.wand.core && addTableRow('Wand Core 🪄', cast.wand.core);
    cast.wand &&
      cast.wand.length &&
      addTableRow('Wand Length', cast.wand.length);
    cast.house && addTableRow('House 🏚️', cast.house);
    cast.dateOfBirth && addTableRow('Date of Birth', cast.dateOfBirth);
    cast.yearOfBirth && addTableRow('Year of Birth', cast.yearOfBirth);
    cast.wizard && addTableRow('Wizard', cast.wizard ? 'Yes' : 'No');
    cast.ancestry && addTableRow('Ancestry', cast.ancestry);
    cast.eyeColour && addTableRow('Eye color', cast.eyeColour);
    cast.hairColour && addTableRow('Hair Color', cast.hairColour);
    cast.patronus && addTableRow('Patronus', cast.patronus);
    cast.hogwartsStudent &&
      addTableRow("Hogwart's Student", cast.hogwartsStudent);
    cast.hogwartsStaff && addTableRow("Hogwart's Staff", cast.hogwartsStaff);
    cast.alive && addTableRow('Alive', cast.alive);

    moreDetailsContent.appendChild(table);
    return moreDetailsContent;
  }

  function goBack() {
    currentCastId = Math.max(1, currentCastId - 1);
    fetchCastDetails(currentCastId);
    clearExtraCastDetails();
    clearExtraCastDetails();

    clearExtraCastDetails();
  }

  function goForward() {
    currentCastId += 1;
    fetchCastDetails(currentCastId);
    clearExtraCastDetails();
    clearExtraCastDetails();

    clearExtraCastDetails();
  }

  function clearExtraCastDetails() {
    while (extraCastDetails.firstChild) {
      extraCastDetails.removeChild(extraCastDetails.firstChild);
    }
  }
  const goBackBtn = document.createElement('button');
  goBackBtn.classList.add('btn-go-back');
  goBackBtn.innerText = 'Go Back';
  goBackBtn.addEventListener('click', goBack);

  const goForwardBtn = document.createElement('button');
  goForwardBtn.classList.add('btn-go-forward');
  goForwardBtn.innerText = 'Go Forward';
  goForwardBtn.addEventListener('click', goForward);

  const buttonsContainer = document.querySelector('.buttons-container');
  buttonsContainer.appendChild(goBackBtn);
  buttonsContainer.appendChild(goForwardBtn);

  fetchCastDetails(currentCastId);
});
