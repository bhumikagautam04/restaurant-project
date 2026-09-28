const styles = {
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'Kanit',
    fontSize: '24px',
    fontWeight: 550,
    marginBottom: '20px',
  },
  icon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default function Heading({ title }) {
  return (
    <div style={styles.heading}>
      <img src="./chef.png" alt="Chef" style={styles.icon} />
      <span>{title}</span>
    </div>
  );
}

