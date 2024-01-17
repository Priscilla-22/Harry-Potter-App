document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/data';

  const castContainer = document.querySelector('.cast-container');

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
  
  //search functionality
  document
    .querySelector('#searchInput')
    .addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const listItems = document.querySelectorAll('.castNames');

      listItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();

        if (itemText.startsWith(searchTerm)) {
          item.display = 'listItems';
        } else {
          item.style.display = 'none';
        }
      });
    });

  fetch(baseUrl)
    .then((resp) => resp.json())
    .then((data) => {
      const castNameList = document.querySelector('#castName-list');

      data.forEach((cast) => {
        const itemList = document.createElement('li');
        itemList.classList.add('castNames');
        itemList.textContent = cast.name;
        castNameList.appendChild(itemList);
      });
    });

  function renderCastDetails(cast) {
    castContainer.innerHTML = '';

    const castDetailsContainer = document.createElement('div');
    castDetailsContainer.id = 'casts-details';

    const actorImg = document.createElement('img');
    actorImg.classList.add('actor-img');
    actorImg.src = cast.image;
    actorImg.alt = cast.title;

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
      altName.innerHTML = `<strong>AKA:</strong> ${cast.alternate_names}`;
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
    castDetailsContainer.append(
      actorImg,
      castName,
      altName,
      actor,
      personality
    );
    // element for the house logo
    const houseLogo = document.createElement('img');
    houseLogo.classList.add('house-logo');

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

    houseLogo.src =
      houseLogoPaths[cast.house] ||
      'https://ik.imagekit.io/96nylqpko/hogwarslegacy-houses-poll.jpg?updatedAt=1705432789063';

    castDetailsContainer.appendChild(houseLogo);

    castDetailsContainer.appendChild(houseLogo);

    const moreDetailsContainer = createMoreDetailsContainer(cast);
    moreDetailsContainer.classList.add('more-info');

    castContainer.appendChild(moreDetailsContainer);
  }

  function createMoreDetailsContainer(cast) {
    const moreDetailsContainer = document.createElement('div');
    moreDetailsContainer.id = 'more-details-container';

    const moreDetailsBtn = createMoreDetailsButton();
    const moreDetailsContent = createMoreDetailsContent(cast);

    moreDetailsContainer.append(moreDetailsBtn, moreDetailsContent);

    return moreDetailsContainer;
  }

  function createMoreDetailsContainer(cast) {
    const moreDetailsContainer = document.createElement('details');
    moreDetailsContainer.id = 'more-details-container';

    const moreDetailsBtn = document.createElement('summary');
    moreDetailsBtn.innerText = 'More Details ';
    moreDetailsBtn.classList.add('toggle-details-btn');

    moreDetailsContainer.appendChild(moreDetailsBtn);
    moreDetailsContainer.appendChild(createMoreDetailsContent(cast));

    return moreDetailsContainer;
  }

  function createMoreDetailsContent(cast) {
    const moreDetailsContent = document.createElement('div');
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

    // Use ternary operator to conditionally add table rows
    cast.wand && cast.wand.wood && addTableRow('Wand Wood', cast.wand.wood);
    cast.wand && cast.wand.core && addTableRow('Wand Core', cast.wand.core);
    cast.wand &&
      cast.wand.length &&
      addTableRow('Wand Length', cast.wand.length);
    cast.house && addTableRow('House', cast.house);
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
  }

  function goForward() {
    currentCastId += 1;
    fetchCastDetails(currentCastId);
  }

  const goBackBtn = document.createElement('button');
  goBackBtn.innerText = 'Go Back';
  goBackBtn.addEventListener('click', goBack);

  const goForwardBtn = document.createElement('button');
  goForwardBtn.innerText = 'Go Forward';
  goForwardBtn.addEventListener('click', goForward);

  document.body.appendChild(goBackBtn);
  document.body.appendChild(goForwardBtn);

  fetchCastDetails(currentCastId);
});
