import Image from "next/image";
import styles from "./Card.module.scss";

export type CardProps = {
  name: string
  id: number
  image: string
  hp: number
  attack: number
  defense: number
  speed: number
  type: string
}
export default async function Card(props: CardProps) {
  return (<article className={styles.Card} data-type={props.type} >
    <div className={styles.titleBar}>
      <h2 className={styles.name}>{props.name}</h2>
      <p className={styles.id}>{`#${props.id}`}</p>
    </div>
    <div className={styles.imageArea}>
      <Image className={styles.image} src={props.image} alt=""  width={200} height={300} loading="eager" />
    </div>
    <section className={styles.stats}>
      <div className={styles.stat}><span className={styles.statLabel}>HP:</span>{props.hp}</div>
      <div className={styles.stat}><span className={styles.statLabel}>Attack:</span>{props.attack}</div>
      <div className={styles.stat}><span className={styles.statLabel}>Defense:</span>{props.defense}</div>
      <div className={styles.stat}><span className={styles.statLabel}>Speed:</span>{props.speed}</div>
    </section>
  </article>)
}
