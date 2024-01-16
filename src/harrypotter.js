document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/data';

    const castDetailsContainer = document.getElementsByClassName(
        'cast-details-container');

    function renderDetails() {
         fetch('baseUrl')
           .then((resp) => resp.json())
           .then((data) => {
            //  data.
           })
    }

});