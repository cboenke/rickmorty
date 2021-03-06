// import { CharactersFromApi } from "../components/card/card.stories";

export type APICharacter = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type APICharacters = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: APICharacter[];
};

export type Character = {
  imgSrc: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  origin: {
    name: string;
  };
};

function convertToCharacter(apiCharacter: APICharacter): Character {
  return {
    imgSrc: apiCharacter.image,
    name: apiCharacter.name,
    status: apiCharacter.status,
    species: apiCharacter.species,
    origin: { name: apiCharacter.origin.name },
  };
}

export async function getCharacter(id: number) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if (!response.ok) {
    const result = await response.json();
    return {
      imgSrc: "",
      name: result.error,
      status: "Dead",
      species: "Human",
      origin: {
        name: "Internet",
      },
    };
  }
  const result = (await response.json()) as APICharacter;
  const character = convertToCharacter(result);
  return character;
}

export async function getCharacters(name?: string) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${name ? `?name=${name}` : ""}`
  );
  if (!response.ok) {
    return [];
  }
  const result = (await response.json()) as APICharacters;
  const characters = result.results.map((apiCharacter) =>
    convertToCharacter(apiCharacter)
  );
  return characters;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
