"use client";

// Very important to import the css file. In next.js, put the following line in `_app.js` instead.
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { marked } from "marked";
import { useEffect } from "react";

// import styles from "./CodeBox.css";
import "./CodeBox.css";

const markdown = `
  \`\`\`typescript
    const variable = 'hello';
    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
  \`\`\`
    `;

function CodeBox() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    function test() {
      const codeBlocks: NodeListOf<Element> =
        document.querySelectorAll("pre > code");

      if (!codeBlocks) return;
      codeBlocks.forEach((codeBlock) => {
        if (!codeBlock.innerHTML.includes("lineCode")) {
          const codes = codeBlock.innerHTML.split("\n");

          const processedCodes = codes.reduce(
            (prevCodes, curCode) =>
              prevCodes + `<div class="lineCode">${curCode}</div>`,
            ""
          );

          const codeBody = `<div class="code-body">${processedCodes}</div>`;
          codeBlock.innerHTML = codeBody;
        }
      });
    }
    test();
  }, []);

  return (
    <div className={"pre"} data-ke-language="css">
      <div className="code">
        <div className={"code-header"}>
          <span className={"red-btn"}></span>
          <span className={"yellow-btn"}></span>
          <span className={"green-btn"}></span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
      </div>
    </div>
  );
}

export default CodeBox;
