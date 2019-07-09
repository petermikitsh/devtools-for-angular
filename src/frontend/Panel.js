import React from 'react';
import Styles from './Panel.css';
import Split from 'react-split';
import makeClass from 'classnames';
import Tree from './Tree';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.bridge.on('tree', (tree) => {
      this.setState({tree});
    });
  }

  render() {
    const {tree} = this.state;
    return (
      <Split className={Styles.split} sizes={[80, 20]} gutterStyle={() => ({width: '1px'})}>
        <div className={makeClass(Styles.pane, Styles.leftPane)}>
          <div className={Styles.leftPaneSettings}>
            <button>Refresh Tree</button>
          </div>
          <div className={Styles.leftPaneTree}>
            {tree && <Tree {...tree} />}
          </div>
        </div>
        <div className={makeClass(Styles.pane, Styles.rightPane)}>Props</div>
      </Split>
    );
  }
}
