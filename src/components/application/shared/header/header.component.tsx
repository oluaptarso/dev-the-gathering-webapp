import Link from 'next/link';
import { useContext } from 'react';
import { ApplicationContext } from 'src/contexts/application';
import { AuthContext } from 'src/contexts/auth';
import StyledHeader, { StyledDropdownMenu } from './header.style';

const Header = () => {
  const user = useContext(AuthContext);
  const application = useContext(ApplicationContext);

  //only load if has an application.
  if (!application) return <></>;
  
  return (
    <StyledHeader className="p-3">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Link href="/">
            <a className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">DEV: The Gathering</a>
          </Link>
          {user && (
            <div className="dropdown text-end">
              <a href="#" className="d-block text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {user.displayName.length > 21 ? `${user.displayName.substring(0, 18)}...` : user.displayName}
              </a>
              <StyledDropdownMenu className="dropdown-menu dropdown-menu-start text-small">
                <li>
                  <a className="dropdown-item" href="#" onClick={application.authenticationService.logout}>
                    Sign out
                  </a>
                </li>
              </StyledDropdownMenu>
            </div>
          )}
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
