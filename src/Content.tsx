import * as React from 'react'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import DynamicTable from '@atlaskit/dynamic-table'
class Content extends React.Component<any, any> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (<Page>
            <Grid>
                {this.props.item === undefined ? (<GridColumn medium={8}>
                    <h1>Main heading</h1>
                    <p>
                        Welcome to MySQL workbench mockup
                    </p>
                </GridColumn>) : (<GridColumn medium={12}>
                    <h1>{`Columns in ${this.props.item.title}`}</h1>
                    <DynamicTable
                        head={head}
                        rows={[{
                            key: 'as',
                            cells: [
                                {
                                    key: 'as',
                                    content: 'Name'
                                }
                            ]
                        }]}
                        rowsPerPage={10}
                        defaultPage={1}
                        loadingSpinnerSize="large"
                        isLoading={false}
                        isFixedSize={true}
                        defaultSortKey="term"
                        defaultSortOrder="ASC"
                        onSort={() => console.log('onSort')}
                        onSetPage={() => console.log('onSetPage')}
                    />
                    </GridColumn>)}
            </Grid>
        </Page>)
    }
}


 const createHead = (withWidth: boolean) => {
    return {
      cells: [
        {
          key: 'column',
          content: 'Column',
          isSortable: true,
          width: withWidth ? 25 : undefined,
        },
        {
          key: 'datatype',
          content: 'DataType',
          shouldTruncate: true,
          isSortable: true,
          width: withWidth ? 15 : undefined,
        },
        {
          key: 'pk',
          content: 'PK',
          shouldTruncate: true,
          width: withWidth ? 10 : undefined,
        },
        {
          key: 'nn',
          content: 'NN',
          shouldTruncate: true,
        },
        {
          key: 'uq',
          content: 'UQ',
          shouldTruncate: true,
        },
        {
          key: 'BIN',
          content: 'bin',
          shouldTruncate: true,
        },
        {
          key: 'un',
          content: 'UN',
          shouldTruncate: true,
        },
        {
          key: 'zf',
          content: 'ZF',
          shouldTruncate: true,
        },
        {
          key: 'ai',
          content: 'AI',
          shouldTruncate: true,
        },
        {
          key: 'g',
          content: 'G',
          shouldTruncate: true,
        },
        {
          key: 'default',
          content: 'Default / Expression',
          shouldTruncate: true,
        },
      ],
    };
  };
  
 const head = createHead(true);

export default Content