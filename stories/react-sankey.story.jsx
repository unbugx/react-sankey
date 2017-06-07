import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReactSankey from '../src/components/react-sankey.component';

const createNode = (title, value, id) => ({ title, value, id });
const createLink = (sourceId, targetId) => ({ sourceId, targetId });

const nodes = {
  '0':  createNode('SportsDay pages', 5091520, 0),
  '1':  createNode('Non-subscribers', 3967612, 1),
  '2':  createNode('Pageview meter', 3948389, 2),
  '3':  createNode('When meter', 1974194, 3),
  '4':  createNode('Conversion', 1202, 4),
  '5':  createNode('When meter', 1974184, 5),
  '6':  createNode('Conversion', 348, 6),
  '7':  createNode('Scroll depth', 3936731, 7),
  '8':  createNode('Subsegments', 1983806, 8),
  '9':  createNode('Custom 1', 661228, 9),
  '10': createNode('Custom 2', 199236, 10),
  '11': createNode('Conversion', 348, 11),
  '12': createNode('Split test', 1983082, 12),
  '13': createNode('Show offer', 1290205, 13),
  '14': createNode('Show offer', 348123, 14),
  '15': createNode('Conversion', 123, 15),
  '16': createNode('When meter', 1201, 16),
  '17': createNode('Conversion', 1302, 17),
  '18': createNode('Conversion', 1403, 18),
  '19': createNode('Conversion', 1504, 19),
  '20': createNode('Conversion', 1605, 20),
};

const links = [
  createLink(0, 1),
  createLink(1, 2),
  createLink(1, 7),
  createLink(1, 8),
  createLink(2, 3),
  createLink(2, 5),
  createLink(2, 16),
  createLink(3, 4),
  createLink(3, 17),
  createLink(3, 18),
  createLink(3, 19),
  createLink(3, 20),
  createLink(5, 6),
  createLink(7, 12),
  createLink(8, 9),
  createLink(8, 10),
  createLink(9, 11),
  createLink(12, 13),
  createLink(12, 14),
  createLink(13, 15)
];

storiesOf('React sankey', module)
  .add('Default', () => (
    <ReactSankey
      rootID={0}
      nodes={nodes}
      links={links}
      hasArrows={true}
    />
  ));
