import { svgs } from '../services/svg.service'

export function TopBar() {
	return (
		<div className="top-bar flex ">
			<header className="top-bar-header flex align-center justify-between full">
				<div className="switcher-logo flex align-center">
					<div className="switcher">{svgs.dottedMenuBtn}</div>
					<div className="logo">{svgs.mgmtLogo}</div>
					<div className="product">
						<span>monday</span>
						<span>work managment</span>
					</div>
				</div>
				<div></div>
				<nav className="top-bar-nav flex">
					<div className="notification">{svgs.bell}</div>
					<div className="invite">{svgs.addMember}</div>
					<div className="search">{svgs.search}</div>
					<div className="avatar-with-company-logo">
						<div className="account-logo-wrapper flex">
							<img style={{ width: '24px', height: '24px', borderRadius: '4px' }} src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="logo" />
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
