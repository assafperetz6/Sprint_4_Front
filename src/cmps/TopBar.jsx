import { useSelector } from 'react-redux'
import { svgs } from '../services/svg.service'
import { Link } from 'react-router-dom'

export function TopBar() {
	const user = useSelector(storeState => storeState.userModule.user)

	return (
		<div className="top-bar flex ">
			<header className="top-bar-header flex align-center justify-between full">
				<div className="switcher-logo flex align-center">
					<button className="switcher flex align-center">{svgs.dottedMenuBtn}</button>

					<Link to="/" className="logo-product flex clean-link">
						<div className="logo flex align-center">{svgs.mgmtLogo}</div>
						<h1 className="product flex align-center">
							<span className="mundane">mundane</span>
						</h1>
					</Link>
				</div>
				<div></div>
				<nav className="top-bar-nav flex align-center">
					<button className="nav-btn flex justify-center align-center">{svgs.bell}</button>
					<button className="nav-btn flex justify-center align-center">{svgs.addMember}</button>
					<button className="nav-btn flex justify-center align-center">{svgs.search}</button>

					<button className="avatar-with-company-logo flex justify-center align-center">
						<Link className="flex" to={`/user/${user?._id}`}>
							<div className="account-logo-wrapper flex justify-center align-center">
								<img style={{ width: '24px', height: '24px', borderRadius: '4px' }} src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="logo" />
							</div>
							<img className="avatar-image" src={user?.imgUrl} />
						</Link>
					</button>
				</nav>
			</header>
		</div>
	)
}
