import LayerManager from '@atlaskit/layer-manager'
import Navigation, {
  AkNavigationItem,
  AkContainerNavigationNested,
} from '@atlaskit/navigation'
import * as React from 'react';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import JiraLabsIcon from '@atlaskit/icon/glyph/jira/labs';
import './App.css';

class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      stack: [
        [
          {
            title: 'Foo',
            children: [
              {
                title: 'bar',
              },
            ],
          },
        ],
      ],
    };
  }

  public stackPush = (item: any) => {
    const stack = [...this.state.stack, item];
    this.setState({ stack });
  };

  public stackPop = () => {
    if (this.state.stack.length > 1) {
      const stack = this.state.stack.slice(0, this.state.stack.length - 1);
      this.setState({ stack });
    }
  };

  public renderBackButton() {
    return <AkNavigationItem onClick={this.stackPop} text="Back" key="Back" />;
  }

  public renderHeader = () => {
    const items = [];

    if (this.state.stack.length > 1) {
      items.push(this.renderBackButton());
    }

    return items;
  };

  public renderItem = (item: any) => {
    const onClick = item.children && (() => this.stackPush(item.children));

    return (
      <AkNavigationItem icon={item.children && <TrayIcon label="db"/>} text={item.title} onClick={onClick} key={item.title} />
    );
  };

  public renderStack = () =>
    this.state.stack.map((page: any) => page.map((item: any) => this.renderItem(item)));

  public render() {
    return (
      <LayerManager>
        <div>
          <Navigation 
          globalPrimaryIcon={
              <JiraLabsIcon size="large" label="Atlassian" />
            }
          containerHeaderComponent={this.renderHeader}>
            <AkContainerNavigationNested
              stack={this.renderStack()}
              onAnimationEnd={(...args: any[]) => console.log('animation end', args)}
            />
          </Navigation>
          <div className="App">
            <span/>
          </div>
        </div>
      </LayerManager>
    );
  }
}

export default App;
