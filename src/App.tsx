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
import Content from './Content'
class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 304,
      db: undefined,
      item: undefined,
      stack: [
        [
          
        ],
      ],
    };
  }

  public componentDidMount() {
    const db = (window as any).openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    const autotrader = (window as any).openDatabase('autotrader', '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)')
      tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")')
      tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")')
    })
    autotrader.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS SOMETHING1 (id unique, log)')
      tx.executeSql('CREATE TABLE IF NOT EXISTS SOMETHING2 (idVal unique, logVal)')
      tx.executeSql('CREATE TABLE IF NOT EXISTS SOME3THING2 (idVal13 unique, logVal2)')
      tx.executeSql('INSERT INTO SOMETHING1 (id, log) VALUES (1, "foobarsome")')
      tx.executeSql('INSERT INTO SOMETHING1 (id, log) VALUES (2, "logmsgsome")')
      tx.executeSql('INSERT INTO SOMETHING2 (idVal, logVal) VALUES (1, "foobarasd")')
      tx.executeSql('INSERT INTO SOMETHING2 (idVal, logVal) VALUES (2, "logmsgasd")')
      tx.executeSql('INSERT INTO SOME3THING2 (idVal13, logVal2) VALUES (1, "foobarasd")')
      tx.executeSql('INSERT INTO SOME3THING2 (idVal13, logVal2) VALUES (2, "logmsgad")')
    })

    autotrader.transaction((tx: any) => {
      tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table"', [], (tx2: any, results: any) => {
        const rs :any = []
        for(let i = 1; i< results.rows.length; i++ ) {
          rs.push({ title: results.rows.item(i).tbl_name, type: 'table'})
        }
        this.setState((state: any) => {
          return ({ stack: [
            [ ...state.stack[0], {
                title: 'autotrader',
                type: 'database',
                children:  rs
              }
            ]
          ]})
        })
      });
    });

    db.transaction((tx: any) => {
      tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table"', [], (tx2: any, results: any) => {
        const rs :any = []
        for(let i = 1; i< results.rows.length; i++ ) {
          rs.push({ title: results.rows.item(i).tbl_name, type: 'table'})
        }
        this.setState((state: any) => {
          return ({ stack: [
            [ ...state.stack[0], {
                title: 'mydb',
                type: 'database',
                children:  rs
              }
            ]
          ]})
        })
      });
    });

  }

  public handleResize = (pr: { isOpen: boolean, width: number }) => this.setState(pr);

  public stackPush = (it: any, item: any) => {
    if(it.type === 'database') {
      this.setState({ db: it.title})
    }
    const stack = [...this.state.stack, item];
    this.setState({ stack });
  };

  public stackPop = () => {
    if (this.state.stack.length > 1) {
      const stack = this.state.stack.slice(0, this.state.stack.length - 1);
      this.setState({ stack, item: undefined });
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
    const onClick = item.children ? (() => this.setState({ item: undefined }, () => this.stackPush(item, item.children))) : (() => this.setState({ item }))
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
              title="Schemas"
              stack={this.renderStack()}
              onAnimationEnd={(...args: any[]) => console.log('animation end', args)}
            />
            <div style={{ margin: 'auto', fontSize: '11px', fontStyle: 'italic' }}>Version: 0.001</div>
          </Navigation>
          <Content db={this.state.db} item={this.state.item} />
        </div>
      </LayerManager>
    );
  }
}

export default App;
