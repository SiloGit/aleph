import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { fetchDocument } from 'src/actions';
import Screen from 'src/components/common/Screen';
import ScreenLoading from 'src/components/common/ScreenLoading';
import Breadcrumbs from 'src/components/common/Breadcrumbs';
import DualPane from 'src/components/common/DualPane';
import Entity from 'src/components/EntityScreen/Entity';
import DocumentInfo from './DocumentInfo';
import EntitySearch from 'src/components/EntitySearch/EntitySearch';


class DocumentRelatedScreen extends Component {
  componentDidMount() {
    const { documentId } = this.props;
    this.props.fetchDocument({ id: documentId });
  }

  componentDidUpdate(prevProps) {
    const { documentId } = this.props;
    if (documentId !== prevProps.documentId) {
      this.props.fetchDocument({ id: documentId });
    }
  }

  render() {
    const { document } = this.props;
    if (document === undefined) {
      return <ScreenLoading />;
    }
    const context = { exclude: document.id };
    const breadcrumbs = (<Breadcrumbs collection={document.collection}>
      { document.parent && (
        <li>
          <Entity.Link entity={document.parent} className="pt-breadcrumb" icon truncate={30} />
        </li>
      )}
      <li>
        <Entity.Link entity={document} className="pt-breadcrumb" icon truncate={30} />
      </li>
      <li>
        <a className="pt-breadcrumb">
          <FormattedMessage id="document.related" defaultMessage="Related"/>
        </a>
      </li>
    </Breadcrumbs>);

    return (
      <Screen breadcrumbs={breadcrumbs} title={document.title || document.file_name}>
        <DualPane>
          <DualPane.ContentPane>
            <EntitySearch context={context} />
          </DualPane.ContentPane>
          <DocumentInfo document={document} />
        </DualPane>
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { documentId } = ownProps.match.params;
  const document = documentId !== undefined
    ? state.entities[documentId]
    : undefined;
  return { documentId, document };
}

export default connect(mapStateToProps, { fetchDocument })(DocumentRelatedScreen);
