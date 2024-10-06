// Import the MarkdownIt type from 'markdown-it'
import type { Plugin } from 'vite'
import MarkdownIt from 'markdown-it'
import { Graph, LineStyle, PointStyle, DegreeMode } from './graph';
import { ucast } from './utils';
// import { Renderer } from './renderer';
// import { renderDesmosInstance } from './desmos';

export default function mdItDesmos(md: MarkdownIt): Plugin {
    // const renderer = new Renderer();
    md.core.ruler.after('block', 'desmos-graph', (state) => {
        const tokens = state.tokens;
        // let desmosExist = false;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.type === 'fence' && token.info.trim() === 'desmos-graph') {
                // desmosExist = true;
                const source = token.content;
                token.type = 'desmos_graph';
                token.attrPush(['data-graph', source]);
                token.attrPush(['class', 'desmos-graph']);
            }
        }
    });

    md.renderer.rules.desmos_graph = function(tokens, idx) {
        const token = tokens[idx];
        const source = token.content
        const graph = Graph.parse(source);
        // Parse equations into a series of Desmos expressions
        const expressions: any[] = [];
        const graphSettings = graph.settings;
        for (const equation of graph.equations) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const expression: any = {
                color: equation.color,
                label: equation.label,
                hidden: equation.hidden,
                showLabel: equation.label !== undefined,
                lines: equation.line,
            };

            if (equation.restrictions) {
                const restriction = equation.restrictions
                    .map((restriction) =>
                        `{${restriction}}`
                            // Escape chars
                            .replaceAll("{", String.raw`\{`)
                            .replaceAll("}", String.raw`\}`)
                            .replaceAll("<=", String.raw`\leq `)
                            .replaceAll(">=", String.raw`\geq `)
                            .replaceAll("<", String.raw`\le `)
                            .replaceAll(">", String.raw`\ge `)
                    )
                    .join("");

                expression.latex = `${equation.equation}${restriction}`;
            } else {
                expression.latex = equation.equation;
            }

            if (equation.style) {
                if (Object.values(LineStyle).includes(ucast(equation.style))) {
                    expression.lineStyle = equation.style;
                } else if (Object.values(PointStyle).includes(ucast(equation.style))) {
                    expression.pointStyle = equation.style;
                }
            }

            expressions.push(expression);
        }

        const options = {
            settingsMenu: false,
            expressions: false,
            lockViewPort: true,
            zoomButtons: false,
            trace: false,
            xAxisNumbers: !graphSettings.hideAxisNumbers,
            yAxisNumbers: !graphSettings.hideAxisNumbers,
            showGrid: graphSettings.grid,
            // Desmos takes a value of 'false' for radians and 'true' for degrees
            degreeMode: graphSettings.degreeMode === DegreeMode.Degrees,
        };

        if (graphSettings.xAxisLabel !== undefined) {
            options.xAxisLabel = JSON.stringify(graphSettings.xAxisLabel ?? "").slice(1, -1);
        }

        if (graphSettings.yAxisLabel !== undefined) {
            options.yAxisLabel = JSON.stringify(graphSettings.yAxisLabel ?? "").slice(1, -1);
        }

        options.xAxisScale = graphSettings.xAxisLogarithmic ? "logarithmic" : "linear";
        options.yAxisScale = graphSettings.yAxisLogarithmic ? "logarithmic" : "linear";

        return `<div id="desmos-${idx}" class="desmos-graph" style="width: ${graphSettings.width}px; height: ${graphSettings.height
            }px;" data-desmos-expressions='${JSON.stringify(expressions)
            }' data-desmos-options='${JSON.stringify(options)
            }' data-desmos-bounds='${JSON.stringify({
                left: graphSettings.left,
                right: graphSettings.right,
                top: graphSettings.top,
                bottom: graphSettings.bottom,
            })}'></div>`
    }

    const htmlScript = `
document.addEventListener('DOMContentLoaded', () => {
  // Observe DOM mutation
  const observer = new MutationObserver(mutations => {
  const processed = {}
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const elements = document.querySelectorAll('.desmos-graph');
        if (elements.length > 0) {
          // perform operations
          for (const el of elements) {
            if (!processed[el.id]) {
              processed[el.id] = true;
              const options = JSON.parse(el.getAttribute('data-desmos-options')) || {} ;
              const expressions = JSON.parse(el.getAttribute('data-desmos-expressions')) || [];
              const calculator = Desmos.GraphingCalculator(el, options);
              const bounds = JSON.parse(el.getAttribute('data-desmos-bounds')) || {
                left: -10,
                right: 10,
                bottom: -7,
                top: 7,
              };
              calculator.setMathBounds(bounds);
              try {
                for (const expression of expressions) {
                  calculator.setExpression(expression);
                }
              } catch (err) {
                console.log(err);
                calculator.destroy();
                const wrapper = document.createElement("div");

                const message = document.createElement("strong");
                message.innerText = "Desmos Graph Error: ";
                wrapper.appendChild(message);

                const ctx = document.createElement("span");
                ctx.innerText = err;
                wrapper.appendChild(ctx);

                const container = document.createElement("div");
                container.style.padding = "20px";
                container.style.backgroundColor = "#f44336";
                container.style.color = "white";
                container.appendChild(wrapper);

                el.replaceChildren();
                el.appendChild(container);
              }
            }
          }
          // Stop observing
          observer.disconnect();
        }
      }
    });
  });

  const targetNode = document.body;
  const config = { childList: true, subtree: true }; // observe child node
  observer.observe(targetNode, config);
});
`
    // md.renderer.rules.desmos_script = function() {
    //     return htmlScript
    // }

    return {
        name: 'markdown-it-desmos',
        enforce: 'post',
        transformIndexHtml() {
            // Inject scripts
            return [{
                tag: 'script',
                attrs: {
                    id: 'desmos-api',
                    src: 'https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6',
                },
                injectTo: 'head',
            },
            {
                tag: 'script',
                children: htmlScript,
                attrs: {
                    id: 'desmos-script',
                },
                injectTo: 'body',
            }]
        },
    }
}