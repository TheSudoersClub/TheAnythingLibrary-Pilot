import ProfileIcon from '../../assets/icons/profile-icon.png'
import "./Header.css"
import { auth } from '../../config/firebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'

const Header = (props) => {
  const [user] = useAuthState(auth);

  const handleOnChange = (e) => {
    props.setSearchText(e.target.value.toLowerCase());
  }

  return (
    <div className="header">
      <div className="header__searchbar">
        <input type="text" placeholder="Search" onChange={handleOnChange} />
      </div>
      <div className="header__prifile">
        <div className="header__prifile__wrapper">
          <img src={user?.photoURL || ProfileIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header;