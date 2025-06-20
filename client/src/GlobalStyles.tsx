import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    header {
        /* Adapts based on user being logged in or not */
        max-height: "7em";
    }

    main {
        /* Adapts based on user being logged in or not */
        min-height: calc(100vh - "7em");
        padding: 25px;
    }

    /* 
        CSS Reset
        source: https://www.joshwcomeau.com/css/custom-css-reset/
    */

    /* 0. Maxing out page height */
    #root {
        min-height: 100vh;
    }

    /* 1. Use a more-intuitive box-sizing model. */
    *, *::before, *::after {
        box-sizing: border-box;
    }

    /* 2. Remove default margin */
    /* 3. Add accessible line-height */
    * {
        margin: 0;
        line-height: calc(1em + 0.5rem);
    }

    /* 4. Improve text rendering */
    body {
        -webkit-font-smoothing: antialiased;
        font-size: 20px;
    }

    /* 5. Improve media defaults */
    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }

    /* 6. Remove built-in form typography styles */
    input, button, textarea, select {
        font: inherit;
    }

    /* 7. Avoid text overflows */
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }

    /* 8. Create a root stacking context */
    #root, #__next {
        isolation: isolate;
    }
`

export default GlobalStyles;