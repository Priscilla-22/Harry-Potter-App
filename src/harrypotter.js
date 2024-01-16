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
    castName.textContent = `${cast.name}`;

    const altName = document.createElement('p');
    altName.classList.add('alt-name');
    altName.innerHTML = `<strong>AKA:</strong> ${cast.alternate_names}`;

    const actor = document.createElement('p');
    actor.classList.add('actor');
    actor.innerHTML = `<strong>Actor:</strong> ${cast.actor}`;

    const personality = document.createElement('p');
    personality.classList.add('personality');
    personality.innerHTML = `<strong>Personality: </strong>${cast.species} <span>|</span> ${cast.gender} <hr>`;

    castContainer.appendChild(castDetailsContainer);
    castDetailsContainer.append(
      actorImg,
      castName,
      altName,
      actor,
      personality
    );

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

  moreDetailsContent.innerHTML = `
    <p><strong> Wand:</strong> ${cast.wand.wood} <span>|</span> ${
    cast.wand.core
  }<span>|</span> ${cast.wand.length}</p>   
    <p><strong>House:</strong> ${cast.house}</p>
    <p><strong>Date of Birth:</strong> ${cast.dateOfBirth}</p>
    <p><strong>Year of Birth:</strong> ${cast.yearOfBirth}</p>
    <p><strong>Wizard:</strong> ${cast.wizard ? 'Yes' : 'No'}</p>
    <p><strong>Ancestry:</strong> ${cast.ancestry}</p>
    <p><strong>Eye color:</strong> ${cast.eyeColour}</p>
    <p><strong>Hair Color:</strong> ${cast.hairColour}</p>
    <p><strong>Patronus:</strong> ${cast.patronus}</p>
    <p><strong>Hogwart's Student:</strong> ${cast.hogwartsStudent}</p>
    <p><strong>Hogwart's Staff:</strong> ${cast.hogwartsStaff}</p>
    <p><strong>Alive:</strong> ${cast.alive}</p>
  `;

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
