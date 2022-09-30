import { useContext, useEffect } from "react";
import { AuthContext } from "src/contexts/auth";
import CardAlbum from "../../shared/card-album";
import SignIn from "../../shared/sign-in/sign-in";
import StyledMainContent from "./main-content.style"

const MainContent = () => {

  const user = useContext(AuthContext);

  return (
      <StyledMainContent>
        {user ? <CardAlbum /> : <SignIn />}
      </StyledMainContent>
  );
};

export default MainContent;