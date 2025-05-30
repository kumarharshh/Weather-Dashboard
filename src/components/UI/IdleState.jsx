import styles from './IdleState.module.css';

const IdleState = () => {
  return (
    <div className={styles.idleState}>
      <div className={styles.idleIcon} aria-hidden="true">🌤️</div>
      <h2 className={styles.idleTitle}>Check the Weather</h2>
      <p className={styles.idleDescription}>
        Search for a city or use your location to see the current weather conditions.
      </p>
    </div>
  );
};

export default IdleState;