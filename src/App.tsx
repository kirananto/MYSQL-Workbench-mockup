import LayerManager from '@atlaskit/layer-manager'
import Navigation, {
  AkNavigationItem,
  AkContainerNavigationNested,
  presetThemes,
  AkContainerTitle
} from '@atlaskit/navigation'
import * as React from 'react';
import TrayIcon from '@atlaskit/icon/glyph/tray';
import JiraLabsIcon from '@atlaskit/icon/glyph/jira/labs';
import CreateIcon from '@atlaskit/icon/glyph/add';
import Tooltip from '@atlaskit/tooltip';
import EditorLayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal';
import TableIcon from '@atlaskit/icon/glyph/table';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import './App.css';

class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);

    this.state = {
      width: 304,
      stack: [
        [
          {
            title: 'autotrader',
            type: 'database',
            children: [
              {
                title: 'at_buyer_details',
                type: 'table',
                children: [
                  {
                    title: 'Columns',
                    type: 'column'
                  }
                ]
              },
            ],
          },
        ],
      ],
    };
  }

  public handleResize = (pr: { isOpen: boolean, width: number }) => this.setState(pr);

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
    return <AkNavigationItem icon={<ArrowLeftIcon label="back" />} onClick={this.stackPop} text="Back" key="Back" />;
  }

  public renderHeader = () => {
    const items = [];

    if (this.state.stack.length > 1) {
      items.push(this.renderBackButton());
    }

    return [<Tooltip key="1" position="right" content="MySQL Workbench">
      <AkContainerTitle
        icon={this.state.stack.length > 1 ? <ArrowLeftIcon label="back" /> : <JiraLabsIcon size="large" label="Atlassian" />} 
        onClick={this.state.stack.length > 1 && this.stackPop}
        text="MySQL Workbench"
      />
    </Tooltip>];
  };

  public renderItem = (item: any) => {
    const onClick = item.children && (() => this.stackPush(item.children));
    let icon
    switch (item.type) {
      case 'database': icon = <TrayIcon label="db" />
        break;
      case 'table': icon = <TableIcon label="db" />
        break;
      case 'column': icon = <EditorLayoutThreeEqualIcon label="db" />
        break;
      default: icon = undefined
    }

    return (
      <AkNavigationItem icon={icon} text={item.title} onClick={onClick} key={item.title} />
    );
  };

  public renderStack = () =>
    this.state.stack.map((page: any) => page.map((item: any) => this.renderItem(item)));

  public render() {
    return (
      <LayerManager>
        <div>
          <Navigation
            globalTheme={presetThemes['siteSettings']}
            containerTheme={presetThemes['container']}
            width={this.state.width}
            onResize={this.handleResize}
            // containerHeaderComponent={NavigationTitle}
            globalCreateIcon={
              <Tooltip key="1" position="right" content="Create new table">
                <CreateIcon label="search" />
              </Tooltip>
            }
            globalPrimaryIcon={
              <JiraLabsIcon size="large" label="Atlassian" />
            }
            containerHeaderComponent={this.renderHeader}
          >
            <AkContainerNavigationNested
              stack={this.renderStack()}
              onAnimationEnd={(...args: any[]) => console.log('animation end', args)}
            />
          </Navigation>
          <div className="App">
            <span />
          </div>
        </div>
      </LayerManager>
    );
  }
}

export default App;
