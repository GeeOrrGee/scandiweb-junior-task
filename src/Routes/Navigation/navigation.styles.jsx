import styled from 'styled-components';

export const NavCartContainer = styled.div`
    display: flex;
    gap: 3rem;
    align-items: center;
    /* margin-left: auto; */
    margin-top: 1rem;
    width: 15rem;
    justify-content: flex-end;
`;

export const NavLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const NavListContainer = styled.ul`
    display: flex;
    list-style: none;
    gap: 3rem;

    font-size: 1.4rem;

    height: 100%;
    li {
        height: 100%;

        color: black;
        display: flex;
        align-items: center;
        a {
            text-decoration: none;
            padding-top: 1rem;
            transition: all 0.2s;
            display: block;
            height: 100%;
            text-align: center;
            text-transform: capitalize;
            border-bottom: 2px solid transparent;
            &:visited {
                color: black;
            }
            &:hover {
                color: rgb(94, 206, 123, 0.8);
                border-bottom: 2px solid rgb(94, 206, 123, 0.8);
            }
            &.nav-active {
                border-bottom: 2px solid rgb(94, 206, 123);
                color: rgb(94, 206, 123);
            }
        }
    }
`;

export const NavigationContainer = styled.nav`
    display: flex;
    width: 85vw;
    position: sticky;
    top: 0;
    /* padding-block: 2rem; */
    padding-top: 1rem;
    padding-inline: 2rem;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 0 0 1rem rgb(0, 0, 0, 0.02);

    justify-content: space-between;
    align-items: flex-start;
    margin: 2rem auto;
    z-index: 9999;
    height: 6rem;
`;
