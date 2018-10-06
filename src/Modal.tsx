import * as React from 'react'
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Page, { Grid, GridColumn } from '@atlaskit/page'

const App = (props: any) => (
  <ModalTransition>
    {props.isOpen && <ModalDialog onClose={props.onClose} >
    <Page>
    <Grid>
        <GridColumn medium={12}>
        <h3> Create a new table</h3>
        <p>
            You can create a new table from here to a database
        </p>
    </GridColumn>
    </Grid>
    </Page>
    </ModalDialog>}
  </ModalTransition>
);

export default App