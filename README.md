# react-sankey
=========

Sankey diagramm. **Still under active development.**

![screenshot](screenshot.jpg?raw=true "Example")

See more examples in `.storybook` folder.

##TODO
*   Add lint
*   Some improvements

## Installation

`npm install react-sankey`

## Usage

    import SankeyChart from 'react-sankey';
        
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
      '14': createNode('Show offer', 348123, 14),
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
    


## Contributing

