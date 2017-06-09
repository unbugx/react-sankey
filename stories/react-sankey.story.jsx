import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactSankey from '../src/components/react-sankey.component';

const createNode = (title, value, id) => ({ title, value, id });
const createLink = (sourceId, targetId) => ({ sourceId, targetId });

const nodes = {
  '0':  createNode('Brazil', 5091520, 0),
  '1':  createNode('Portugal', 3967612, 1),
  '2':  createNode('Spain', 3948389, 2),
  '3':  createNode('England', 1974194, 3),
  '5':  createNode('Canada', 1974184, 5),
  '6':  createNode('Conversion', 348, 6),
  '7':  createNode('Mexico', 3936731, 7),
  '8':  createNode('USA', 1983806, 8),
  'node_id_can_be_string':  createNode('Angola', 661228, 'node_id_can_be_string'),
  '10': createNode('Senegal', 199236, 10),
  '11': createNode('Conversion', 348, 11),
  '12': createNode('Morocco', 1983082, 12),
  '13': createNode('South Africa', 1290205, 13),
  '14': createNode('Italy', 348123, 14),
  '15': createNode('Conversion', 123, 15),
  '16': createNode('Mali', 1201, 16),
  '17': createNode('Conversion', 1302, 17),
  '18': createNode('Conversion', 1403, 18)
};

const links = [
  createLink(0, 1),
  createLink(1, 2),
  createLink(1, 7),
  createLink(1, 8),
  createLink(2, 3),
  createLink(2, 5),
  createLink(2, 16),
  createLink(3, 17),
  createLink(3, 18),
  createLink(5, 6),
  createLink(7, 12),
  createLink(8, 'node_id_can_be_string'),
  createLink(8, 10),
  createLink('node_id_can_be_string', 11),
  createLink(12, 13),
  createLink(12, 14),
  createLink(13, 15)
];

const chartConfig = {
  padding: { top: 10, right: 0, bottom: 10, left: 0 },
  node: {
    width: 200,
    maxHeight: 100,
    minHeight: 55,
    rectMinHeight: 5,
    paddingBottom: 10
  },
  link: {
    width: 65
  }
};

storiesOf('React sankey', module)
  .add('Default', () => (
    <ReactSankey
      rootID={0}
      nodes={nodes}
      links={links}
      hasArrows={true}
    />
  ))
  .add('Disabled arrows', () => (
    <ReactSankey
      rootID={0}
      nodes={nodes}
      links={links}
      hasArrows={false}
    />
  ))
  .add('Custom nodes', () => (
    <div>
      <ReactSankey
        rootID={0}
        nodes={nodes}
        links={links}
        hasArrows={true}
        customNode={(chartConfig, node) => {
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <rect height={node.height} width={chartConfig.node.width} style={{ stroke: '#ff5252', fill: 'url(#custom-linear-gradient)', strokeWidth: '1px' }} />
              <text x={chartConfig.node.width / 2} y={node.height / 2} style={{ fontSize: '20px', fill: '#b57272', textAnchor: 'middle', alignmentBaseline: 'central' }}>{`${node.title}`}</text>
            </g>
          )
        }}
      />
      <svg width={0} height={0}>
        <linearGradient id="custom-linear-gradient">
          <stop offset="0%" stopColor="#ecc1c1" />
          <stop offset="100%" stopColor="#D5EDEF" />
        </linearGradient>
      </svg>
    </div>
  ))
  .add('Custom arrow and link classes', () => (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
          .custom-arrow-class {
            stroke: red;
            stroke-width: 1px
          }
          .custom-link-class {
            fill: url(#custom-linear-gradient);
          }
        `}}
      />
      <ReactSankey
        rootID={0}
        nodes={nodes}
        links={links}
        hasArrows={true}
        arrowClass="custom-arrow-class"
        linkClass="custom-link-class"
      />
      <svg width={0} height={0}>
        <linearGradient id="custom-linear-gradient">
          <stop offset="0%" stopColor="#ecc1c1" />
          <stop offset="100%" stopColor="#D5EDEF" />
        </linearGradient>
      </svg>
    </div>
  ))
  .add('Custom chart config', () => (
    <ReactSankey
      rootID={0}
      nodes={nodes}
      links={links}
      hasArrows={true}
      chartConfig={chartConfig}
    />
  ));
