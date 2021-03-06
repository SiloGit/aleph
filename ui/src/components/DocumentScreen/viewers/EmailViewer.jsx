import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tab, Tabs } from "@blueprintjs/core";

import EntitySearch from 'src/components/EntitySearch/EntitySearch';
import { DocumentToolbar } from 'src/components/Toolbar';

import './EmailViewer.css';

class EmailViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: 'email'
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  
  handleTabChange(activeTabId: TabId) {
    this.setState({ activeTabId });
  }
  
  render() {
    const { document } = this.props;
    const { headers = {} } = document;
    const context = {
      'filter:parent.id': document.id
    };
    
    return (
      <React.Fragment>
        <DocumentToolbar document={document}/>
        <div className="ContentPaneOuter">
          <div className="ContentPaneInner EmailViewer">
            <div className="email-header">
              <table className="pt-html-table">
                <tbody>
                  {headers.date && (
                    <tr>
                      <th><FormattedMessage id="email.date" defaultMessage="Date"/></th>
                      <td>{headers.date}</td>
                    </tr>
                  )}
                  {headers.from && (
                    <tr>
                      <th><FormattedMessage id="email.from" defaultMessage="From"/></th>
                      <td>{headers.from}</td>
                    </tr>
                  )}
                  <tr>
                    <th><FormattedMessage id="email.subject" defaultMessage="Subject"/></th>
                    <td>{headers.subject}</td>
                  </tr>
                  {headers.to && (
                    <tr>
                      <th><FormattedMessage id="email.to" defaultMessage="Recipient"/></th>
                      <td>{headers.to}</td>
                    </tr>
                  )}
                  {headers.cc && (
                    <tr>
                      <th><FormattedMessage id="email.cc" defaultMessage="CC"/></th>
                      <td>{headers.cc}</td>
                    </tr>
                  )}
                  {headers.bcc && (
                    <tr>
                      <th><FormattedMessage id="email.bcc" defaultMessage="BCC"/></th>
                      <td>{headers.bcc}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Tabs id="EmailTabs"  large="true" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
              <Tab id="email"
                title={
                  <React.Fragment>
                    <span className="pt-icon-standard pt-icon-envelope"/>
                    {' '}
                    <FormattedMessage id="email.body" defaultMessage="Message"/>
                  </React.Fragment>
                }
                panel={
                  (document.text && document.text.length > 0)
                    ? <pre>{document.text}</pre>
                    : <p className="email-no-body pt-text-muted"><FormattedMessage id="email.body.empty" defaultMessage="No message body."/></p>
                } 
              />
              <Tab id="attachments"
                disabled={!document.children}
                title={
                  <React.Fragment>
                    <span className="pt-icon-standard pt-icon-paperclip"/>
                    {' '}
                    {!!document.children && (
                      <React.Fragment>
                        <FormattedMessage id="email.attachments" defaultMessage="Attachments"/>
                        <span className="pt-tag pt-round pt-intent-primary">{document.children}</span>
                      </React.Fragment>
                    )}
                    {!document.children && (
                      <FormattedMessage id="email.no_attachments" defaultMessage="No Attachments"/>
                    )}
                  </React.Fragment>
                }
                panel={
                  <div className="email-attachments">
                    <EntitySearch context={context}
                                  hideCollection={true}
                                  documentMode={true} />
                  </div>
                } 
              />
           </Tabs>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailViewer;
