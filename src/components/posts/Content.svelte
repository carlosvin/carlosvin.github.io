
<style global>
  .content :global(h2) {
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 1.2em;
    vertical-align: middle;
  }

  .content :global(h2::after, h3::after, h4::after, h5::after, h6::after) {
    content: " <";
    color: #bbb;
    font-weight: lighter;
  }

  .content
    :global(h2:hover::after, h3:hover::after, h4:hover::after, h5:hover::after, h6:hover::after) {
    color: #666;
  }
  .content :global(h3::after) {
    content: " <<";
  }

  .content :global(h4::after) {
    content: " <<<";
  }

  .content :global(h5::after) {
    content: " <<<<";
  }

  .content :global(h6::after) {
    content: " <<<<<";
  }

  .content :global(h3) {
    font-size: 1.4rem;
    margin-top: 1em;
  }

  .content :global(h4) {
    font-size: 1.2rem;
    margin-top: 0.8em;
  }

  .content :global(h5) {
    font-size: 1rem;
    margin-top: 0.6em;
  }

  .content :global(h6) {
    font-size: 0.8rem;
    margin-top: 0.4em;
  }
  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
  .content :global(dt) {
    font-weight: bold;
  }

  .content :global(.footnote) {
    font-size: smaller;
  }

  .content :global(.admonitionblock) {
    background: #e9e9e9;
    padding: 1em 0.5em;
    border-radius: 0.2em;
    margin: 1em 0;
    font-size: 1.1em;
  }

  :global(.admonitionblock .content a) {
    word-break: break-all;
  }

  .content :global(.admonitionblock td.icon) {
    font-size: 3em;
    cursor: default;
    text-align: center;
    padding-right: 0.4em;
    padding-left: 0.3em;
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: "icomoon" !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media screen and (max-width: 480px) {
    .content :global(.admonitionblock td.icon) {
      font-size: 1em;
    }

    .content :global(.toc) {
      font-size: 1em;
    }

    .content :global(.imageblock img) {
      width: 90%;
    }
  }

  .content :global(.dlist dd > p)  {
    margin: 0 auto;
  }

  .content :global(.dlist dl)  {
    margin: 0 auto;
  }

  .content :global(.toc ul) {
    padding-right: 1em;
    padding-left: 1em;
  }

  .content :global(.toc .sectlevel1) {
    margin-block-start: 0.4em;
  }

  .content :global(.imageblock img) {
    object-fit:cover;
  }

  .content :global(.admonitionblock .icon > .title) {
    font-size: small;
    font-weight: lighter;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  .content :global(.admonitionblock.note .icon::before) {
    color: #19407c;
    content: "\e900";
  }
  .content :global(.admonitionblock.tip .icon::before) {
    color: rgb(6, 143, 148);
    content: "\e904";
  }
  .content :global(.admonitionblock.warning .icon::before) {
    content: "\e906";
    color: #bf6900;
  }
  .content :global(.admonitionblock.caution .icon::before) {
    content: "\e906";
    color: #bf3400;
  }
  .content :global(.admonitionblock.important .icon::before) {
    content: "\e902";
    color: rgb(26, 180, 218);
  }

  .content :global(.center) {
    text-align: center;
  }

  .content :global(.hdlist td, .hdlist p) {
    vertical-align: top;
  }
  .content :global(.hdlist p) {
    display: table-cell;
  }
  .content :global(.hdlist .hdlist1) {
    font-weight: bold;
  }

  .content :global(.toc) {
    font-size: 1.2em;
  }

  .content :global(.toc li) {
    font-size: smaller;
  }

  .content :global(.listingblock) {
    line-height: 1.2em;
    margin-bottom: 0.8em;
    border: 1px #bbb dashed;
    background: rgba(0, 0, 0, 0.05);
  }
  .content :global(.listingblock .title) {
    font-size: 1em;
    padding: 0.1em 0.5em;
    border-bottom: 1px #bbb dashed;
  }
  .content :global(.hljs-comment) {
    color: #777070 !important; 
  }
  .content :global(pre.highlight) {
    margin: 0.2em 0 0 0;
  }
  .content :global(.colist p) {
    margin: 0;
  }
  .content :global(.colist li) {
    margin: 0;
  }
  .content :global(.colist ol) {  
    margin: 0.1em 0.6em;
    margin-inline-start: 0.6em;
    padding-inline-start: 0.6em;    
  }
</style>

<div class='content'>
    <slot>
    </slot>
</div>
