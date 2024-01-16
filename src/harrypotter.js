document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/data';

  const castContainer = document.querySelector('.cast-container');

  let currentCastId = 1;

  function fetchCastDetails(castId) {
    fetch(`${baseUrl}/${castId}`)
      .then((resp) => resp.json())
      .then((castData) => {
        renderCastDetails(castData);
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
    personality.innerHTML = `<strong>Personality: </strong>${cast.species} <span>|</span> ${cast.gender}`;

    castContainer.appendChild(castDetailsContainer);
    castDetailsContainer.append(
      actorImg,
      castName,
      altName,
      actor,
      personality
    );
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

  // Fetch and display details for the initial cast ID
  fetchCastDetails(currentCastId);
});
