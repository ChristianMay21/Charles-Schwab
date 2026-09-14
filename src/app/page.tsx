import Image from "next/image";
import styles from "./page.module.scss";
import type { CardProps } from "@/components/Card";
import Card from "@/components/Card";

function getStat(pokemon: any, statName: string) {
  const statObject = pokemon.stats.find((stat: any) => stat.stat.name === statName)
  return statObject.base_stat;
}

export default async function Home() {
  // Get the first 20 pokemon
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
  const data = (await response.json()).results


  // The list endpoint only provides the name and url - and there's no batch endpoint. So we call each url independently
  const details = await Promise.all(data.map((pokemon: any) => fetch(pokemon.url)));
  const detailsData = await Promise.all(details.map((pokemon: any) => pokemon.json()))

  // The detail endpoint returns a lot of data - we want to parse it down into just the data we need
  const pokemonData: CardProps[] = detailsData.map(pokemon => ({
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites.front_default,
    hp: getStat(pokemon, 'hp'),
    attack: getStat(pokemon, 'attack'),
    defense: getStat(pokemon, 'defense'),
    speed: getStat(pokemon, 'speed'),
    type: pokemon.types[0].type.name
  }))

  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <p>Hello! Thanks for the fun project - I tried to keep my approach intentionally minimal. I went for a simple stack: Next.js + SCSS. No bells or whistles.</p>
        <p>The data is retrieved from the API and parsed down in <a href="https://github.com/ChristianMay21/Charles-Schwab/blob/master/src/app/page.tsx">page.tsx</a> (a server component) and then rendered into a grid of cards (<a href="https://github.com/ChristianMay21/Charles-Schwab/blob/master/src/components/Card.tsx">Card.tsx</a>).</p>
        <p>For fun, I figured I'd render the data as minimal Pokémon cards in a simple grid layout. I also added some logic to color the card differently, depending on the Pokémon's primary type.</p>
        <p>Hosted with Vercel</p>
      </section>
      <main className={styles.cardGrid}>
        {pokemonData.map(pokemon => <Card key={pokemon.id} {...pokemon} />)}
      </main>
    </div>
  );
}
