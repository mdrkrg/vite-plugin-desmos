/**
 * @vitest-environment jsdom
 */
import { describe, test, vi, beforeEach, afterEach } from 'vitest'
import { JSDOM } from 'jsdom'
import MarkdownIt from 'markdown-it'
import mdItDesmos from '../src/index'


describe('test with mock', () => {

  let dom: JSDOM;

  // beforeEach(() => {
  //     vi.mock('../src/index')
  //     dom = new JSDOM();
  //     globalThis.window = dom.window;
  //     globalThis.document = dom.window.document;
  //     globalThis.window.URL = dom.window.URL;
  //     console.log(dom.window.URL)
  // });
  //

  const md = new MarkdownIt();
  md.use(mdItDesmos);


  test('test', ({ expect }) => {

    const codeBlockResult = md.render(`
\`\`\`desmos-graph
left=-1;right=1;
---
f(x) = x
\`\`\`
`);
    console.log(codeBlockResult)
  })

  test('test error', ({ expect }) => {
    const codeBlockResult = md.render(`
\`\`\`desmos-graph
f = g
\`\`\`
`);
  })
})

