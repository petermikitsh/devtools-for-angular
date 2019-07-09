import React from 'react';
import Styles from './Tree.css';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }

  render() {
    const {tag, attrs, props, c, l} = this.props;
    const {collapsed} = this.state;

    const start = (
      <React.Fragment>
        <span>{'<'}</span>
        <span className={Styles.tagName}>{tag}</span>
        {Object.keys(attrs).map(key => (
          <React.Fragment>
            <span className={Styles.attrName}>{` ${key}`}</span>
            <span>{'='}</span>
            <span className={Styles.attrValue}>{`"${attrs[key]}"`}</span>
          </React.Fragment>
        ))}
        {l.map(listener => (
          <React.Fragment>
            <span className={Styles.attrName}>{` (${listener})`}</span>
            <span>{'='}</span>
            <span className={Styles.attrValue}>{`"Function"`}</span>
          </React.Fragment>
        ))}
        <span>{'>'}</span>
      </React.Fragment>
    );

    const end = (
      <React.Fragment>
        <span>{'</'}</span>
        <span className={Styles.tagName}>{tag}</span>
        <span>{'>'}</span>
      </React.Fragment>
    );

    return (
      <div className={Styles.treeNode}>
        <div className={Styles.treeLabel}>
          <button
            className={Styles.toggle}
            onClick={this.toggle}
          >
            {collapsed ? '▶ ' : '▼ '}
          </button>
          {start}
          {collapsed && (
            <React.Fragment>
              {'…'}
              {end}
            </React.Fragment>
          )}
        </div>
        {!collapsed && (
          <div className={Styles.hr}/>
        )}
        {!collapsed && (
          <div className={Styles.expanded}>
            {c && c.map(child => (
              typeof child === 'string' ? <div className={Styles.text}>{`"${child}"`}</div> : <Tree {...child} />
            ))}
          </div>
        )}
        {!collapsed && (
          <div className={Styles.expanded}>{end}</div>
        )}
      </div>
    );
  }
}
