import './_MainInfo.css'
const MainInfo = () => {
  return (
    <section className="main-info__container">
      <h1 className="main-info__title">Improve how you coding skills</h1>

      <button
        className="main-info__button"
        onClick={() => {
          window.scrollTo({
            top: 360,
            behavior: 'smooth',
          })
        }}
      >
        Get Started
      </button>
    </section>
  )
}

export default MainInfo
