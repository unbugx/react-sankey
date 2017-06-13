# react-sankey

Sankey diagramm.

![screenshot](screenshot.jpg?raw=true "Example")

See more examples in storybook `npm run storybook` - http://localhost:9001/ .

## TODO
*   Add lint

## Installation

`npm install react-sankey`

## Usage

    import ReactSankey from 'react-sankey';
        
    const createNode = (title, value, id) => ({ title, value, id });
    const createLink = (sourceId, targetId) => ({ sourceId, targetId });
        
    const nodes = {
      '0':  createNode('Brazil', 5091520, 0),
      '1':  createNode('Portugal', 3967612, 1),
      '2':  createNode('Spain', 3948389, 2),
      '3':  createNode('England', 1974194, 3),
      '4':  createNode('France', 1202, 4),
      '5':  createNode('Canada', 1974184, 5),
      '6':  createNode('Conversion', 348, 6),
      '7':  createNode('Mexico', 3936731, 7),
      '8':  createNode('USA', 1983806, 8),
      '9':  createNode('Angola', 661228, 9),
      '10': createNode('Senegal', 199236, 10),
      '11': createNode('Conversion', 348, 11),
      '12': createNode('Morocco', 1983082, 12),
      '13': createNode('South Africa', 1290205, 13),
      '14': createNode('Italy', 348123, 14),
      '15': createNode('Conversion', 123, 15),
      '16': createNode('Mali', 1201, 16),
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
        
    class App extends React.Component {
        
        render() {
            <ReactSankey
              rootID={0}
              nodes={nodes}
              links={links}
              hasArrows
            />
        }
        
    }
    
## Props/Options
*   nodes - `object`. Example:

        {
          0: {
            title: 'Node 1',
            value: 15,
            id: '0'
          },
          1: {
            title: 'Node 2',
            value: 5,
            id: '1'
          },
          2: {
            title: 'Node 3',
            value: 1,
            id: '2'
          }
        }
        
*   links - `array`. Describes links between nodes. Example:

        [
          { sourceId: 0, targetId: 1 },
          { sourceId: 1, targetId: 2 }
        ]
        
*   rootID - `number | string`. Id of root node of chart
*   hasArrows - `boolean`. Enable/disable arrows
*   arrowClass - `string`. Adds custom class for tag `path` of arrows
*   linkClass - `string`. Adds custom class for `path` between nodes
*   chartConfig - `object`. To configure chart margins, paddings, node sizes. Default value:

        const chartConfig = {
          padding: { top: 10, right: 0, bottom: 10, left: 0 },
          node: {
            width: 150,
            maxHeight: 150,
            minHeight: 55,
            rectMinHeight: 5,
            paddingBottom: 40
          },
          link: {
            width: 100
          }
        }

*   customNode - `function`. Returns custom component for node and has two arguments - `chartConfig`, `node`. Example:

        (chartConfig, node) => {
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <rect 
                height={node.height} 
                width={chartConfig.node.width} 
                style={{ stroke: '#ff5252', fill: 'url(#custom-linear-gradient)', strokeWidth: '1px' }} 
              />
              <text 
                x={chartConfig.node.width / 2} 
                y={node.height / 2} 
                style={{ fontSize: '20px', fill: '#b57272', textAnchor: 'middle', alignmentBaseline: 'central' }}
              >
                {`${node.title}`}
              </text>
            </g>
          )
        }
        

## Contributing

