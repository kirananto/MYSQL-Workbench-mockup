import * as React from 'react'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import DynamicTable from '@atlaskit/dynamic-table'
import {  Checkbox } from '@atlaskit/checkbox'
import emptyImage from './block.png'
import EmptyState from '@atlaskit/empty-state'
  class Content extends React.Component<any, any> {

    constructor(props: {}) {
        super(props);
        this.state = {
            rows: []
        }
    }

    public componentWillReceiveProps(props: any) {
        if (props.db && props.item !== undefined) {
            const db = (window as any).openDatabase(props.db, '1.0', 'Test DB', 2 * 1024 * 1024);
            db.transaction((tx: any) => {
                tx.executeSql(`select * from ${props.item.title}`, [], (tx2: any, results: any) => {
                    if (results.rows.length > 0) {
                        this.setState({
                            rows: Object.keys(results.rows.item(1)).map((item, index) => ({
                                key: Math.random(),
                                cells: [
                                    {
                                        content: item
                                    },
                                    {
                                        content: typeof results.rows.item(1)[item]
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    },
                                    {
                                        content: <Checkbox
                                                value=""
                                                label=""
                                                name="checkbox-basic"
                                                />
                                    }
                                ]
                            }))
                        })
                    }
                })
            })
        }
    }
    public render() {
        return (<Page>
            {this.props.item === undefined ? (
                <EmptyState 
                        header='WebSQL workbench'
                        description={`Lorem ipsum is a pseudo-Latin text used in web design, 
                                typography, layout, and printing in place of English to emphasise 
                                design elements over content. It's also called placeholder (or filler) 
                                text. It's a convenient tool for mock-ups.`}
                        imageUrl={emptyImage} />) : (<Grid><GridColumn medium={12}>
                    <h1>{`Columns in ${this.props.item.title}`}</h1>
                    <DynamicTable
                        head={head}
                        rows={this.state.rows}
                        rowsPerPage={10}
                        defaultPage={1}
                        loadingSpinnerSize="large"
                        isLoading={false}
                        isFixedSize={true}
                        defaultSortKey="BADFBQ"
                        defaultSortOrder="ASC"
                        onSort={() => console.log('onSort')}
                        onSetPage={() => console.log('onSetPage')}
                    />
                </GridColumn></Grid>)}
        </Page>)
    }
}


const createHead = (withWidth: boolean) => {
    return {
        cells: [
            {
                key: 'BADFBQ',
                content: 'Column',
                isSortable: true,
                width: withWidth ? 25 : undefined,
            },
            {
                key: 'QERTQE',
                content: 'DataType',
                shouldTruncate: true,
                isSortable: true,
                width: withWidth ? 15 : undefined,
            },
            {
                key: 'ADSGASDG',
                content: 'PK',
                shouldTruncate: true,
                width: withWidth ? 10 : undefined,
            },
            {
                key: '76543456hgf',
                content: 'NN',
                shouldTruncate: true,
            },
            {
                key: '567ujnbg',
                content: 'UQ',
                shouldTruncate: true,
            },
            {
                key: 'ASDGASDG',
                content: 'bin',
                shouldTruncate: true,
            },
            {
                key: 'ASDGADSG',
                content: 'UN',
                shouldTruncate: true,
            },
            {
                key: '345678ijhg',
                content: 'ZF',
                shouldTruncate: true,
            },
            {
                key: 'ADGSASD',
                content: 'AI',
                shouldTruncate: true,
            },
            {
                key: 'ertyuiolkjh',
                content: 'G',
                shouldTruncate: true,
            },
            {
                key: 'QERWAEFQER',
                content: 'Default / Expression',
                shouldTruncate: true,
            },
        ],
    };
};

const head = createHead(true);

export default Content