import Link from "next/link";
import Image from "next/image";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme, Theme } from "../Theme/Theme";
import { useDarkMode } from "../hooks/useDarkMode";
import { MouseEvent } from "react";

const Container = styled.div`
  max-width: 950px;
  display: grid;
  grid-template-areas:
    "profile profile"
    "main  main"
    "footer footer";

  @media only screen and (min-width: 768px) {
    /* For everything bigger than 768px */

    grid-template-areas:
      "profile main"
      "profile  footer";
  }
`;

const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;
  background-color:${({ theme }: { theme: Theme }) => theme.body};
  color:${({ theme }: { theme: Theme }) => theme.text};
  display:block;
  height: 100%;
  margin:0 auto;
  padding: 0;
}

body{
  min-height:100vh;
  padding: 1rem;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:0;
  font-family:Verdana;
}
`;

const MainContainer = styled.div`
  border: 2px solid red;
  grid-area: main;
`;

const Header = styled.header`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  grid-area: profile;
`;
const Footer = styled.footer`
  border: 2px solid yellow;
  grid-area: footer;
`;

interface Props {
  onClick?: MouseEvent;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <Container>
          <Header>
            <Link href="/">
              <a>
                <Image
                  src="https://github.com/renzo4web.png?size=200"
                  alt="avatar"
                  height={100}
                  width={100}
                />
              </a>
            </Link>

            <button onClick={themeToggler}>Toggle Theme {theme}</button>
          </Header>

          <MainContainer>{children}</MainContainer>

          <Footer>
            <p>Renzo</p>
          </Footer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
