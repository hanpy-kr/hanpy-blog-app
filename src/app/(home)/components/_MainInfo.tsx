import './_MainInfo.css'
const MainInfo = () => {
  return (
    <section className="main-info__container">
      <h1 className="main-info__title">Improve how you coding skiils</h1>

      <button
        style={{
          width: '170px',
          height: '40px',
          margin: '40px',
          borderRadius: '10px',
          fontWeight: 600,
        }}
      >
        Get Start
      </button>
    </section>
  )
}

export default MainInfo
