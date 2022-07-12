import styled from 'styled-components';

export const DropdownContainer = styled.div`
    position: absolute;
    top: 170%;
    left: 40%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* gap: 3rem; */
    align-items: center;
    /* padding: 2rem 1.5rem; */
    letter-spacing: 0.1rem;
    background-color: white;
    box-shadow: 0 0 1rem rgb(0, 0, 0, 0.1);
    font-size: 1.2rem;
    border-radius: 10px;
    animation: 0.3s ease alternate dropdown;
    span:first-child {
        /* padding-top: 1rem; */
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    span:last-child {
        /* padding-bottom: 1rem; */
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    span {
        text-align: center;
        /* margin-bottom: 0.6rem; */
        padding-inline: 1.5rem;
        padding-block: 1rem;
        width: 100%;
        &:hover {
            background-color: rgb(0, 0, 0, 0.1);
        }
    }

    @keyframes dropdown {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }

        100% {
            opacity: 1;
            transform: translateY(0%);
        }
    }

    @keyframes dropUp {
        100% {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
`;

export const NavCartContainer = styled.div`
    font-size: 1.4em;
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    /* margin-left: auto; */
    margin-top: 1rem;
    width: 15rem;
    justify-content: flex-end;

    position: relative;
    div {
        cursor: pointer;
        display: flex;
        gap: 1rem;
        align-items: center;
    }
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
    /* ${(props) =>
        props.mobileNavActive &&
        `
        opacity: 1;
        left:-10%;
        top:0%;
        padding:5rem;
        li:first-child{
            margin-top: 5rem;
          

        }
        li{
            margin-left:6rem;
            height:4rem !important;
        }


        position: absolute;
        background-color:black;
        transform: translateX(0%);
        height: 100vh !important;
        width: 50vw;
        flex-direction: column;
        gap:5rem;
    `} */

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
