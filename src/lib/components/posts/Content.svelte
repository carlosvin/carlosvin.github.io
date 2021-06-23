
<style global>
  .content h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 1.2em;
    vertical-align: middle;
  }

  .content h2::after,
  .content h3::after,
  .content h4::after,
  .content h5::after,
  .content h6::after {
    content: " <";
    color: #bbb;
    font-weight: lighter;
  }

  .content h2:hover::after,
  .content h3:hover::after,
  .content h4:hover::after,
  .content h5:hover::after,
  .content h6:hover::after {
    color: #669;
  }
  
  .content h3::after {
    content: " <<";
  }

  .content h4::after {
    content: " <<<";
  }

  .content h5::after {
    content: " <<<<";
  }

  .content h6::after {
    content: " <<<<<";
  }

  .content h3 {
    font-size: 1.4rem;
    margin-top: 1em;
  }

  .content h4 {
    font-size: 1.2rem;
    margin-top: 0.8em;
  }

  .content h5 {
    font-size: 1rem;
    margin-top: 0.6em;
  }

  .content h6 {
    font-size: 0.8rem;
    margin-top: 0.4em;
  }
  .content pre {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content pre, 
  .content code {
    background-color: transparent;
    padding: 0;
  }

  .content ul {
    line-height: 1.5;
  }

  .content li {
    margin: 0 0 0.5em 0;
  }
  .content dt {
    font-weight: bold;
  }

  .content .footnote {
    font-size: smaller;
  }

  .content .admonitionblock {
    background: #e9e9e9;
    padding: 1em 0.5em;
    border-radius: 0.2em;
    margin: 1em 0;
    font-size: 1.1em;
  }

  .content .admonitionblock .content a {
    word-break: break-all;
  }

  .content .admonitionblock td.icon {
    font-size: 3em;
    cursor: default;
    text-align: center;
    padding-right: 0.4em;
    padding-left: 0.3em;
    font-family: "icomoon" !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media screen and (max-width: 480px) {
    .content .admonitionblock td.icon {
      font-size: 1em;
    }

    .content .toc {
      font-size: 1em;
    }

    .content .imageblock img {
      width: 90%;
    }
  }

  .content .dlist dd > p  {
    margin: 0 auto;
  }

  .content .dlist dl {
    margin: 0 auto;
  }

  .content .toc ul {
    padding-right: 1em;
    padding-left: 2em;
  }

  .content .toc .sectlevel1 {
    margin-block-start: 0.4em;
  }

  .content .imageblock img {
    object-fit:cover;
  }

  .content .admonitionblock .icon > .title {
    font-size: small;
    font-weight: lighter;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  .content .admonitionblock.note .icon::before {
    color: #19407c;
    content: "\e900";
  }
  .content .admonitionblock.tip .icon::before {
    color: rgb(6, 143, 148);
    content: "\e904";
  }
  
  .content .admonitionblock.warning .icon::before {
    content: "\e906";
    color: #bf6900;
  }
  .content .admonitionblock.caution .icon::before {
    content: "\e906";
    color: #bf3400;
  }
  .content .admonitionblock.important .icon::before {
    content: "\e902";
    color: rgb(26, 180, 218);
  }
  .content .stretch {
    width: 100%;
  }
  .content .center {
    text-align: center;
  }
  .content .caption {
    color: gray;
  }
  .content .hdlist td, .hdlist p {
    vertical-align: top;
  }
  .content .hdlist p {
    display: table-cell;
  }
  .content .hdlist .hdlist1 {
    font-weight: bold;
  }
  .content .toc {
    font-size: 1.2em;
  }
  .content .toc li {
    font-size: smaller;
  }
  
  .content :global(.listingblock) {
    line-height: 1.2em;
    margin-bottom: 0.8em;
    border: 1px #bbb dashed;
    background: rgba(0, 0, 0, 0.05);
  }
  .content .listingblock .title {
    font-size: 1em;
    padding: 0.1em 0.5em;
    border-bottom: 1px #bbb dashed;
  }
  .content .hljs-comment {
    color: #777070 !important; 
  }
  .content .hljs-meta-string {
    color: #1f7199 !important; 
  }
  .content :global(pre.highlight) {
    margin: 0.2em 0 0 0;
    overflow: auto;
    
  }
  .content .colist p {
    margin: 0;
  }
  .content .colist li {
    margin: 0;
  }
  .content .tableblock {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .content .colist ol {  
    margin: 0.1em 0.6em;
    margin-inline-start: 0.6em;
    padding-inline-start: 0.6em;    
  }
</style>

<div class='content'>
    <slot>
    </slot>
</div>
