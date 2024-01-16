# HARRY POTTER CAST WEBSITE APP

## Harry Potter API

A Harry Potter Rest API that returns information about spells, characters, books and information itself.This Harry Potter API is hosted at Render <br>

* GitHub repository of json-server: <https://github.com/typicode/json-server> <br>
* Node js webpage: <https://nodejs.org/> <br>
* Render's webpage: <https://render.com/> <br>

For installing the dependencies, execute by terminal with node js installed  ``npm install json-server``

## How to use

Here is a JavaScript example of fetching the entire API. Just change tha value of the const ``baseUrl`` for changing the URL being fetched. ``baseUrl`` value can be changed by an endpoint of this (or another) API for fetching different APIs <br>

```javascript

const baseUrl = "https://hp-api.onrender.com"

fetch(baseUrl)
	.then((res) => res.json())
	.then((data) => {
		// It fetches all data at the API and it returns it at the console
		console.log(data)
	})
	.catch((e) => console.log(e));

```

## Endpoints

* <https://hp-api.onrender.com/api/characters> - Fetches information about the characters from the API
* <https://hp-api.onrender.com/api/characters/students> - Exclusively fetches the Hogwarts students data from the API.
* <https://hp-api.onrender.com/api/characters/staff> - fetches information about Hogwarts staff members.
* <https://hp-api.onrender.com/api/characters/house/gryffindor> - fetches the characters that lived in Gryffindor house.
* <https://hp-api.onrender.com/api/spells> - Fetches the spells from the API<br>

<br>
To access a specific element in the API, simply append the ID number of that element to the end of the route. <br><br>

### Examples

Get a character Id

You can get an specific character using this endpoint:
Example request:

```bash
GET /character/:id

```

Example response:

```

{
    "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
    "name": "Harry Potter",
    "alternate_names": [
      "The Boy Who Lived",
      "The Chosen One",
      "Undesirable No. 1",
      "Potty"
    ],
    "species": "human",
    "gender": "male",
    "house": "Gryffindor",
    "dateOfBirth": "31-07-1980",
    "yearOfBirth": 1980,
    "wizard": true,
    "ancestry": "half-blood",
    "eyeColour": "green",
    "hairColour": "black",
    "wand": {
      "wood": "holly",
      "core": "phoenix tail feather",
      "length": 11
    },
    "patronus": "stag",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Daniel Radcliffe",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/harry.jpg"
  }

```
---

## Home Page

The home page shows all the character with option to filter them based on houses , student or staff. It provides an overview of the project's features and options.

## Character

The character section showcases different characters of harry potter movie. Each character has a unique role and more interesting facts 🤓

## Search

The search functionality allows users to quickly find what they are looking for within the page also with some filters.

## Spells

Spells from harry potter. i.e _Wingardium Leviosa 🪶_

## Usage

To use the project, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/project-name.git`
2. Navigate to the project directory: `cd project-name`
3. Open the necessary files for each functionality.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the [MIT License].
