import { writable } from 'svelte/store'

const savedTheme = localStorage.getItem("theme");
const preferredLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = savedTheme || (preferredLightTheme ? "light" : "dark");

export let theme = writable(initialTheme);

theme.subscribe(value => {
    localStorage.setItem("theme", value);
    document.documentElement.setAttribute("data-theme", value);
});
