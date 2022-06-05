import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Twitter } from "../assets/twitter.svg";
import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as Theme } from "../assets/theme.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Header() {

    function toggle_darkmode() {
        var element = document.body;
        if(element.classList.contains("light-mode")) {
            cookies.set('theme', 'dark-mode', { path: '/' });
        } else {
            cookies.set('theme', 'light-mode', { path: '/' });
        }
        element.classList.toggle("light-mode");
    }

    var theme = cookies.get('theme');

    if(theme != null) {
        var element = document.body;
        element.classList.add(theme);
    }

    return (
        <header>
            <div htmlFor="logo">
                <Logo />
            </div>
            <div htmlFor="navlist">
                <ul>
                    <li>
                        <a href="https://github.com/SpotlytHQ" target="_blank">
                            <Github />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/spotlytHQ" target="_blank">
                            <Twitter />
                        </a>
                    </li>
                    <li>
                        <a onClick={toggle_darkmode}>
                            <Theme />
                        </a>
                    </li>
                </ul>
                <div htmlFor="followus">
                    <Arrow />
                    <span>Follow Us</span>
                </div>
            </div>
        </header>
    )
}