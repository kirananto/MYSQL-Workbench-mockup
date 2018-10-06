import * as React from 'react'
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Page, { Grid, GridColumn } from '@atlaskit/page'
import TextField from '@atlaskit/field-text'
import Button from '@atlaskit/button'
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu'

class ModalElement extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            dbName: 'mydb',
            dbList: ['mydb', 'autotrader'],
            tableName: '',
            values: ['']
        }
    }
    public handleDbChange = (dbName: string) => {
        this.setState({ dbName })
    }

    public handleTableName = (event: any) => {
        this.setState({ tableName: event.target.value })
    }

    public createTable = () => {
        const db = (window as any).openDatabase(this.state.dbName, '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction((tx: any) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${this.state.tableName} (${this.state.values})`)
        })
        this.props.updateData()
        this.props.onClose()
    }
    public render() {
        return (
            <ModalTransition>
                {this.props.isOpen && <ModalDialog onClose={this.props.onClose} >
                    <Page>
                        <Grid>
                            <GridColumn medium={12}>
                                <h3> Create a new table</h3>
                                <p>
                                    You can create a new table from here to a database
        </p>
                                <p>Select a database</p>
                                <DropdownMenu
                                    trigger={this.state.dbName}
                                    triggerType="button"
                                    position="bottom left">
                                    <DropdownItemGroup>
                                        {this.state.dbList.map((item: any, index: any) => {
                                            return (<DropdownItem key={item + index} onClick={() => this.handleDbChange(item)}>{item}</DropdownItem>)
                                        })}
                                    </DropdownItemGroup>
                                </DropdownMenu>
                                <p>Table name</p>
                                <TextField
                                    isLabelHidden={true}
                                    value={this.state.tableName}
                                    placeholder="Click here to input"
                                    onChange={this.handleTableName} />

                                <h5> Enter data </h5>
                                {this.state.values.map((item: string, index: number) => {
                                    return (<div
                                        style={{ marginBottom: '.5rem', float: this.state.values.length === index + 1 ? 'left' : undefined }}
                                        key={index}>
                                        <TextField
                                            isLabelHidden={true}
                                            type="text"
                                            value={this.state.values[index]}
                                            placeholder="Enter coloumn name"
                                            onChange={(event: any) => {
                                                const val = event.target.value
                                                this.setState((state: any) => {
                                                    const a = [...state.values]
                                                    a[index] = val
                                                    return ({ values: a })
                                                })
                                            }} /></div>)
                                })}
                                <div style={{ float: 'left', marginLeft: '1rem', marginTop: '.4rem' }}>
                                    <Button
                                        spacing="compact"
                                        appearance={'default'}
                                        onClick={() => this.setState((state: any) => {
                                            const values = [...state.values]
                                            values.push('')
                                            return ({ values })
                                        })}>+</Button>
                                </div>


                            </GridColumn>
                        </Grid>
                        <div style={{ marginBottom: '1rem', float: 'right' }}>
                            <div style={{float: 'left'}}>
                                <Button appearance="default" onClick={this.props.onClose}> Cancel</Button>
                            </div>
                            <div style={{ float: 'left', marginLeft: '1rem' }}>
                                <Button appearance={(this.state.tableName !== '' && this.state.values[0] !== '') ? 'primary' : 'default'}
                                onClick={(this.state.tableName !== '' && this.state.values[0] !== '') && this.createTable}
                                style={{ marginLeft: '1rem' }}> Create Table</Button>
                            </div>
                        </div>
                    </Page>
                </ModalDialog>}
            </ModalTransition>
        )
    }
};

export default ModalElement