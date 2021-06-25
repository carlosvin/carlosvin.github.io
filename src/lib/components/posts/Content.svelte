
<style global>
  .postContent h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 1.2em;
    vertical-align: middle;
  }

  .postContent h2::after,
  .postContent h3::after,
  .postContent h4::after,
  .postContent h5::after,
  .postContent h6::after {
    content: " <";
    color: #bbb;
    font-weight: lighter;
  }

  .postContent h2:hover::after,
  .postContent h3:hover::after,
  .postContent h4:hover::after,
  .postContent h5:hover::after,
  .postContent h6:hover::after {
    color: #669;
  }
  
  .postContent h3::after {
    content: " <<";
  }

  .postContent h4::after {
    content: " <<<";
  }

  .postContent h5::after {
    content: " <<<<";
  }

  .postContent h6::after {
    content: " <<<<<";
  }

  .postContent h3 {
    font-size: 1.4rem;
    margin-top: 1em;
  }

  .postContent h4 {
    font-size: 1.2rem;
    margin-top: 0.8em;
  }

  .postContent h5 {
    font-size: 1rem;
    margin-top: 0.6em;
  }

  .postContent h6 {
    font-size: 0.8rem;
    margin-top: 0.4em;
  }
  .postContent pre {
    background-color: #f9f9f9;
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .postContent pre, 
  .postContent code {
    background-color: transparent;
    padding: 0;
  }

  .postContent ul {
    line-height: 1.5;
  }

  .postContent li {
    margin: 0 0 0.5em 0;
  }
  .postContent dt {
    font-weight: bold;
  }

  .postContent .footnote {
    font-size: smaller;
  }

  .postContent .admonitionblock {
    background: #e9e9e9;
    padding: 1em 0.5em;
    border-radius: 0.2em;
    margin: 1em 0;
    font-size: 1.1em;
  }

  .postContent .admonitionblock .content a {
    word-break: break-word;
  }

  .postContent .admonitionblock td.icon {
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
    .postContent .admonitionblock td.icon {
      font-size: 1em;
    }

    .postContent .toc {
      font-size: 1em;
    }

    .postContent .imageblock img {
      width: 90%;
    }
  }

  .postContent .dlist dd > p  {
    margin: 0 auto;
  }

  .postContent .dlist dl {
    margin: 0 auto;
  }

  .postContent .toc ul {
    padding-right: 1em;
    padding-left: 2em;
  }

  .postContent .toc .sectlevel1 {
    margin-block-start: 0.4em;
  }

  .postContent .imageblock img {
    object-fit:cover;
  }

  .postContent .admonitionblock .icon > .title {
    font-size: small;
    font-weight: lighter;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  .postContent .admonitionblock.note .icon::before {
    color: #19407c;
    content: "\e900";
  }
  .postContent .admonitionblock.tip .icon::before {
    color: rgb(6, 143, 148);
    content: "\e904";
  }
  
  .postContent .admonitionblock.warning .icon::before {
    content: "\e906";
    color: #bf6900;
  }
  .postContent .admonitionblock.caution .icon::before {
    content: "\e906";
    color: #bf3400;
  }
  .postContent .admonitionblock.important .icon::before {
    content: "\e902";
    color: rgb(26, 180, 218);
  }
  .postContent .stretch {
    width: 100%;
  }
  .postContent .center {
    text-align: center;
  }
  .postContent .caption {
    color: gray;
  }
  .postContent .hdlist td, .hdlist p {
    vertical-align: top;
  }
  .postContent .hdlist p {
    display: table-cell;
  }
  .postContent .hdlist .hdlist1 {
    font-weight: bold;
  }
  .postContent .toc {
    font-size: 1.2em;
  }
  .postContent .toc li {
    font-size: smaller;
  }
  
  .postContent .listingblock {
    line-height: 1.2em;
    margin-bottom: 0.8em;
    border: 1px #bbb dashed;
    background: rgba(0, 0, 0, 0.05);
  }
  .postContent .listingblock .title {
    font-size: 0.9em;
    border-bottom: 1px #bbb dashed;
    padding: 0.2em;
  }
  .postContent .listingblock .content {
    background-color: #f9f9f9;
    padding: 0.2em;
  }
  .postContent .hljs-comment {
    color: #777070 !important; 
  }
  .postContent .hljs-meta-string {
    color: #1f7199 !important; 
  }
  .postContent pre.highlight {
    margin: 0.4em 0 0.4em 0.4em;
    overflow: auto;    
  }
  .postContent .colist p {
    margin: 0;
  }
  .postContent .colist li {
    margin: 0;
  }
  .postContent .tableblock {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .postContent .colist ol {  
    margin: 0.1em 0.6em;
    margin-inline-start: 0.6em;
    padding-inline-start: 0.6em;
  }

  .postContent .colist li::marker,
  .postContent .conum {
    color: brown;
    font-weight: bold;
  }

  .postContent .quoteblock {
    font-size: large;
    font-style: italic;
    background-color: #eee;
    border-left: 0.5em solid #CCC;
  }

  .postContent .quoteblock blockquote {
    padding: 1em 1em 0.4em 1.5em;
    margin: 0;
  }

  .postContent .quoteblock .attribution {
    font-weight: bold;
    padding: 0.4em;
  }

</style>

<div class='postContent'>
    <slot>
    </slot>
</div>
