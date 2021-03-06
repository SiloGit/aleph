import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { Button, Tab, Tabs } from "@blueprintjs/core";
import {Link} from 'react-router-dom';

import DualPane from 'src/components/common/DualPane';
import Category from 'src/components/common/Category';
import Language from 'src/components/common/Language';
import Country from 'src/components/common/Country';
import Role from 'src/components/common/Role';
import Date from 'src/components/common/Date';

import CollectionInfoXref from './CollectionInfoXref';


class CollectionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabId: 'overview'
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  
  handleTabChange(activeTabId: TabId) {
    this.setState({ activeTabId });
  }
  
  render() {
    const {collection} = this.props;
    const link = collection.id + '/edit';

    return (
      <DualPane.InfoPane className="CollectionInfo withHeading">
        <div className="PaneHeading">
          <span>
            <FormattedMessage id="collection.info.heading" defaultMessage="Collection"/>
          </span>
          <h1>
            {collection.label}
          </h1>
        </div>
        <div className="PaneContent">
          <Tabs id="CollectionInfoTabs" large="true" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
            <Tab id="overview" 
              title={
                <React.Fragment>
                  <span className="pt-icon-standard pt-icon-info-sign"/>
                  <FormattedMessage id="collection .info.overview" defaultMessage="Overview"/>
                </React.Fragment>
              }
              panel={
                <React.Fragment>
                  <p>{collection.summary}</p>
                  <ul className='info-sheet'>
                    <li>
                      <span className="key">
                        <FormattedMessage id="collection.info.category" defaultMessage="Category"/>
                      </span>
                      <span className="value">
                        <Category collection={collection}/>
                      </span>
                    </li>
                    {collection.creator && (
                      <li>
                        <span className="key">
                          <FormattedMessage id="collection.info.creator" defaultMessage="Manager"/>
                        </span>
                        <span className="value">
                          <Role.Label role={collection.creator}/>
                        </span>
                      </li>
                    )}
                    {collection.languages && !!collection.languages.length && (
                      <li>
                        <span className="key">
                          <FormattedMessage id="collection.info.languages" defaultMessage="Language"/>
                        </span>
                        <span className="value">
                          <Language.List codes={collection.languages}/>
                        </span>
                      </li>
                    )}
                    {collection.countries && !!collection.countries.length && (
                      <li>
                        <span className="key">
                          <FormattedMessage id="collection.info.countries" defaultMessage="Country"/>
                        </span>
                        <span className="value">
                          <Country.List codes={collection.countries} truncate={10}/>
                        </span>
                      </li>
                    )}
                    <li>
                      <span className="key">
                        <FormattedMessage id="collection.info.updated_at" defaultMessage="Last updated"/>
                      </span>
                      <span className="value">
                        <Date value={collection.updated_at}/>
                      </span>
                    </li>
                  </ul>
                  {collection.writeable && <Link to={link}>
                    <Button className="editButton">
                      <FormattedMessage id="collection.info.edit"
                                        defaultMessage="Edit"/>
                    </Button>
                  </Link>}
                </React.Fragment>
              }
            />
            <Tab id="xref" 
              title={
                <React.Fragment>
                  <span className="pt-icon-standard pt-icon-database"/>
                  <FormattedMessage id="collection.info.source" defaultMessage="Cross-reference"/>
                </React.Fragment>
              }
              panel={<CollectionInfoXref collection={collection} />}
            />
            <Tabs.Expander />
          </Tabs>
        </div>
      </DualPane.InfoPane>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(CollectionInfo);
