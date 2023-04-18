import './Profile.css'

function Profile() {
  return (
    <div className="profile__container">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__description">
            <h2>🔓 TEST OPEN</h2>
          </div>
          <div className="profile__title">
            Hi 👋, I&apos;m Hanpy from South Korea 🇰🇷
          </div>
          <div className="profile__description">
            Welcome to my personal blog(v0.1) 📖, where I write about all things
            frontend, backend and infra.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
